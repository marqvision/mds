import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  MDSDownloadPanel,
  PanelContent as MDSDownloadPanelContent,
} from '../../../../components/molecules/DownloadPanel';
import { RecommendedUseCaseExampleAppMain } from './RecommendedUseCaseExample';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSDownloadPanel> = {
  component: MDSDownloadPanel,
  title: '2. Components/molecules/DownloadPanel',
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
    panelLabel: 'Panel label',
    isFold: false,
    isOpen: true,
    displayQueue: [
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
  },
  render: (arg: any) => {
    const panel = {
      panelStatus: {
        isOpen: arg.isOpen,
        isFold: arg.isFold,
      },
      panelLabel: arg.panelLabel,
      handleToggleFold: () => {},
      handleClickClose: () => {},
    };

    const tasks = arg.displayQueue.map((task: any) => ({
      taskId: task.taskId,
      fileName: task.fileName,
      fileType: task.fileType,
      progress: task.progress,
      status: task.status,
    }));

    return (
      <div style={{ width: '500px' }}>
        <MDSDownloadPanelContent panel={panel} tasks={tasks} />
      </div>
    );
  },
};

const queryClient = new QueryClient();
export const RecommendedUseCaseExample = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <RecommendedUseCaseExampleAppMain />
      </QueryClientProvider>
    );
  },
};
