import React from 'react';
import { useArgs } from 'storybook/preview-api';
import { MDSToggle } from '../../../components/atoms/Toggle';
import { MDSTag, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSToggle> = {
  component: MDSToggle,
  title: '2. Components/atoms/Toggle',
  args: {
    value: false,
    label: undefined,
  },
  argTypes: {
    value: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSToggle>;

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

const PremiumLabel = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <MDSTypography variant="body" weight="medium" color="inherit">
      프리미엄 기능
    </MDSTypography>
    <MDSTag variant="fill" size="small" color="red">
      PREMIUM
    </MDSTag>
  </div>
);

const NotificationLabel = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <MDSTypography variant="body" color="inherit">
      알림 받기
    </MDSTypography>
  </div>
);

const StatusLabel = ({ isActive }: { isActive: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#22c55e' : '#ef4444',
      }}
    />
    <MDSTypography variant="body" color="inherit">
      {isActive ? '온라인' : '오프라인'}
    </MDSTypography>
  </div>
);

const ComplexLabel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <MDSTypography variant="body" color="inherit">
        고급 설정
      </MDSTypography>
      <MDSTag variant="fill" size="small" color="blue">
        BETA
      </MDSTag>
    </div>
    <MDSTypography color="inherit" style={{ opacity: 0.7 }}>
      실험적 기능이 포함되어 있습니다
    </MDSTypography>
  </div>
);

export const Preview: Story = {
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSToggle {...props} value={value} onChange={handleChange} />
      </Wrapper>
    );
  },
};

export const NoLabel: Story = {
  args: {
    value: false,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSTypography>라벨이 없는 토글입니다.</MDSTypography>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MDSToggle {...props} value={value} onChange={handleChange} size="medium" />
          <MDSToggle {...props} value={value} onChange={handleChange} size="small" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MDSToggle {...props} value={!value} onChange={(v) => setArgs({ value: !v })} size="medium" />
          <MDSToggle {...props} value={!value} onChange={(v) => setArgs({ value: !v })} size="small" />
        </div>
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
      <MDSTypography>가로 24px, 세로 16px 의 small 사이즈 입니다. (S.20)</MDSTypography>
      <MDSToggle {...props} />
      <MDSToggle {...props} value={false} />
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
      <MDSTypography>가로 32px, 세로 20px 의 medium 사이즈 입니다. (M.24)</MDSTypography>
      <MDSToggle {...props} />
      <MDSToggle {...props} value={false} />
    </Wrapper>
  ),
};

export const On: Story = {
  args: {
    value: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>토글이 활성화된 상태입니다.</MDSTypography>
      <MDSToggle {...props} />
    </Wrapper>
  ),
};

export const OnDisabled: Story = {
  args: {
    value: true,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>토글이 활성화되었으나 비활성화된 상태입니다.</MDSTypography>
      <MDSToggle {...props} />
    </Wrapper>
  ),
};

export const Off: Story = {
  args: {
    value: false,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>토글이 비활성화된 상태입니다.</MDSTypography>
      <MDSToggle {...props} />
    </Wrapper>
  ),
};

export const OffDisabled: Story = {
  args: {
    value: false,
    isDisabled: true,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>토글이 비활성화되고 disabled 된 상태입니다.</MDSTypography>
      <MDSToggle {...props} />
    </Wrapper>
  ),
};

export const WithLabel: Story = {
  args: {
    label: '알림 설정',
    value: true,
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSTypography>라벨이 있는 토글입니다.</MDSTypography>
        <MDSToggle {...props} value={value} onChange={handleChange} />
        <MDSToggle {...props} value={value} onChange={handleChange} size="small" />
      </Wrapper>
    );
  },
};

export const InteractiveStates: Story = {
  render: function Render() {
    const [toggle1, setToggle1] = React.useState(false);
    const [toggle2, setToggle2] = React.useState(true);
    const [toggle3, setToggle3] = React.useState(false);

    return (
      <Wrapper>
        <MDSTypography>다양한 상호작용 상태를 확인할 수 있습니다.</MDSTypography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MDSToggle value={toggle1} onChange={setToggle1} label="기본 토글" />
          <MDSToggle value={toggle2} onChange={setToggle2} label="활성화된 토글" size="small" />
          <MDSToggle value={toggle3} onChange={setToggle3} label="비활성화된 토글" />
        </div>
      </Wrapper>
    );
  },
};

export const Customize: Story = {
  args: {
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MDSTypography variant="title" size="2xl" weight="semibold" color="inherit">
          사용자 정의 라벨
        </MDSTypography>
        <MDSTag variant="fill" size="small" color="red">
          NEW
        </MDSTag>
      </div>
    ),
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    const handleChange = (value: boolean) => {
      setArgs({ value });
    };

    return (
      <Wrapper>
        <MDSTypography>
          label 에 React Element 를 전달하면 자유롭게 구성할 수 있습니다. <br />이 경우, MDSTypography 의 color 속성을
          'inherit' 로 설정하여 disabled 상태의 색상까지 상속받는 것을 권장합니다.
        </MDSTypography>
        <MDSToggle {...props} value={value} onChange={handleChange} />
        <MDSToggle {...props} value={value} onChange={handleChange} isDisabled />
      </Wrapper>
    );
  },
};

export const ReactComponentLabels: Story = {
  render: function Render() {
    const [premium, setPremium] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);
    const [status, setStatus] = React.useState(false);
    const [advanced, setAdvanced] = React.useState(true);

    return (
      <Wrapper>
        <MDSTypography>
          다양한 React 컴포넌트를 label로 사용하는 예시입니다. <br />각 컴포넌트는 color="inherit"를 사용하여 disabled
          상태의 스타일을 상속받습니다.
        </MDSTypography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <MDSTypography style={{ marginBottom: '8px', display: 'block', fontSize: '12px' }}>
              태그가 포함된 라벨
            </MDSTypography>
            <MDSToggle value={premium} onChange={setPremium} label={<PremiumLabel />} />
            <MDSToggle value={premium} onChange={setPremium} label={<PremiumLabel />} isDisabled size="small" />
          </div>

          <div>
            <MDSTypography style={{ marginBottom: '8px', display: 'block', fontSize: '12px' }}>
              아이콘이 포함된 라벨
            </MDSTypography>
            <MDSToggle value={notifications} onChange={setNotifications} label={<NotificationLabel />} />
            <MDSToggle value={notifications} onChange={setNotifications} label={<NotificationLabel />} isDisabled />
          </div>

          <div>
            <MDSTypography style={{ marginBottom: '8px', display: 'block', fontSize: '12px' }}>
              상태에 따라 변하는 라벨
            </MDSTypography>
            <MDSToggle value={status} onChange={setStatus} label={<StatusLabel isActive={status} />} />
          </div>

          <div>
            <MDSTypography style={{ marginBottom: '8px', display: 'block', fontSize: '12px' }}>
              복잡한 멀티라인 라벨
            </MDSTypography>
            <MDSToggle value={advanced} onChange={setAdvanced} label={<ComplexLabel />} />
            <MDSToggle value={advanced} onChange={setAdvanced} label={<ComplexLabel />} isDisabled />
          </div>
        </div>
      </Wrapper>
    );
  },
};
