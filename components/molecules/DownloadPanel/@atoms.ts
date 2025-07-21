import { atom, createStore } from 'jotai';
import { DisplayStatus, DisplayTask, TaskDescription, TaskId } from './@types';

//#region data store
const _panelDisplayStatusAtom = atom<DisplayStatus>({
  isOpen: false,
  isFold: false,
});
const _tasksAtom = atom<Map<TaskId, TaskDescription>>(new Map());
//#endregion

//#region - GETTERS
export const panelStatusAtom = atom(
  (get) => {
    return get(_panelDisplayStatusAtom);
  },
  (get, set, updateFn: (prev: DisplayStatus) => DisplayStatus) => {
    const prev = get(_panelDisplayStatusAtom);
    set(_panelDisplayStatusAtom, updateFn(prev));
  }
);

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
      fileType: task.fileType,
      taskGroupKey: task.taskGroupKey,
      pollingFn: task.pollingFn,
      pollingInterval: task.pollingInterval,
      removeFn: task.removeFn,
      onCompleted: task.onCompleted,
      onFailed: task.onFailed,
    }));
});

export const tasksStatusAtom = atom((get) => {
  return Array.from(get(_tasksAtom).values()).map((task) => ({
    taskId: task.taskId,
    status: task.status,
    groupKey: task.taskGroupKey,
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

export const addTaskAtom = atom(null, (_, set, param: TaskDescription<any, any, any>) => {
  set(_tasksAtom, (prev) => {
    const newTasks = new Map(prev);
    newTasks.set(param.taskId, param);
    return newTasks;
  });
  set(_panelDisplayStatusAtom, { isOpen: true, isFold: false });
});
export const updateTaskStatusAtom = atom(
  null,
  (get, set, param: Pick<TaskDescription, 'taskId' | 'progress' | 'status'>) => {
    set(_tasksAtom, (prev) => {
      const newTasks = new Map(prev);
      const task = prev.get(param.taskId);
      if (task) {
        newTasks.set(param.taskId, { ...task, status: param.status, progress: param.progress ?? task.progress });
      }
      return newTasks;
    });
  }
);
export const removeTaskAtom = atom(null, (get, set, param: Pick<TaskDescription, 'taskId'>) => {
  const prev = get(_tasksAtom);
  const newTasks = new Map(prev);
  newTasks.delete(param.taskId);
  set(_tasksAtom, newTasks);

  if (newTasks.size === 0) {
    set(_panelDisplayStatusAtom, { isOpen: false, isFold: false });
  }

  return newTasks;
});
//#endregion

// Provider로 감싸여진 영역 대응을 위한 Store
export const mdsDownloadPanelTaskStore = createStore();
mdsDownloadPanelTaskStore.sub(_panelDisplayStatusAtom, () => {});
mdsDownloadPanelTaskStore.sub(_tasksAtom, () => {});
mdsDownloadPanelTaskStore.sub(apiTaskAtom, () => {});
