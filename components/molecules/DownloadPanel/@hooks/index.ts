import { useSetAtom } from 'jotai';
import { AddTaskParams, addTaskAtom } from '../@atoms';

export const useMDSDownloadPanel = () => {
  const addTaskToQueue = useSetAtom(addTaskAtom);

  const addTask = (task: AddTaskParams) => {
    addTaskToQueue({
      taskId: task.taskId,
      fileName: task.fileName,
      fileType: task.fileType,
      taskGroupKey: task.taskGroupKey,
      pollingFn: task.pollingFn,
      pollingInterval: task.pollingInterval,
      removeFn: task.removeFn,
    });
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
