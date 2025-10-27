import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import throttle from 'lodash/throttle';
import { validateDateAndMinMaxRange } from '../../@utils';
import { LastUpdatedDateKind } from '../@types';

type DateRangeSelectParams = {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (
    startDate: Date,
    lastDate: Date,
    lastUpdatedDateType: 'startDate' | 'endDate',
    actionState: 'initial' | 'in-progress' | 'done'
  ) => void;
};

type SelectActionState = {
  actionState: 'initial' | 'in-progress' | 'done'; // initial: 초기 상태, in-progress: 선택 중, done: 선택 완료(start, end date 확정)
  startDateStr: string;
  endDateStr: string;
};
export const useDateRangeSelect = (params: DateRangeSelectParams) => {
  const [selectActionState, setSelectActionState] = useState<SelectActionState>(() => {
    if (params.startDate && params.endDate) {
      return {
        actionState: 'done',
        startDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
        endDateStr: dayjs(params.endDate).format('YYYY-MM-DD'),
      };
    } else {
      return {
        actionState: 'initial',
        startDateStr: '',
        endDateStr: '',
      };
    }
  });
  const anchorDateStrRef = useRef(selectActionState.startDateStr);
  const { targetDataRef, fireTrigger: fireDateRangeUpdate } = useHandlerDateRangeUpdate(params.onDateRangeUpdate);

  const selectStart = (e: React.MouseEvent) => {
    const clickedDateStr = calculateCurrentDate(e);
    if (!clickedDateStr) return;

    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({
      date: dayjs(clickedDateStr).toDate(),
      minDate: params.minDate,
      maxDate: params.maxDate,
    });

    if (!isValid || isOutOfRange) return;

    if (selectActionState.actionState === 'in-progress') {
      // Second click: finalize the selection
      const { newStartDateStr, newEndDateStr, lastUpdatedDateType } = resolveDateRange({
        anchorDateStr: anchorDateStrRef.current,
        startDateStr: selectActionState.startDateStr,
        endDateStr: selectActionState.endDateStr,
        currentDateStr: clickedDateStr,
      });

      targetDataRef.current = {
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
        lastUpdatedDateType,
        actionState: 'done'
      };
      fireDateRangeUpdate();

      setSelectActionState({
        actionState: 'done',
        startDateStr: newStartDateStr,
        endDateStr: newEndDateStr,
      });
    } else {
      // First click: start the selection
      anchorDateStrRef.current = clickedDateStr;
      setSelectActionState({
        actionState: 'in-progress',
        startDateStr: clickedDateStr,
        endDateStr: clickedDateStr,
      });
    }
  };

  const selectMove = (event: React.MouseEvent) => {
    if (selectActionState.actionState !== 'in-progress') return;

    const currentHoverDateStr = calculateCurrentDate(event);
    if (!currentHoverDateStr) return;

    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({
      date: dayjs(currentHoverDateStr).toDate(),
      minDate: params.minDate,
      maxDate: params.maxDate,
    });

    if (!isValid || isOutOfRange) return;

    setSelectActionState((prev) => {
      const { newStartDateStr, newEndDateStr } = resolveDateRange({
        anchorDateStr: anchorDateStrRef.current,
        startDateStr: prev.startDateStr,
        endDateStr: prev.endDateStr,
        currentDateStr: currentHoverDateStr,
      });
      return { ...prev, startDateStr: newStartDateStr, endDateStr: newEndDateStr };
    });
  };

  const selectEnd = (e: React.MouseEvent) => {
    const clickedDateStr = calculateCurrentDate(e);
    if (!clickedDateStr) return;
    if (selectActionState.actionState === 'in-progress') {
      setSelectActionState((prev) => ({
        actionState: 'in-progress',
        startDateStr: prev.startDateStr,
        endDateStr: clickedDateStr,
      }));
      targetDataRef.current = {
        startDateStr: selectActionState.startDateStr,
        endDateStr: clickedDateStr,
        lastUpdatedDateType: 'endDate',
        actionState: selectActionState.actionState,
      };
      fireDateRangeUpdate();
    }
  };

  useEffect(() => {
    // 값에 대한 validation은 useCalendar에서 모두 처리하고 내려오니까 여기에서는 넘어온 값을 쓰기만 하면 된다!
    setSelectActionState((prev) => {
      if (prev.actionState === 'in-progress') {
        return prev;
      } else {
        anchorDateStrRef.current = params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '';
        return {
          ...prev,
          startDateStr: params.startDate ? dayjs(params.startDate).format('YYYY-MM-DD') : '',
          endDateStr: params.endDate ? dayjs(params.endDate).format('YYYY-MM-DD') : '',
        };
      }
    });
  }, [params.startDate, params.endDate]);

  return {
    selectActionState: {
      ...selectActionState,
      anchorDateStr: anchorDateStrRef.current,
    },
    displayDate: {
      startDate: selectActionState.startDateStr,
      endDate: selectActionState.endDateStr,
    },
    selectStart,
    selectMove: throttle(selectMove, 30),
    selectEnd,
  };
};
//#region helper functions &  hooks
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

  let lastUpdatedDateType: LastUpdatedDateKind = 'startDate';
  if (currentDate.isBefore(anchorDate, 'day')) {
    newStartDateStr = params.currentDateStr;
    newEndDateStr = params.anchorDateStr;
    lastUpdatedDateType = 'startDate';
  } else if (currentDate.isAfter(anchorDate, 'day')) {
    newStartDateStr = params.anchorDateStr;
    newEndDateStr = params.currentDateStr;
    lastUpdatedDateType = 'endDate';
  } else if (currentDate.isSame(anchorDate, 'day')) {
    newStartDateStr = params.anchorDateStr;
    newEndDateStr = params.anchorDateStr;
    lastUpdatedDateType = 'endDate';
  }

  return { newStartDateStr, newEndDateStr, lastUpdatedDateType };
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
    lastUpdatedDateType: 'startDate',
    actionState: 'initial',
  });
  useEffect(() => {
    frozenExternalCallbackRef.current(
      dayjs(updateTargetData.current.startDateStr).toDate(),
      dayjs(updateTargetData.current.endDateStr).toDate(),
      updateTargetData.current.lastUpdatedDateType,
      updateTargetData.current.actionState
    );
  }, [callDateRangeUpdateTrigger]);

  return {
    targetDataRef: updateTargetData,
    fireTrigger: () => setCallDateRangeUpdateTrigger((prev) => prev + 1),
  };
  //-------
};
//#endregion
