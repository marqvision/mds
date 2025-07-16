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
  pollingFn: (task: Task, signal?: AbortSignal) => Promise<PollingRes>;
  pollingInterval: number; // 1000ms 기본값
  removeFn: (task: Task) => Promise<CancelRes>;

  onCompleted?: (task: Task, res: PollingRes) => void;
  onRemoved?: (task: Task, res: CancelRes) => void;
  onFailed?: (task: Task, res: FailedRes) => void;

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
