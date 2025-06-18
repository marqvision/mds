import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import { MDSCalendar } from '../../../../components/organisms/DatePickers/Calendar';
import { MDSButton, MDSInput, MDSTypography } from '../../../../components';

const meta: Meta<typeof MDSCalendar> = {
  component: MDSCalendar,
  title: '2. Components/organisms/DatePickers/Calendar',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    value: new Date(),
    onChange: () => {},
  },
  argTypes: {
    value: {
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSCalendar>;

export const SingleDate: Story = {
  render: function Render() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const handleChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    const [inputValue, setInputValue] = useState<string>(selectedDate?.toLocaleDateString() || '');
    const submitInputChange = (value: string) => {
      const newDate = dayjs(value, 'MM/DD/YYYY').toDate();
      setSelectedDate(newDate);
    };
    return (
      <div>
        <div>
          <MDSTypography>선택한 날짜: {selectedDate?.toLocaleDateString()}</MDSTypography>
        </div>
        <div>
          <MDSInput
            variant="textField"
            value={inputValue}
            placeholder="MM/DD/YYYY"
            custom={{
              add: {
                label: '선택',
                onSubmit: submitInputChange,
              },
            }}
            onChange={setInputValue}
          />
        </div>
        <MDSCalendar value={selectedDate} onChange={handleChange} />
      </div>
    );
  },
};
export const SingleDateWithMinMaxAndDefaultValue: Story = {
  render: function Render() {
    const args = {
      value: new Date(),
      minDate: dayjs('2023-11-22').toDate(),
      maxDate: dayjs('2027-11-11').toDate(),
    };
    const [selectedDate, setSelectedDate] = useState<Date>(args.value as Date);
    const handleChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    const [inputValue, setInputValue] = useState<string>(selectedDate.toLocaleDateString());
    const submitInputChange = (value: string) => {
      const newDate = dayjs(value, 'MM/DD/YYYY').toDate();
      setSelectedDate(newDate);
    };
    return (
      <div>
        <div>
          <MDSTypography>minDate: {args.minDate.toLocaleDateString()}</MDSTypography>
          <MDSTypography>maxDate: {args.maxDate.toLocaleDateString()}</MDSTypography>
          <MDSTypography>선택한 날짜: {selectedDate?.toLocaleDateString()}</MDSTypography>
        </div>
        <div>
          <MDSInput
            variant="textField"
            value={inputValue}
            custom={{
              add: {
                label: '선택',
                onSubmit: submitInputChange,
              },
            }}
            onChange={setInputValue}
          />
        </div>
        <MDSCalendar value={selectedDate} onChange={handleChange} minDate={args.minDate} maxDate={args.maxDate} />
      </div>
    );
  },
};
export const DateRange: Story = {
  /**
   * todo - known issues
   * - [ ] start, end date에 같은 날짜를 선택 가능하는 기능
   * - [ ] date range를 선택 중일 때, border style을 dashed로 하면 두 날짜 셀이 만나는 부분에서 dashed 선이 뭉치는 문제
   */
  render: function Render() {
    const args = {
      value: {
        startDate: undefined,
        endDate: undefined,
      },
    };
    const [selectedDate, setSelectedDate] = useState<{ startDate?: Date; endDate?: Date }>(
      args.value as { startDate?: Date; endDate?: Date }
    );
    const handleChange = (startDate: Date, endDate: Date) => {
      setSelectedDate({ startDate, endDate });
    };

    const [inputStartDate, setInputStartDate] = useState<string>(selectedDate.startDate?.toLocaleDateString() || '');
    const [inputEndDate, setInputEndDate] = useState<string>(selectedDate.endDate?.toLocaleDateString() || '');
    const submitInputChange = (startDate: string, endDate: string) => {
      const newStartDate = dayjs(startDate, 'MM/DD/YYYY').toDate();
      const newEndDate = dayjs(endDate, 'MM/DD/YYYY').toDate();
      setSelectedDate({ startDate: newStartDate, endDate: newEndDate });
    };

    return (
      <div>
        <div>
          <MDSTypography>
            선택한 날짜 범위: {selectedDate.startDate?.toLocaleDateString()} -{' '}
            {selectedDate.endDate?.toLocaleDateString()}
          </MDSTypography>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '110px 4px 110px 60px', gap: '10px', alignItems: 'center' }}
        >
          <MDSInput variant="textField" value={inputStartDate} onChange={setInputStartDate} />
          ~
          <MDSInput variant="textField" value={inputEndDate} onChange={setInputEndDate} />
          <MDSButton onClick={() => submitInputChange(inputStartDate, inputEndDate)}>선택</MDSButton>
        </div>
        <MDSCalendar value={selectedDate} onChange={handleChange} />
      </div>
    );
  },
};
export const DateRangeWithMinMaxAndDefaultValue: Story = {
  /**
   * todo - known issues
   * - [ ] start, end date에 같은 날짜를 선택 가능하는 기능
   * - [ ] date range를 선택 중일 때, border style을 dashed로 하면 두 날짜 셀이 만나는 부분에서 dashed 선이 뭉치는 문제
   */
  render: function Render() {
    const args = {
      value: {
        startDate: new Date('2025-05-12'),
        endDate: new Date('2025-05-20'),
      },
      minDate: new Date('2025-05-03'),
      maxDate: new Date('2025-06-30'),
    };
    const [selectedDate, setSelectedDate] = useState<{ startDate: Date; endDate: Date }>(
      args.value as { startDate: Date; endDate: Date }
    );
    const handleChange = (startDate: Date, endDate: Date) => {
      setSelectedDate({ startDate, endDate });
    };

    const [inputStartDate, setInputStartDate] = useState<string>(selectedDate.startDate.toLocaleDateString());
    const [inputEndDate, setInputEndDate] = useState<string>(selectedDate.endDate.toLocaleDateString());
    const submitInputChange = (startDate: string, endDate: string) => {
      const newStartDate = dayjs(startDate, 'MM/DD/YYYY').toDate();
      const newEndDate = dayjs(endDate, 'MM/DD/YYYY').toDate();
      setSelectedDate({ startDate: newStartDate, endDate: newEndDate });
    };

    return (
      <div>
        <div>
          <MDSTypography>minDate: {args.minDate.toLocaleDateString()}</MDSTypography>
          <MDSTypography>maxDate: {args.maxDate.toLocaleDateString()}</MDSTypography>
          <MDSTypography>
            선택한 날짜 범위: {selectedDate.startDate.toLocaleDateString()} -{' '}
            {selectedDate.endDate.toLocaleDateString()}
          </MDSTypography>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '110px 4px 110px 60px', gap: '10px', alignItems: 'center' }}
        >
          <MDSInput variant="textField" value={inputStartDate} onChange={setInputStartDate} />
          ~
          <MDSInput variant="textField" value={inputEndDate} onChange={setInputEndDate} />
          <MDSButton onClick={() => submitInputChange(inputStartDate, inputEndDate)}>선택</MDSButton>
        </div>
        <MDSCalendar value={selectedDate} minDate={args.minDate} maxDate={args.maxDate} onChange={handleChange} />
      </div>
    );
  },
};
