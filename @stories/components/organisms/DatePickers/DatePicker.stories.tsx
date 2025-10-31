import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import dayjs from 'dayjs';
import { MDSDatePicker } from '../../../../components/organisms/DatePickers/DatePicker';
import { MDSIcon, MDSPlainButton } from '../../../../components';

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

  args: {
    value: dayjs().format('YYYY-MM-DD'),
    format: 'MMM DD, YYYY',
    minDate: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    maxDate: dayjs().add(1, 'year').format('YYYY-MM-DD'),
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['MM/DD/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY'],
    },
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDatePicker>;

export const AnchorInput: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'input',
      mdsInputProps: {
        label: 'Date picker - input type',
        placeholder: 'PLACEHOLDER ',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<string | undefined>(args.value);
    const handleChange = (date?: string | undefined) => {
      console.log('date', date);
      setDate(date);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <MDSDatePicker
        anchor={anchorProps}
        value={date}
        format={args.format}
        minDate={args.minDate}
        maxDate={args.maxDate}
        onChange={handleChange}
      />
    );
  },
};

export const AnchorFilter: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'filter',
      mdsButtonProps: {
        children: 'Date range picker - filter type',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<string | undefined>(args.value);
    const handleChange = (dates?: string) => {
      console.log('dates', dates);
      setDate(dates);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSDatePicker
          anchor={anchorProps}
          value={date}
          format={args.format}
          minDate={args.minDate}
          maxDate={args.maxDate}
          onChange={handleChange}
        />
        {date && (
          <MDSPlainButton color="blue" startIcon={<MDSIcon.Reset />} onClick={() => setDate(undefined)}>
            Reset
          </MDSPlainButton>
        )}
      </div>
    );
  },
};

export const AnchorPlainButton: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'plainButton',
      mdsPlainButtonProps: {
        children: 'Date range picker - plain button type',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<string | undefined>(args.value);
    const handleChange = (dates?: string) => {
      console.log('dates', dates);
      setDate(dates);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <MDSDatePicker
        anchor={anchorProps}
        value={date}
        format={args.format}
        minDate={args.minDate}
        maxDate={args.maxDate}
        onChange={handleChange}
      />
    );
  },
};

export const AnchorCustom: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'custom',
      children: ({ selectedDate }) => (
        <div style={{ border: '1px solid lightgray', padding: '10px', width: 'fit-content' }}>
          <div>자유롭게 anchor 요소를 구성할 수도 있습니다</div>
          <div>이 요소를 클릭하세요!</div>
          <div>선택된 날짜: {JSON.stringify(selectedDate)}</div>
        </div>
      ),
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<string | undefined>(args.value);
    const handleChange = (date: string | undefined) => {
      setDate(date);
    };
    return (
      <MDSDatePicker
        value={date}
        format={args.format}
        onChange={handleChange}
        minDate={args.minDate}
        maxDate={args.maxDate}
        anchor={args.anchor}
      />
    );
  },
};
