import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import { MDSCalendar } from '../../../../components/organisms/DatePickers/Calendar';
import { MDSTypography } from '../../../../components';

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
  args: {
    value: new Date(),
    minDate: dayjs().subtract(10, 'day').toDate(),
    maxDate: dayjs().add(10, 'day').toDate(),
  },
  render: function Render(args) {
    const [selectedDate, setSelectedDate] = useState<Date>(args.value as Date);
    const handleChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };
    return (
      <div>
        <MDSTypography>선택한 날짜: {selectedDate?.toLocaleDateString()}</MDSTypography>
        <MDSCalendar value={selectedDate} onChange={handleChange} minDate={args.minDate} maxDate={args.maxDate} />;
      </div>
    );
  },
};
export const DateRange: Story = {
  args: {
    value: {
      startDate: new Date('2025-05-12'),
      endDate: new Date('2025-06-20'),
    },
    minDate: new Date('2025-05-03'),
    maxDate: new Date('2025-06-30'),
    onChange: (startDate: Date, endDate: Date) => {
      alert(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    },
  },
  render: function Render(args) {
    const [selectedDate, setSelectedDate] = useState<{ startDate: Date; endDate: Date }>(
      args.value as { startDate: Date; endDate: Date }
    );
    const handleChange = (newDate: Date) => {
      setSelectedDate({ ...selectedDate, startDate: newDate });
    };
    return (
      <div>
        <MDSTypography>
          선택한 날짜 범위: {selectedDate.startDate.toLocaleDateString()} - {selectedDate.endDate.toLocaleDateString()}
        </MDSTypography>
        <MDSCalendar value={selectedDate} onChange={handleChange} />;
      </div>
    );
  },
};
