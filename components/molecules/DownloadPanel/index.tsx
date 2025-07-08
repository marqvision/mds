import { useState } from 'react';
import { MDSThemeColorPath } from '../../../types';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { MDSModal } from '../../organisms/Modal';
import { MDSButton } from '../Button';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { MDSPlainButton } from '../PlainButton';
import { MDSTooltip } from '../Tooltip';
import { DownloadPanelProps, DownloadTask } from './@types';
import { Styles } from './styles';

const DownloadPanel = (props: DownloadPanelProps) => {
  const { displayQueue } = props;

  const [displayStatus, setDisplayStatus] = useState<{ isFold: boolean }>({ isFold: false });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const toggleFold = () => {
    setDisplayStatus((prev) => ({ ...prev, isFold: !prev.isFold }));
  };

  const handleClickCloseMonitor = () => {};
  const continueExport = () => {};
  const closeMonitor = () => {};
  const removeTask = (progressId: number, status: DownloadTask['status']) => {};

  const label = 'Exporting';

  return (
    <>
      <Styles.Container isFold={displayStatus.isFold}>
        <Styles.Title>
          <MDSTypography variant="body" size="m" weight="medium">
            {label}
          </MDSTypography>
          <div className="actionButtonBox">
            <MDSPlainButton
              color="bluegray"
              icon={
                <Styles.FoldIconBox isFold={displayStatus.isFold}>
                  <MDSIcon.ArrowDown variant="outline" />
                </Styles.FoldIconBox>
              }
              onClick={toggleFold}
            />
            <MDSPlainButton
              color="bluegray"
              icon={<MDSIcon.CloseDelete variant="outline" />}
              onClick={handleClickCloseMonitor}
            />
          </div>
        </Styles.Title>
        <Styles.Content isFold={displayStatus.isFold}>
          {displayQueue.map((task) => {
            return (
              <Styles.Item key={task.progressId}>
                <FileIcon fileType={task.fileType} status={task.status} />
                <FileName status={task.status} fileName={task.fileName} />
                <ProgressIndicator
                  status={task.status}
                  progress={task.progress}
                  onCancel={() => removeTask(task.progressId, task.status)}
                />
              </Styles.Item>
            );
          })}
        </Styles.Content>
      </Styles.Container>

      <MDSModal.Wrapper isOpen={showCancelConfirm}>
        <MDSModal.Content>
          <MDSTypography variant="body" size="m" weight="medium">
            Are you sure you want to close this window? All exports in progress will be canceled.
          </MDSTypography>
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSButton variant="border" size="medium" color="bluegray" onClick={continueExport}>
            Continue export
          </MDSButton>
          <MDSButton variant="fill" size="medium" color="red" onClick={closeMonitor}>
            Cancel export
          </MDSButton>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    </>
  );
};

const READY_STATUS_COLOR = 'color/content/neutral/default/disabled';
const FAILED_STATUS_COLOR = 'color/content/critical/default/normal';
const COMPLETED_STATUS_COLOR = 'color/content/success/default/normal';
// todo-@jamie: shared의 ExtensionIcon 컴포넌트를 mds v2로 전한하면 ExtensionIcon로 교체하기
const FileIcon = ({ status, fileType }: { status: DownloadTask['status']; fileType: DownloadTask['fileType'] }) => {
  switch (fileType) {
    case 'csv':
      return (
        <MDSIcon.ExcelSheet
          color={status === 'ready' ? READY_STATUS_COLOR : 'color/content/success/default/normal'}
          size={20}
        />
      );
    case 'pdf':
      return (
        <MDSIcon.Pdf
          variant="fill"
          color={status === 'ready' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal'}
          size={20}
        />
      );
    case 'ppt':
      return (
        <MDSIcon.Ppt
          variant="fill"
          color={status === 'ready' ? READY_STATUS_COLOR : 'color/content/critical/default/normal'}
          size={20}
        />
      );
    case 'zip':
      return (
        <MDSIcon.Archive
          variant="fill"
          color={status === 'ready' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal'}
          size={20}
        />
      );
    default:
      return null;
  }
};
const FileName = ({ status, fileName }: { status: DownloadTask['status']; fileName: DownloadTask['fileName'] }) => {
  const color: MDSThemeColorPath = status === 'ready' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal';
  return fileName.length > 40 ? (
    <MDSTooltip title={fileName} width="100%" size="small" style={{ marginBottom: 4 }}>
      <MDSTypography
        variant="body"
        size="m"
        lineClamp={1}
        overflowWrap="break-word"
        wordBreak="break-all"
        color={color}
      >
        {fileName}
      </MDSTypography>
    </MDSTooltip>
  ) : (
    <MDSTypography variant="body" size="m" lineClamp={1} overflowWrap="break-word" wordBreak="break-all" color={color}>
      {fileName}
    </MDSTypography>
  );
};
const ProgressIndicator = ({
  status,
  progress,
  onCancel,
}: {
  status: DownloadTask['status'];
  progress: number;
  onCancel: () => void;
}) => {
  const toolTipTitle = status === 'processing' ? 'Cancel export' : status === 'completed' ? 'Remove' : 'Remove';
  const toolTipWidth = status === 'processing' ? '85px' : '97px';

  return (
    <Styles.ProgressIndicatorBox status={status}>
      <div className="progress-indicator-default">
        {status === 'ready' ? (
          <MDSLoadingIndicator isDeterminate backgroundColor progress={0} size={20} />
        ) : status === 'processing' ? (
          <MDSLoadingIndicator isDeterminate backgroundColor progress={progress} size={20} />
        ) : status === 'completed' ? (
          <MDSIcon.Check variant="fill" color={COMPLETED_STATUS_COLOR} size={20} />
        ) : status === 'failed' ? (
          <MDSIcon.ErrorWarning variant="fill" color={FAILED_STATUS_COLOR} size={20} />
        ) : null}
      </div>
      <div className="progress-indicator-hover">
        <MDSTooltip title={toolTipTitle} width={toolTipWidth} size="medium" style={{ textAlign: 'center' }}>
          <MDSPlainButton color="bluegray" icon={<MDSIcon.CloseDelete variant="fill" size={20} />} onClick={onCancel} />
        </MDSTooltip>
      </div>
    </Styles.ProgressIndicatorBox>
  );
};



export const MDSDownloadPanel = DownloadPanel;
export type MDSDownloadPanelProps = DownloadPanelProps;
