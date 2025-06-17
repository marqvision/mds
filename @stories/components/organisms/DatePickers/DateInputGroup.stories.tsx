import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
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

const DefaultWithMMDDYYYYRenderer = () => {
  const format = 'MM/DD/YYYY';
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: dayjs().format(format),
    end: dayjs().add(1, 'day').format(format),
  });

  return (
    <TestGroup>
      <MDSTypography variant="title">Case 1: 포맷 MM/DD/YYYY + 기본값</MDSTypography>
      <MDSDateInputGroup
        format={format}
        startDate={{ value: date.start }}
        endDate={{ value: date.end }}
        onDateChange={(dates) => {
          setDate({
            start: dates.startDate ? dayjs(dates.startDate).format(format) : '',
            end: dates.endDate ? dayjs(dates.endDate).format(format) : '',
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
    </TestGroup>
  );
};

export const DefaultWithMMDDYYYY: Story = {
  name: 'Default with MM/DD/YYYY format',
  render: () => <DefaultWithMMDDYYYYRenderer />,
};

const DefaultWithYYYYMMDDRenderer = () => {
  const format = 'YYYY-MM-DD';
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: dayjs().format(format),
    end: dayjs().add(1, 'day').format(format),
  });

  return (
    <TestGroup>
      <MDSTypography variant="title">Case 2: 포맷 YYYY-MM-DD + 기본값</MDSTypography>
      <MDSDateInputGroup
        format={format}
        startDate={{ value: date.start }}
        endDate={{ value: date.end }}
        onDateChange={(dates) => {
          setDate({
            start: dates.startDate ? dayjs(dates.startDate).format(format) : '',
            end: dates.endDate ? dayjs(dates.endDate).format(format) : '',
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
    </TestGroup>
  );
};

export const DefaultWithYYYYMMDD: Story = {
  name: 'Default with YYYY-MM-DD format',
  render: () => <DefaultWithYYYYMMDDRenderer />,
};

const NoDefaultValueRenderer = () => {
  const format = 'MM/DD/YYYY';
  const [date, setDate] = useState<{ start: string; end: string }>({ start: '', end: '' });

  return (
    <TestGroup>
      <MDSTypography variant="title">Case 3: 포맷 MM/DD/YYYY + 기본값 없음</MDSTypography>
      <MDSDateInputGroup
        format={format}
        startDate={{ value: date.start }}
        endDate={{ value: date.end }}
        onDateChange={(dates) => {
          setDate({
            start: dates.startDate ? dayjs(dates.startDate).format(format) : '',
            end: dates.endDate ? dayjs(dates.endDate).format(format) : '',
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
    </TestGroup>
  );
};

export const NoDefaultValue: Story = {
  name: 'No Default Value',
  render: () => <NoDefaultValueRenderer />,
};

const ExternallyInjectedValueRenderer = () => {
  const format = 'MM/DD/YYYY';
  const [date, setDate] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [dateInput, setDateInput] = useState<{ start: string; end: string }>({ start: '', end: '' });

  return (
    <TestGroup>
      <MDSTypography variant="title">Case 4: 포맷 MM/DD/YYYY + 외부에서 값 주입</MDSTypography>
      <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '10px', width: '300px' }}>
        <MDSTypography variant="title" size="m">
          외부 주입을 위한 컴포넌트
        </MDSTypography>
        <MDSInput
          value={dateInput.start}
          label="start date"
          custom={{
            add: {
              label: '완료',
              onSubmit: (value) => {
                setDate({ ...date, start: value });
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
          custom={{
            add: {
              label: '완료',
              onSubmit: (value) => {
                setDate({ ...date, end: value });
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
          startDate={{ value: date.start }}
          endDate={{ value: date.end }}
          onDateChange={(dates) => {
            setDate({
              start: dates.startDate ? dayjs(dates.startDate).format(format) : '',
              end: dates.endDate ? dayjs(dates.endDate).format(format) : '',
            });
          }}
        />
      </div>
      <div>
        <MDSTypography variant="title" size="m">
          결과
        </MDSTypography>
        <MDSTypography>startDate: {date.start}</MDSTypography>
        <MDSTypography>endDate: {date.end}</MDSTypography>
      </div>
    </TestGroup>
  );
};

export const ExternallyInjectedValue: Story = {
  name: 'Externally Injected Value',
  render: () => <ExternallyInjectedValueRenderer />,
};
