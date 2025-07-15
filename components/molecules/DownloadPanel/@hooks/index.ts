import { useSetAtom } from 'jotai';
import { AddTaskParams, addTaskAtom } from '../@atoms';

export const useMDSDownloadPanel = () => {
  const addTaskToQueue = useSetAtom(addTaskAtom);

  const addTask = <PollingRes = unknown, CancelRes = unknown, FailedRes = unknown>(
    task: AddTaskParams<PollingRes, CancelRes, FailedRes>
  ) => {
    const newTask: AddTaskParams<PollingRes, CancelRes, FailedRes> = {
      taskId: task.taskId,
      fileName: task.fileName,
      fileType: task.fileType,
      taskGroupKey: task.taskGroupKey,
      pollingFn: task.pollingFn,
      removeFn: task.removeFn,
      pollingInterval: task.pollingInterval,

      onCompleted: (taskId: string, res: PollingRes) => task.onCompleted?.(taskId, res),
      onRemoved: (taskId: string, res: CancelRes) => task.onRemoved?.(taskId, res),
      onFailed: (taskId: string, res: FailedRes) => task.onFailed?.(taskId, res),
    };
    addTaskToQueue(newTask);
  };
  const removeTask = (taskId: string) => {
    // todo-@jamie: 필요할 때 생각해보자....
    // setDisplayQueue((prev) => prev.filter((t) => t.progressId !== task.progressId));
  };

  return {
    addTask,
    removeTask,
  };
};
