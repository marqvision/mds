import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MDSTypography } from '../../atoms/Typography';
import { MDSIcon } from '../../atoms/Icon';
import { MDSPlainButton } from '../PlainButton';
import { ImageGallery } from './@components/ImageGallery';
import { MessageBoxStyleProps, MessageBoxProps } from './@types';
import { resolveMessageBoxBackgroundColor } from './@utils';
import { MessageBoxContentColor } from './@constants';

export const MessageBox = (props: MessageBoxProps) => {
  const {
    title,
    width,
    images,
    message,
    titleCTA,
    messageCTA,
    actionButton,
    type = 'default',
    closeControl,
    ...restProps
  } = props;

  if (closeControl?.isVisible === false) return null;

  const mainColor = MessageBoxContentColor[type].mainColor;

  return (
    <StyledMessageBox width={width} type={type} {...restProps}>
      <MessageBoxContentWrapper>
        {images && <ImageGallery images={images} />}
        <MessageBoxTextContainer>
          <MessageBoxTitleContainer>
            <TitleRow>
              <TitleIconWrapper>
                <MDSIcon.Info size={20} variant="border" color={mainColor} />
              </TitleIconWrapper>
              <MDSTypography variant="title" weight="medium" color={mainColor} lineClamp={1} wordBreak="break-all">
                {title} MDSTypography
              </MDSTypography>
            </TitleRow>
            {titleCTA &&
              (typeof titleCTA.label === 'string' ? (
                <MessageBoxShrinkWrap>
                  <MDSPlainButton onClick={titleCTA.event} color="blue">
                    {titleCTA.label}
                  </MDSPlainButton>
                </MessageBoxShrinkWrap>
              ) : (
                titleCTA.label
              ))}
          </MessageBoxTitleContainer>

          <MessageBoxMessageContainer>
            {message && (
              <MDSTypography variant="body" lineClamp={1} wordBreak="break-all">
                {message}
              </MDSTypography>
            )}

            {messageCTA &&
              (typeof messageCTA.label === 'string' ? (
                <MessageBoxShrinkWrap>
                  <MDSPlainButton onClick={messageCTA.event}>{messageCTA.label}</MDSPlainButton>
                </MessageBoxShrinkWrap>
              ) : (
                messageCTA.label
              ))}
          </MessageBoxMessageContainer>
        </MessageBoxTextContainer>
      </MessageBoxContentWrapper>

      <MessageBoxActionsContainer>
        {actionButton && (
          <MDSPlainButton size="large" color="blue" onClick={actionButton.event}>
            {actionButton.text}
          </MDSPlainButton>
        )}
        {closeControl?.showButton && (
          <MDSPlainButton onClick={closeControl.onClose}>
            <MDSIcon.CloseDelete variant="border" size={20} />
          </MDSPlainButton>
        )}
      </MessageBoxActionsContainer>
    </StyledMessageBox>
  );
};

const StyledMessageBox = styled.div<MessageBoxStyleProps>`
  ${({ theme, width, type }) => {
    const resolvedType = type ?? 'default';
    const backgroundColor = resolveMessageBoxBackgroundColor(theme, resolvedType);
    const defaultWidth = width ? `${width}px` : '100%';

    return css`
      padding: 12px 16px;
      border-radius: 8px;
      background-color: ${backgroundColor};
      display: flex;
      align-items: center;
      gap: 12px;
      width: ${defaultWidth};
      ${resolvedType === 'neutral' ? `border: 1px solid ${theme.color.border.neutral.default.normal};` : ''}
    `;
  }}
`;

const MessageBoxContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 100%;
  flex: 1;
`;

const MessageBoxTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const MessageBoxTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const MessageBoxMessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const MessageBoxActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MessageBoxShrinkWrap = styled.div`
  flex-shrink: 0;
`;

export const MDSMessageBox = MessageBox;
