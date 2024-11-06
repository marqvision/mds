import React, { useState } from 'react';
import { MDSInput, MDSTypography } from '../../components';
import { SelectProps, TextFieldProps } from '../../components/Input/@types';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSInput> = {
  component: MDSInput,
  title: '2. Components/Input',
  args: {
    value: '',
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSInput>;

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

export const TextField: Story = {
  args: {
    placeholder: 'Enter value',
    value: '',
    label: {
      main: 'Main label',
      sub: 'Optional sub label',
      right: (
        <MDSTypography variant="T12" color="color/content/neutral/secondary/normal">
          1/1000
        </MDSTypography>
      ),
    },
    custom: {
      add: {
        label: 'Add',
        onSubmit: () => undefined,
      },
    },
    guide: [
      {
        label: 'Guide text error Guide text error Guide text error Guide text error Guide text error Guide text error',
        status: 'error',
      },
      { label: 'Guide text idle Guide text idle Guide text idle Guide text idle', status: 'idle' },
      { label: 'Guide text success Guide text success', status: 'success' },
    ],
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSInput {...(props as TextFieldProps)} value={value} onChange={setValue} style={{ borderTopLeftRadius: 0 }} />
      </Wrapper>
    );
  },
};

export const FlexibleTextField: Story = {
  args: {
    placeholder: 'Enter value',
    custom: {
      expandOnFocus: {
        defaultWidth: 200,
        focusWidth: 280,
      },
    },
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSInput {...(props as TextFieldProps)} value={value} onChange={setValue} />
      </Wrapper>
    );
  },
};

export const MultiLineTextField: Story = {
  args: {
    placeholder: 'Enter value',
    isMultiline: true,
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSInput {...(props as TextFieldProps)} value={value} onChange={setValue} />
      </Wrapper>
    );
  },
};

export const Search: Story = {
  args: {
    placeholder: 'Enter value',
    custom: {
      flatLeft: true,
      add: {
        onSubmit: () => {},
      },
    },
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>('');
    const [type, setType] = useState('listing id');

    const list = ['listing id', 'exclude', 'include'].map((v) => ({
      label: v,
      value: v,
    }));

    return (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <MDSInput
            type="select"
            value={type}
            list={list}
            custom={{
              flatRight: true,
            }}
            style={{ width: '120px' }}
          />
          <MDSInput
            {...(props as TextFieldProps)}
            value={value}
            onChange={setValue}
            style={{ width: '160px', transform: 'translateX(-1px)' }}
          />
        </div>
      </Wrapper>
    );
  },
};

export const Select: Story = {
  args: {
    type: 'select',
    guide: ['Guide text1', 'Guide text2'],
  },
  render: function Render(props) {
    const [list, setList] = useState<string[]>([]);
    const allList = [...Array(100)].map((_, i) => ({
      label: `value_${i}`,
      value: `${i}`,
    }));

    return (
      <Wrapper>
        <button onClick={() => setList((ps) => [...ps, `${ps.length}`])}>아이템 추가</button>
        <MDSInput {...(props as SelectProps)} value={list} list={allList} onChange={setList} />
      </Wrapper>
    );
  },
};

export const SelectWithChip: Story = {
  args: {
    type: 'select',
    custom: {
      withChip: true,
    },
    fullWidth: true,
    format: (label, value) => `${label} + format`,
    guide: 'Guide text',
  },
  render: function Render(props) {
    const [list, setList] = useState<string[]>([]);
    const allList = [...Array(100)].map((_, i) => ({
      label: `value_${i}`,
      value: `${i}`,
    }));

    return (
      <Wrapper>
        <button onClick={() => setList((ps) => [...ps, `${ps.length}`])}>아이템 추가</button>
        <MDSInput {...(props as SelectProps)} value={list} list={allList} onChange={setList} />
      </Wrapper>
    );
  },
};
