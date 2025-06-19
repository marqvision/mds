import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { MDSDatePicker } from '../../../../components/organisms/DatePickers/DatePicker';
import { MDSTypography } from '../../../../components';

const meta: Meta<typeof MDSDatePicker> = {
  component: MDSDatePicker,
  title: '2. Components/organisms/DatePickers/DatePicker',
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
type Story = StoryObj<typeof MDSDatePicker>;

const testGroupStyle = css`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const Default: Story = {
  render: function Render() {
    const format = 'MM/DD/YYYY';
    const [date, setDate] = useState<string | undefined>(dayjs().format(format));
    const handleChange = (date: string | undefined) => {
      setDate(date);
    };
    return (
      <div css={testGroupStyle}>
        <MDSDatePicker
          value={date}
          format={format}
          onChange={handleChange}
          anchorSelectProps={{
            label: 'Label',
            placeholder: 'YYYY-MM-DD',
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

export const MinMax: Story = {
  render: function Render() {
    const format = 'YYYY-MM-DD';
    const [date, setDate] = useState<string | undefined>(undefined);
    const handleChange = (date: string | undefined) => {
      setDate(date);
    };
    return (
      <div css={testGroupStyle}>
        <MDSDatePicker
          value={date}
          format={format}
          anchorSelectProps={{
            label: 'Start date',
            placeholder: 'YYYY-MM-DD',
          }}
          minDate={new Date('2025-06-07')}
          maxDate={new Date('2025-06-28')}
          onChange={handleChange}
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
