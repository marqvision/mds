import { useState } from '@storybook/preview-api';
import { MDSCheckbox, MDSTypography, MDSDownloadPanel } from '../../../../components';
import type { Meta, StoryObj } from '@storybook/react';

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
    panel: {
      label: 'Panel label',
      isFold: false,
      onToggleFold: () => {},
      onClose: () => {},
    },
    tasks: {
      list: [
        {
          taskId: 1,
          fileName: 'SJ Group Co., Ltd._Removed_Performance_250704.csv',
          fileType: 'csv',
          progress: 0,
          status: 'ready',
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
          status: 'ready',
        },
        {
          taskId: 6,
          fileName: 'Tiffany & Co._snapshots.zip',
          fileType: 'zip',
          progress: 55,
          status: 'processing',
        },
      ],
      onRemove: () => {
        console.log('>>> task removed');
      },
    },
  },
  render: function Render(arg) {
    const [isChecked, setIsChecked] = useState(false);

    const handleRemove = (taskId: number) => {
      console.log('>>> task removed', taskId);
      arg.tasks.onRemove(taskId);
    };
    const handleClick = (taskId: number) => {
      console.log('>>> task clicked', taskId);
    };

    const firstThreeTasks = arg.tasks.list.slice(0, 3).map((task) => ({
      ...task,
      onClick: isChecked ? handleClick : undefined,
    }));
    const lastThreeTasks = arg.tasks.list.slice(3);

    return (
      <div style={{ width: '500px' }}>
        <div>
          <MDSTypography as="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MDSCheckbox value={isChecked} onChange={() => setIsChecked(!isChecked)} />
            상위 3개 태스크에만 onClick handler를 사용
          </MDSTypography>
        </div>
        <MDSDownloadPanel
          panel={arg.panel}
          tasks={{
            list: [...firstThreeTasks, ...lastThreeTasks],
            onRemove: handleRemove,
          }}
        />
      </div>
    );
  },
};
