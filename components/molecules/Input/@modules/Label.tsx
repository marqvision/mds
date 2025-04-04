import { LabelType, Size } from '../@types';
import { MDSTypography2 } from '../../../atoms/Typography2';
import { theme } from '../@constants';
import { getTypographyProps } from '../../../atoms/Typography2/@utils';

type Props = {
  label: LabelType;
  size: Size;
  isDisabled?: boolean;
};

export const Label = (props: Props) => {
  const { label, size, isDisabled } = props;

  const variant = getTypographyProps(parseInt(theme.size[size].fontSize.replace('px', '')))?.variant;

  const color = isDisabled ? 'color/content/neutral/default/disabled' : undefined;
  const subColor = isDisabled ? 'color/content/neutral/secondary/disabled' : 'color/content/neutral/secondary/normal';

  return typeof label === 'string' ? (
    <MDSTypography2 variant={variant} weight="medium" color={color}>
      {label}
    </MDSTypography2>
  ) : (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      {(label.main || label.sub) && (
        <div>
          <MDSTypography2 variant={variant} weight="medium" color={color}>
            {label.main}{' '}
            {label.sub && (
              <MDSTypography2 as="span" variant={variant} color={subColor}>
                ({label.sub})
              </MDSTypography2>
            )}
          </MDSTypography2>
        </div>
      )}
      {label.right}
    </div>
  );
};
