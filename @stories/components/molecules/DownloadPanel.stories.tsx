import { MDSDownloadPanel } from "../../../components/molecules/DownloadPanel"
import type { Meta, StoryObj } from "@storybook/react"

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
}
export default meta;
type Story = StoryObj<typeof MDSDownloadPanel>;

export const Default: Story = {
  args: {
    displayQueue: [
      {
        progressId: 1,
        fileName: 'SJ Group Co., Ltd._Removed_Performance_250704.csv',
        fileType: 'csv',
        progress: 0,
        status: 'ready',
      },
      {
        progressId: 2,
        fileName: 'SJ Group Co., Ltd._Flagged_Performance_250704.csv',
        fileType: 'csv',
        progress: 90,
        status: 'processing',
      },
      {
        progressId: 3,
        fileName: 'bulk_proof_139381.ppt',
        fileType: 'ppt',
        progress: 100,
        status: 'completed',
      },
      {
        progressId: 4,
        fileName: 'Tiffany & Co._snapshots.zip',
        fileType: 'zip',
        progress: 20,
        status: 'processing',
      },
      {
        progressId: 5,
        fileName: 'IICOMBINED_snapshots.zip',
        fileType: 'zip',
        progress: 0,
        status: 'ready',
      },
      {
        progressId: 6,
        fileName: 'Tiffany & Co._snapshots.zip',
        fileType: 'zip',
        progress: 55,
        status: 'processing',
      },
    ]
  }
}