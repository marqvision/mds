import React, { useState } from 'react';
import { MDSPopper } from '../../../components/molecules/HoverActionToolbar/Popper';
import { MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';
import type { PopperPosition } from '../../../components/molecules/HoverActionToolbar/Popper';

const meta: Meta<typeof MDSPopper> = {
  component: MDSPopper,
  title: '2. Components/atoms/Popper',
  args: {
    position: 'bottom-left',
    trigger: 'click',
    offset: 4,
    autoFlip: true,
    interactive: true,
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
      ],
    },
    trigger: {
      control: 'radio',
      options: ['click', 'hover'],
    },
    offset: {
      control: 'number',
    },
    autoFlip: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
    closeOnClickOutside: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnAnchorHidden: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['!autodocs', '!dev'],
};

export default meta;
type Story = StoryObj<typeof MDSPopper>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

const PopperContent = ({ text }: { text: string }) => (
  <div
    style={{
      padding: '12px 16px',
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      minWidth: '120px',
    }}
  >
    <MDSTypography variant="body" size="s">
      {text}
    </MDSTypography>
  </div>
);

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

export const Preview: Story = {
  render: (props) => (
    <Wrapper>
      <MDSPopper {...props} content={<PopperContent text="Popper Content" />}>
        <button style={buttonStyle}>Click me</button>
      </MDSPopper>
    </Wrapper>
  ),
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography style={{ marginBottom: '16px', textAlign: 'center', display: 'block' }}>
        버튼을 클릭하면 Popper가 열리고, 다시 클릭하거나 외부를 클릭하면 닫힙니다.
      </MDSTypography>
      <MDSPopper {...props} content={<PopperContent text="Click으로 열린 Popper입니다." />}>
        <button style={buttonStyle}>Click Trigger</button>
      </MDSPopper>
    </Wrapper>
  ),
};

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography style={{ marginBottom: '16px', textAlign: 'center', display: 'block' }}>
        버튼에 마우스를 올리면 Popper가 열립니다. interactive 옵션이 활성화되어 Popper 위에서도 유지됩니다.
      </MDSTypography>
      <MDSPopper {...props} content={<PopperContent text="Hover로 열린 Popper입니다." />}>
        <button style={buttonStyle}>Hover me</button>
      </MDSPopper>
    </Wrapper>
  ),
};

export const AllPositions: Story = {
  render: () => {
    const positions: PopperPosition[] = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'left-top',
      'left-center',
      'left-bottom',
      'right-top',
      'right-center',
      'right-bottom',
    ];

    return (
      <div style={{ padding: '100px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <MDSTypography style={{ textAlign: 'center' }}>
          12가지 position 옵션을 확인할 수 있습니다. 각 버튼을 클릭하세요.
        </MDSTypography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            justifyItems: 'center',
          }}
        >
          {positions.map((pos) => (
            <MDSPopper key={pos} position={pos} content={<PopperContent text={pos} />}>
              <button style={buttonStyle}>{pos}</button>
            </MDSPopper>
          ))}
        </div>
      </div>
    );
  },
};

export const AutoFlip: Story = {
  args: {
    autoFlip: true,
    position: 'bottom-center',
  },
  render: (props) => (
    <div style={{ height: '200vh', padding: '20px' }}>
      <MDSTypography style={{ marginBottom: '16px' }}>
        autoFlip이 활성화되면 viewport 경계를 벗어날 때 반대 방향으로 자동 전환됩니다.
        <br />
        페이지를 스크롤하여 버튼이 화면 하단에 가까워지면 Popper가 위로 flip됩니다.
      </MDSTypography>
      <div
        style={{
          position: 'sticky',
          top: '50%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MDSPopper {...props} content={<PopperContent text="AutoFlip이 적용된 Popper" />}>
          <button style={buttonStyle}>AutoFlip Button</button>
        </MDSPopper>
      </div>
    </div>
  ),
};

export const ControlledMode: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Wrapper>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <MDSTypography>
            controlled mode: open prop으로 외부에서 상태를 제어합니다.
            <br />
            현재 상태: <strong>{isOpen ? '열림' : '닫힘'}</strong>
          </MDSTypography>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsOpen(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              열기
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              닫기
            </button>
          </div>
          <MDSPopper
            open={isOpen}
            onVisibleChange={setIsOpen}
            trigger="click"
            content={<PopperContent text="외부에서 제어되는 Popper" />}
          >
            <button style={buttonStyle}>Controlled Popper</button>
          </MDSPopper>
        </div>
      </Wrapper>
    );
  },
};

export const CustomOffset: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', gap: '40px', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <MDSTypography style={{ marginBottom: '8px' }}>offset: 0</MDSTypography>
        <MDSPopper offset={0} content={<PopperContent text="offset: 0" />}>
          <button style={buttonStyle}>No Gap</button>
        </MDSPopper>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MDSTypography style={{ marginBottom: '8px' }}>offset: 4 (기본값)</MDSTypography>
        <MDSPopper offset={4} content={<PopperContent text="offset: 4" />}>
          <button style={buttonStyle}>Default</button>
        </MDSPopper>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MDSTypography style={{ marginBottom: '8px' }}>offset: 16</MDSTypography>
        <MDSPopper offset={16} content={<PopperContent text="offset: 16" />}>
          <button style={buttonStyle}>Large Gap</button>
        </MDSPopper>
      </div>
    </div>
  ),
};

