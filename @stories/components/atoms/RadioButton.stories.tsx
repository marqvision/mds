import React, { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { MDSRadioButton, MDSTag, MDSTypography } from '../../../components';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSRadioButton> = {
  component: MDSRadioButton,
  title: '2. Components/atoms/Radio button',
  args: {
    value: 'test',
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSRadioButton>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'grid',
        justifyItems: 'flex-start',
        gap: '24px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  args: {
    selectedValue: 'test',
    value: 'test',
    label: '라디오 버튼',
  },
  render: function Render(props) {
    const [{ selectedValue, value }, setArgs] = useArgs();

    const handleChange = (selectedValue: string) => {
      setArgs({ selectedValue });
    };

    return (
      <Wrapper>
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};

export const RadioButtonGroup: StoryFn = () => {
  type Value = 'test' | 'test2';
  const [selectedValue, setSelectedValue] = useState<Value>('test');

  const handleChange = (value: Value) => {
    setSelectedValue(value);
  };

  return (
    <Wrapper>
      <MDSTypography>
        selectedValue 를 하나의 state 로 바라보게 함으로써 동일 그룹으로 취급할 수 있습니다.
        <br />
        selectedValue 와 value 값이 동일하면 selected(checked) 상태로 변경됩니다.
      </MDSTypography>
      <MDSRadioButton selectedValue={selectedValue} value="test" label="첫번재 라디오" onChange={handleChange} />
      <MDSRadioButton selectedValue={selectedValue} value="test2" label="두번째 라디오" onChange={handleChange} />
    </Wrapper>
  );
};

export const Color: Story = {
  args: {
    selectedValue: 'selected',
    value: 'selected',
  },
  render: function Render(props) {
    const [{ selectedValue, value }, setArgs] = useArgs();

    const handleChange = (selectedValue: string) => {
      setArgs({ selectedValue });
    };

    return (
      <Wrapper>
        <MDSTypography>
          선택된 상태의 색상을 변경할 수 있습니다.
          <br />
          색상을 지정하지 않았을 시 기본값 blue 로 설정됩니다.
        </MDSTypography>
        <MDSRadioButton
          {...props}
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: blue"
        />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: bluegray"
        />
      </Wrapper>
    );
  },
};

export const Disabled: Story = {
  args: {
    selectedValue: 'selected',
    value: 'selected',
    isDisabled: true,
  },
  render: function Render(props) {
    const [{ selectedValue, value }, setArgs] = useArgs();

    const handleChange = (selectedValue: string) => {
      setArgs({ selectedValue });
    };

    return (
      <Wrapper>
        <MDSTypography>
          선택됨 + 비활성화 상태의 색상을 변경할 수 있습니다.
          <br />
          색상을 지정하지 않았을 시 기본값 blue 로 설정됩니다.
        </MDSTypography>
        <MDSRadioButton
          {...props}
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: blue"
        />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: bluegray"
        />
      </Wrapper>
    );
  },
};

export const UnSelected: Story = {
  args: {
    selectedValue: 'selected',
    value: 'unSelected',
  },
  render: function Render(props) {
    const [{ selectedValue, value }, setArgs] = useArgs();

    const handleChange = (selectedValue: string) => {
      setArgs({ selectedValue });
    };

    return (
      <Wrapper>
        <MDSTypography>
          선택되지 않았을때에는 색상 구분이 없습니다.
          <br />
          비활성화 상태에도 동일합니다.
        </MDSTypography>
        <MDSRadioButton
          {...props}
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: blue"
        />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: bluegray"
        />
        <MDSRadioButton
          {...props}
          selectedValue={selectedValue}
          value={value}
          isDisabled
          onChange={handleChange}
          label="color: blue"
        />
        <MDSRadioButton
          {...props}
          isDisabled
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
          label="color: bluegray"
        />
      </Wrapper>
    );
  },
};

export const CustomLabel: Story = {
  args: {
    selectedValue: 'test',
    value: 'test',
    label: (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <MDSTag size="medium" variant="tint" color="yellow">
          Tag
        </MDSTag>
        <MDSTypography color="inherit">Label</MDSTypography>
      </div>
    ),
    gap: 8,
  },
  render: function Render(props) {
    const [{ selectedValue, value }, setArgs] = useArgs();

    const handleChange = (selectedValue: string) => {
      setArgs({ selectedValue });
    };

    return (
      <Wrapper>
        <MDSTypography>
          label 을 ReactNode 형태로 전달할 수 있습니다.
          <br />
          기본적으로 disabled 상태 시 color 가 변경되므로, MDSTypography 컴포넌트를 전달한다면 color=&quot;inherit&quot;
          으로 설정하는 것을 권장합니다.
        </MDSTypography>
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};
