import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import { MDSDatePicker } from '../../../../components/organisms/DatePickers/DatePicker';

const meta: Meta<typeof MDSDatePicker> = {
  component: MDSDatePicker,
  title: '2. Components/organisms/DatePickers/DatePicker',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDatePicker>;

export const AnchorCustom: Story = {
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<string | undefined>(dayjs().format(format));
    const handleChange = (date: string | undefined) => {
      setDate(date);
    };
    return (
      <MDSDatePicker
        value={date}
        format={format}
        onChange={handleChange}
        anchor={{
          variant: 'custom',
          children: ({ selectedDate }) => <div>{selectedDate}</div>,
        }}
      />
    );
  },
};
