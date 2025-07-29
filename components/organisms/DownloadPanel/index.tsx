import { MDSIcon } from '../../atoms/Icon';
import { MDSPlainButton } from '../../molecules/PlainButton';
import { PanelLabel } from './@components/PanelLabel';
import { TaskItem } from './@components/TaskItem';
import { Task, TaskStatus } from './@types';
import { Styles } from './styles';

type DownloadPanelProps = {
  panel: {
    label: {
      title: string;
      status: TaskStatus;
    };
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
        <PanelLabel value={panel.label} isFold={panel.isFold} />
        <div className="actionButtonBox">
          <MDSPlainButton
            color="bluegray"
            size="small"
            icon={
              <Styles.FoldIconBox isFold={panel.isFold}>
                <MDSIcon.ArrowDown variant="outline" size={18} />
              </Styles.FoldIconBox>
            }
            onClick={panel.onToggleFold}
          />
          <MDSPlainButton
            color="bluegray"
            icon={<MDSIcon.CloseDelete variant="outline" size={18} />}
            onClick={panel.onClose}
          />
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
