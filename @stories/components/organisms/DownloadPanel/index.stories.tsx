import { MDSDownloadPanel } from '../../../../components/organisms/DownloadPanel';
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
          status: 'processing',
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
      onCancel: () => {},
    },
  },
  render: (arg: any) => {
    return (
      <div style={{ width: '500px' }}>
        <MDSDownloadPanel panel={arg.panel} tasks={arg.tasks} />
      </div>
    );
  },
};
