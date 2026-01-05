import React, { useEffect, useState } from 'react';
import {
  MDSButton,
  MDSCheckbox,
  MDSFileUploader,
  MDSIcon,
  MDSMessageBox,
  MDSPlainButton,
  MDSSnackbarContainer,
  useMDSFileUploader,
  UseMDSFileUploaderOptions,
  UseMDSFileUploaderReturn,
  useMDSFileUploadState,
} from '../../../../components';
import { ExtensionIcon } from '../../../../components/organisms/FileUploader/@components/ExtensionIcon';
import { applyMockXHR, createMockGetPresignedUrl, disposeMockXHR } from './mock';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '2. Components/organisms/FileUploader',
  parameters: {
    layout: 'center',
    docs: {
      description: {
        component: `
파일 업로드를 위한 컴포넌트입니다.

\`\`\`tsx
const { controller } = useMDSFileUploader();
return <MDSFileUploader controller={controller} />;
\`\`\`

***

## useMDSFileUploader

파일 업로드를 위한 상태와 액션을 제공하는 훅입니다.

**옵션**
| 옵션 | 타입 | 설명 |
|:-|:-|:-|
| \`accept\` | FileType | 허용할 파일 타입 ('image', 'jpg', ['png', 'gif']) |
| \`limit\` | number | 최대 파일 개수 (1이면 단일 파일 모드) |
| \`maxFileSize\` | number | 최대 파일 크기 (bytes) |
| \`onError\` | function &#124; false | 에러 발생 시 콜백 (false면 스낵바 비활성화) |
| \`onChange\` | function | 파일 변경 시 콜백 |

**반환값**

\`controller\` - 하위 컴포넌트에 전달하는 객체

\`file\` - 파일 관련
| 속성 | 타입 | 설명 |
|:-|:-|:-|
| value | Item[] | 파일 목록 |
| length | number | 아이템 개수 |
| open | function | 파일 선택창 열기 |
| remove | function | 파일 삭제 |
| setValue | function | 아이템 업데이트 |
| reset | function | 전체 리셋 |

\`progress\` - 진행 상태 관련
| 속성 | 타입 | 설명 |
|:-|:-|:-|
| isUploading | boolean | 업로드 중 여부 |
| setProgress | function | progress 설정 |
| clearProgress | function | progress 클리어 |

\`error\` - 에러 관련
| 속성 | 타입 | 설명 |
|:-|:-|:-|
| isError | boolean | 에러 존재 여부 |
| setError | function | error 설정 |
| clearError | function | error 클리어 |

***

## useMDSFileUploadState

controller를 통해 특정 상태만 구독하여 **불필요한 리렌더를 방지**합니다.

**구독 옵션**
| key | 반환값 | 설명 |
|:-|:-|:-|
| \`progress\` | Progress | 업로드 진행상황 (percentage, count) |
| \`errors\` | Error[] | 전체 에러 리스트 |
| \`value\` | Item[] | 전체 파일 리스트 (개별 progress/error 포함) |
| \`value.{index}\` | Item | 특정 인덱스의 파일 정보 |

**사용 시나리오**
- Button 업로드: \`progress.isUploading\`만 사용
- Dropzone 내 상세 progress: \`useMDSFileUploadState(controller, 'progress')\`
- 에러 리스트 표시: \`useMDSFileUploadState(controller, 'errors')\`
- 테이블/Chip 리스트: \`useMDSFileUploadState(controller, 'value')\`
- 대량 파일 최적화: \`useMDSFileUploadState(controller, 'value.{index}')\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <MDSSnackbarContainer />
      </>
    ),
  ],
};

export default meta;
export type Story = StoryObj<UseMDSFileUploaderOptions>;

const base64 =
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVR4nGP8//8/AyWAiSLdtDPANvU/g23qf5x8JMCIEQa2qf8ZdAMg7MsbIDQy//BsRtwGIGvGBdAMGWyBeHg2I9zf2ACWMMB0AS5DsGjGbgA2Q3BoZmDAFo3IABb3ODQTNoAIMNiikQwAAMfSNd0giWwnAAAAAElFTkSuQmCC';
const binary = atob(base64);
const array = new Uint8Array(binary.length);
for (let i = 0; i < binary.length; i++) {
  array[i] = binary.charCodeAt(i);
}
const dummyFile = new File([array], 'test.png', { type: 'image/png' });

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story:
          'useMDSFileUploader와 MDSFileUploader를 조합한 기본 사용법입니다. placeholder, label, column, height 등을 커스터마이징할 수 있습니다.',
      },
    },
  },
  args: {
    isDisabled: false,
  },
  render: function Render(props) {
    const { controller } = useMDSFileUploader(props);

    return (
      <Wrapper>
        <MDSFileUploader controller={controller} />
        <br />
        <MDSFileUploader
          label="Images"
          column={4}
          height="300px"
          placeholder={{
            icon: (
              <MDSIcon.Image
                variant="fill"
                color={
                  props.isDisabled ? 'color/content/primary/default/disabled' : 'color/content/primary/default/normal'
                }
              />
            ),
            title: '파일 업로더',
            description: '파일을 넣어봐용',
          }}
          controller={controller}
        />
      </Wrapper>
    );
  },
};

export const SingleFile: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: 'limit: 1 옵션으로 단일 파일만 허용합니다. 이미 파일이 있으면 추가 선택 시 limit 에러가 발생합니다.',
      },
    },
  },
  render: function Render() {
    const { controller } = useMDSFileUploader({
      limit: 1,
    });
    return (
      <Wrapper>
        <MDSFileUploader controller={controller} />
      </Wrapper>
    );
  },
};

export const AcceptTypes: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story:
          'accept 옵션으로 특정 파일 타입만 허용합니다. `"image"`(카테고리), `"jpg"`(확장자), `["png", "gif"]`(복수) 형태로 지정 가능합니다.',
      },
    },
  },
  render: function Render() {
    const { controller } = useMDSFileUploader({
      accept: 'image',
    });
    return (
      <Wrapper>
        <MDSFileUploader placeholder={{ description: '이미지 파일만 허용됩니다' }} controller={controller} />
      </Wrapper>
    );
  },
};

export const MaxFileSize: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: 'maxFileSize 옵션으로 파일 크기를 제한합니다. 단위는 bytes입니다. (예: 1MB = 1024 * 1024)',
      },
    },
  },
  render: function Render() {
    const { controller } = useMDSFileUploader({
      maxFileSize: 1024 * 1024, // 1MB
    });
    return (
      <Wrapper>
        <MDSFileUploader placeholder={{ description: '최대 1MB까지 업로드 가능합니다' }} controller={controller} />
      </Wrapper>
    );
  },
};

export const ErrorList: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: `\`useMDSFileUploadState(controller, 'errors')\`로 에러를 리스트 형태로 표시합니다.

기본적으로 에러는 MDSSnackbar로 표시되지만, 커스텀 UI가 필요할 때 \`errors\`를 구독하여 별도로 출력할 수 있습니다.
이 예시에서는 \`onError: false\`로 스낵바를 비활성화하고 MessageBox로 에러를 표시합니다.

**에러 테스트 방법:**
- 이미지가 아닌 파일 업로드 → INVALID_FILE_TYPE 에러
- 1MB 초과 파일 업로드 → FILE_SIZE_EXCEEDED 에러
- "Simulate Upload Fail" 토글 ON 상태에서 업로드 → UPLOAD_FAILED 에러`,
      },
    },
  },
  args: {
    accept: 'image',
    maxFileSize: 1024 * 1024,
    onError: false,
  },
  render: function Render(props) {
    const [isSimulateUploadFail, setIsSimulateUploadFail] = useState<boolean>(false);

    // 체크 ON일 때만 getPresignedUrl 제공 (업로드 시도 → 실패)
    const getPresignedUrl = isSimulateUploadFail
      ? async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          throw new Error('Simulated upload failure');
        }
      : undefined;

    const { file, progress, controller } = useMDSFileUploader({
      ...props,
      getPresignedUrl,
    });
    const { value, open, reset } = file;
    const { isUploading } = progress;
    const errors = useMDSFileUploadState(controller, 'errors');

    return (
      <Wrapper>
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>에러 개수: {errors.length}개</span>
          <MDSCheckbox value={isSimulateUploadFail} onChange={setIsSimulateUploadFail} label="Simulate Upload Fail" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <MDSButton
            variant="border"
            startIcon={<MDSIcon.Upload />}
            isLoading={isUploading}
            isDisabled={props.isDisabled}
            onClick={open}
          >
            Upload
          </MDSButton>
          {(errors.length > 0 || value.length > 0) && (
            <MDSPlainButton startIcon={<MDSIcon.Reset />} onClick={() => reset()}>
              Reset
            </MDSPlainButton>
          )}
          {value.map((_, index) => (
            <ButtonItem key={index} index={index} controller={controller} />
          ))}
        </div>
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {errors.map(({ code, files, message }, errorIndex) => (
            <MDSMessageBox
              key={errorIndex}
              size="small"
              color="red"
              title={`[${code}] ${message}`}
              message={files?.map((f) => f.name).join(', ')}
            />
          ))}
        </div>
      </Wrapper>
    );
  },
};

