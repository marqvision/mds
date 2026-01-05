import { isValidElement } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { DEFAULT_DISPLAY_MESSAGE } from '../@constants';
import { FileData, PlaceholderProps } from '../@types';

const Styled = {
  Wrapper: styled.div`
    padding: 8px;
    display: grid;
    place-items: center;
    place-content: center;
    gap: 8px;
    text-align: center;
  `,
  Text: styled.div`
    display: grid;
    place-items: center;
    place-content: center;
    gap: 4px;
  `,
  Title: styled(MDSTypography)`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
};

type Props<T extends FileData = FileData> = {
  isReadonly?: boolean;
  isDisabled?: boolean;
} & PlaceholderProps<T>;

export const Placeholder = <T extends FileData = FileData>(props: Props<T>) => {
  const { icon, language = 'en', controller, title, description, errorMessage, isReadonly, isDisabled } = props;

  const isIconVisible = icon !== false;

  if (isDisabled) {
    return (
      <Styled.Wrapper>
        {isIconVisible && (icon || <MDSIcon.Minus variant="fill" color="color/content/neutral/default/disabled" />)}
        <Styled.Text>
          <MDSTypography as={isValidElement(title) ? 'div' : undefined} color="color/content/neutral/secondary/normal">
            {title || DEFAULT_DISPLAY_MESSAGE[language].disabled}
          </MDSTypography>
          {description && (
            <MDSTypography
              as={isValidElement(title) ? 'div' : undefined}
              size="xs"
              color="color/content/neutral/secondary/normal"
            >
              {description}
            </MDSTypography>
          )}
        </Styled.Text>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      {isIconVisible && (icon || <MDSIcon.Upload color="color/content/primary/default/normal" />)}
      <Styled.Text>
        <Styled.Title as={isValidElement(title) || !title ? 'div' : undefined}>
          {title || DEFAULT_DISPLAY_MESSAGE[language].dragAndDrop}
          {!title && (
            <MDSPlainButton isDisabled={isReadonly} onClick={() => controller?.actions.open()}>
              {DEFAULT_DISPLAY_MESSAGE[language].browse}
            </MDSPlainButton>
          )}
        </Styled.Title>
        {description && (
          <MDSTypography
            as={isValidElement(title) ? 'div' : undefined}
            size="xs"
            color="color/content/neutral/secondary/normal"
          >
            {description}
          </MDSTypography>
        )}
      </Styled.Text>
      {errorMessage && (
        <MDSTypography
          as={isValidElement(title) ? 'div' : undefined}
          weight="medium"
          color="color/content/critical/default/normal"
        >
          {errorMessage}
        </MDSTypography>
      )}
    </Styled.Wrapper>
  );
};

Placeholder.displayName = 'MDSFileUploader.Placeholder';
