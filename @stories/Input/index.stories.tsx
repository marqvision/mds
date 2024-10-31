import React, { useState } from 'react';
import { MDSInput, MDSTypography } from '../../components';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectProps, TextFieldProps } from '../../components/Input/@types';

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
        label: '추가',
        onSubmit: () => undefined,
      },
    },
    guide: 'Guide text',
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

export const Select: Story = {
  args: {
    type: 'select',
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
