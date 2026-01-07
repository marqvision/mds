import { isValidElement } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../../atoms/Typography';
import { LabelType } from '../@types';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  Right: styled.div`
    margin-left: auto;
  `,
};

type Props = {
  isDisabled?: boolean;
  label: LabelType;
};

export const Label = (props: Props) => {
  const { label, isDisabled } = props;

  const color = isDisabled ? 'color/content/neutral/default/disabled' : undefined;
  const subColor = isDisabled ? 'color/content/neutral/secondary/disabled' : 'color/content/neutral/secondary/normal';

  if (typeof label === 'string') {
    return (
      <MDSTypography weight="medium" color={color}>
        {label}
      </MDSTypography>
    );
  }

  return (
    <Styled.Wrapper>
      {label.main && (
        <MDSTypography weight="medium" color={color}>
          {label.main}
        </MDSTypography>
      )}
      {isValidElement(label.sub)
        ? label.sub
        : label.sub && (
            <MDSTypography size="s" color={subColor}>
              {label.sub}
            </MDSTypography>
          )}
      {label.right && <Styled.Right>{label.right}</Styled.Right>}
    </Styled.Wrapper>
  );
};
