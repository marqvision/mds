import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { panelStatusAtom, labelAtom, displayTasksAtom, removeTaskAtom } from './@atoms';
import { DisplayTask } from './@types';

export const useManagePanel = () => {
  const [panelStatus, setPanelStatus] = useAtom(panelStatusAtom);
  const panelLabel = useAtomValue(labelAtom);
  const displayTasks = useAtomValue(displayTasksAtom);

  const handleToggleFold = () => {
    setPanelStatus((prev) => ({ ...prev, isFold: !prev.isFold }));
  };

  const handleClickClose = () => {
    setPanelStatus((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    panel: {
      panelStatus,
      handleToggleFold,
      handleClickClose,
      panelLabel,
    },
    tasks: displayTasks,
  };
};
export const useRemoveTask = () => {
  const removeTask = useSetAtom(removeTaskAtom);

  const remove = async (task: DisplayTask) => {
    if (task.status === 'completed' || task.status === 'failed') {
      removeTask({ taskId: task.taskId });
    } else {
      if (task) {
        await task.removeFn(task.taskId);
        removeTask({ taskId: task.taskId });
      }
    }
    task.onRemoved?.(task.taskId, null);
  };

  return {
    remove,
  };
};
