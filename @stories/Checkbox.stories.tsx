import React from 'react';
import { useArgs } from '@storybook/preview-api';
import { MDSCheckbox } from '../components/Checkbox';
import { MDSThemeValue } from '../foundation';
import { MDSTypography } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSCheckbox> = {
  component: MDSCheckbox,
  title: '2. Components/Checkbox',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSCheckbox>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        backgroundColor: MDSThemeValue._raw_color.bluegray500,
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: function Render(props) {
    const [{ isChecked }, setArgs] = useArgs();

    const handleChange = (isChecked: boolean) => {
      setArgs({ isChecked });
    };

    return (
      <Wrapper>
        <MDSCheckbox {...props} isChecked={isChecked} onChange={handleChange} />
      </Wrapper>
    );
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    isChecked: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>가로 세로 20px 의 small 사이즈 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox {...props} isChecked={false} isIndeterminate={true} />
      <MDSCheckbox {...props} isChecked={false} />
    </Wrapper>
  ),
};

export const Medium: Story = {
  args: {
    size: 'medium',
    isChecked: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>가로 세로 24px 의 medium 사이즈 입니다.</MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox {...props} isChecked={false} isIndeterminate={true} />
      <MDSCheckbox {...props} isChecked={false} />
    </Wrapper>
  ),
};

export const Checked: Story = {
  args: {
    isChecked: true,
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
    isChecked: true,
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
    isChecked: false,
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
    isChecked: false,
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
    isIndeterminate: true,
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
    isDisabled: true,
    isIndeterminate: true,
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

export const IndeterminateWithCheck: Story = {
  args: {
    isChecked: true,
    isIndeterminate: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>
        isIndeterminate 와 isChecked 값이 둘 다 true 라면
        <br /> isIndeterminate 상태를 무시하고 checked 스타일로 우선 적용됩니다.
      </MDSTypography>
      <MDSCheckbox {...props} />
      <MDSCheckbox color="white" {...props} />
      <MDSCheckbox color="bluegray" {...props} />
    </Wrapper>
  ),
};
