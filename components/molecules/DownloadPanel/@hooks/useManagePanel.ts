import { useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { panelStatusAtom, labelAtom, displayTasksAtom, removeTaskAtom } from '../@atoms';
import { DisplayTask } from '../@types';

export const useManagePanel = () => {
  const [panelStatus, setPanelStatus] = useAtom(panelStatusAtom);
  const panelLabel = useAtomValue(labelAtom);
  const displayTasks = useAtomValue(displayTasksAtom);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleToggleFold = () => {
    setPanelStatus((prev) => ({ ...prev, isFold: !prev.isFold }));
  };
  const handleClickClose = () => {
    const hasProcessingOrReadyTask = displayTasks.some((task) => task.status == 'processing' || task.status == 'ready');
    if (hasProcessingOrReadyTask) {
      setShowCancelConfirm(true);
    } else {
      terminateDownload();
    }
  };

  const { remove } = useRemoveTask();
  const terminateDownload = async () => {
    for (const task of displayTasks) {
      await remove(task);
    }
    setPanelStatus((prev) => ({ ...prev, isOpen: false }));
    setShowCancelConfirm(false);
  };
  const continueDownload = () => {
    setShowCancelConfirm(false);
  };

  return {
    panel: {
      panelStatus,
      handleToggleFold,
      handleClickClose,
      panelLabel,
    },
    tasks: displayTasks,
    confirm: {
      isOpen: showCancelConfirm,
      setIsOpen: setShowCancelConfirm,
      continue: continueDownload,
      terminate: terminateDownload,
    },
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
