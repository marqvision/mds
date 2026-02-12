import React, { useState } from 'react';
import { MDSButton, MDSIcon, MDSInput, MDSPlainButton, MDSTypography } from '../../../../components';
import { TextFieldProps } from '../../../../components/molecules/Input/@types';
import { useMDSInputKeywordManager } from '../../../../components/molecules/Input/@hooks/useMDSInputKeywordManager';
import { Story, Wrapper } from './index.stories';
import type { Meta } from '@storybook/react-vite';

const meta: Meta<typeof MDSInput> = {
  component: MDSInput,
  title: '2. Components/molecules/Input/useMDSInputKeywordManager',
  args: {
    value: '',
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;

const ChipWrapper = (props: { children: React.ReactNode }) => {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{props.children}</div>;
};

const ValueWrapper = (props: { children: React.ReactNode }) => {
  return (
    <MDSTypography
      style={{
        padding: '16px',
        maxHeight: '150px',
        overflowY: 'auto',
        whiteSpace: 'pre',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {props.children}
    </MDSTypography>
  );
};

export const StringKeywords: Story = {
  args: {},
  render: function Render(props) {
    const [value, setValue] = useState<string[]>([]);

    const { inputProps, handlers } = useMDSInputKeywordManager({
      value,
      onChange: setValue,
    });

    return (
      <Wrapper>
        <ValueWrapper>{JSON.stringify(value, null, 2)}</ValueWrapper>

        <MDSInput {...(props as TextFieldProps)} {...inputProps} />

        <ChipWrapper>
          {value.map((item, index) => (
            <MDSButton
              key={index}
              variant="tint"
              color="bluegray"
              endIcon={
                <MDSPlainButton
                  size="small"
                  color="bluegray"
                  icon={<MDSIcon.CloseDelete size={16} variant="border" />}
                  onClick={() => handlers.remove(item)}
                />
              }
            >
              {item}
            </MDSButton>
          ))}
        </ChipWrapper>
      </Wrapper>
    );
  },
};

export const ObjectKeywords: Story = {
  args: {},
  render: function Render(props) {
    const [value, setValue] = useState<{ keyword: string; id?: number; isPrimary: boolean }[]>([]);

    const { inputProps, handlers } = useMDSInputKeywordManager({
      type: 'object',
      value,
      onChange: setValue,
      initialValue: { isPrimary: false },
    });

    return (
      <Wrapper>
        <ValueWrapper>{JSON.stringify(value, null, 2)}</ValueWrapper>

        <MDSInput {...(props as TextFieldProps)} {...inputProps} />

        <ChipWrapper>
          {value.map((item, index) => (
            <MDSButton
              key={index}
              variant="tint"
              color="bluegray"
              endIcon={
                <MDSPlainButton
                  size="small"
                  color="bluegray"
                  icon={<MDSIcon.CloseDelete size={16} variant="border" />}
                  onClick={() => handlers.remove(item.keyword)}
                />
              }
            >
              {item.keyword}
            </MDSButton>
          ))}
        </ChipWrapper>
      </Wrapper>
    );
  },
};

export const CustomRegExp: Story = {
  args: {},
  render: function Render(props) {
    const [value, setValue] = useState<string[]>([]);

    const { inputProps, handlers } = useMDSInputKeywordManager({
      value,
      onChange: setValue,
      splitType: /\|+/g,
    });

    return (
      <Wrapper>
        <MDSTypography>
          splitType 에 정규식을 전달하면 해당 정규식으로 텍스트를 분할합니다. 예: <code>/\|+/g</code>
        </MDSTypography>

        <ValueWrapper>{JSON.stringify(value, null, 2)}</ValueWrapper>

        <MDSInput {...(props as TextFieldProps)} {...inputProps} />

        <ChipWrapper>
          {value.map((item, index) => (
            <MDSButton
              key={index}
              variant="tint"
              color="bluegray"
              endIcon={
                <MDSPlainButton
                  size="small"
                  color="bluegray"
                  icon={<MDSIcon.CloseDelete size={16} variant="border" />}
                  onClick={() => handlers.remove(item)}
                />
              }
            >
              {item}
            </MDSButton>
          ))}
        </ChipWrapper>
      </Wrapper>
    );
  },
};

export const WithoutPaste: Story = {
  args: {},
  render: function Render(props) {
    const [value, setValue] = useState<string[]>([]);

    const { inputProps: { inputProps, ...restProps}, handlers } = useMDSInputKeywordManager({
      value,
      onChange: setValue,
      splitType: /\|+/g,
    });
    void inputProps;

    return (
      <Wrapper>
        <MDSTypography>
          paste 를 사용하지 않고 키워드 입력만 허용합니다.
        </MDSTypography>

        <ValueWrapper>{JSON.stringify(value, null, 2)}</ValueWrapper>

        <MDSInput {...(props as TextFieldProps)} {...restProps} />

        <ChipWrapper>
          {value.map((item, index) => (
            <MDSButton
              key={index}
              variant="tint"
              color="bluegray"
              endIcon={
                <MDSPlainButton
                  size="small"
                  color="bluegray"
                  icon={<MDSIcon.CloseDelete size={16} variant="border" />}
                  onClick={() => handlers.remove(item)}
                />
              }
            >
              {item}
            </MDSButton>
          ))}
        </ChipWrapper>
      </Wrapper>
    );
  },
};