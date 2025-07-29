type TaskFileType = 'csv' | 'pdf' | 'ppt' | 'zip' | 'doc';
export type TaskStatus = 'prepare' | 'processing' | 'completed' | 'failed' | 'removed';

export type Task = {
  taskId: number;
  fileName: string;
  fileType: TaskFileType;

  status: TaskStatus;
  progress?: number;
  onClick?: (taskId: Task['taskId']) => void;
};
