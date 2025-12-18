import React from 'react';
import {
  MDSButton,
  MDSFileUploader,
  MDSIcon,
  MDSPlainButton,
  MDSSnackbar,
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
  },
  tags: ['autodocs'],
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
  args: {
    isDisabled: false,
    onError: (error) => {
      MDSSnackbar({ type: 'error', title: error.message.en });
    },
  },
  render: function Render(props) {
    const fileUploaderProps = useMDSFileUploader(props);

    return (
      <Wrapper>
        <MDSFileUploader isDisabled={props.isDisabled} {...fileUploaderProps} />
        <br/>
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

export const WithLabel: StoryObj<typeof MDSFileUploader.Dropzone> = {
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
      color="bluegray"
      isLoading={item.progress?.isUploading}
      startIcon={<ExtensionIcon fileName={item.data.fileName} />}
      endIcon={
        <MDSPlainButton
          size="small"
          color="bluegray"
          icon={<MDSIcon.CloseDelete variant="border" />}
          onClick={() => remove(index)}
        />
      }
    >
      {item.data.fileName}
    </MDSButton>
  );
};

export const ButtonList: StoryObj<UseMDSFileUploaderOptions> = {
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
            <MDSFileUploader.Placeholder onAdd={add} errorMessage={errors?.message.en} />
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
