import { useRef, useState } from 'react';
import { MDSInput } from '../../../../components';
import { TextFieldProps } from '../../../../components/molecules/Input/@types';
import { Story, Wrapper } from './index.stories';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof MDSInput> = {
  component: MDSInput,
  title: '2. Components/molecules/Input',
  args: {
    value: '',
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;

export const WithRef: Story = {
  args: {},
  render: function Render(props) {
    const [value, setValue] = useState<string>('');

    const ref = useRef<HTMLInputElement>(null);
    const refAdd = useRef<HTMLButtonElement>(null);
    const refButton = useRef<HTMLButtonElement>(null);

    const handleFocusInput = () => {
      ref.current?.focus();
    };
    const handleFocusInputAdd = () => {
      refAdd.current?.focus();
    };
    const handleFocusButton = () => {
      refButton.current?.focus();
    };

    return (
      <Wrapper>
        <div>
          <button onClick={handleFocusInput}>input에 포커스</button>
          <button onClick={handleFocusInputAdd}>input add에 포커스</button>
          <button onClick={handleFocusButton}>button에 포커스</button>
          <div>value: {value}</div>
        </div>
        <MDSInput
          ref={ref}
          {...(props as TextFieldProps)}
          value={value}
          onChange={setValue}
          custom={{
            add: {
              ref: refAdd,
              onSubmit: () => {
                alert('add 누름');
              },
            },
          }}
        />
        <MDSInput
          variant="select"
          ref={refButton}
          value="asd"
          list={[]}
          onClick={() => {
            alert('clicked!');
          }}
        />
      </Wrapper>
    );
  },
};