export const UploadProgress: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: `\`useMDSFileUploadState(controller, 'progress')\`로 상세 진행상황을 구독합니다.

Dropzone 내에 progress를 표시할 때 유용합니다.
\`useFileUploader\`의 \`isUploading\`은 boolean만 제공하지만, \`progress\`는 percentage, count(current/total) 정보를 포함합니다.`,
      },
    },
  },
  render: function Render() {
    useEffect(() => {
      applyMockXHR();
      return () => {
        disposeMockXHR();
      };
    }, []);

    const mockGetPresignedUrl = createMockGetPresignedUrl(300);

    const { file, controller } = useMDSFileUploader({
      getPresignedUrl: mockGetPresignedUrl,
    });
    const { value, length } = file;
    const progress = useMDSFileUploadState(controller, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone
          label={{ main: 'Upload Progress Simulation' }}
          height="auto"
          minHeight="200px"
          controller={controller}
        >
          {progress.isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : !length ? (
            <MDSFileUploader.Placeholder controller={controller} />
          ) : (
            <MDSFileUploader.Grid column={4}>
              {value.map(({ data }, index) => (
                <MDSFileUploader.GridImage key={index} controller={controller} index={index} data={data} />
              ))}
            </MDSFileUploader.Grid>
          )}
        </MDSFileUploader.Dropzone>
        <div>
          <p>Progress: {progress.percentage}%</p>
          <p>Uploading: {progress.isUploading ? 'Yes' : 'No'}</p>
          {progress.count && (
            <p>
              Files: {progress.count.current} / {progress.count.total}
            </p>
          )}
        </div>
      </Wrapper>
    );
  },
};

