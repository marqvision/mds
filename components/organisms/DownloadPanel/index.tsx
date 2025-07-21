import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { MDSPlainButton } from '../../molecules/PlainButton';
import { TaskItem } from './@components/TaskItem';
import { Task } from './@types';
import { Styles } from './styles';

type DownloadPanelProps = {
  panel: {
    label: string;
    isFold: boolean;
    onToggleFold: () => void;
    onClose: () => void;
  };
  tasks: {
    list: Task[];
    onRemove: (taskId: Task['taskId']) => void;
  };
};
export const DownloadPanel = (props: DownloadPanelProps) => {
  const { panel, tasks } = props;
  return (
    <Styles.Container isFold={panel.isFold}>
      <Styles.Title>
        <MDSTypography variant="body" size="m" weight="medium">
          {panel.label}
        </MDSTypography>
        <div className="actionButtonBox">
          <MDSPlainButton
            color="bluegray"
            icon={
              <Styles.FoldIconBox isFold={panel.isFold}>
                <MDSIcon.ArrowDown variant="outline" />
              </Styles.FoldIconBox>
            }
            onClick={panel.onToggleFold}
          />
          <MDSPlainButton color="bluegray" icon={<MDSIcon.CloseDelete variant="outline" />} onClick={panel.onClose} />
        </div>
      </Styles.Title>
      <Styles.Content isFold={panel.isFold}>
        {tasks.list.map((task) => (
          <TaskItem key={task.taskId} task={task} onRemove={tasks.onRemove} />
        ))}
      </Styles.Content>
    </Styles.Container>
  );
};

export const MDSDownloadPanel = DownloadPanel;
export type MDSDownloadPanelProps = DownloadPanelProps;
