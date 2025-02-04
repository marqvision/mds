import React, { useState } from 'react';
import { useArgs } from '@storybook/preview-api';
import { MDSRadioButton, MDSTypography2 } from '../components';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSRadioButton> = {
  component: MDSRadioButton,
  title: '2. Components/Radio button',
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
        display: 'flex',
        flexDirection: 'column',
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
      <MDSTypography2>
        selectedValue 를 하나의 state 로 바라보게 함으로써 동일 그룹으로 취급할 수 있습니다.
        <br />
        selectedValue 와 value 값이 동일하면 selected(checked) 상태로 변경됩니다.
      </MDSTypography2>
      <MDSRadioButton selectedValue={selectedValue} value="test" onChange={handleChange} />
      <MDSRadioButton selectedValue={selectedValue} value="test2" onChange={handleChange} />
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
        <MDSTypography2>
          선택된 상태의 색상을 변경할 수 있습니다.
          <br />
          색상을 지정하지 않았을 시 기본값 blue 로 설정됩니다.
        </MDSTypography2>
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} onChange={handleChange} />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
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
        <MDSTypography2>
          선택됨 + 비활성화 상태의 색상을 변경할 수 있습니다.
          <br />
          색상을 지정하지 않았을 시 기본값 blue 로 설정됩니다.
        </MDSTypography2>
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} onChange={handleChange} />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
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
        <MDSTypography2>
          선택되지 않았을때에는 색상 구분이 없습니다.
          <br />
          비활성화 상태에도 동일합니다.
        </MDSTypography2>
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} onChange={handleChange} />
        <MDSRadioButton
          {...props}
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
        />
        <MDSRadioButton {...props} selectedValue={selectedValue} value={value} isDisabled onChange={handleChange} />
        <MDSRadioButton
          {...props}
          isDisabled
          color="bluegray"
          selectedValue={selectedValue}
          value={value}
          onChange={handleChange}
        />
      </Wrapper>
    );
  },
};
