import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import throttle from 'lodash/throttle';
import { validateDateAndMinMaxRange } from '../../@utils';
import { DateRangeSelectionMode } from '../@types';

type SelectActionState = {
  actionState: 'in-progress' | 'idle';
  selectionMode: DateRangeSelectionMode;
  startDateStr: string;
  endDateStr: string;
};
export const useDateRangeSelect = (params: {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (startDate: Date, lastDate: Date) => void;
}) => {
  const [selectActionState, setSelectActionState] = useState<SelectActionState>({
    actionState: 'idle',
    selectionMode: 'drag',
    startDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
    endDateStr: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
  });
  const anchorDateStr = useRef<string>(params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '');

  const [displayDate, setDisplayDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: selectActionState.startDateStr,
    endDate: selectActionState.endDateStr,
  });

  const { targetDataRef, fireTrigger: fireDateRangeUpdate } = useHandlerDateRangeUpdate(params.onDateRangeUpdate);

  const selectStart = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

    anchorDateStr.current = currentAnchorDateStr;
    setSelectActionState((prev) => {
      if (prev.selectionMode === 'click') {
        return {
          actionState: 'idle',
          selectionMode: 'drag',
          startDateStr: prev.startDateStr,
          endDateStr: prev.endDateStr,
        };
      } else {
        if (prev.actionState === 'in-progress') {
          // 드래그 하다가 캘린더 밖으로 나갔다 온 케이스
          return {
            actionState: 'idle',
            selectionMode: 'drag',
            startDateStr: prev.startDateStr,
            endDateStr: prev.endDateStr,
          };
        } else {
          return {
            actionState: 'in-progress',
            selectionMode: prev.selectionMode,
            startDateStr: currentAnchorDateStr,
            endDateStr: currentAnchorDateStr,
          };
        }
      }
    });
  };
  const selectMove = (event: React.MouseEvent) => {
    if (selectActionState.actionState === 'idle') return;

    const currentAnchorDateStr = calculateCurrentDate(event);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

    setDisplayDate((prev) => {
      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: anchorDateStr.current,
        startDateStr: prev.startDate,
        endDateStr: prev.endDate,
        currentDateStr: currentAnchorDateStr,
      });

      return {
        startDate: newStartDateStr,
        endDate: newEndDateStr,
      };
    });

    setSelectActionState((prev) => {
      if (!prev.startDateStr) return prev;

      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: anchorDateStr.current,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });
      return { ...prev, startDateStr: newStartDateStr, endDateStr: newEndDateStr };
    });
  }
  const selectEnd = (e: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(e);
    if (!currentAnchorDateStr) return;
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange(
      dayjs(currentAnchorDateStr).toDate(),
      params.minDate,
      params.maxDate
    );
    if (!isValid || isOutOfRange) return;

    setDisplayDate((prev) => {
      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: anchorDateStr.current,
        startDateStr: prev.startDate,
        endDateStr: prev.endDate,
        currentDateStr: currentAnchorDateStr,
      });
      return {
        startDate: newStartDateStr,
        endDate: newEndDateStr,
      };
    });

    setSelectActionState((prev) => {
      if (
        anchorDateStr.current === currentAnchorDateStr &&
        prev.actionState === 'in-progress' &&
        prev.selectionMode === 'click'
      ) {
        return {
          actionState: 'idle',
          selectionMode: 'drag',
          startDateStr: anchorDateStr.current,
          endDateStr: anchorDateStr.current,
        };
      }

      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: anchorDateStr.current,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentAnchorDateStr,
      });

      const selectionMode = newStartDateStr === newEndDateStr ? 'click' : 'drag';

      targetDataRef.current = {
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
      };

      return {
        actionState: selectionMode === 'click' ? 'in-progress' : 'idle',
        selectionMode,
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
      };
    });
    fireDateRangeUpdate();
  };

  useEffect(() => {
    // 값에 대한 validation은 useCalendar에서 모두 처리하고 내려오니까 여기에서는 넘어온 값을 쓰기만 하면 된다!
    setDisplayDate({
      startDate: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
      endDate: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
    });
    setSelectActionState((prev) => {
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
    selectActionState: {
      ...selectActionState,
      anchorDateStr: anchorDateStr.current,
    },
    selectStart,
    selectMove: throttle(selectMove, 300),
    selectEnd,
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

const useHandlerDateRangeUpdate = (externalCallback: (...args: any[]) => void) => {
  const frozenExternalCallbackRef = useRef(externalCallback); // callback의 참조를 한번 얼리고

  // 매 렌더마다 callback의 참조를 업데이트 한다
  // callback 함수 내부에 다른 state가 있어서 외부 렌더 타이밍에 따라 callback 함수의 업데이트가 필요할 수 있으므로.
  frozenExternalCallbackRef.current = externalCallback;

  // 핵심은
  // 1. callback 의 참조가 계속 변해서, callback을 내부에서 호출하는 useEffect가 계속실행되는 것을 막는 것
  // 2. 이와 동시에 useEffect의 dep array를 react 원칙에 맞게 잘 채우는 것

  const [callDateRangeUpdateTrigger, setCallDateRangeUpdateTrigger] = useState(0);
  const updateTargetData = useRef({
    startDateStr: '',
    endDateStr: '',
  });
  useEffect(() => {
    frozenExternalCallbackRef.current(
      dayjs(updateTargetData.current.startDateStr).toDate(),
      dayjs(updateTargetData.current.endDateStr).toDate()
    );
  }, [callDateRangeUpdateTrigger]);

  return {
    targetDataRef: updateTargetData,
    fireTrigger: () => setCallDateRangeUpdateTrigger((prev) => prev + 1),
  };
  //-------
};
