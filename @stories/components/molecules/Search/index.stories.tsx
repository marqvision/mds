import React, { useState } from 'react';
import { MDSDropdownItem, MDSSearch, MDSTypography } from '../../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSSearch> = {
  component: MDSSearch,
  title: '2. Components/molecules/Search',
  args: {
    value: '',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['enter', 'change'],
    },
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
export type Story = StoryObj<typeof MDSSearch>;

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
    value: '',
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSTypography variant="title">
          Search keyword: <strong>{value}</strong>
        </MDSTypography>
        <MDSSearch {...props} value={value} onChange={setValue} />
      </Wrapper>
    );
  },
};

export const SearchOptions: Story = {
  args: {
    value: '',
  },
  render: function Render(props) {
    const [option, setOption] = useState('listing_id');
    const [keyword, setKeyword] = useState<string>('');

    const optionProps = {
      list: [
        { label: 'Listing ID', value: 'listing_id' },
        { label: 'Listing title', value: 'listing_title' },
      ],
      value: option,
    };

    const handleSearch = (value: string, selectedOption: string) => {
      setKeyword(value);
      setOption(selectedOption);
    };

    return (
      <Wrapper>
        <MDSTypography variant="title">
          Selected option: <strong>{option}</strong>
        </MDSTypography>
        <MDSTypography variant="title">
          Search keyword: <strong>{keyword}</strong>
        </MDSTypography>
        <MDSSearch {...props} option={optionProps} value={keyword} onChange={handleSearch} />
      </Wrapper>
    );
  },
};

export const MultiDepthSearchOptions: Story = {
  args: {
    value: '',
  },
  render: function Render(props) {
    const [option, setOption] = useState('listing_id+single');
    const [keyword, setKeyword] = useState<string>('');

    const list: MDSDropdownItem<string>[] = [
      {
        label: 'Single',
        children: [
          { label: 'Listing ID', value: `listing_id+single` },
          { label: 'Listing title', value: `listing_title+single` },
        ],
      },
      {
        label: 'Bulk',
        children: [
          { label: 'Product ID', value: `listing_id+bulk` },
          {
            label: 'Listing URL [Beta]',
            subLabel: {
              label: 'This search option is currently limited to select platforms.',
              includeSearch: false,
              position: 'bottom',
            },
            value: `listing_url+bulk`,
          },
        ],
      },
    ];
    const optionProps = {
      width: '290px',
      list,
      value: option,
    };

    const handleSearch = (value: string, selectedOption: string) => {
      setKeyword(value);
      setOption(selectedOption);
    };

    return (
      <Wrapper>
        <MDSTypography variant="title">
          Selected option: <strong>{option}</strong>
        </MDSTypography>
        <MDSTypography variant="title">
          Search keyword: <strong>{keyword}</strong>
        </MDSTypography>
        <MDSSearch {...props} option={optionProps} value={keyword} onChange={handleSearch} />
      </Wrapper>
    );
  },
};

export const FullWidth: Story = {
  args: {
    width: '100%',
    value: '',
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSTypography variant="title">
          Search keyword: <strong>{value}</strong>
        </MDSTypography>
        <MDSSearch {...props} value={value} onChange={setValue} />
      </Wrapper>
    );
  },
};