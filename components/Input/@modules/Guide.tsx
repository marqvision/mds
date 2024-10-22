import { Size } from '../@types';
import { MDSIcon } from '../../Icon';
import { MDSTypography } from '../../Typography';

type Props = {
  label?: string;
  size: Size;
  isError?: boolean;
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

export const Guide = (props: Props) => {
  const { label, size, isError } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: GUIDE_SIZE[size].gap, padding: '0 4px' }}>
      {isError ? (
        <MDSIcon.ErrorWarning
          variant="fill"
          size={GUIDE_SIZE[size].iconSize}
          color="color/content/critical/default/normal"
        />
      ) : (
        <MDSIcon.Info variant="border" size={GUIDE_SIZE[size].iconSize} />
      )}
      <MDSTypography
        variant={GUIDE_SIZE[size].fontSize}
        weight="medium"
        color={isError ? 'color/content/critical/default/normal' : undefined}
      >
        {label}
      </MDSTypography>
    </div>
  );
};
