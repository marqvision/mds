export type DownloadTask = {
  progressId: number;
  fileName: string;
  fileType: 'csv' | 'pdf' | 'ppt' | 'zip';

  progress: number;
  status: 'ready' | 'processing' | 'completed' | 'failed';
  statusReason?: string; // failed 등 추가 정보가 필요할 때 사용
};


export type DownloadPanelProps = {
  displayQueue: DownloadTask[];
};