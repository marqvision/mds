import { Meta, StoryObj } from '@storybook/react';
import { MDSDateRangePicker } from '../../../../components/organisms/DatePickers/DateRangePicker';

const meta: Meta<typeof MDSDateRangePicker> = {
  component: MDSDateRangePicker,
  title: '2. Components/organisms/DatePickers/DateRangePicker',
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
type Story = StoryObj<typeof MDSDateRangePicker>;

export const Default: Story = {
  render: function Render() {
    return <MDSDateRangePicker />;
  },
};
