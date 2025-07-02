import { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import { useState } from '@storybook/preview-api';
import dayjs from 'dayjs';
import {
  MDSDateRangePicker,
  MDSDateRangePickerProps,
} from '../../../../components/organisms/DatePickers/DateRangePicker';
import { MDSDivider, MDSInput, MDSTypography } from '../../../../components';

const meta: Meta<typeof MDSDateRangePicker> = {
  component: MDSDateRangePicker,
  title: '2. Components/organisms/DatePickers/DateRangePicker',
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
type Story = StoryObj<typeof MDSDateRangePicker>;

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
  width: 320px;
  display: grid;
  gap: 12px;
`;

export const AnchorInput: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'MM/DD/YYYY',
      startDate: {
        value: '06/11/2025',
      },
      endDate: {
        value: '06/25/2025',
      },
      anchor: {
        variant: 'input',
        format: 'MM/DD/YYYY',
        separator: 'to',
        startDateProps: {
          label: 'Start date label'
        }
      } as MDSDateRangePickerProps['anchor'],
      minDate: '06/02/2025', //'2025-06-02',
      maxDate: '07/02/2025', //'2025-07-02',
    };
    const [selectedDate, setSelectedDate] = useState<{
      startDate: Date | null;
      endDate: Date | null;
    }>({
      startDate: dayjs(DEFAULT_VALUE.startDate.value).toDate(),
      endDate: dayjs(DEFAULT_VALUE.endDate.value).toDate(),
    });
    const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
      setSelectedDate(dates);
      setDateFromMDSDateRangePicker({
        start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
        end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
      });
    };

    return (
      <div css={testGroupStyle}>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              fullWidth
              value={tempDateRangeInput.start}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, start: value });
              }}
            />
            <MDSInput
              fullWidth
              value={tempDateRangeInput.end}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, end: value });
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
            <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
            <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSDateRangePicker
            anchor={{
              variant: 'input',
              format: 'MM/DD/YYYY',
              separator: 'to',
            }}
            startDate={{
              value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
              label: 'Start date',
            }}
            endDate={{
              value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
              label: 'End date',
            }}
            format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
            minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
            onChange={handleChange}
          />
        </div>

        <MDSDivider style={{ margin: '24px 0' }} />

        <div css={dataBoxStyle}>
          <MDSTypography variant="title" size="m">
            Start date label만 있을 때
          </MDSTypography>
          <MDSDateRangePicker
            anchor={DEFAULT_VALUE.anchor}
            startDate={{
              value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
              label: 'Start date',
            }}
            endDate={{
              value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
            minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
            onChange={handleChange}
          />
        </div>
        <div css={dataBoxStyle}>
          <MDSTypography variant="title" size="m">
            label이 없을 때
          </MDSTypography>
          <MDSDateRangePicker
            anchor={{
              variant: 'input',
              format: 'MM/DD/YYYY',
              separator: 'to',
            }}
            startDate={{
              value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            endDate={{
              value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
            minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  },
};

export const AnchorButton: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'MM/DD/YYYY',
      minDate: '06/02/2025', //'2025-06-02',
      maxDate: '07/02/2025', //'2025-07-02',
    };
    const [selectedDate, setSelectedDate] = useState<{
      startDate: Date | null;
      endDate: Date | null;
    }>({
      startDate: null,
      endDate: null,
    });
    const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
      setSelectedDate(dates);
      setDateFromMDSDateRangePicker({
        start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
        end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
      });
    };

    return (
      <div css={testGroupStyle}>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              fullWidth
              value={tempDateRangeInput.start}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, start: value });
              }}
            />
            <MDSInput
              fullWidth
              value={tempDateRangeInput.end}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, end: value });
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
            <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
            <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSDateRangePicker
            anchor={{
              variant: 'button',
              format: 'MMM DD, YYYY',
              separator: ' ~ ',
              props: {
                children: 'Button',
              },
            }}
            startDate={{
              value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            endDate={{
              value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
            minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  },
};

export const AnchorPlainButton: Story = {
  render: function Render() {
    const DEFAULT_VALUE = {
      format: 'MM/DD/YYYY',
      startDate: '06/11/2025',
      endDate: '06/25/2025',
      minDate: '06/02/2025', //'2025-06-02',
      maxDate: '07/02/2025', //'2025-07-02',
    };
    const [selectedDate, setSelectedDate] = useState<{
      startDate: Date | null;
      endDate: Date | null;
    }>({
      startDate: dayjs(DEFAULT_VALUE.startDate).toDate(),
      endDate: dayjs(DEFAULT_VALUE.endDate).toDate(),
    });
    const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
      start: '',
      end: '',
    });
    const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
      setSelectedDate(dates);
      setDateFromMDSDateRangePicker({
        start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
        end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
      });
    };

    return (
      <div css={testGroupStyle}>
        <div css={dataBoxLayout}>
          <div css={dataBoxStyle}>
            <MDSTypography variant="title" size="m">
              외부 값 주입을 위한 컴포넌트
            </MDSTypography>
            <MDSInput
              fullWidth
              value={tempDateRangeInput.start}
              label="start date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, start: value });
              }}
            />
            <MDSInput
              fullWidth
              value={tempDateRangeInput.end}
              label="end date"
              placeholder={DEFAULT_VALUE.format}
              custom={{
                add: {
                  label: '완료',
                  onSubmit: (value) => {
                    setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
                  },
                },
              }}
              onChange={(value) => {
                setTempDateRangeInput({ ...tempDateRangeInput, end: value });
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
            <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
            <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
          </div>
        </div>
        <div>
          <MDSDateRangePicker
            anchor={{
              variant: 'plainButton',
              format: 'MMM DD, YYYY',
              separator: ' ~ ',
              props: {
                children: 'Button',
              },
            }}
            startDate={{
              value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            endDate={{
              value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
            }}
            format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
            minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
            maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  },
};

export const AnchorCustom: Story = {
  render: function Render() {
    return (
      <div css={testGroupStyle}>
        <div>
          <MDSDateRangePicker
            anchor={{
              variant: 'custom',
              children: ({ open, close }) => (
                <div onClick={open}>
                  <div>🚧 In progress - function style</div>
                </div>
              ),
            }}
          />
        </div>
        <div>
          <MDSDateRangePicker
            anchor={{
              variant: 'custom',
              children: <div>🚧 In progress - component style</div>,
            }}
          />
        </div>
      </div>
    );
  },
};
