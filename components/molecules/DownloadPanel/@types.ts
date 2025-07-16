export type TaskId = number; // progress를 추적하기 위한 task별 고유 아이디

export type DisplayStatus = {
  isOpen: boolean;
  isFold: boolean;
};

type TaskFileType = 'csv' | 'pdf' | 'ppt' | 'zip';
type TaskStatus = 'ready' | 'processing' | 'completed' | 'failed' | 'removed';
export type Task = {
  taskId: TaskId;
  fileName: string;
  fileType: TaskFileType;
  taskGroupKey: string;
};

export type TaskDescription<PollingRes = unknown, CancelRes = unknown, FailedRes = unknown> = Task & {
  pollingFn: (taskId: TaskId, signal?: AbortSignal) => Promise<PollingRes>;
  pollingInterval: number; // 1000ms 기본값
  removeFn: (taskId: TaskId) => Promise<CancelRes>;

  onCompleted?: (taskId: TaskId, res: PollingRes) => void;
  onRemoved?: (taskId: TaskId, res: CancelRes) => void;
  onFailed?: (taskId: TaskId, res: FailedRes) => void;

  progress?: number;
  status: TaskStatus;
};

export type DisplayTask = Pick<
  TaskDescription,
  'taskId' | 'fileName' | 'fileType' | 'progress' | 'status' | 'taskGroupKey' | 'removeFn' | 'onRemoved'
>;

export type DownloadPanelProps = {
  tasks: TaskDescription[];
};

export type NewTaskParams<PollingRes = unknown, CancelRes = unknown, FailedRes = unknown> = Pick<
  TaskDescription<PollingRes, CancelRes, FailedRes>,
  | 'taskId'
  | 'fileName'
  | 'fileType'
  | 'taskGroupKey'
  | 'pollingFn'
  | 'removeFn'
  | 'onCompleted'
  | 'onFailed'
  | 'onRemoved'
> &
  Partial<Pick<TaskDescription<PollingRes, CancelRes, FailedRes>, 'pollingInterval'>>;
