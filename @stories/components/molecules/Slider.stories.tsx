import React from 'react';
import { useArgs } from 'storybook/preview-api';
import { MDSSlider } from '../../../components/molecules/Slider';
import { MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSSlider> = {
  component: MDSSlider,
  title: '2. Components/molecules/Slider',
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    isDisabled: false,
    hasLabel: true,
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    isDisabled: {
      control: 'boolean',
    },
    hasLabel: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSSlider>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '400px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (newValue: number) => {
      setArgs({ value: newValue });
    };

    return (
      <Wrapper>
        <MDSSlider {...props} value={value} onChange={handleChange} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};

export const Default: Story = {
  args: {
    value: 50,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <MDSTypography>기본 슬라이더 (0-100, step: 1)</MDSTypography>
        <MDSSlider {...props} value={value} onChange={(v) => setArgs({ value: v })} />
      </Wrapper>
    );
  },
};

export const CustomRange: Story = {
  args: {
    value: 25,
    min: 0,
    max: 50,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <MDSTypography>커스텀 범위 (0-50)</MDSTypography>
        <MDSSlider {...props} value={value} onChange={(v) => setArgs({ value: v })} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};

export const WithStep: Story = {
  args: {
    value: 50,
    step: 10,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <MDSTypography>10 단위로 이동 (step: 10)</MDSTypography>
        <MDSSlider {...props} value={value} onChange={(v) => setArgs({ value: v })} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 30,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>비활성화 상태</MDSTypography>
      <MDSSlider {...props} onChange={() => {}} />
    </Wrapper>
  ),
};

export const HiddenValue: Story = {
  args: {
    value: 50,
    hasLabel: false,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <MDSTypography>숫자 없는 슬라이더</MDSTypography>
        <MDSSlider {...props} value={value} onChange={(v) => setArgs({ value: v })} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};

export const InteractiveExample: Story = {
  render: function Render() {
    const [volume, setVolume] = React.useState(70);
    const [brightness, setBrightness] = React.useState(50);
    const [opacity, setOpacity] = React.useState(100);

    return (
      <Wrapper>
        <MDSTypography>인터랙티브 예제</MDSTypography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <MDSTypography style={{ marginBottom: '8px' }}>볼륨: {volume}%</MDSTypography>
            <MDSSlider value={volume} onChange={setVolume} />
          </div>

          <div>
            <MDSTypography style={{ marginBottom: '8px' }}>밝기: {brightness}%</MDSTypography>
            <MDSSlider value={brightness} onChange={setBrightness} />
          </div>

          <div>
            <MDSTypography style={{ marginBottom: '8px' }}>투명도: {opacity}%</MDSTypography>
            <MDSSlider value={opacity} onChange={setOpacity} />
          </div>
        </div>

        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: `rgba(45, 95, 233, ${opacity / 100})`,
            borderRadius: '8px',
            filter: `brightness(${brightness / 100 + 0.5})`,
          }}
        >
          <MDSTypography style={{ color: 'white' }}>미리보기 박스</MDSTypography>
        </div>
      </Wrapper>
    );
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    value: 50,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <MDSTypography>키보드 접근성 테스트</MDSTypography>
        <MDSTypography style={{ fontSize: '12px', opacity: 0.7 }}>
          Tab으로 포커스 → 화살표 키로 값 조절
          <br />
          Home: 최소값 / End: 최대값
        </MDSTypography>
        <MDSSlider {...props} value={value} onChange={(v) => setArgs({ value: v })} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};

export const LargeNumbers: Story = {
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10000, step: 100 },
    },
  },
  render: function Render() {
    const [value, setValue] = React.useState(5000);

    return (
      <Wrapper>
        <MDSTypography>큰 숫자 범위 (0-10000, step: 100)</MDSTypography>
        <MDSSlider value={value} min={0} max={10000} step={100} onChange={setValue} />
        <MDSTypography>현재 값: {value}</MDSTypography>
      </Wrapper>
    );
  },
};
