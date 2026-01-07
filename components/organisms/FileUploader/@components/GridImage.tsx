import { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSImage, MDSImageProps } from '../../../atoms/Image';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { FileData, GridItemProps, Item } from '../@types';
import { checkIsImage } from '../@utils';
import { GridFile } from './GridFile';

const Styled = {
  Actions: styled.div`
    width: 100%;
    height: 100%;
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  `,
};

type Props<T extends FileData = FileData> = GridItemProps<T> & Item<T> & Omit<MDSImageProps, 'src' | 'custom'>;

export const GridImage = <T extends FileData = FileData>(props: Props<T>) => {
  const { isReadonly, isDisabled, data, action, controller, index, ...restProps } = props;

  const canDelete = controller && index !== undefined;
  const isActive = !isReadonly && !isDisabled && !!(action || canDelete);
  const isImage = checkIsImage(data);
  const src = useMemo(() => (data.file ? URL.createObjectURL(data.file) : data.url), [data.file, data.url]);

  useEffect(() => {
    return () => URL.revokeObjectURL(src);
  }, [src]);

  if (!isImage) {
    return <GridFile {...props} fileName={data.fileName} />;
  }

  return (
    <MDSImage
      {...restProps}
      errorFallback="icon"
      width="100%"
      maxHeight="100%"
      aspectRatio="1"
      objectFit="contain"
      src={src}
      custom={
        isActive
          ? {
              type: 'hover',
              element: (
                <Styled.Actions>
                  {action}
                  {canDelete && (
                    <MDSPlainButton
                      size="large"
                      color="white"
                      icon={<MDSIcon.CloseDelete variant="fill" />}
                      onClick={() => controller.actions.remove(index)}
                    />
                  )}
                </Styled.Actions>
              ),
            }
          : undefined
      }
    />
  );
};

GridImage.displayName = 'MDSFileUploader.GridImage';
