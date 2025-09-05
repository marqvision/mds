import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { MDSCalendar } from '../../../../components/organisms/DatePickers/Calendar';
import { MDSInput, MDSTypography } from '../../../../components';

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
};

export default meta;
type Story = StoryObj<typeof MDSCalendar>;

const testGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const dataBoxLayout = css`
  display: flex;
  gap: 24px;
`;
const dataBoxStyle = css`
  border: 1px solid lightgray;
  padding: 20px;
  border-radius: 10px;
  width: 304px;
  display: grid;
  gap: 12px;
`;

export const SingleDate: Story = {
  render: function Render() {
    const onChange = (date: Date) => {
      console.log('date', date);
    };
    return <MDSCalendar value={new Date('2024-01-01')} onChange={onChange} />;
  },
};
export const DateRange: Story = {
  render: function Render() {
    const onChange = (startDate: Date, endDate: Date) => {
      console.log('startDate', startDate);
      console.log('endDate', endDate);
    };
    return <MDSCalendar value={{ startDate: new Date(), endDate: new Date() }} onChange={onChange} />;
  },
};
export const SingleDateWithMinMax: Story = {
  args: {
    minDate: dayjs().subtract(5, 'day').toDate(),
    maxDate: dayjs().add(5, 'day').toDate(),
  },
  argTypes: {
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
  },
  render: function Render(args) {
    const onChange = (date: Date) => {
      console.log('date', date);
    };
    return <MDSCalendar value={new Date()} onChange={onChange} minDate={args.minDate} maxDate={args.maxDate} />;
  },
};
export const DateRangeWithMinMax: Story = {
  args: {
    minDate: dayjs().subtract(8, 'day').toDate(),
    maxDate: dayjs().add(8, 'day').toDate(),
  },
  render: function Render(args) {
    const onChange = (startDate: Date, endDate: Date) => {
      console.log('startDate', startDate);
      console.log('endDate', endDate);
    };

    return (
      <MDSCalendar
        value={{ startDate: new Date(), endDate: new Date() }}
        onChange={onChange}
        minDate={args.minDate}
        maxDate={args.maxDate}
      />
    );
  },
};

