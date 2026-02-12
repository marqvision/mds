import { useState } from 'storybook/preview-api';
import { MDSDownloadPanel, MDSDownloadPanelProps } from '../../../../components';
import { NewTask, TaskForm } from './TaskForm';
import { PanelLabelForm } from './PanelLabelForm';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSDownloadPanel> = {
  component: MDSDownloadPanel,
  title: '2. Components/organisms/DownloadPanel',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MDSDownloadPanel>;

export const PanelContent: Story = {
  args: {
    tasks: {
      list: [
        {
          taskId: 1,
          fileName: 'SJ Group Co., Ltd._Removed_Performance_250704.csv',
          fileType: 'doc',
          progress: 0,
          status: 'prepare',
        },
        {
          taskId: 2,
          fileName: 'SJ Group Co., Ltd._Flagged_Performance_250704.csv',
          fileType: 'csv',
          progress: 90,
          status: 'processing',
        },
        {
          taskId: 3,
          fileName: 'bulk_proof_139381.ppt',
          fileType: 'ppt',
          progress: 100,
          status: 'completed',
        },
        {
          taskId: 4,
          fileName: 'Tiffany & Co._snapshots.zip',
          fileType: 'zip',
          progress: 28,
          status: 'completed',
        },
        {
          taskId: 5,
          fileName: 'IICOMBINED_snapshots.zip',
          fileType: 'zip',
          progress: 0,
          status: 'prepare',
        },
        {
          taskId: 6,
          fileName: 'Tiffany & Co._snapshots.zip',
          fileType: 'zip',
          progress: 55,
          status: 'processing',
        },
        {
          taskId: 7,
          fileName: 'SJ Group Co., Ltd._Removed_Performance_250704.csv',
          fileType: 'csv',
          progress: 0,
          status: 'prepare',
        },
      ],
      onRemove: () => {
        console.log('>>> task removed');
      },
    },
  },
  render: function Render(arg) {
    const [isFold, setIsFold] = useState(false);
    const [tasks, setTasks] = useState(() => arg.tasks.list);
    const [panelLabel, setPanelLabel] = useState<MDSDownloadPanelProps['panel']['label']>({
      title: 'Preparing export',
      status: 'prepare',
    });

    const handleRemove = (taskId: number) => {
      console.log('>>> task removed', taskId);
      setTasks(tasks.filter((task) => task.taskId !== taskId));
      arg.tasks.onRemove(taskId);
    };

    const handleClick = (taskId: number) => {
      console.log('>>> task clicked', taskId);
    };

    const handleAddTask = (newTaskData: Omit<NewTask, 'taskId'>) => {
      const newTask = {
        taskId: Math.max(...tasks.map((t) => t.taskId), 0) + 1,
        ...newTaskData,
      };
      setTasks([...tasks, newTask]);
    };

    const handleUpdatePanelLabel = (data: MDSDownloadPanelProps['panel']['label']) => {
      setPanelLabel(data);
    };

    return (
      <div style={{ width: '500px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '250px 250px', gap: '16px' }}>
          <PanelLabelForm initialData={panelLabel.status} onUpdate={handleUpdatePanelLabel} />
          <TaskForm onAddTask={handleAddTask} onClickHandler={handleClick} />
        </div>

        <MDSDownloadPanel
          panel={{
            ...arg.panel,
            label: panelLabel,
            isFold,
            onToggleFold: () => setIsFold(!isFold),
          }}
          tasks={{
            list: tasks,
            onRemove: handleRemove,
          }}
        />
      </div>
    );
  },
};
