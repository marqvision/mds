import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { throttle } from 'lodash';
import { validateDateAndRange } from '../../@utils';
import { DateRangeSelectionMode } from '../@types';

type SelectActionState = {
  actionState: 'in-progress' | 'idle';
  selectionMode: DateRangeSelectionMode;
  anchorDateStr: string;
  startDateStr: string;
  endDateStr: string;
};
export const useDragSelect = (params: {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (startDate: Date, lastDate: Date) => void;
}) => {
  const [dragState, setDragState] = useState<SelectActionState>({
    actionState: 'idle',
    selectionMode: 'drag',
    anchorDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
    startDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
    endDateStr: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
  });

  const [displayDate, setDisplayDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: dragState.startDateStr,
    endDate: dragState.endDateStr,
  });

  const dragStart = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

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
  const dragMove = throttle((event: React.MouseEvent) => {
    if (dragState.actionState === 'idle') return;

    const currentAnchorDateStr = calculateCurrentDate(event);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

    setDragState((prev) => {
      if (!prev.startDateStr) return prev;

      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: prev.anchorDateStr,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });

      setDisplayDate({
        startDate: newStartDateStr,
        endDate: newEndDateStr,
      });
      return { ...prev, startDateStr: newStartDateStr, endDateStr: newEndDateStr };
    });
  }, 100);
  const dragEnd = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

    setDragState((prev) => {
      if (
        prev.anchorDateStr === currentAnchorDateStr &&
        prev.actionState === 'in-progress' &&
        prev.selectionMode === 'click'
      ) {
        return {
          actionState: 'idle',
          selectionMode: 'drag',
          anchorDateStr: prev.anchorDateStr,
          startDateStr: prev.anchorDateStr,
          endDateStr: prev.anchorDateStr,
        };
      }

      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: prev.anchorDateStr,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });

      setDisplayDate({
        startDate: newStartDateStr,
        endDate: newEndDateStr,
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

  useEffect(() => {
    // 값에 대한 validation은 useCalendar에서 모두 처리하고 내려오니까 여기에서는 넘어온 값을 쓰기만 하면 된다!
    setDisplayDate({
      startDate: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
      endDate: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
    });
    setDragState((prev) => {
      return {
        ...prev,
        anchorDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
        startDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
        endDateStr: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
      };
    });
  }, [params.startDate, params.endDate]);

  return {
    displayDate,
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