export const SingleDateWithDefaultValue: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'MM/DD/YYYY',
    };

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const handleChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    const [inputValue, setInputValue] = useState<string>(selectedDate?.toLocaleDateString() || '');
    const submitInputChange = (value: string) => {
      const newDate = dayjs(value, DEFAULT_VALUE.format).toDate();
      setSelectedDate(newDate);
    };
    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 1: 단일 날짜 선택</MDSTypography>

        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              fullWidth
              variant="textField"
              value={inputValue}
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '선택',
                  onSubmit: submitInputChange,
                },
              }}
              onChange={setInputValue}
            />
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              props
            </MDSTypography>
            <div>
              <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
            </div>
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>선택한 날짜: {selectedDate?.toLocaleDateString()}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSCalendar value={selectedDate} onChange={handleChange} />
        </div>
      </div>
    );
  },
};
export const SingleDateWithMinMaxAndDefaultValue: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'MM/DD/YYYY',
      minDate: '11/22/2023',
      maxDate: '11/22/2027',
      value: '06/20/2025',
    };

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const handleChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    const [inputValue, setInputValue] = useState<string>(dayjs(selectedDate).format(DEFAULT_VALUE.format));
    const submitInputChange = (value: string) => {
      const newDate = dayjs(value, DEFAULT_VALUE.format).toDate();
      setSelectedDate(newDate);
    };
    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 2: 단일 날짜 + min/max + 기본값</MDSTypography>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              fullWidth
              variant="textField"
              value={inputValue}
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '선택',
                  onSubmit: submitInputChange,
                },
              }}
              onChange={setInputValue}
            />
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              props
            </MDSTypography>
            <div>
              <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
            </div>
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>선택한 날짜: {dayjs(selectedDate).format(DEFAULT_VALUE.format)}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSCalendar
            value={selectedDate}
            onChange={handleChange}
            minDate={dayjs(DEFAULT_VALUE.minDate, DEFAULT_VALUE.format).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate, DEFAULT_VALUE.format).toDate()}
          />
        </div>
      </div>
    );
  },
};
export const DateRangeWithDefaultValue: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'YYYY-MM-DD',
    };

    const [tempDateInputState, setTempDateInputState] = useState<{ start?: string; end?: string }>({});
    const [selectedDate, setSelectedDate] = useState<{ start?: string; end?: string }>({});

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 3: Date range</MDSTypography>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>

            <MDSInput
              fullWidth
              variant="textField"
              value={tempDateInputState.start || ''}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate((prev) => ({ ...prev, start: value }));
                  },
                },
              }}
              onChange={(value) => {
                setTempDateInputState({ ...tempDateInputState, start: value });
              }}
            />
            <MDSInput
              fullWidth
              variant="textField"
              value={tempDateInputState.end || ''}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate((prev) => ({ ...prev, end: value }));
                  },
                },
              }}
              onChange={(value) => {
                setTempDateInputState({ ...tempDateInputState, end: value });
              }}
            />
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              props
            </MDSTypography>
            <div>
              <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
            </div>
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>
              선택한 start date:{' '}
              {selectedDate.start ? dayjs(selectedDate.start, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format) : ''}
            </MDSTypography>
            <MDSTypography>
              선택한 end date:{' '}
              {selectedDate.end ? dayjs(selectedDate.end, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format) : ''}
            </MDSTypography>
          </div>
        </div>
        <MDSCalendar
          value={{
            startDate: selectedDate.start ? dayjs(selectedDate.start, DEFAULT_VALUE.format).toDate() : undefined,
            endDate: selectedDate.end ? dayjs(selectedDate.end, DEFAULT_VALUE.format).toDate() : undefined,
          }}
          onChange={(startDate, endDate) => {
            setSelectedDate({
              start: dayjs(startDate).format(DEFAULT_VALUE.format),
              end: dayjs(endDate).format(DEFAULT_VALUE.format),
            });
          }}
        />
      </div>
    );
  },
};
export const DateRangeWithMinMaxAndDefaultValue: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'YYYY-MM-DD',
      minDate: '2023-11-22',
      maxDate: '2027-11-22',
      startDate: '2025-06-10',
      endDate: '2025-06-20',
    };
    const [tempDateInputState, setTempDateInputState] = useState<{ start?: string; end?: string }>({});
    const [selectedDate, setSelectedDate] = useState<{ start: Date; end: Date }>({
      start: dayjs(DEFAULT_VALUE.startDate, DEFAULT_VALUE.format).toDate(),
      end: dayjs(DEFAULT_VALUE.endDate, DEFAULT_VALUE.format).toDate(),
    });

    return (
      <div css={testGroupStyle}>
        <MDSTypography variant="title">Case 3: Date range</MDSTypography>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>

            <MDSInput
              fullWidth
              variant="textField"
              value={tempDateInputState.start || ''}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate((prev) => ({
                      ...prev,
                      start: dayjs(value, DEFAULT_VALUE.format).toDate(),
                    }));
                  },
                },
              }}
              onChange={(value) => {
                setTempDateInputState({ ...tempDateInputState, start: value });
              }}
            />
            <MDSInput
              fullWidth
              variant="textField"
              value={tempDateInputState.end || ''}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate((prev) => ({
                      ...prev,
                      end: dayjs(value, DEFAULT_VALUE.format).toDate(),
                    }));
                  },
                },
              }}
              onChange={(value) => {
                setTempDateInputState({ ...tempDateInputState, end: value });
              }}
            />
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              props
            </MDSTypography>
            <div>
              <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
            </div>
          </div>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              결과
            </MDSTypography>
            <MDSTypography>
              선택한 start date: {dayjs(selectedDate.start, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)}
            </MDSTypography>
            <MDSTypography>
              선택한 end date: {dayjs(selectedDate.end, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)}
            </MDSTypography>
          </div>
        </div>
        <MDSCalendar
          value={{
            startDate: dayjs(selectedDate.start, DEFAULT_VALUE.format).toDate(),
            endDate: dayjs(selectedDate.end, DEFAULT_VALUE.format).toDate(),
          }}
          onChange={(startDate, endDate) => {
            setSelectedDate({
              start: startDate,
              end: endDate,
            });
          }}
          minDate={dayjs(DEFAULT_VALUE.minDate, DEFAULT_VALUE.format).toDate()}
          maxDate={dayjs(DEFAULT_VALUE.maxDate, DEFAULT_VALUE.format).toDate()}
        />
      </div>
    );
  },
};
