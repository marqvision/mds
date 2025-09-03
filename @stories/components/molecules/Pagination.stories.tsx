import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MDSPagination } from '../../../components';

const meta: Meta<typeof MDSPagination> = {
  title: '2. Components/molecules/Pagination',
  component: MDSPagination,
  tags: ['autodocs'],
  args: {
    totalCount: 301,
    pageSize: 50,
    language: 'en',
  },
  argTypes: {
    language: {
      control: 'select',
      options: ['en', 'ko'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSPagination>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', padding: '24px' }}>
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: function Render({ value, onChange, ...args }) {
    const [offset, setOffset] = React.useState(0);

    return (
      <Wrapper>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MDSPagination {...args} value={offset} onChange={setOffset} />
        </div>
      </Wrapper>
    );
  },
};
