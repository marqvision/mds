import { LabelType, Size } from '../@types';
import { MDSTypography } from '../../../atoms/Typography';
import { theme } from '../@constants';

type Props = {
  label: LabelType;
  size: Size;
  isDisabled?: boolean;
};

export const Label = (props: Props) => {
  const { label, size, isDisabled } = props;

  const mainLabelSize = theme.size[size].mainLabelSize;
  const subLabelSize = theme.size[size].subLabelSize;

  const color = isDisabled ? 'color/content/neutral/default/disabled' : undefined;
  const subColor = isDisabled ? 'color/content/neutral/secondary/disabled' : 'color/content/neutral/secondary/normal';

  return typeof label === 'string' ? (
    <MDSTypography weight="medium" color={color} size={mainLabelSize}>
      {label}
    </MDSTypography>
  ) : (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      {(label.main || label.sub) && (
        <div>
          <MDSTypography weight="medium" color={color} size={mainLabelSize}>
            {label.main}{' '}
            {label.sub && (
              <MDSTypography as="span" color={subColor} size={subLabelSize}>
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
