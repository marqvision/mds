import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
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

const testGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DefaultWithMMDDYYYY: Story = {
  name: 'Default with MM/DD/YYYY format',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<{ start: string; end: string }>({
      start: dayjs().format(format),
      end: dayjs().add(1, 'day').format(format),
    });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 1: 포맷 {format} + 기본값</MDSTypography>
        <MDSDateInputGroup
          format={format}
          startDate={{ value: date.start, placeholder: 'start date' }}
          endDate={{ value: date.end }}
          onDateChange={(dates) => {
            setDate({
              start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
              end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
            });
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {date.start}</MDSTypography>
          <MDSTypography>endDate: {date.end}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const DefaultWithYYYYMMDD: Story = {
  name: 'Default with YYYY-MM-DD format',
  render: function Render() {
    const format = 'YYYY-MM-DD';
    const [date, setDate] = useState<{ start: string; end: string }>({
      start: dayjs().format(format),
      end: dayjs().add(1, 'day').format(format),
    });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 2: 포맷 {format} + 기본값</MDSTypography>
        <MDSDateInputGroup
          format={format}
          startDate={{ value: date.start }}
          endDate={{ value: date.end }}
          onDateChange={(dates) => {
            setDate({
              start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
              end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
            });
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {date.start}</MDSTypography>
          <MDSTypography>endDate: {date.end}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const NoDefaultValue: Story = {
  name: 'No Default Value',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<{ start: string; end: string }>({ start: '', end: '' });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 3: 포맷 {format} + 기본값 없음</MDSTypography>
        <MDSDateInputGroup
          format={format}
          startDate={{ value: date.start }}
          endDate={{ value: date.end }}
          onDateChange={(dates) => {
            setDate({
              start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
              end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
            });
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {date.start}</MDSTypography>
          <MDSTypography>endDate: {date.end}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const ExternallyInjectedValue: Story = {
  name: 'Externally Injected Value',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [injectedDate, setInjectedDate] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [dateInput, setDateInput] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [dateFromMDSDateInputGroup, setDateFromMDSDateInputGroup] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 4: 포맷 {format} + 외부에서 값 주입</MDSTypography>
        <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '10px', width: '320px' }}>
          <MDSTypography variant="title" size="m">
            외부 주입을 위한 컴포넌트
          </MDSTypography>
          <MDSInput
            value={dateInput.start}
            label="start date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate({ ...injectedDate, start: value });
                },
              },
            }}
            onChange={(value) => {
              setDateInput({ ...dateInput, start: value });
            }}
          />
          <MDSInput
            value={dateInput.end}
            label="end date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate({ ...injectedDate, end: value });
                },
              },
            }}
            onChange={(value) => {
              setDateInput({ ...dateInput, end: value });
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            MDSDateInputGroup
          </MDSTypography>
          <MDSDateInputGroup
            format={format}
            startDate={{ value: injectedDate.start }}
            endDate={{ value: injectedDate.end }}
            onDateChange={(dates) => {
              setDateFromMDSDateInputGroup({
                start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
                end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
              });
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {dateFromMDSDateInputGroup.start}</MDSTypography>
          <MDSTypography>endDate: {dateFromMDSDateInputGroup.end}</MDSTypography>
        </div>
      </div>
    );
  },
};

// min, max 설정한 케이스

export const MinMax: Story = {
  name: 'Min max',
  render: function Render() {
    const format = 'YYYY-MM-DD';
    const minDateStr = '2025-06-03';
    const maxDateStr = '2025-06-18';
    const [injectedDate, setInjectedDate] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [dateInput, setDateInput] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [dateFromMDSDateInputGroup, setDateFromMDSDateInputGroup] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 5: 포맷 {format} + min, max 설정</MDSTypography>
        <div>
          <MDSTypography variant="title" size="m">
            minDate: {minDateStr}
          </MDSTypography>
          <MDSTypography variant="title" size="m">
            maxDate: {maxDateStr}
          </MDSTypography>
        </div>
        <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '10px', width: '320px' }}>
          <MDSTypography variant="title" size="m">
            외부 주입을 위한 컴포넌트
          </MDSTypography>
          <MDSInput
            value={dateInput.start}
            label="start date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate({ ...injectedDate, start: value });
                },
              },
            }}
            onChange={(value) => {
              setDateInput({ ...dateInput, start: value });
            }}
          />
          <MDSInput
            value={dateInput.end}
            label="end date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate({ ...injectedDate, end: value });
                },
              },
            }}
            onChange={(value) => {
              setDateInput({ ...dateInput, end: value });
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            MDSDateInputGroup
          </MDSTypography>
          <MDSDateInputGroup
            format={format}
            minDate={dayjs(minDateStr).toDate()}
            maxDate={dayjs(maxDateStr).toDate()}
            startDate={{ value: injectedDate.start }}
            endDate={{ value: injectedDate.end }}
            onDateChange={(dates) => {
              setDateFromMDSDateInputGroup({
                start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
                end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
              });
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {dateFromMDSDateInputGroup.start}</MDSTypography>
          <MDSTypography>endDate: {dateFromMDSDateInputGroup.end}</MDSTypography>
        </div>
      </div>
    );
  },
};




export const WithInputLabel: Story = {
  name: 'Input label 설정',
  args: {
    startDate: {
      label: 'Start date label'      
    },
    endDate: {
      label: 'End date label'
    }
  },
  render: function Render(arg) {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<{ start: string; end: string }>({ start: '', end: '' });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 6: InputProps 설정</MDSTypography>
        <MDSDateInputGroup
          format={format}
          startDate={{ value: date.start, ...arg.startDate }}
          endDate={{ value: date.end, ...arg.endDate }}
          onDateChange={(dates) => {
            setDate({
              start: dates?.startDate ? dayjs(dates.startDate).format(format) : '',
              end: dates?.endDate ? dayjs(dates.endDate).format(format) : '',
            });
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>startDate: {date.start}</MDSTypography>
          <MDSTypography>endDate: {date.end}</MDSTypography>
        </div>
      </div>
    );
  },
};
