import { useMemo } from 'react';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSDropdown } from '../../../molecules/Dropdown';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSTypography } from '../../../atoms/Typography';
import { validateDateAndMinMaxRange } from '../@utils';
import { AVAILABLE_YEARS, MONTH_LABELS } from './@constants';

dayjs.extend(minMax);

const MonthSelectorContainer = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const YearMonth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type Props = {
  displayedDate: dayjs.Dayjs;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: dayjs.Dayjs) => void;
};

export const YearMonthSelector = (props: Props) => {
  const { isDisabled, list, handlers } = useYearMonthSelector(props);

  return (
    <MonthSelectorContainer>
      <MDSPlainButton
        color="bluegray"
        onClick={handlers.handlePrevMonth}
        icon={<MDSIcon.ArrowLeft variant="outline" size={24} />}
        isDisabled={isDisabled.prevMonth}
      />
      <YearMonth>
        <MDSDropdown
          list={list.months}
          value={props.displayedDate.month()}
          isDisabled={isDisabled.month}
          onChange={(value) => handlers.handleMonthChange(value)}
          renderAnchor={(value) =>
            isDisabled.month ? (
              <MDSTypography variant="body" size="l" weight="medium">
                {typeof value === 'number' ? MONTH_LABELS[value] : ''}
              </MDSTypography>
            ) : (
              <MDSPlainButton color="bluegray" size="large" endIcon={<MDSIcon.ArrowDown variant="outline" size={20} />}>
                {typeof value === 'number' ? MONTH_LABELS[value] : ''}
              </MDSPlainButton>
            )
          }
        />

        <MDSDropdown
          list={list.years}
          value={props.displayedDate.year()}
          isDisabled={isDisabled.year}
          onChange={handlers.handleYearChange}
          renderAnchor={(value) =>
            isDisabled.year ? (
              <MDSTypography variant="body" size="l" weight="medium">
                {value}
              </MDSTypography>
            ) : (
              <MDSPlainButton color="bluegray" size="large" endIcon={<MDSIcon.ArrowDown variant="outline" size={20} />}>
                {value}
              </MDSPlainButton>
            )
          }
        />
      </YearMonth>
      <MDSPlainButton
        color="bluegray"
        onClick={handlers.handleNextMonth}
        icon={<MDSIcon.ArrowRight variant="outline" size={24} />}
        isDisabled={isDisabled.nextMonth}
      />
    </MonthSelectorContainer>
  );
};

const useYearMonthSelector = (props: Props) => {
  const { displayedDate, minDate, maxDate, onChange } = props;
  const handleMonthChange = (month: number) => {
    onChange(displayedDate.month(month));
  };

  const handleYearChange = (year: number) => {
    // year 값을 바꾸었을 때 displayedDate가 min/maxDate를 초과하는 케이스 처리 --> 선택 가능한 month view로 보여준다.
    let newYearMonth = dayjs(new Date(year, displayedDate.month(), 1));
    if (minDate) {
      const minBound = dayjs.max(dayjs(new Date(year, displayedDate.month(), 1)), dayjs(minDate));
      newYearMonth = minBound || newYearMonth;
    }
    if (maxDate) {
      const maxBound = dayjs.min(newYearMonth, dayjs(maxDate));
      newYearMonth = maxBound || newYearMonth;
    }

    onChange(newYearMonth);
  };

  const handlePrevMonth = () => {
    onChange(displayedDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    onChange(displayedDate.add(1, 'month'));
  };

  const isDisabled = useMemo(() => {
    const result = {
      prevMonth: false,
      nextMonth: false,
      year: false,
      month: false,
      yearMonth: false,
    };
    if (minDate) {
      result.prevMonth = displayedDate.isBefore(dayjs(minDate).add(1, 'month'), 'month');
    }
    if (maxDate) {
      result.nextMonth = displayedDate.isAfter(dayjs(maxDate).subtract(1, 'month'), 'month');
    }
    if (minDate && maxDate) {
      result.year =
        displayedDate.isBefore(dayjs(minDate).add(1, 'year'), 'year') &&
        displayedDate.isAfter(dayjs(maxDate).subtract(1, 'year'), 'year');
      result.month =
        displayedDate.isBefore(dayjs(minDate).add(1, 'month'), 'month') &&
        displayedDate.isAfter(dayjs(maxDate).subtract(1, 'month'), 'month');
      result.yearMonth = result.year || result.month;
    }

    return result;
  }, [displayedDate, minDate, maxDate]);

  const isAllEnabled = !minDate && !maxDate;

  const years = AVAILABLE_YEARS.map((year) => ({
    label: year.format('YYYY'),
    value: year.year(),
    isDisabled: isAllEnabled
      ? false
      : validateDateAndMinMaxRange({
          date: year.toDate(),
          minDate,
          maxDate,
          unit: 'year',
        }).isOutOfRange,
  }));

  const months = MONTH_LABELS.map((month, index) => ({
    label: month,
    value: index,
    isDisabled: isAllEnabled
      ? false
      : validateDateAndMinMaxRange({
          date: dayjs(`${displayedDate.year()}-${index + 1}-01`).toDate(),
          minDate,
          maxDate,
          unit: 'month',
        }).isOutOfRange,
  }));

  return {
    isDisabled,
    list: {
      years,
      months,
    },
    handlers: {
      handleMonthChange,
      handleYearChange,
      handlePrevMonth,
      handleNextMonth,
    },
  };
};
