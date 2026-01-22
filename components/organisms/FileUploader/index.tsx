import { Dropzone } from './@components/Dropzone';
import { Grid } from './@components/Grid';
import { GridFile } from './@components/GridFile';
import { GridImage } from './@components/GridImage';
import { Loading } from './@components/Loading';
import { Placeholder } from './@components/Placeholder';
import { ScrollWrapper } from './@components/ScrollWrapper';
import { DEFAULT_COLUMN } from './@constants';
import { useFileUploader } from './@hooks/useFileUploader';
import { useFileUploadState } from './@hooks/useFileUploadState';
import {
  FileData,
  FileUploaderController,
  FileUploaderError,
  Item,
  LabelType,
  PlaceholderProps,
  Progress,
  UseFileUploaderOptions,
  UseFileUploaderReturn,
} from './@types';
import { checkIsImage, getExtensionFromFileName, setDropData, toastMDSSnackbarError } from './@utils';

type Props<T extends FileData = FileData> = {
  isReadonly?: boolean;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  label?: LabelType;
  column?: number;
  placeholder?: Partial<PlaceholderProps>;
  controller: FileUploaderController<boolean, T>;
};

export const FileUploader = <T extends FileData = FileData>(props: Props<T>) => {
  const { isReadonly, label, column, height, minHeight, maxHeight, controller, placeholder } = props;

  const { options } = controller;
  const { isDisabled } = options;

  const value = useFileUploadState(controller, 'value');
  const progress = useFileUploadState(controller, 'progress');

  return (
    <Dropzone
      controller={controller}
      label={label}
      isReadonly={isReadonly}
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
    >
      {progress.isUploading ? (
        <Loading progress={progress} />
      ) : value.length ? (
        <Grid column={column ?? Math.min(DEFAULT_COLUMN, value.length)}>
          {value.map(({ data }, index) => (
            <GridImage
              key={data.url || data.fileName || index}
              data={data}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              controller={controller}
              index={index}
            />
          ))}
        </Grid>
      ) : (
        <Placeholder {...placeholder} controller={controller} />
      )}
    </Dropzone>
  );
};

FileUploader.displayName = 'MDSFileUploader';
FileUploader.Dropzone = Dropzone;
FileUploader.Placeholder = Placeholder;
FileUploader.ScrollWrapper = ScrollWrapper;
FileUploader.Grid = Grid;
FileUploader.GridImage = GridImage;
FileUploader.GridFile = GridFile;
FileUploader.Loading = Loading;

const utils = {
  setDropData,
  checkIsImage,
  getExtensionFromFileName,
  toastMDSSnackbarError,
};

export const MDSFileUploader = FileUploader;
export const useMDSFileUploader = useFileUploader;
export const useMDSFileUploadState = useFileUploadState;
export const MDSFileUploaderUtils = utils;

export type MDSFileUploaderError = FileUploaderError;
export type MDSFileUploaderProgress = Progress;
export type UseMDSFileUploaderOptions = UseFileUploaderOptions;
export type UseMDSFileUploaderReturn = UseFileUploaderReturn;
export type MDSFileItem<T = unknown> = Item<T & FileData>;
