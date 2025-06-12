import { Meta, StoryObj } from '@storybook/react';
import { MDSCalendar } from '../../../../components/organisms/DatePickers/Calendar';

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


export const Preview: Story = {
  args: {
    value: new Date(),
    minDate: new Date('2025-06-03'),
    maxDate: new Date('2025-06-20'),
    onChange: () => {},
  },
};