import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
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
  render: function Render() {
    const format1 = 'MM/DD/YYYY';
    const format2 = 'YYYY-MM-DD';
    const [date1, setDate1] = useState<{ start: string; end: string }>({
      start: dayjs().format(format1),
      end: dayjs().add(1, 'day').format(format1),
    });
    const [date2, setDate2] = useState<{ start: string; end: string }>({
      start: dayjs().format(format2),
      end: dayjs().add(1, 'day').format(format2),
    });
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <MDSTypography variant="title">포맷: {format1}</MDSTypography>
          <MDSDateInputGroup
            format={format1} // 기본값
            startDate={{ value: date1.start }}
            endDate={{ value: date1.end }}
            onDateChange={(dates) => {
              setDate1({
                start: dates.startDate ? dayjs(dates.startDate).format(format1) : '',
                end: dates.endDate ? dayjs(dates.endDate).format(format1) : '',
              });
            }}
          />
          <div>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>startDate: {date1.start}</MDSTypography>
            <MDSTypography>endDate: {date1.end}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSTypography variant="title">포맷: {format2}</MDSTypography>
          <MDSDateInputGroup
            format={format2}
            startDate={{ value: date2.start }}
            endDate={{ value: date2.end }}
            onDateChange={(dates) => {
              setDate2({
                start: dates.startDate ? dayjs(dates.startDate).format(format2) : '',
                end: dates.endDate ? dayjs(dates.endDate).format(format2) : '',
              });
            }}
          />
          <div>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>startDate: {date2.start}</MDSTypography>
            <MDSTypography>endDate: {date2.end}</MDSTypography>
          </div>
        </div>
      </div>
    );
  },
};
