import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import { css } from '@emotion/react';
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
  flex-direction: column;
  gap: 12px;
`;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<string | undefined>(undefined);
    const handleChange = (date: string | undefined) => {
      setDate(date);
    };
    return (
      <div css={testGroupStyle}>
        
        <MDSDatePicker value={date} format="YYYY-MM-DD" onChange={handleChange} />
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
