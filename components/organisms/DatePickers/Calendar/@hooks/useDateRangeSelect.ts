import { useState } from 'react';
import dayjs from 'dayjs';
import { isDateInMinMaxRange } from '../../@utils';
import { DateRangeSelectionMode } from '../@types';

type SelectActionState = {
  actionState: 'in-progress' | 'idle';
  selectionMode: DateRangeSelectionMode;
  anchorDateStr: string;
  startDateStr: string;
  endDateStr: string;
};
export const useDragSelect = (params: {
  startDate: Date;
  lastDate: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (startDate: Date, lastDate: Date) => void;
}) => {
  const [dragState, setDragState] = useState<SelectActionState>({
    actionState: 'idle',
    selectionMode: 'drag',
    anchorDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    startDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    endDateStr: dayjs(params.lastDate).format('YYYY-MM-DD'),
  });

  const dragStart = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    if (!isDateInMinMaxRange(currentAnchorDateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      if (prev.selectionMode === 'click') {
        return {
          actionState: 'idle',
          selectionMode: 'drag',
          anchorDateStr: currentAnchorDateStr,
          startDateStr: prev.startDateStr,
          endDateStr: prev.endDateStr,
        };
      } else {
        if (prev.actionState === 'in-progress') {
          // 드래그 하다가 캘린더 밖으로 나갔다 온 케이스
          return {
            actionState: 'idle',
            selectionMode: 'drag',
            anchorDateStr: prev.anchorDateStr,
            startDateStr: prev.startDateStr,
            endDateStr: prev.endDateStr,
          };
        } else {
          return {
            actionState: 'in-progress',
            selectionMode: prev.selectionMode,
            anchorDateStr: currentAnchorDateStr,
            startDateStr: currentAnchorDateStr,
            endDateStr: currentAnchorDateStr,
          };
        }
      }
    });
  };
  const dragMove = (event: React.MouseEvent) => {
    if (dragState.actionState === 'idle') return;

    const currentAnchorDateStr = calculateCurrentDate(event);
    if (!currentAnchorDateStr) return;
    if (!isDateInMinMaxRange(currentAnchorDateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      if (!prev.startDateStr) return prev;

      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: prev.anchorDateStr,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });

      params.onDateRangeUpdate(dayjs(newStartDateStr).toDate(), dayjs(newEndDateStr).toDate());
      return { ...prev, startDateStr: newStartDateStr, endDateStr: newEndDateStr };
    });
  };
  const dragEnd = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    if (!currentAnchorDateStr || !isDateInMinMaxRange(currentAnchorDateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: prev.anchorDateStr,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });

      params.onDateRangeUpdate(dayjs(newStartDateStr).toDate(), dayjs(newEndDateStr).toDate());

      const selectionMode = newStartDateStr === newEndDateStr ? 'click' : 'drag';

      return {
        actionState: selectionMode === 'click' ? 'in-progress' : 'idle',
        selectionMode,
        anchorDateStr: prev.anchorDateStr,
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
      };
    });
  };

  return {
    dragState,
    dragStart,
    dragMove,
    dragEnd,
  };
};

const calculateCurrentDate = (event: React.MouseEvent) => {
  const targetElement = event.target as HTMLElement;

  // 바로 event.target에서 data-index를 확인
  let itemDate = targetElement.getAttribute('data-date');
  if (itemDate !== null) {
    return itemDate;
  }

  const { clientX, clientY } = event;
  const elements = document.elementsFromPoint(clientX, clientY);
  for (const el of elements) {
    itemDate = el.getAttribute('data-date');
    if (itemDate !== null) {
      return itemDate;
    }
  }

  return null; // 조건에 맞는 요소가 없을 경우
};
const resolveDateRange = (params: {
  anchorDateStr: string;
  startDateStr: string;
  endDateStr: string;
  currentDateStr: string;
}) => {
  let [newStartDateStr, newEndDateStr] = [params.startDateStr, params.endDateStr];

  const currentDate = dayjs(params.currentDateStr);
  const anchorDate = dayjs(params.anchorDateStr);

  if (currentDate.isBefore(anchorDate, 'day')) {
    newStartDateStr = params.currentDateStr;
    newEndDateStr = params.anchorDateStr;
  } else if (currentDate.isAfter(anchorDate, 'day')) {
    newStartDateStr = params.anchorDateStr;
    newEndDateStr = params.currentDateStr;
  }

  return { newStartDateStr, newEndDateStr };
};
