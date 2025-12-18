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
  FileUploaderError,
  Item,
  LabelType,
  PlaceholderProps,
  Progress,
  UseFileUploaderOptions,
  UseFileUploaderReturn,
} from './@types';
import { checkIsImage, getExtensionFromFileName, setDropData } from './@utils';

type BaseProps = {
  isReadonly?: boolean;
  isDisabled?: boolean;
  height?: string;
  label?: LabelType;
  column?: number;
  placeholder?: Partial<PlaceholderProps>;
};

type SingleProps<T extends FileData = FileData> = BaseProps & UseFileUploaderReturn<false, T>;
type MultipleProps<T extends FileData = FileData> = BaseProps & UseFileUploaderReturn<true, T>;
type Props<T extends FileData = FileData> = SingleProps<T> | MultipleProps<T>;

export const FileUploader = <T extends FileData = FileData>(props: Props<T>) => {
  const {
    isDisabled,
    isReadonly,
    label,
    column,
    height,
    dropzoneHandlers,
    isUploading,
    store,
    value,
    remove,
    add,
    placeholder,
  } = props;

  const progress = useFileUploadState(store, 'progress');

  const isMultiple = Array.isArray(value);
  const items: Item<T>[] = isMultiple ? value : value ? [value] : [];
  const placeholderProps = { ...placeholder, onAdd: placeholder?.onAdd || add } as PlaceholderProps;

  return (
    <Dropzone label={label} isDisabled={isDisabled} isReadonly={isReadonly} height={height} {...dropzoneHandlers}>
      {isUploading ? (
        <Loading progress={progress} />
      ) : items.length ? (
        <Grid column={column ?? Math.min(DEFAULT_COLUMN, items.length)}>
          {items.map(({ data }, index) => (
            <GridImage
              key={data.url || data.fileName || index}
              data={data}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              onDelete={() => remove(index)}
            />
          ))}
        </Grid>
      ) : (
        <Placeholder {...placeholderProps} />
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
