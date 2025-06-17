
import { Meta, StoryObj } from '@storybook/react';
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
  args: {
    value: '2025-01-01',
    onChange: () => {},
  },
  argTypes: {
    value: {
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSDateInputGroup>;


export const Preview: Story = {
  args: {
    value: '2025-01-01',
    onChange: () => {},
  },
};