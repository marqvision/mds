import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getIsSelectable } from '../../@utils';

type DragState = {
  isDragging: boolean;
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
  onDateRangeSelectionModeChange: () => void;
}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    anchorDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    startDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    endDateStr: dayjs(params.lastDate).format('YYYY-MM-DD'),
  });

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !getIsSelectable(dateStr, params.minDate, params.maxDate)) return;

    params.onDateRangeSelectionModeChange();
    setDragState({ isDragging: true, anchorDateStr: dateStr, startDateStr: dateStr, endDateStr: dateStr });
  };
  const handleDragMove = (event: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(event);

    if (!dragState.isDragging || !currentAnchorDateStr) return;
    if (!getIsSelectable(currentAnchorDateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      if (!prev.startDateStr) return prev;

      let [newStartDate, newEndDate] = [prev.startDateStr, prev.endDateStr];

      const currentDate = dayjs(currentAnchorDateStr);
      const anchorDate = dayjs(prev.anchorDateStr);

      if (currentDate.isBefore(anchorDate, 'day')) {
        newStartDate = currentAnchorDateStr;
        newEndDate = prev.anchorDateStr;
      } else if (currentDate.isAfter(anchorDate, 'day')) {
        newStartDate = prev.anchorDateStr;
        newEndDate = currentAnchorDateStr;
      }

      params.onDateRangeUpdate(dayjs(newStartDate).toDate(), dayjs(newEndDate).toDate());
      return { ...prev, startDateStr: newStartDate, endDateStr: newEndDate };
    });
  };
  const handleDragEnd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !getIsSelectable(dateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => ({
      isDragging: false,
      anchorDateStr: prev.anchorDateStr,
      startDateStr: prev.startDateStr,
      endDateStr: dateStr,
    }));
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
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};


export const useClickSelect = (params: {
  startDate: Date;
  lastDate: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (startDate: Date, lastDate: Date) => void;
}) => {};



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
