import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { isDateInMinMaxRange } from '../../@utils';

type SelectActionState = {
  isDragging: boolean;
  isClicking: boolean;
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
    isDragging: false,
    isClicking: false,
    anchorDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    startDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    endDateStr: dayjs(params.lastDate).format('YYYY-MM-DD'),
  });

  const dragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !isDateInMinMaxRange(dateStr, params.minDate, params.maxDate)) return;

    setDragState({
      isDragging: true,
      isClicking: false,
      anchorDateStr: dateStr,
      startDateStr: dateStr,
      endDateStr: dateStr,
    });
  };
  const dragMove = (event: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(event);

    if (!dragState.isDragging || !currentAnchorDateStr) return;
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
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !isDateInMinMaxRange(dateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: prev.anchorDateStr,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: dateStr,
      });

      params.onDateRangeUpdate(dayjs(newStartDateStr).toDate(), dayjs(newEndDateStr).toDate());

      return {
        isDragging: false,
        isClicking: newStartDateStr === newEndDateStr,
        anchorDateStr: prev.anchorDateStr,
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
      };
    });
  };

  //#region - Mouse action by area
  useEffect(() => {
    const onMouseUp = () => {
      setDragState((prev) => ({
        ...prev,
        isDragging: false,
      }));
    };

    if (dragState.isDragging) {
      document.body.addEventListener('mouseup', onMouseUp);
    } else {
      document.body.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragState.isDragging, setDragState]);
  //#endregion

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
