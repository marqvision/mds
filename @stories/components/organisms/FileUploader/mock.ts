const FAKE_S3_HOST = 'fake-s3.example.com';
const PROGRESS_INTERVAL_MS = 200;
const PROGRESS_STEP = 0.1;
const DEFAULT_FILE_SIZE = 1_000_000;

const getFileSize = (body: Document | XMLHttpRequestBodyInit | null | undefined): number => {
  if (body instanceof File || body instanceof Blob) return body.size;
  return DEFAULT_FILE_SIZE;
};

const createProgressEvent = (loaded: number, total: number) =>
  new ProgressEvent('progress', { lengthComputable: true, loaded, total });

const isFakeS3Request = (url: string) => url.includes(FAKE_S3_HOST);

const mockGetPresignedUrl = (fileName: string): string =>
  `https://${FAKE_S3_HOST}/upload/${encodeURIComponent(fileName)}?token=mock-token-${Date.now()}`;

// 시뮬레이션 로직
const simulateProgress = (xhr: XMLHttpRequest, total: number, onComplete: () => void) => {
  xhr.upload.dispatchEvent(createProgressEvent(0, total));

  let loaded = 0;
  const increment = total * PROGRESS_STEP;

  const interval = setInterval(() => {
    loaded = Math.min(loaded + increment, total);
    xhr.upload.dispatchEvent(createProgressEvent(loaded, total));

    if (loaded >= total) {
      clearInterval(interval);
      onComplete();
    }
  }, PROGRESS_INTERVAL_MS);
};

const simulateSuccessResponse = (xhr: XMLHttpRequest) => {
  Object.defineProperty(xhr, 'status', { value: 200 });
  Object.defineProperty(xhr, 'readyState', { value: 4 });
  Object.defineProperty(xhr, 'responseText', { value: '' });
  xhr.dispatchEvent(new Event('load'));
  xhr.dispatchEvent(new Event('loadend'));
};

const simulateErrorResponse = (xhr: XMLHttpRequest) => {
  Object.defineProperty(xhr, 'status', { value: 500 });
  Object.defineProperty(xhr, 'readyState', { value: 4 });
  Object.defineProperty(xhr, 'responseText', { value: 'Internal Server Error' });
  // onload 호출 시 status 체크로 인해 reject됨 (xhr.onerror는 dispatchEvent로 트리거 안됨)
  if (typeof xhr.onload === 'function') {
    xhr.onload(new ProgressEvent('load'));
  }
  xhr.dispatchEvent(new Event('loadend'));
};

// 원본 XMLHttpRequest 저장
const OriginalXHR = window.XMLHttpRequest;

// MockXHR 클래스 (성공)
class MockXHR extends OriginalXHR {
  private _url = '';

  open(method: string, url: string | URL, async = true, username: string | null = null, password: string | null = null) {
    this._url = url.toString();
    return super.open(method, url, async, username, password);
  }

  send(body?: Document | XMLHttpRequestBodyInit | null) {
    if (isFakeS3Request(this._url)) {
      simulateProgress(this, getFileSize(body), () => simulateSuccessResponse(this));
      return;
    }
    super.send(body);
  }
}

// MockXHR 클래스 (실패)
class MockXHRFail extends OriginalXHR {
  private _url = '';

  open(method: string, url: string | URL, async = true, username: string | null = null, password: string | null = null) {
    this._url = url.toString();
    return super.open(method, url, async, username, password);
  }

  send(body?: Document | XMLHttpRequestBodyInit | null) {
    if (isFakeS3Request(this._url)) {
      simulateProgress(this, getFileSize(body), () => simulateErrorResponse(this));
      return;
    }
    super.send(body);
  }
}

// Public API
export const applyMockXHR = () => {
  window.XMLHttpRequest = MockXHR;
};

export const applyMockXHRFail = () => {
  window.XMLHttpRequest = MockXHRFail;
};

export const disposeMockXHR = () => {
  window.XMLHttpRequest = OriginalXHR;
};

export const createMockGetPresignedUrl = (delayMs = 300) => {
  return async (fileName: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return mockGetPresignedUrl(fileName);
  };
};
