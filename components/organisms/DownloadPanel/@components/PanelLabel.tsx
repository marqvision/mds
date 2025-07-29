import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSLoadingIndicator } from '../../../molecules/LoadingIndicator';
import { Task } from '../@types';
import { Styles } from '../styles';

const FAILED_STATUS_COLOR = 'color/content/critical/default/normal';
const COMPLETED_STATUS_COLOR = 'color/content/success/default/normal';
type PanelLabelProps = {
  isFold: boolean;
  value: {
    status: Task['status'];
    title: string;
  };
};
export const PanelLabel = ({ value, isFold }: PanelLabelProps) => {
  const { status, title } = value;

  return (
    <Styles.PanelLabelBox isFold={isFold}>
      <div className="progressIconBox">
        {status === 'prepare' ? (
          <MDSLoadingIndicator isDeterminate backgroundColor progress={0} size={20} />
        ) : status === 'processing' ? (
          <MDSLoadingIndicator backgroundColor size={20}/>
        ) : status === 'completed' ? (
          <MDSIcon.Check variant="fill" color={COMPLETED_STATUS_COLOR} size={20} />
        ) : status === 'failed' ? (
          <MDSIcon.ErrorWarning variant="fill" color={FAILED_STATUS_COLOR} size={20} />
        ) : null}
      </div>
      <MDSTypography variant="body" size="m" weight="medium">
        {title}
      </MDSTypography>
    </Styles.PanelLabelBox>
  );
};
