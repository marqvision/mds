import { atom, createStore } from 'jotai';
import { DisplayStatus, DisplayTask, Task } from './@types';

//#region data store
const _displayAtom = atom<DisplayStatus>({
  isOpen: false,
  isFold: false,
});
const _tasksAtom = atom<Map<string, Task>>(new Map());
//#endregion

export const panelStatusAtom = atom(
  (get) => {
    return get(_displayAtom);
  },
  (get, set, updateFn: (prev: DisplayStatus) => DisplayStatus) => {
    const prev = get(_displayAtom);
    set(_displayAtom, updateFn(prev));
  }
);

//#region - GETTERS
export const displayTasksAtom = atom<DisplayTask[]>((get) => {
  return Array.from(get(_tasksAtom).values()).map((task) => ({
    taskId: task.taskId,
    fileName: task.fileName,
    fileType: task.fileType,
    progress: task.progress,
    status: task.status,
    taskGroupKey: task.taskGroupKey,
    removeFn: task.removeFn,
    onRemoved: task.onRemoved,
  }));
});

export const apiTaskAtom = atom((get) => {
  return Array.from(get(_tasksAtom).values())
    .filter((task) => task.status === 'processing' || task.status === 'ready')
    .map((task) => ({
      taskId: task.taskId,
      fileName: task.fileName,
      taskGroupKey: task.taskGroupKey,
      pollingFn: task.pollingFn,
      pollingInterval: task.pollingInterval,
      removeFn: task.removeFn,
      onCompleted: task.onCompleted,
      onFailed: task.onFailed,
    }));
});

export const labelAtom = atom<string>((get) => {
  const tasks = get(_tasksAtom);

  let [totalCount, preparingCount, exportingCount, completedCount, failedCount] = [0, 0, 0, 0, 0];
  for (const task of tasks.values()) {
    if (task.status === 'ready') {
      preparingCount++;
    } else if (task.status === 'processing') {
      exportingCount++;
    } else if (task.status === 'completed') {
      completedCount++;
    } else if (task.status === 'failed') {
      failedCount++;
    }
    totalCount++;
  }

  if (totalCount > 0) {
    if (failedCount > 0) {
      return 'Export failed';
    } else if (exportingCount > 0) {
      return 'Exporting';
    } else if (preparingCount > 0) {
      return 'Preparing export';
    } else if (completedCount > 0) {
      return 'Export complete';
    }
  }
  return 'Export complete';
});
//
//#endregion

//#region - SETTERS
export type AddTaskParams<PollingRes = unknown, CancelRes = unknown, FailedRes = unknown> = Pick<
  Task<PollingRes, CancelRes, FailedRes>,
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
  Partial<Pick<Task<PollingRes, CancelRes, FailedRes>, 'pollingInterval'>>;
export const addTaskAtom = atom(null, (_, set, param: AddTaskParams<any, any, any>) => {
  const newTask: Task<any, any, any> = {
    ...param,
    pollingInterval: param.pollingInterval ?? 1000,
    progress: 0,
    status: 'ready',
  };

  set(_tasksAtom, (prev) => {
    const newTasks = new Map(prev);
    newTasks.set(newTask.taskId, newTask);
    return newTasks;
  });
  set(_displayAtom, { isOpen: true, isFold: false });
});
export const updateTaskStatusAtom = atom(null, (get, set, param: Pick<Task, 'taskId' | 'progress' | 'status'>) => {
  set(_tasksAtom, (prev) => {
    const newTasks = new Map(prev);
    const task = prev.get(param.taskId);
    if (task) {
      newTasks.set(param.taskId, { ...task, status: param.status, progress: param.progress ?? task.progress });
    }
    return newTasks;
  });
});
export const removeTaskAtom = atom(null, (get, set, param: Pick<Task, 'taskId'>) => {
  const prev = get(_tasksAtom);
  const newTasks = new Map(prev);
  newTasks.delete(param.taskId);
  set(_tasksAtom, newTasks);

  if (newTasks.size === 0) {
    set(_displayAtom, { isOpen: false, isFold: false });
  }

  return newTasks;
});
//#endregion

// Provider로 감싸여진 영역 대응을 위한 Store
export const downloadTaskStore = createStore();
downloadTaskStore.sub(_displayAtom, () => {
  // const current = downloadMonitorStore.get(_internalDownloadTaskAtom);
  // console.log('>>>> downloadMonitorStore', current);
});
downloadTaskStore.sub(_tasksAtom, () => {
  // const current = downloadMonitorStore.get(_internalDownloadTaskAtom);
  // console.log('>>>> downloadMonitorStore', current);
});
downloadTaskStore.sub(apiTaskAtom, () => {
  // const current = downloadMonitorStore.get(_internalDownloadTaskAtom);
  // console.log('>>>> downloadMonitorStore', current);
});
