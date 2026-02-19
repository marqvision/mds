import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { MDSIcon, MDSTypography } from '../../../components';
import { MDSTableButton } from '../../../components/molecules/TableButton';

const meta: Meta<typeof MDSTableButton> = {
  component: MDSTableButton,
  title: '2. Components/molecules/TableButton',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClick: undefined,
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
    icon: {
      control: false, // ReactElement는 컨트롤에서 제어하지 않음
      description: 'React 아이콘 컴포넌트를 전달합니다. size와 color는 TableButton에서 자동으로 설정됩니다.',
    },
    isDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
    isReadOnly: {
      control: 'boolean',
      description: '읽기 전용 상태 (화살표 아이콘 표시 및 클릭 가능 여부 제어)',
    },
    isTruncated: {
      control: 'boolean',
      description: '텍스트 말줄임 처리 여부 (true: 한 줄로 제한, false: 전체 표시)',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSTableButton>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  args: {
    children: 'Name',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        주로 정렬 버튼에 사용하는 컴포넌트입니다.
        <br />
        icon은 React 아이콘 컴포넌트를 전달합니다. (예: {`<MDSIcon.Sort />`})
        <br />
        isReadOnly이 false일 때만 화살표 아이콘이 표시됩니다.
        <br />
        아이콘의 size와 color는 TableButton에서 자동으로 설정됩니다.
        <br />
        텍스트 크기는 S size(13px)로 고정입니다.
      </MDSTypography>
      <MDSTableButton {...args} />
    </Wrapper>
  ),
};

export const WithoutSortIcon: Story = {
  args: {
    children: 'Created Date',
    icon: null,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>icon을 null로 전달하면 정렬 아이콘이 표시되지 않습니다.</MDSTypography>
      <MDSTableButton {...args} />
    </Wrapper>
  ),
};

export const CustomSortIcon: Story = {
  args: {
    children: 'Date',
    icon: <MDSIcon.Calendar />,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>다양한 MDSIcon을 icon으로 사용할 수 있습니다.</MDSTypography>
      <MDSTableButton {...args} />
    </Wrapper>
  ),
};

export const Clickable: Story = {
  args: {
    children: 'Status',
    icon: <MDSIcon.Settings variant="outline" />,
    onClick: () => alert('Table button clicked!'),
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        onClick 이벤트가 있는 경우 hover 효과와 pointer 커서가 적용됩니다.
        <br />
        클릭해보세요!
      </MDSTypography>
      <MDSTableButton {...args} />
    </Wrapper>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    icon: <MDSIcon.Sort />,
    isDisabled: true,
    onClick: () => alert('This should not fire'),
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>disabled 상태에서는 클릭 이벤트가 발생하지 않고 비활성화 스타일이 적용됩니다.</MDSTypography>
      <MDSTableButton {...args} />
    </Wrapper>
  ),
};

export const ReadOnlyStates: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>isReadOnly 속성에 따른 화살표 아이콘 표시 여부를 확인할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              정렬 가능 (기본값)
            </MDSTypography>
            <MDSTableButton icon={<MDSIcon.Sort />} isReadOnly={false} onClick={() => alert('정렬 변경!')}>
              Name
            </MDSTableButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              읽기 전용
            </MDSTypography>
            <MDSTableButton icon={<MDSIcon.Sort />} isReadOnly={true}>
              ID
            </MDSTableButton>
          </div>
        </div>
        <MDSTypography variant="body" size="s">
          • isReadOnly=false: 화살표 아이콘 표시, 정렬 기능 활성 (기본값)
          <br />• isReadOnly=true: 화살표 아이콘 숨김, 정렬 기능 비활성
        </MDSTypography>
      </div>
    </Wrapper>
  ),
};

export const ClickableStates: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>클릭 가능 여부에 따른 스타일 변화를 확인할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              클릭 불가 (onClick 없음)
            </MDSTypography>
            <MDSTableButton icon={<MDSIcon.Sort />}>Name</MDSTableButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              클릭 가능 (onClick 있음)
            </MDSTypography>
            <MDSTableButton icon={<MDSIcon.Calendar />} onClick={() => alert('Clicked!')}>
              Date
            </MDSTableButton>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              비활성화 상태
            </MDSTypography>
            <MDSTableButton icon={<MDSIcon.Settings variant="outline" />} onClick={() => {}} isDisabled>
              Status
            </MDSTableButton>
          </div>
        </div>
        <MDSTypography variant="body" size="s">
          • 클릭 불가: 기본 스타일
          <br />
          • 클릭 가능: pointer 커서
          <br />• 비활성화: 투명도 감소, 클릭 이벤트 차단
        </MDSTypography>
      </div>
    </Wrapper>
  ),
};

export const VariousIcons: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>다양한 아이콘을 사용한 TableButton 예시입니다.</MDSTypography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        <MDSTableButton icon={<MDSIcon.Sort />} onClick={() => {}}>
          Name
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Calendar />} onClick={() => {}}>
          Date
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Settings variant="outline" />} onClick={() => {}}>
          Status
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Priority variant="outline" />} onClick={() => {}}>
          Priority
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.AccountProfile variant="outline" />} onClick={() => {}}>
          User
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Star variant="outline" />} onClick={() => {}}>
          Rating
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Timer />} onClick={() => {}}>
          Duration
        </MDSTableButton>
        <MDSTableButton icon={<MDSIcon.Settings variant="outline" />} onClick={() => {}}>
          Config
        </MDSTableButton>
      </div>
    </Wrapper>
  ),
};

export const TextTruncation: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>isTruncated 속성으로 긴 텍스트의 표시 방식을 제어할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              말줄임 처리 (기본값)
            </MDSTypography>
            <div style={{ width: '100%', border: '1px dashed #ccc', padding: '8px' }}>
              <MDSTableButton icon={<MDSIcon.Sort />} isTruncated={true} onClick={() => {}}>
                This is a very long text that should be truncated
              </MDSTableButton>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <MDSTypography variant="body" size="xs" weight="medium" style={{ marginBottom: '8px' }}>
              전체 표시
            </MDSTypography>
            <div style={{ width: '100%', border: '1px dashed #ccc', padding: '8px' }}>
              <MDSTableButton icon={<MDSIcon.Sort />} isTruncated={false} onClick={() => {}}>
                This is a very long text that should be displayed fully
              </MDSTableButton>
            </div>
          </div>
        </div>
        <MDSTypography variant="body" size="s">
          • isTruncated=true: 한 줄로 제한하고 말줄임표(...) 처리 (기본값)
          <br />• isTruncated=false: 텍스트 전체를 표시하며 여러 줄로 줄바꿈 가능
        </MDSTypography>
      </div>
    </Wrapper>
  ),
};
