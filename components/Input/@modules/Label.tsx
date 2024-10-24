import { LabelType, Size } from '../@types';
import { Features, MDSTypography } from '../../Typography';
import { theme } from '../@constants';

type Props = {
  label: LabelType;
  size: Size;
  isDisabled?: boolean;
};

export const Label = (props: Props) => {
  const { label, size, isDisabled } = props;

  const variant = `T${theme.size[size].fontSize.replace('px', '')}` as Features['variant'];

  const color = isDisabled ? 'color/content/neutral/default/disabled' : undefined;
  const subColor = isDisabled ? 'color/content/neutral/secondary/disabled' : 'color/content/neutral/secondary/normal';

  return typeof label === 'string' ? (
    <MDSTypography variant={variant} weight="medium" color={color}>
      {label}
    </MDSTypography>
  ) : (
    <div style={{ display: 'flex', gap: '4px' }}>
      <MDSTypography variant={variant} weight="medium" color={color}>
        {label.main}
      </MDSTypography>
      {label.sub && (
        <MDSTypography variant={variant} color={subColor}>
          ({label.sub})
        </MDSTypography>
      )}
    </div>
  );
};
