import React from 'react';
import { MDSHeader } from '../../../components/organisms/Header';
import { MDSButton, MDSDivider, MDSDropdown, MDSIcon, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSHeader> = {
  component: MDSHeader,
  title: '2. Components/organisms/Header',
  tags: ['autodocs'],
  args: {
    pageTitle: 'Header',
  },
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MDSHeader>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  render: (args) => <MDSHeader {...args} />,
};

export const BackButton: Story = {
  args: {
    onBack: () => {
      alert('onBack');
    },
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>뒤로가기 버튼을 클릭했을 때 이벤트를 전달 가능합니다.</MDSTypography>
      <MDSHeader {...args} />
    </Wrapper>
  ),
};

export const BackLink: Story = {
  args: {
    backTo: '/back',
    LinkComponent: (props) => {
      return <a {...props} />;
    },
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>LinkComponent 와 backTo url 을 전달하면 뒤로가기 버튼이 Link 요소로 출력됩니다.</MDSTypography>
      <MDSHeader {...args} />
    </Wrapper>
  ),
};

export const WithChildren: Story = {
  render: (args) => (
    <Wrapper>
      <MDSTypography>children 요소는 page title 우측에 출력됩니다.</MDSTypography>
      <MDSHeader {...args}>
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
      </MDSHeader>
    </Wrapper>
  ),
};
