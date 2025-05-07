import styled from '@emotion/styled';
import { InputStatus, Size } from '../@types';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';

type Props = {
  label?: string;
  size: Size;
  status?: InputStatus;
};

const GUIDE_SIZE = {
  small: {
    typographySize: 'xs',
    iconSize: 16,
    iconPadding: '1px',
    gap: '4px',
  },
  medium: {
    typographySize: 'xs',
    iconSize: 16,
    iconPadding: '1px',
    gap: '4px',
  },
  large: {
    typographySize: 'm',
    iconSize: 18,
    iconPadding: '1.5px',
    gap: '6px',
  },
} as const;

const StyledWrap = styled.div<{ customSize: Size }>`
  display: flex;
  align-items: flex-start;
  padding-left: 4px;
  gap: ${({ customSize }) => GUIDE_SIZE[customSize].gap};
  & svg {
    transform: ${({ customSize }) => `translateY(${GUIDE_SIZE[customSize].iconPadding})`};
    flex: ${({ customSize }) => `0 0 ${GUIDE_SIZE[customSize].iconSize}px`};
  }
`;

export const Guide = (props: Props) => {
  const { label, size, status } = props;

  const Icon = (() => {
    if (status === 'error') {
      return (
        <MDSIcon.ErrorWarning
          variant="fill"
          size={GUIDE_SIZE[size].iconSize}
          color="color/content/critical/default/normal"
        />
      );
    } else if (status === 'success') {
      return (
        <MDSIcon.Check variant="fill" size={GUIDE_SIZE[size].iconSize} color="color/content/success/default/normal" />
      );
    }
    return <MDSIcon.Info variant="border" size={GUIDE_SIZE[size].iconSize} />;
  })();

  const fontColor =
    status === 'error'
      ? 'color/content/critical/default/normal'
      : status === 'success'
      ? 'color/content/success/default/normal'
      : undefined;

  return (
    <StyledWrap customSize={size}>
      {Icon}
      <MDSTypography variant="body" size={GUIDE_SIZE[size].typographySize} weight="medium" color={fontColor}>
        {label}
      </MDSTypography>
    </StyledWrap>
  );
};
