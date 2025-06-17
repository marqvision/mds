import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSDateInputGroup } from '../../../../components/organisms/DatePickers/DateInputGroup';
import { MDSInput, MDSTypography } from '../../../../components';

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

const TestGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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
    const [date3, setDate3] = useState<{ start: string; end: string }>({ start: '', end: '' });

    const [date4, setDate4] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [date4Input, setDate4Input] = useState<{ start: string; end: string }>({ start: '', end: '' });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        <TestGroup>
          <MDSTypography variant="title">Case 1: 포맷 {format1} + 기본값</MDSTypography>
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
        </TestGroup>
        <TestGroup>
          <MDSTypography variant="title">Case 2: 포맷 {format2} + 기본값</MDSTypography>
          <MDSDateInputGroup
            format={format2} // 기본값
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
        </TestGroup>
        <TestGroup>
          <MDSTypography variant="title">Case 3: 포맷 {format1} + 기본값 없음</MDSTypography>
          <MDSDateInputGroup
            format={format1}
            startDate={{ value: date3.start }}
            endDate={{ value: date3.end }}
            onDateChange={(dates) => {
              setDate3({
                start: dates.startDate ? dayjs(dates.startDate).format(format1) : '',
                end: dates.endDate ? dayjs(dates.endDate).format(format1) : '',
              });
            }}
          />
          <div>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>startDate: {date3.start}</MDSTypography>
            <MDSTypography>endDate: {date3.end}</MDSTypography>
          </div>
        </TestGroup>

        <TestGroup>
          <MDSTypography variant="title">Case 4: 포맷 {format1} + 외부에서 값 주입</MDSTypography>
          <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '10px' }}>
            <MDSTypography variant="title" size="m">
              외부 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              value={date4Input.start}
              label="start date"
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setDate4({ ...date4, start: value });
                  },
                },
              }}
              onChange={(value) => {
                setDate4Input({ ...date4Input, start: value });
              }}
            />
            <MDSInput
              value={date4Input.end}
              label="end date"
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setDate4({ ...date4, end: value });
                  },
                },
              }}
              onChange={(value) => {
                setDate4Input({ ...date4Input, end: value });
              }}
            />
          </div>
          <div>
            <MDSTypography variant="title" size="m">
              MDSDateInputGroup
            </MDSTypography>
            <MDSDateInputGroup
              format={format1}
              startDate={{ value: date4.start }}
              endDate={{ value: date4.end }}
              onDateChange={(dates) => {
                setDate4({
                  start: dates.startDate ? dayjs(dates.startDate).format(format1) : '',
                  end: dates.endDate ? dayjs(dates.endDate).format(format1) : '',
                });
              }}
            />
          </div>
          <div>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>startDate: {date4.start}</MDSTypography>
            <MDSTypography>endDate: {date4.end}</MDSTypography>
          </div>
        </TestGroup>
      </div>
    );
  },
};