export const WithLabel: StoryObj<typeof MDSFileUploader.Dropzone> = {
  parameters: {
    docs: {
      description: {
        story: 'Dropzone에 라벨을 추가할 수 있습니다. label은 { main, sub, right } 형태로 지정합니다.',
      },
    },
  },
  args: {
    label: {
      main: 'Images',
      sub: (
        <MDSPlainButton startIcon={<MDSIcon.AddPlus variant="fill" />} onClick={() => {}}>
          Add
        </MDSPlainButton>
      ),
    },
  },
  render: function Render(props) {
    const { controller } = useMDSFileUploader();

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props} controller={controller}>
          <MDSFileUploader.Placeholder controller={controller} />
        </MDSFileUploader.Dropzone>
      </Wrapper>
    );
  },
};

export const Placeholder: StoryObj<typeof MDSFileUploader.Placeholder> = {
  parameters: {
    docs: {
      description: {
        story: 'Placeholder 서브 컴포넌트입니다. icon, title, description, errorMessage를 커스터마이징할 수 있습니다.',
      },
    },
  },
  args: {
    icon: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
    title: '파일을 추가해요',
    description: 'csv, xls 만 전송할 수 있어요',
    errorMessage: '무언가 문제가 있어요',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSFileUploader.Placeholder {...props} />
      </Wrapper>
    );
  },
};

