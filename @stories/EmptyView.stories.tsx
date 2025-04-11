import React from 'react';
import { MDSChip, MDSEmptyView } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSEmptyView> = {
  component: MDSEmptyView,
  title: '2. Components/organisms/EmptyView',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSEmptyView>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ height: '400px', padding: '24px', display: 'grid' }}>{children}</div>;
};

export const Preview: Story = {
  args: {
    title: 'No listings',
    description: 'There is no listings on the list.',
    children: <MDSChip variant="fill" size="medium" color="blue">Action</MDSChip>
  },
  render: (props) => (
    <Wrapper>
      <MDSEmptyView {...props} />
    </Wrapper>
  ),
};

export const WithoutDescription: Story = {
  args: {
    title: 'No listings',
    children: <MDSChip variant="fill" size="medium" color="blue">Action</MDSChip>
  },
  render: (props) => (
    <Wrapper>
      <MDSEmptyView {...props} />
    </Wrapper>
  ),
};

export const WithoutAction: Story = {
  args: {
    title: 'No listings',
    description: 'There is no listings on the list.',
  },
  render: (props) => (
    <Wrapper>
      <MDSEmptyView {...props} />
    </Wrapper>
  ),
};

export const Height: Story = {
  args: {
    title: 'height: 600px',
    description: '기본값 100%이 아닌 임의의 height 를 전달할 수 있습니다.',
    height: '600px',
  },
  render: (props) => (
    <Wrapper>
      <MDSEmptyView {...props} />
    </Wrapper>
  ),
};

