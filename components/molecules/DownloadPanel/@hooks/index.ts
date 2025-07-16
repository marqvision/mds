import { useSetAtom } from 'jotai';
import { addTaskAtom } from '../@atoms';
import { NewTaskParams, TaskDescription, TaskId } from '../@types';

export const useMDSDownloadPanel = () => {
  const addTaskToQueue = useSetAtom(addTaskAtom);

  const addTask = <PollingRes = unknown, CancelRes = unknown, FailedRes = unknown>(
    task: NewTaskParams<PollingRes, CancelRes, FailedRes>
  ) => {
    const newTask: TaskDescription<PollingRes, CancelRes, FailedRes> = {
      taskId: task.taskId,
      fileName: task.fileName,
      fileType: task.fileType,
      taskGroupKey: task.taskGroupKey,
      pollingFn: task.pollingFn,
      removeFn: task.removeFn,
      pollingInterval: task.pollingInterval ?? 1000,

      onCompleted: (taskId: TaskId, res: PollingRes) => task.onCompleted?.(taskId, res),
      onRemoved: (taskId: TaskId, res: CancelRes) => task.onRemoved?.(taskId, res),
      onFailed: (taskId: TaskId, res: FailedRes) => task.onFailed?.(taskId, res),
      // onProgress 콜백 필요하다면 추가

      progress: 0,
      status: 'ready',
    };
    addTaskToQueue(newTask);
  };
  // 만약 필요하다면 그 때 추가
  // const removeTask = (taskId: TaskId) => {
  //   // setDisplayQueue((prev) => prev.filter((t) => t.progressId !== task.progressId));
  // };

  return {
    addTask,
  };
};
