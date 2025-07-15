export type TaskId = string; // progress를 추적하기 위한 task별 고유 아이디

export type DisplayStatus = {
  isOpen: boolean;
  isFold: boolean;
};

type TaskFileType = 'csv' | 'pdf' | 'ppt' | 'zip';
type TaskStatus = 'ready' | 'processing' | 'completed' | 'failed' | 'removed';
export type Task<PollingRes = unknown, CancelRes = unknown, FailedRes = unknown> = {
  taskId: TaskId;
  fileName: string;
  fileType: TaskFileType;

  taskGroupKey: string;
  pollingFn: (taskId: string, signal?: AbortSignal) => Promise<PollingRes>; // todo-@jamie: 요청 param type도 제네릭 타입 처리하기
  pollingInterval: number; // 1000ms 기본값
  removeFn: (taskId: string) => Promise<CancelRes>; // todo-@jamie: 요청 param type도 제네릭 타입 처리하기

  onCompleted?: (taskId: TaskId, res: PollingRes) => void;
  onRemoved?: (taskId: TaskId, res: CancelRes) => void;
  onFailed?: (taskId: TaskId, res: FailedRes) => void;

  progress?: number;
  status: TaskStatus;
};

export type DisplayTask = Pick<
  Task,
  'taskId' | 'fileName' | 'fileType' | 'progress' | 'status' | 'taskGroupKey' | 'removeFn' | 'onRemoved'
>;

export type DownloadPanelProps = {
  displayQueue: Task[];
};
