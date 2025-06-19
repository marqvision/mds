import { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {
  render: function Render() {
    return <MDSDatePicker />;
  },
};
