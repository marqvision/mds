import React, { HTMLAttributes } from 'react';
import { MDSPageHeader } from '../../../components/organisms/PageHeader';
import { MDSButton, MDSDivider, MDSDropdown, MDSIcon, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSPageHeader> = {
  component: MDSPageHeader,
  title: '2. Components/organisms/PageHeader',
  tags: ['autodocs'],
  args: {
    pageTitle: 'Page header',
  },
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MDSPageHeader>;

const Wrapper = ({ style, children }: React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', ...style }}>{children}</div>;
};

export const Preview: Story = {
  render: (args) => <MDSPageHeader {...args} />,
};

export const BackButton: Story = {
  args: {
    backButton: {
      onClick: () => {
        alert('onClick');
      },
      label: '뒤로가기',
    },
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>뒤로가기 버튼을 클릭했을 때 이벤트를 전달 가능합니다.</MDSTypography>
      <MDSPageHeader {...args} />
    </Wrapper>
  ),
};

export const BackLink: Story = {
  args: {
    backButton: {
      label: '뒤로가기',
      to: '/back',
      LinkComponent: (props) => {
        return <a {...props} />;
      },
    },
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>LinkComponent 와 backTo url 을 전달하면 뒤로가기 버튼이 Link 요소로 출력됩니다.</MDSTypography>
      <MDSPageHeader {...args} />
    </Wrapper>
  ),
};

export const WithChildren: Story = {
  render: (args) => (
    <Wrapper>
      <MDSTypography>children 요소는 page title 우측에 출력됩니다.</MDSTypography>
      <MDSPageHeader {...args}>
        <MDSDivider orientation="vertical" length="24px" />

        <MDSTypography>Text</MDSTypography>

        <div style={{ display: 'flex', gap: '8px' }}>
          <MDSButton
            variant="fill"
            size="medium"
            color="blue"
            startIcon={<MDSIcon.AddPlus variant="outline" />}
            onClick={() => {}}
          >
            Button
          </MDSButton>
          <MDSDropdown label="Filter" list={[]} />
        </div>
      </MDSPageHeader>
    </Wrapper>
  ),
};

export const IsCompact: Story = {
  args: {
    isCompact: true,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        isCompact 값이 `true` 일 경우
        <br />
        1. 하단 여백이 상단 여백보다 더 작게 설정됩니다.
        <br />
        2. minHeight 이 줄어듭니다.
        <br />
        3. borderBottom 이 사라집니다.
      </MDSTypography>
      <MDSPageHeader {...args} />
    </Wrapper>
  ),
};