export const Loading: StoryObj<typeof MDSFileUploader.Loading> = {
  parameters: {
    docs: {
      description: {
        story:
          'Loading 서브 컴포넌트입니다. progress 객체로 진행 상태를 표시합니다. 단일 파일이면 퍼센트만, 복수 파일이면 개수도 표시됩니다.',
      },
    },
  },
  args: {
    progress: {
      count: { current: 5, total: 10 },
      percentage: 50,
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSFileUploader.Dropzone>
          <MDSFileUploader.Loading {...props} />
        </MDSFileUploader.Dropzone>
        <MDSFileUploader.Dropzone>
          <MDSFileUploader.Loading progress={{ count: { current: 0, total: 1 }, percentage: 50 }} />
        </MDSFileUploader.Dropzone>
      </Wrapper>
    );
  },
};

export const Disabled: StoryObj<typeof MDSFileUploader.Placeholder> = {
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태의 Placeholder입니다. isDisabled prop으로 제어합니다.',
      },
    },
  },
  args: {
    isDisabled: true,
    title: '파일을 추가해요',
    description: 'csv, xls 만 전송할 수 있어요',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSFileUploader.Placeholder {...props} />
      </Wrapper>
    );
  },
};

export const Readonly: StoryObj<typeof MDSFileUploader.Dropzone> = {
  parameters: {
    docs: {
      description: {
        story: 'Readonly 상태의 Placeholder입니다. isReadonly prop으로 제어합니다.',
      },
    },
  },
  args: {
    label: {
      main: 'Images',
      sub: '(Optional)',
    },
    isReadonly: true,
  },
  render: function Render(props) {
    const { controller } = useMDSFileUploader({
      defaultValue: [...Array(3)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });

    return (
      <Wrapper>
        <MDSFileUploader {...props} controller={controller} />
      </Wrapper>
    );
  },
};

export const Grid: StoryObj<typeof MDSFileUploader.Dropzone> = {
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 레이아웃 예시입니다. Dropzone, Grid, GridImage 등 서브 컴포넌트를 조합하여 원하는 UI를 구성할 수 있습니다.',
      },
    },
  },
  args: {
    label: {
      main: 'Images',
      sub: '(Optional)',
    },
    isDisabled: false,
  },
  render: function Render(props) {
    const { file, progress: progressState, controller } = useMDSFileUploader({
      defaultValue: [...Array(3)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });
    const { value, length } = file;
    const { isUploading } = progressState;
    const progress = useMDSFileUploadState(controller, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props} controller={controller}>
          {isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : !length ? (
            <MDSFileUploader.Placeholder controller={controller} />
          ) : (
            <MDSFileUploader.Grid column={length}>
              {value.map(({ data }, index) => (
                <MDSFileUploader.GridImage key={index} controller={controller} index={index} data={data} />
              ))}
            </MDSFileUploader.Grid>
          )}
        </MDSFileUploader.Dropzone>
      </Wrapper>
    );
  },
};

export const ScrollableGrid: StoryObj<typeof MDSFileUploader.Dropzone> = {
  parameters: {
    docs: {
      description: {
        story: 'ScrollWrapper를 사용하면 스크롤 가능한 영역과 하단 sticky 요소를 표시할 수 있습니다.',
      },
    },
  },
  args: {
    label: {
      main: 'Images',
      sub: '(Optional)',
    },
    isDisabled: false,
  },
  render: function Render(props) {
    const { file, progress: progressState, controller } = useMDSFileUploader({
      defaultValue: [...Array(32)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });
    const { value, length } = file;
    const { isUploading } = progressState;
    const progress = useMDSFileUploadState(controller, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props} height="400px" controller={controller}>
          {isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : !length ? (
            <MDSFileUploader.Placeholder controller={controller} />
          ) : (
            <MDSFileUploader.ScrollWrapper stickyElement={<MDSFileUploader.Placeholder icon={false} controller={controller} />}>
              <MDSFileUploader.Grid column={5}>
                {value.map(({ data }, index) => (
                  <MDSFileUploader.GridImage key={`image-${index}`} data={data} controller={controller} index={index} />
                ))}
              </MDSFileUploader.Grid>
              <MDSFileUploader.Placeholder controller={controller} />
            </MDSFileUploader.ScrollWrapper>
          )}
        </MDSFileUploader.Dropzone>
      </Wrapper>
    );
  },
};

