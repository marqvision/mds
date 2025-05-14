import React from 'react';
import { MDSLogo } from '../components/atoms/Logo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSLogo> = {
  component: MDSLogo,
  title: '2. Components/atoms/Logo',
  args: {
    color: 'black',
    variant: 'logo',
    logoType: 'vision',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['logo', 'symbol'],
    },
    color: {
      control: 'select',
      options: ['black', 'white'],
    },
    logoType: {
      control: 'select',
      options: ['vision', 'ai', 'folio'],
    },
    size: {
      control: 'number',
    },
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSLogo>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'gray' }}>
      {children}
    </div>
  );
};

export const Logo: Story = {
  render: (props) => (
    <Wrapper>
      <MDSLogo {...props} />
    </Wrapper>
  ),
};

export const Symbol: Story = {
  args: {
    variant: 'symbol',
    size: 24,
  },
  render: (props) => (
    <Wrapper>
      <MDSLogo {...props} />
    </Wrapper>
  ),
};
