import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { useTheme } from '@emotion/react';
import { MDSCheckbox } from '../../../components/atoms/Checkbox';
import { MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSCheckbox> = {
  component: MDSCheckbox,
  title: '2. Components/atoms/Checkbox',
  args: {
    value: false,
  },
  argTypes: {
    value: {
      control: 'radio',
      options: [true, false, 'indeterminate'],
    },
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSCheckbox>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  const { _raw_color } = useTheme();
  return (
    <div
      style={{
        padding: '24px',
        display: 'grid',
        justifyItems: 'flex-start',
        gap: '24px',
        backgroundColor: _raw_color.bluegray500,
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSCheckbox {...props} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>가로 세로 20px 의 small 사이즈 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox {...props} value="indeterminate" />
      <MDSCheckbox {...props} value={false} />
    </Wrapper>
  ),
};

export const Medium: Story = {
  args: {
    size: 'medium',
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>가로 세로 24px 의 medium 사이즈 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox {...props} value="indeterminate" />
      <MDSCheckbox {...props} value={false} />
    </Wrapper>
  ),
};

export const Checked: Story = {
  args: {
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 된 상태입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

export const CheckedDisabled: Story = {
  args: {
    value: true,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 되었으나 비활성화 된 상태 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

export const UnChecked: Story = {
  args: {
    value: false,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 되지 않은 상태입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

export const UnCheckedDisabled: Story = {
  args: {
    value: false,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>Check 되지 않고 비활성화 된 상태 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

export const Indeterminate: Story = {
  args: {
    value: 'indeterminate',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>불확정 Check 상태입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};

export const IndeterminateDisabled: Story = {
  args: {
    value: 'indeterminate',
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>불확정 Check + 비활성화 된 상태입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};
