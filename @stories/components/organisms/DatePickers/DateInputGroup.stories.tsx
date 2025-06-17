import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import { MDSDateInputGroup } from '../../../../components/organisms/DatePickers/DateInputGroup';
import { MDSTypography } from '../../../../components';

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
      onChange: () => {},
    },
    endDate: {
      onChange: () => {},
    },
  },
  render: function Render() {
    const [date1, setDate1] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [date2, setDate2] = useState<{ start: string; end: string }>({ start: '', end: '' });
    return (
      <div>
        <div>
          <MDSTypography>포맷: MM/DD/YYYY</MDSTypography>
          <MDSDateInputGroup
            format="MM/DD/YYYY" // 기본값
            startDate={{ value: date1.start, onChange: (value) => setDate1({ ...date1, start: value }) }}
            endDate={{ value: date1.end, onChange: (value) => setDate1({ ...date1, end: value }) }}
          />
        </div>
        <div>
          <MDSTypography>포맷: YYYY-MM-DD</MDSTypography>
          <MDSDateInputGroup
            format="YYYY-MM-DD"
            startDate={{ value: date2.start, onChange: (value) => setDate2({ ...date2, start: value }) }}
            endDate={{ value: date2.end, onChange: (value) => setDate2({ ...date2, end: value }) }}
          />
        </div>
      </div>
    );
  },
};
