import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSDropdown } from '../../../molecules/Dropdown';
import { MDSPlainButton } from '../../../molecules/PlainButton';

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

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const YEARS = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i); // todo-@jamie: 스펙에 따라 전/후년도 기간 업데이트하기

type Props = {
  value: dayjs.Dayjs;
  onChange: (value: dayjs.Dayjs) => void;
};

export const YearMonthSelector = (props: Props) => {
  const { value, onChange } = props;

  const handleMonthChange = (month: number) => {
    onChange(value.month(month));
  };

  const handleYearChange = (year: number) => {
    onChange(value.year(year));
  };

  const handlePrevMonth = () => {
    onChange(value.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    onChange(value.add(1, 'month'));
  };

  return (
    <MonthSelectorContainer>
      <MDSPlainButton
        color="bluegray"
        onClick={handlePrevMonth}
        icon={<MDSIcon.ArrowLeft variant="outline" size={24} />}
      />
      <YearMonth>
        <MDSDropdown
          list={YEARS.map((year) => ({
            label: year.toString(),
            value: year,
          }))}
          value={value.year()}
          onChange={(value) => handleYearChange(value)}
          renderAnchor={(value) => (
            <MDSPlainButton color="bluegray" size="large" endIcon={<MDSIcon.ArrowDown variant="outline" size={20} />}>
              {value}
            </MDSPlainButton>
          )}
        />

        <MDSDropdown
          list={MONTHS.map((month, index) => ({
            label: month,
            value: index,
          }))}
          value={value.month()}
          onChange={(value) => handleMonthChange(value)}
          renderAnchor={(value) => (
            <MDSPlainButton color="bluegray" size="large" endIcon={<MDSIcon.ArrowDown variant="outline" size={20} />}>
              {typeof value === 'number' ? MONTHS[value] : ''}
            </MDSPlainButton>
          )}
        />
      </YearMonth>
      <MDSPlainButton
        color="bluegray"
        onClick={handleNextMonth}
        icon={<MDSIcon.ArrowRight variant="outline" size={24} />}
      />
    </MonthSelectorContainer>
  );
};
