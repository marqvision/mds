import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSDropdown } from '../../../molecules/Dropdown';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSTypography } from '../../../atoms/Typography';
import { AVAILABLE_YEARS, MONTH_LABELS } from './@constants';

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
          list={list.years}
          value={props.displayedDate.year()}
          isDisabled={isDisabled.year}
          onChange={(value) => handlers.handleYearChange(value)}
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
    onChange(displayedDate.year(year));
  };

  const handlePrevMonth = () => {
    onChange(displayedDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    onChange(displayedDate.add(1, 'month'));
  };

  const isPrevMonthDisabled = minDate && displayedDate.isBefore(dayjs(minDate).add(1, 'month'), 'month');
  const isNextMonthDisabled = maxDate && displayedDate.isAfter(dayjs(maxDate).subtract(1, 'month'), 'month');

  const isYearDisabled =
    minDate &&
    maxDate &&
    displayedDate.isBefore(dayjs(minDate).add(1, 'year'), 'year') &&
    displayedDate.isAfter(dayjs(maxDate).subtract(1, 'year'), 'year');
  const years = AVAILABLE_YEARS.map((year) => ({
    label: year.format('YYYY'),
    value: year.year(),
    isDisabled: year.isBefore(dayjs(minDate), 'year') || year.isAfter(dayjs(maxDate), 'year'),
  }));

  const isMonthDisabled =
    minDate &&
    maxDate &&
    displayedDate.isBefore(dayjs(minDate).add(1, 'month'), 'month') &&
    displayedDate.isAfter(dayjs(maxDate).subtract(1, 'month'), 'month');
  const months = MONTH_LABELS.map((month, index) => ({
    label: month,
    value: index,
    isDisabled:
      dayjs(`${displayedDate.year()}-${index + 1}-01`).isBefore(dayjs(minDate), 'month') ||
      dayjs(`${displayedDate.year()}-${index + 1}-01`).isAfter(dayjs(maxDate), 'month'),
  }));

  return {
    isDisabled: {
      prevMonth: isPrevMonthDisabled,
      nextMonth: isNextMonthDisabled,
      year: isYearDisabled,
      month: isMonthDisabled,
      yearMonth: isYearDisabled || isMonthDisabled,
    },
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
