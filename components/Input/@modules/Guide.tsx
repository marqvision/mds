import { InputStatus, Size } from '../@types';
import { MDSIcon } from '../../Icon';
import { MDSTypography } from '../../Typography';
import styled from '@emotion/styled';

type Props = {
  label?: string;
  size: Size;
  status?: InputStatus;
};

const GUIDE_SIZE = {
  small: {
    fontSize: 'T12',
    iconSize: 16,
    gap: '4px',
  },
  medium: {
    fontSize: 'T12',
    iconSize: 16,
    gap: '4px',
  },
  large: {
    fontSize: 'T14',
    iconSize: 16,
    gap: '6px',
  },
  'extra-large': {
    fontSize: 'T16',
    iconSize: 20,
    gap: '8px',
  },
} as const;

const StyledWrap = styled.div<{ customSize: Size }>`
  display: flex;
  align-items: center;
  padding: 0 4px;
  gap: ${({ customSize }) => GUIDE_SIZE[customSize].gap};
  & svg {
    transform: translateY(4px);
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
      <MDSTypography variant={GUIDE_SIZE[size].fontSize} weight="medium" color={fontColor}>
        {Icon} {label}
      </MDSTypography>
    </StyledWrap>
  );
};
