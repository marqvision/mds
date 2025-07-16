import { useSetAtom } from 'jotai';
import { addTaskAtom } from '../@atoms';
import { NewTaskParams, Task, TaskDescription } from '../@types';

export const useMDSDownloadPanel = () => {
  const addTaskToQueue = useSetAtom(addTaskAtom);

  const addTask = <PollingRes = unknown, CancelRes = unknown, FailedRes = unknown>(
    newTaskParam: NewTaskParams<PollingRes, CancelRes, FailedRes>
  ) => {
    const newTask: TaskDescription<PollingRes, CancelRes, FailedRes> = {
      taskId: newTaskParam.taskId,
      fileName: newTaskParam.fileName,
      fileType: newTaskParam.fileType,
      taskGroupKey: newTaskParam.taskGroupKey,
      pollingFn: newTaskParam.pollingFn,
      removeFn: newTaskParam.removeFn,
      pollingInterval: newTaskParam.pollingInterval ?? 1000,

      onCompleted: (task: Task, res: PollingRes) => newTaskParam.onCompleted?.(task, res),
      onRemoved: (task: Task, res: CancelRes) => newTaskParam.onRemoved?.(task, res),
      onFailed: (task: Task, res: FailedRes) => newTaskParam.onFailed?.(task, res),
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
