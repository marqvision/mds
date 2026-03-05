import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MDSTypography } from '../../atoms/Typography';
import { MDSIcon } from '../../atoms/Icon';
import { MDSPlainButton } from '../PlainButton';
import { ImageGallery } from './@components/ImageGallery';
import { MessageBoxStyleProps, MessageBoxProps } from './@types';
import { resolveMessageBoxBackgroundColor } from './@utils';
import { ButtonSizes, IconSizes, MessageBoxContentColor, TypographySizes } from './@constants';

export const MessageBox = (props: MessageBoxProps) => {
  const {
    title,
    width,
    images,
    message,
    titleCTA,
    titleIcon,
    messageCTA,
    actionButton,
    color = 'bluegray',
    size = 'default',
    closeControl,
    ...restProps
  } = props;

  if (closeControl?.isVisible === false) return null;

  const mainColor = MessageBoxContentColor[color].mainColor;
  const hasTitle = Boolean(title);
  const hasMessage = Boolean(message);

  const iconConfig = IconSizes[size];
  const typographyConfig = TypographySizes[size];
  const buttonConfig = ButtonSizes[size];

  return (
    <StyledMessageBox width={width} color={color} size={size} {...restProps}>
      <MessageBoxContentWrapper>
        {images && <ImageGallery size={size} images={images} />}
        <MessageBoxTextContainer>
          {hasTitle && (
            <MessageBoxTitleContainer>
              <TitleRow>
                <TitleIconWrapper>
                  {titleIcon ?? <MDSIcon.Info size={iconConfig.info} variant="border" color={mainColor} />}
                </TitleIconWrapper>
                {React.isValidElement(title) ? (
                  title
                ) : (
                  <MDSTypography
                    variant="body"
                    size={typographyConfig.title.fontSize}
                    weight="medium"
                    color={mainColor}
                    lineClamp={1}
                    wordBreak="break-all"
                  >
                    {title}
                  </MDSTypography>
                )}
              </TitleRow>

              {titleCTA &&
                (React.isValidElement(titleCTA) ? (
                  titleCTA
                ) : (
                  <MessageBoxShrinkWrap>
                    <MDSPlainButton
                      size={buttonConfig.titleCTA}
                      onClick={(titleCTA as { label: string; onClick: () => void }).onClick}
                      color="blue"
                    >
                      {(titleCTA as { label: string; onClick: () => void }).label}
                    </MDSPlainButton>
                  </MessageBoxShrinkWrap>
                ))}
            </MessageBoxTitleContainer>
          )}

          {hasMessage && (
            <MessageBoxMessageContainer>
              <MDSTypography
                variant="body"
                size={typographyConfig.message.fontSize}
                lineClamp={1}
                wordBreak="break-all"
              >
                {message}
              </MDSTypography>

              {messageCTA &&
                (React.isValidElement(messageCTA) ? (
                  messageCTA
                ) : (
                  <MessageBoxShrinkWrap>
                    <MDSPlainButton
                      size={buttonConfig.messageCTA}
                      onClick={(messageCTA as { label: string; onClick: () => void }).onClick}
                    >
                      {(messageCTA as { label: string; onClick: () => void }).label}
                    </MDSPlainButton>
                  </MessageBoxShrinkWrap>
                ))}
            </MessageBoxMessageContainer>
          )}
        </MessageBoxTextContainer>
      </MessageBoxContentWrapper>

      <MessageBoxActionsContainer>
        {actionButton &&
          (React.isValidElement(actionButton.label) ? (
            actionButton.label
          ) : (
            <MDSPlainButton size={buttonConfig.action} {...actionButton}>
              {actionButton.label}
            </MDSPlainButton>
          ))}
        {closeControl?.showButton && (
          <MDSPlainButton onClick={closeControl.onClose}>
            <MDSIcon.CloseDelete variant="border" size={iconConfig.close} />
          </MDSPlainButton>
        )}
      </MessageBoxActionsContainer>
    </StyledMessageBox>
  );
};

const StyledMessageBox = styled.div<MessageBoxStyleProps>`
  ${({ theme, width, color }) => {
    const resolvedColor = color ?? 'bluegray';
    const backgroundColor = resolveMessageBoxBackgroundColor(theme, resolvedColor);
    const defaultWidth = width ? `${width}px` : '100%';

    return css`
      padding: 12px 16px;
      border-radius: ${theme.comp.messageBox.radius};
      background-color: ${backgroundColor};
      display: flex;
      align-items: center;
      gap: 12px;
      width: ${defaultWidth};
      ${resolvedColor === 'white' ? `border: 1px solid ${theme.color.border.neutral.default.normal};` : ''}
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