const ButtonItem = ({
  controller,
  index,
}: {
  controller: UseMDSFileUploaderReturn['controller'];
  index: number;
}) => {
  const item = useMDSFileUploadState(controller, `value.${index}`);

  if (!item) return null;

  return (
    <MDSButton
      key={index}
      variant="tint"
      color={item.error ? 'red' : 'bluegray'}
      isLoading={item.progress?.isUploading}
      startIcon={<ExtensionIcon fileName={item.data.fileName} />}
      endIcon={
        <MDSPlainButton
          size="small"
          color={item.error ? 'red' : 'bluegray'}
          icon={<MDSIcon.CloseDelete variant="border" />}
          onClick={() => controller.actions.remove(index)}
        />
      }
    >
      {item.data.fileName}
      {item.error && ` : ${item.error.message}`}
    </MDSButton>
  );
};

export const ButtonList: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: `Dropzone과 파일 목록을 분리한 레이아웃입니다.

\`useMDSFileUploadState(controller, 'value.{index}')\`로 개별 아이템만 구독하여 변경이 있는 아이템만 리렌더됩니다.
업로드할 파일이 아주 많은 경우, 개별 아이템의 progress를 분리해서 구독하여 성능을 최적화할 수 있습니다.

\`useFileUploader\`의 \`value\`는 length 변경 시에만 리렌더되므로, 테이블이나 Chip 리스트처럼 개별 아이템의 progress가 필요한 경우 \`useMDSFileUploadState\`를 사용합니다.`,
      },
    },
  },
  args: {
    defaultValue: [...Array(32)].map((_, index) => ({
      data: { file: dummyFile, url: '', fileName: `파일명_수정_완성_파이널_이게진짜_${index}.png` },
    })),
  },
  render: function Render(props) {
    const { file, controller } = useMDSFileUploader(props);
    const { value } = file;

    const progress = useMDSFileUploadState(controller, 'progress');
    const errors = useMDSFileUploadState(controller, 'errors');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone controller={controller}>
          {progress.isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : (
            <MDSFileUploader.Placeholder
              controller={controller}
              errorMessage={errors.map((e) => e.message).join('\n')}
            />
          )}
        </MDSFileUploader.Dropzone>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {value.map((_, index) => (
            <ButtonItem key={index} controller={controller} index={index} />
          ))}
        </div>
      </Wrapper>
    );
  },
};

export const ButtonUpload: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: `Dropzone 없이 버튼으로만 파일을 선택하는 예시입니다.

단순한 Button 업로드의 경우 상세 progress가 불필요하므로, \`progress.isUploading\`만 사용하면 됩니다.
\`useMDSFileUploadState\`를 사용하지 않아도 기본적인 업로드 기능을 구현할 수 있습니다.`,
      },
    },
  },
  render: function Render(props) {
    const { file, progress, controller } = useMDSFileUploader(props);
    const { value, open } = file;
    const { isUploading } = progress;

    return (
      <Wrapper>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <MDSButton
            variant="border"
            startIcon={<MDSIcon.Upload />}
            isLoading={isUploading}
            isDisabled={props.isDisabled}
            onClick={open}
          >
            Upload
          </MDSButton>
          {value.map((_, index) => (
            <ButtonItem key={index} index={index} controller={controller} />
          ))}
        </div>
      </Wrapper>
    );
  },
};
