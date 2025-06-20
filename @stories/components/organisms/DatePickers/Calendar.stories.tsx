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
  args: {
    value: new Date(),
    onChange: () => {},
  },
  argTypes: {
    value: {
      control: 'date',
    },
  },
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
export const DateRange: Story = {
  /**
   * todo - known issues
   * - [ ] start, end date에 같은 날짜를 선택 가능하는 기능
   */
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'YYYY-MM-DD',
    };

    const [injectedDate, setInjectedDate] = useState<{ start?: string; end?: string }>({});
    const [dateInput, setDateInput] = useState<{ start?: string; end?: string }>({});
    const [dateFromMDSDateInput, setDateFromMDSDateInput] = useState<{ start?: string; end?: string }>({});

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
              value={dateInput.start || ''}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
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
              fullWidth
              variant="textField"
              value={dateInput.end || ''}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
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
              {dateFromMDSDateInput.start
                ? dayjs(dateFromMDSDateInput.start, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)
                : ''}
            </MDSTypography>
            <MDSTypography>
              선택한 end date:{' '}
              {dateFromMDSDateInput.end
                ? dayjs(dateFromMDSDateInput.end, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)
                : ''}
            </MDSTypography>
          </div>
        </div>
        <MDSCalendar
          value={{
            startDate: injectedDate.start ? dayjs(injectedDate.start, DEFAULT_VALUE.format).toDate() : undefined,
            endDate: injectedDate.end ? dayjs(injectedDate.end, DEFAULT_VALUE.format).toDate() : undefined,
          }}
          onChange={(startDate, endDate) => {
            setDateFromMDSDateInput({
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
  /**
   * todo - known issues
   * - [ ] start, end date에 같은 날짜를 선택 가능하는 기능
   */
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'YYYY-MM-DD',
      minDate: '2023-11-22',
      maxDate: '2027-11-22',
      startDate: '2025-06-10',
      endDate: '2025-06-20',
    };
    const [dateInput, setDateInput] = useState<{ start?: string; end?: string }>({});
    const [dateFromMDSDateInput, setDateFromMDSDateInput] = useState<{ start: Date; end: Date }>({
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
              value={dateInput.start || ''}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setDateFromMDSDateInput((prev) => ({
                      ...prev,
                      start: dayjs(value, DEFAULT_VALUE.format).toDate(),
                    }));
                  },
                },
              }}
              onChange={(value) => {
                setDateInput({ ...dateInput, start: value });
              }}
            />
            <MDSInput
              fullWidth
              variant="textField"
              value={dateInput.end || ''}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setDateFromMDSDateInput((prev) => ({
                      ...prev,
                      end: dayjs(value, DEFAULT_VALUE.format).toDate(),
                    }));
                  },
                },
              }}
              onChange={(value) => {
                setDateInput({ ...dateInput, end: value });
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
              선택한 start date: {dayjs(dateFromMDSDateInput.start, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)}
            </MDSTypography>
            <MDSTypography>
              선택한 end date: {dayjs(dateFromMDSDateInput.end, DEFAULT_VALUE.format).format(DEFAULT_VALUE.format)}
            </MDSTypography>
          </div>
        </div>
        <MDSCalendar
          value={{
            startDate: dayjs(dateFromMDSDateInput.start, DEFAULT_VALUE.format).toDate(),
            endDate: dayjs(dateFromMDSDateInput.end, DEFAULT_VALUE.format).toDate(),
          }}
          onChange={(startDate, endDate) => {
            setDateFromMDSDateInput({
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
