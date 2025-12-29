import React, { useState } from 'react';
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
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '2. Components/organisms/FileUploader',
  parameters: {
    layout: 'center',
    docs: {
      description: {
        component: `
파일 업로드를 위한 컴포넌트입니다.

**기본 사용법**
\`\`\`tsx
const fileUploader = useMDSFileUploader();
return <MDSFileUploader {...fileUploader} />;
\`\`\`

**주요 옵션 (useMDSFileUploader)**
- \`accept\`: 허용할 파일 타입 ('image', 'jpg', ['png', 'gif'])
- \`limit\`: 최대 파일 개수 (1이면 단일 파일 모드)
- \`maxFileSize\`: 최대 파일 크기 (bytes)
- \`onError\`: 에러 발생 시 콜백
- \`onChange\`: 파일 변경 시 콜백

**반환값**
- \`value\`: 파일 목록 (또는 단일 파일)
- \`add\`: 파일 선택창 열기
- \`remove(index)\`: 파일 삭제
- \`dropzoneHandlers\`: Dropzone에 전달할 이벤트
- \`store\`: useMDSFileUploadState에서 사용
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
    const fileUploaderProps = useMDSFileUploader(props);

    return (
      <Wrapper>
        <MDSFileUploader isDisabled={props.isDisabled} {...fileUploaderProps} />
        <br />
        <MDSFileUploader
          label="Images"
          isDisabled={props.isDisabled}
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
          {...fileUploaderProps}
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
    const fileUploader = useMDSFileUploader({
      limit: 1,
    });
    return (
      <Wrapper>
        <MDSFileUploader {...fileUploader} />
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
    const fileUploader = useMDSFileUploader({
      accept: 'image',
    });
    return (
      <Wrapper>
        <MDSFileUploader placeholder={{ description: '이미지 파일만 허용됩니다' }} {...fileUploader} />
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
    const fileUploader = useMDSFileUploader({
      maxFileSize: 1024 * 1024, // 1MB
    });
    return (
      <Wrapper>
        <MDSFileUploader placeholder={{ description: '최대 1MB까지 업로드 가능합니다' }} {...fileUploader} />
      </Wrapper>
    );
  },
};

export const ErrorList: StoryObj<UseMDSFileUploaderOptions> = {
  parameters: {
    docs: {
      description: {
        story: `에러 상태를 스낵바 없이 리스트로 표시하는 예시입니다.

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

    const { isUploading, add, value, remove, store, reset } = useMDSFileUploader({
      ...props,
      getPresignedUrl,
    });
    const errors = useMDSFileUploadState(store, 'errors');

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
            onClick={add}
          >
            Upload
          </MDSButton>
          {(errors.length > 0 || value.length > 0) && (
            <MDSPlainButton startIcon={<MDSIcon.Reset />} onClick={() => reset()}>
              Reset
            </MDSPlainButton>
          )}
          {value.map((_, index) => (
            <ButtonItem key={index} index={index} store={store} remove={remove} />
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
    const { isUploading, store, add } = useMDSFileUploader();

    const progress = useMDSFileUploadState(store, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props}>
          {isUploading ? <MDSFileUploader.Loading progress={progress} /> : <MDSFileUploader.Placeholder onAdd={add} />}
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
    const fileUploader = useMDSFileUploader({
      defaultValue: [...Array(3)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });

    return (
      <Wrapper>
        <MDSFileUploader {...props} {...fileUploader} />
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
    const { isUploading, store, value, length, add, dropzoneHandlers, remove } = useMDSFileUploader({
      defaultValue: [...Array(3)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });
    const progress = useMDSFileUploadState(store, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props} {...dropzoneHandlers}>
          {isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : !length ? (
            <MDSFileUploader.Placeholder onAdd={add} />
          ) : (
            <MDSFileUploader.Grid column={length}>
              {value.map(({ data }, index) => (
                <MDSFileUploader.GridImage key={index} onDelete={() => remove(index)} data={data} />
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
    const { isUploading, store, value, length, add, dropzoneHandlers, remove } = useMDSFileUploader({
      defaultValue: [...Array(32)].map(() => ({
        data: { file: dummyFile, url: '', fileName: '' },
      })),
    });
    const progress = useMDSFileUploadState(store, 'progress');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...props} height="400px" {...dropzoneHandlers}>
          {isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : !length ? (
            <MDSFileUploader.Placeholder onAdd={add} />
          ) : (
            <MDSFileUploader.ScrollWrapper stickyElement={<MDSFileUploader.Placeholder icon={false} onAdd={add} />}>
              <MDSFileUploader.Grid column={5}>
                {value.map(({ data }, index) => (
                  <MDSFileUploader.GridImage key={`image-${index}`} data={data} onDelete={() => remove(index)} />
                ))}
              </MDSFileUploader.Grid>
              <MDSFileUploader.Placeholder onAdd={add} />
            </MDSFileUploader.ScrollWrapper>
          )}
        </MDSFileUploader.Dropzone>
      </Wrapper>
    );
  },
};

const ButtonItem = ({
  store,
  remove,
  index,
}: {
  store: UseMDSFileUploaderReturn['store'];
  remove: (index: number) => void;
  index: number;
}) => {
  const item = useMDSFileUploadState(store, `value.${index}`);

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
          onClick={() => remove(index)}
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
        story:
          'Dropzone과 파일 목록을 분리한 레이아웃입니다. useMDSFileUploadState로 개별 아이템 상태를 구독하여 불필요한 리렌더링을 방지합니다.',
      },
    },
  },
  args: {
    defaultValue: [...Array(32)].map((_, index) => ({
      data: { file: dummyFile, url: '', fileName: `파일명_수정_완성_파이널_이게진짜_${index}.png` },
    })),
  },
  render: function Render(props) {
    const { store, value, add, remove, dropzoneHandlers } = useMDSFileUploader(props);

    const progress = useMDSFileUploadState(store, 'progress');
    const errors = useMDSFileUploadState(store, 'errors');

    return (
      <Wrapper>
        <MDSFileUploader.Dropzone {...dropzoneHandlers}>
          {progress.isUploading ? (
            <MDSFileUploader.Loading progress={progress} />
          ) : (
            <MDSFileUploader.Placeholder onAdd={add} errorMessage={errors.map((e) => e.message).join('\n')} />
          )}
        </MDSFileUploader.Dropzone>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {value.map((_, index) => (
            <ButtonItem key={index} store={store} remove={remove} index={index} />
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
        story: 'Dropzone 없이 버튼으로만 파일을 선택하는 예시입니다. add() 함수를 직접 호출합니다.',
      },
    },
  },
  render: function Render(props) {
    const { isUploading, add, value, remove, store } = useMDSFileUploader(props);

    return (
      <Wrapper>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <MDSButton
            variant="border"
            startIcon={<MDSIcon.Upload />}
            isLoading={isUploading}
            isDisabled={props.isDisabled}
            onClick={add}
          >
            Upload
          </MDSButton>
          {value.map((_, index) => (
            <ButtonItem key={index} index={index} store={store} remove={remove} />
          ))}
        </div>
      </Wrapper>
    );
  },
};
