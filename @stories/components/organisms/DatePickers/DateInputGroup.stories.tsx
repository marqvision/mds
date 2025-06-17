import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import { MDSDateInputGroup } from '../../../../components/organisms/DatePickers/DateInputGroup';

const meta: Meta<typeof MDSDateInputGroup> = {
  component: MDSDateInputGroup,
  title: '2. Components/organisms/DatePickers/DateInputGroup',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    startDate: {
      control: 'object',
    },
    endDate: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSDateInputGroup>;

export const Preview: Story = {
  args: {
    startDate: {
      format: 'MM/DD/YYYY',
      onChange: () => {},
    },
    endDate: {
      format: 'MM/DD/YYYY',
      onChange: () => {},
    },
  },
  render: function Render() {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    return (
      <MDSDateInputGroup
        startDate={{ value: startDate, onChange: setStartDate }}
        endDate={{ value: endDate, onChange: setEndDate }}
      />
    );
  },
};
