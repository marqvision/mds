import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { MDSDateInput } from '../../../../components/organisms/DatePickers/DateInput';
import { MDSInput, MDSTypography } from '../../../../components';

const meta: Meta<typeof MDSDateInput> = {
  component: MDSDateInput,
  title: '2. Components/organisms/DatePickers/DateInput',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof MDSDateInput>;

const testGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DefaultWithMMDDYYYY: Story = {
  name: 'Default with MM/DD/YYYY format',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<string | undefined>('01/15/2025');

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 1: 포맷 {format} + 기본값</MDSTypography>
        <MDSDateInput
          format={format}
          value={date}
          placeholder={`${format} 형태의 date string을 입력`}
          onDateChange={(date) => {
            setDate(date ? dayjs(date).format(format) : '');
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>selected date: {date}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const DefaultWithYYYYMMDD: Story = {
  name: 'Default with YYYY-MM-DD format',
  render: function Render() {
    const format = 'YYYY-MM-DD';
    const [date, setDate] = useState<string | undefined>('2025-01-15');

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 2: 포맷 {format} + 기본값</MDSTypography>
        <MDSDateInput
          format={format}
          value={date}
          placeholder={`${format} 형태의 date string을 입력`}
          onDateChange={(date) => {
            setDate(date ? dayjs(date).format(format) : '');
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>selected date: {date}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const NoDefaultValue: Story = {
  name: 'No Default Value',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<string | undefined>();

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 3: 포맷 {format} + 기본값 없음</MDSTypography>
        <MDSDateInput
          format={format}
          value={date}
          placeholder={`${format} 형태의 date string을 입력`}
          onDateChange={(date) => {
            setDate(date ? dayjs(date).format(format) : '');
          }}
        />
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>selected date: {date}</MDSTypography>
        </div>
      </div>
    );
  },
};

export const ExternallyInjectedValue: Story = {
  name: 'Externally Injected Value',
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [injectedDate, setInjectedDate] = useState<string>('');
    const [dateInput, setDateInput] = useState<string>('');
    const [dateFromMDSDateInput, setDateFromMDSDateInput] = useState<string>('');

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 4: 포맷 {format} + 외부에서 값 주입</MDSTypography>
        <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '10px', width: '320px' }}>
          <MDSTypography variant="title" size="m">
            외부 주입을 위한 컴포넌트
          </MDSTypography>
          <MDSInput
            value={dateInput}
            label="date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate(value);
                },
              },
            }}
            onChange={(value) => {
              setDateInput(value);
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            MDSDateInput
          </MDSTypography>
          <MDSDateInput
            format={format}
            value={injectedDate}
            onDateChange={(date) => {
              setDateFromMDSDateInput(date ? dayjs(date).format(format) : '');
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>selected date: {dateFromMDSDateInput}</MDSTypography>
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
    const [injectedDate, setInjectedDate] = useState<string>('');
    const [dateInput, setDateInput] = useState<string>('');
    const [dateFromMDSDateInput, setDateFromMDSDateInput] = useState<string>('');

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
            value={dateInput}
            label="date"
            placeholder={format}
            custom={{
              add: {
                label: '완료',
                onSubmit: (value) => {
                  setInjectedDate(value);
                },
              },
            }}
            onChange={(value) => {
              setDateInput(value);
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            MDSDateInput
          </MDSTypography>
          <MDSDateInput
            format={format}
            value={injectedDate}
            minDate={dayjs(minDateStr).toDate()}
            maxDate={dayjs(maxDateStr).toDate()}
            onDateChange={(date) => {
              setDateFromMDSDateInput(date ? dayjs(date).format(format) : '');
            }}
          />
        </div>
        <div>
          <MDSTypography variant="title" size="m">
            결과
          </MDSTypography>
          <MDSTypography>selected date: {dateFromMDSDateInput}</MDSTypography>
        </div>
      </div>
    );
  },
};