export const NonInteractive: Story = {
  args: {
    trigger: 'hover',
    interactive: false,
  },
  render: (props) => (
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <MDSTypography style={{ textAlign: 'center' }}>
          interactive: false로 설정하면 Popper 위에 마우스를 올려도 유지되지 않습니다.
          <br />
          anchor에서 마우스가 벗어나면 즉시 닫힙니다. (툴팁 같은 용도)
        </MDSTypography>
        <MDSPopper {...props} content={<PopperContent text="마우스를 올리면 즉시 닫힘" />}>
          <button style={buttonStyle}>Non-Interactive</button>
        </MDSPopper>
      </div>
    </Wrapper>
  ),
};

/**
 * Safe Triangle 테스트
 *
 * closeDelay: 0, interactive: true, trigger: hover 상태에서
 * offset 공백 영역을 대각선으로 이동해도 Popper가 닫히지 않는지 테스트합니다.
 *
 * Safe Triangle 패턴:
 * - anchor에서 mouseLeave 시 커서 위치 기준으로 삼각형 생성
 * - 마우스가 삼각형 내부에 있으면 Popper 유지
 * - 삼각형 외부로 나가면 즉시 닫힘
 */
export const SafeTriangle: Story = {
  args: {
    trigger: 'hover',
    interactive: true,
    closeDelay: 0,
    offset: 24,
  },
  render: (props) => (
    <div style={{ padding: '150px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <MDSTypography style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <strong>Safe Triangle 테스트</strong>
        <br />
        <br />
        closeDelay: 0, offset: 24px로 설정되어 있습니다.
        <br />
        버튼에서 Popper로 <strong>대각선으로 이동</strong>해도 닫히지 않아야 합니다.
        <br />
        <br />
        <span style={{ color: '#666' }}>
          삼각형 영역 밖으로 마우스를 이동하면 즉시 닫힙니다.
        </span>
      </MDSTypography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '100px',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px' }}>bottom-center (아래로 이동)</MDSTypography>
          <MDSPopper
            {...props}
            position="bottom-center"
            content={
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  border: '2px solid #1976d2',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  width: '200px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  대각선으로 이동해도 닫히지 않습니다!
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, width: '120px', height: '40px' }}>Bottom</button>
          </MDSPopper>
        </div>

        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px' }}>top-center (위로 이동)</MDSTypography>
          <MDSPopper
            {...props}
            position="top-center"
            content={
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  border: '2px solid #4caf50',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  width: '200px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  대각선으로 이동해도 닫히지 않습니다!
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, backgroundColor: '#4caf50', width: '120px', height: '40px' }}>Top</button>
          </MDSPopper>
        </div>

        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px' }}>right-center (오른쪽으로 이동)</MDSTypography>
          <MDSPopper
            {...props}
            position="right-center"
            content={
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  border: '2px solid #ff9800',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  width: '200px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  대각선으로 이동해도 닫히지 않습니다!
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, backgroundColor: '#ff9800', width: '120px', height: '40px' }}>Right</button>
          </MDSPopper>
        </div>

        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px' }}>left-center (왼쪽으로 이동)</MDSTypography>
          <MDSPopper
            {...props}
            position="left-center"
            content={
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  border: '2px solid #9c27b0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  width: '200px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  대각선으로 이동해도 닫히지 않습니다!
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, backgroundColor: '#9c27b0', width: '120px', height: '40px' }}>Left</button>
          </MDSPopper>
        </div>
      </div>
    </div>
  ),
};

/**
 * Safe Triangle vs 기존 방식 비교
 */
export const SafeTriangleComparison: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      <MDSTypography style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <strong>Safe Triangle vs 기존 방식 비교</strong>
        <br />
        <br />
        왼쪽: interactive: true (Safe Triangle 적용) - 대각선 이동 OK
        <br />
        오른쪽: interactive: false - anchor 벗어나면 즉시 닫힘
      </MDSTypography>

      <div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px', color: '#4caf50' }}>
            ✅ Safe Triangle (interactive: true)
          </MDSTypography>
          <MDSPopper
            trigger="hover"
            interactive={true}
            closeDelay={0}
            offset={20}
            position="bottom-center"
            content={
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#e8f5e9',
                  border: '2px solid #4caf50',
                  borderRadius: '8px',
                  width: '180px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  대각선으로 이동해보세요. 삼각형 영역 내에서는 닫히지 않습니다.
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, backgroundColor: '#4caf50', width: '140px', height: '50px' }}>
              Safe Triangle
            </button>
          </MDSPopper>
        </div>

        <div style={{ textAlign: 'center' }}>
          <MDSTypography style={{ marginBottom: '16px', color: '#f44336' }}>
            ❌ 기존 방식 (interactive: false)
          </MDSTypography>
          <MDSPopper
            trigger="hover"
            interactive={false}
            closeDelay={0}
            offset={20}
            position="bottom-center"
            content={
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#ffebee',
                  border: '2px solid #f44336',
                  borderRadius: '8px',
                  width: '180px',
                }}
              >
                <MDSTypography variant="body" size="s">
                  버튼에서 벗어나면 즉시 닫힙니다.
                </MDSTypography>
              </div>
            }
          >
            <button style={{ ...buttonStyle, backgroundColor: '#f44336', width: '140px', height: '50px' }}>
              No Safe Triangle
            </button>
          </MDSPopper>
        </div>
      </div>
    </div>
  ),
};
