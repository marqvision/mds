type TaskFileType = 'csv' | 'pdf' | 'ppt' | 'zip';
type TaskStatus = 'ready' | 'processing' | 'completed' | 'failed' | 'removed';

export type Task = {
  taskId: number;
  status: TaskStatus;
  fileName: string;
  fileType: TaskFileType;
  progress?: number;
};
