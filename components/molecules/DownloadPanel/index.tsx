import { useAtomValue } from 'jotai';
import { MDSThemeColorPath } from '../../../types';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { MDSModal } from '../../organisms/Modal';
import { MDSButton } from '../Button';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { MDSPlainButton } from '../PlainButton';
import { MDSTooltip } from '../Tooltip';
import { panelStatusAtom } from './@atoms';
import { DisplayTask, TaskDescription } from './@types';
import { Styles } from './styles';
import { useManagePanel, useRemoveTask } from './@hooks/useManagePanel';
import { useTaskRunner } from './@hooks/useTaskRunner';

// storybook 에서 보여주기 위해 export
type PanelContentProps = Pick<ReturnType<typeof useManagePanel>, 'panel' | 'tasks'>;
export const PanelContent = ({ panel, tasks }: PanelContentProps) => {
  return (
    <>
      <Styles.Title>
        <MDSTypography variant="body" size="m" weight="medium">
          {panel.panelLabel}
        </MDSTypography>
        <div className="actionButtonBox">
          <MDSPlainButton
            color="bluegray"
            icon={
              <Styles.FoldIconBox isFold={panel.panelStatus.isFold}>
                <MDSIcon.ArrowDown variant="outline" />
              </Styles.FoldIconBox>
            }
            onClick={panel.handleToggleFold}
          />
          <MDSPlainButton
            color="bluegray"
            icon={<MDSIcon.CloseDelete variant="outline" />}
            onClick={panel.handleClickClose}
          />
        </div>
      </Styles.Title>
      <Styles.Content isFold={panel.panelStatus.isFold}>
        {tasks.map((task) => (
          <TaskItem key={task.taskId} task={task} />
        ))}
      </Styles.Content>
    </>
  );
};

const DownloadPanel = () => {
  const { panel, tasks, confirm } = useManagePanel();
  useTaskRunner();

  return (
    <>
      <Styles.Container isFold={panel.panelStatus.isFold}>
        <PanelContent panel={panel} tasks={tasks} />
      </Styles.Container>
      <MDSModal.Wrapper isOpen={confirm.isOpen}>
        <MDSModal.Content>
          <MDSTypography variant="body" size="m" weight="medium">
            Are you sure you want to close this window? All exports in progress will be canceled.
          </MDSTypography>
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSButton variant="border" size="medium" color="bluegray" onClick={confirm.continue}>
            Continue
          </MDSButton>
          <MDSButton variant="fill" size="medium" color="red" onClick={confirm.terminate}>
            Cancel
          </MDSButton>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    </>
  );
};

const TaskItem = ({ task }: { task: DisplayTask }) => {
  const { remove } = useRemoveTask();
  return (
    <Styles.Item key={task.taskId}>
      <FileIcon fileType={task.fileType} status={task.status} />
      <FileName status={task.status} fileName={task.fileName} />
      <ProgressIndicator status={task.status} progress={task.progress} onCancel={() => remove(task)} />
    </Styles.Item>
  );
};

const READY_STATUS_COLOR = 'color/content/neutral/default/disabled';
const FAILED_STATUS_COLOR = 'color/content/critical/default/normal';
const COMPLETED_STATUS_COLOR = 'color/content/success/default/normal';
// todo-@jamie: shared의 ExtensionIcon 컴포넌트를 mds v2로 전한하면 ExtensionIcon로 교체하기
const FileIcon = ({ status, fileType }: { status: TaskDescription['status']; fileType: TaskDescription['fileType'] }) => {
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
const FileName = ({ status, fileName }: { status: TaskDescription['status']; fileName: TaskDescription['fileName'] }) => {
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
  status: TaskDescription['status'];
  progress?: number;
  onCancel: () => void;
}) => {
  const toolTipTitle = status === 'processing' ? 'Cancel export' : status === 'completed' ? 'Remove' : 'Remove';
  const toolTipWidth = status === 'processing' ? '85px' : '97px';

  return (
    <Styles.ProgressIndicatorBox status={status}>
      <div className="progress-indicator-default">
        {status === 'ready' || typeof progress !== 'number' ? (
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


//#region EXPORT MODULES
export const MDSDownloadPanel = () => {
  const panelStatus = useAtomValue(panelStatusAtom);

  return panelStatus.isOpen ? <DownloadPanel /> : null;
};
export { useMDSDownloadPanel } from './@hooks';
export type { Task as MDSDownloadPanelTask } from './@types';
// jotai provider 내부에서 쓰이는 컴포넌트를 지원하기위한 jotai store
export { mdsDownloadPanelTaskStore } from './@atoms';
//#endregion