import React from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { FileData, GridItemProps } from '../@types';
import { ExtensionIcon } from './ExtensionIcon';

const Styled = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    max-height: 100%;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.border.neutral.weak.normal};
    overflow: hidden;

    &:hover .actions {
      opacity: 1;
    }
  `,
  Icon: styled.div`
    color: ${({ theme }) => theme.color.content.neutral.tertiary.normal};
  `,
  Actions: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: ${({ theme }) => theme._raw_color.blackAlpha50};
    transition: opacity 0.3s;
    opacity: 0;
    user-select: none;
    @starting-style {
      opacity: 0;
    }
  `,
};

type Props<T extends FileData = FileData> = GridItemProps<T> & {
  icon?: React.ReactNode;
  fileName: string;
  description?: React.ReactNode;
};

export const GridFile = <T extends FileData = FileData>(props: Props<T>) => {
  const { icon, fileName, description, isReadonly, isDisabled, action, controller, index } = props;

  const canDelete = controller && index !== undefined;
  const isActive = !isReadonly && !isDisabled && !!(action || canDelete);

  return (
    <Styled.Wrapper>
      <Styled.Icon>{icon || <ExtensionIcon fileName={fileName} />}</Styled.Icon>
      <MDSTypography wordBreak="break-all">{fileName}</MDSTypography>
      {description}
      {isActive && (
        <Styled.Actions className="actions">
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
      )}
    </Styled.Wrapper>
  );
};

GridFile.displayName = 'MDSFileUploader.GridFile';
