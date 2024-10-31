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
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      {(label.main || label.sub) && (
        <div>
          <MDSTypography variant={variant} weight="medium" color={color}>
            {label.main}{' '}
            {label.sub && (
              <MDSTypography as="span" variant={variant} color={subColor}>
                ({label.sub})
              </MDSTypography>
            )}
          </MDSTypography>
        </div>
      )}
      {label.right}
    </div>
  );
};
