import React, { useState } from 'react';
import { MDSInput, MDSTypography, MDSButton } from '../../../../components';
import { SelectProps, TextFieldProps } from '../../../../components/molecules/Input/@types';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
export type Story = StoryObj<typeof MDSInput>;

export const Wrapper = ({ children }: React.PropsWithChildren) => {
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

const MIN_LENGTH = 5;
export const TextField: Story = {
  args: {
    placeholder: 'Enter value',
    value: '',
    label: {
      main: 'Main label',
      sub: 'Optional sub label',
      right: (
        <MDSTypography variant="body" size="xs" color="color/content/neutral/secondary/normal">
          1/1000
        </MDSTypography>
      ),
    },
    custom: {
      add: {
        label: 'Add',
        isDisabled: (v) => v.length < MIN_LENGTH,
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
        <div>add 버튼 활성화 최소 글자 수 {MIN_LENGTH}</div>
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

export const ExpandToFit: Story = {
  args: {
    placeholder: 'Enter value',
    custom: {
      expandToFit: {
        defaultWidth: 200,
        maxWidth: 280,
      },
      add: {
        onSubmit: () => {},
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

export const MultiLineExpandToFit: Story = {
  args: {
    placeholder: 'Enter value',
    custom: {
      multiline: {
        expandToFit: {
          maxHeight: '200px',
        },
      },
    },
  },
  render: function Render(props) {
    const [value, setValue] = useState<string>(
      '아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요아무말이나쓰는거에요'
    );

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
        onSubmit: (value) => {
          alert(`Submit keyword: ${value}`);
        },
      },
      onEnter: (value) => {
        alert(`Search keyword: ${value}`);
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
            variant="select"
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
    variant: 'select',
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
        <MDSButton onClick={() => setList((ps) => [...ps, `${ps.length}`])}>아이템 추가</MDSButton>
        <MDSInput {...(props as SelectProps)} value={list} list={allList} onChange={setList} />
      </Wrapper>
    );
  },
};

export const SelectWithChip: Story = {
  args: {
    variant: 'select',
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
        <MDSButton onClick={() => setList((ps) => [...ps, `${ps.length}`])}>아이템 추가</MDSButton>
        <MDSInput {...(props as SelectProps)} value={list} list={allList} onChange={setList} />
      </Wrapper>
    );
  },
};

export const NumberInputAmount: Story = {
  args: {
    placeholder: '0',
    inputProps: {
      type: 'text',
      onKeyDown: (e: React.KeyboardEvent) => {
        // 숫자, 소수점, 제어키만 허용
        const allowedKeys = ['Backspace', 'Delete'];
        const isNumber = /^[0-9]$/.test(e.key);
        const isDecimal = e.key === '.' && !(e.target as HTMLInputElement).value.includes('.');

        if (!isNumber && !isDecimal && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
      },
    },
    custom: {
      suffix: '$',
    },
    fullWidth: true,
    label: 'Amount',
    guide: 'Enter amount in dollars (numbers and decimal only)',
    format: (value: string) => {
      // 숫자와 소수점만 허용하는 정규식으로 필터링
      const numericValue = value.replace(/[^0-9.]/g, '');
      // 소수점이 여러 개인 경우 첫 번째만 유지
      const parts = numericValue.split('.');
      return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
    },
  },
  render: function Render(props) {
    const [amount, setAmount] = useState<string>('');

    const handleChangeAmount = (value: string) => {
      setAmount(value);
    };

    return (
      <Wrapper>
        <div>Current amount: {amount ? `$${amount}` : 'Not set'}</div>
        <MDSInput {...(props as TextFieldProps)} value={amount} onChange={handleChangeAmount} />
      </Wrapper>
    );
  },
};

export const NumberInputPercent: Story = {
  args: {
    placeholder: '0',
    inputProps: {
      type: 'text',
      onKeyDown: (e: React.KeyboardEvent) => {
        // 숫자, 소수점, 마이너스, 제어키만 허용
        const allowedKeys = ['Backspace', 'Delete'];
        const isNumber = /^[0-9]$/.test(e.key);
        const isDecimal = e.key === '.' && !(e.target as HTMLInputElement).value.includes('.');
        const isMinus = e.key === '-' && !(e.target as HTMLInputElement).value.includes('-');

        if (!isNumber && !isDecimal && !isMinus && !allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
      },
    },
    custom: {
      suffix: '%',
    },
    fullWidth: true,
    label: 'Percentage',
    guide: 'Enter percentage (max 100%, numbers and decimal only)',
    format: (value: string) => {
      // 숫자와 소수점만 허용하는 정규식으로 필터링
      let numericValue = value.replace(/[^0-9.-]/g, '');
      // 소수점이 여러 개인 경우 첫 번째만 유지
      const parts = numericValue.split('.');
      numericValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
      // 100 초과 시 100으로 제한
      return Number(numericValue) > 100 ? '100' : numericValue;
    },
  },
  render: function Render(props) {
    const [percent, setPercent] = useState<string>('');

    const handleChangePercent = (value: string) => {
      setPercent(value);
    };

    return (
      <Wrapper>
        <div>Current percentage: {percent ? `${percent}%` : 'Not set'}</div>
        <MDSInput {...(props as TextFieldProps)} value={percent} onChange={handleChangePercent} />
      </Wrapper>
    );
  },
};

export const NumberInputDiscountDemo: Story = {
  args: {},
  render: function Render() {
    const [discountType, setDiscountType] = useState<'amount' | 'percent'>('amount');
    const [discountAmount, setDiscountAmount] = useState<string>('');
    const [discountPercent, setDiscountPercent] = useState<string>('');

    const handleChangeDiscount = (value: string) => {
      if (discountType === 'amount') {
        setDiscountAmount(value);
      } else {
        setDiscountPercent(value);
      }
    };

    const currentValue = discountType === 'amount' ? discountAmount : discountPercent;

    return (
      <Wrapper>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <MDSButton variant={discountType === 'amount' ? 'fill' : 'border'} onClick={() => setDiscountType('amount')}>
            Amount ($)
          </MDSButton>
          <MDSButton
            variant={discountType === 'percent' ? 'fill' : 'border'}
            onClick={() => setDiscountType('percent')}
          >
            Percentage (%)
          </MDSButton>
        </div>
        <div>
          Current discount:{' '}
          {discountType === 'amount'
            ? discountAmount
              ? `$${discountAmount}`
              : 'Not set'
            : discountPercent
            ? `${discountPercent}%`
            : 'Not set'}
        </div>
        <MDSInput
          placeholder="0"
          value={currentValue}
          inputProps={{
            type: 'text',
            onKeyDown: (e: React.KeyboardEvent) => {
              // 숫자, 소수점, 제어키만 허용
              const allowedKeys = ['Backspace', 'Delete'];
              const isNumber = /^[0-9]$/.test(e.key);
              const isDecimal = e.key === '.' && !(e.target as HTMLInputElement).value.includes('.');

              if (!isNumber && !isDecimal && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            },
          }}
          custom={{
            suffix: discountType === 'amount' ? '$' : '%',
          }}
          fullWidth
          label={`Discount ${discountType === 'amount' ? 'Amount' : 'Percentage'}`}
          guide="Numbers and decimal only"
          format={(value: string) => {
            // 숫자와 소수점만 허용하는 정규식으로 필터링
            let numericValue = value.replace(/[^0-9.]/g, '');
            // 소수점이 여러 개인 경우 첫 번째만 유지
            const parts = numericValue.split('.');
            numericValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
            // 퍼센트 타입일 때 100 초과 시 100으로 제한
            return discountType === 'percent' && Number(numericValue) > 100 ? '100' : numericValue;
          }}
          onChange={handleChangeDiscount}
        />
      </Wrapper>
    );
  },
};

export const DeleteIconCustomProps: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>('');

    return (
      <Wrapper>
        <MDSInput
          custom={{ deleteIcon: 'always' }}
          value={value}
          onChange={setValue}
          label={{ main: 'custom.deleteIcon: always', sub: '내용이 있을 때, 항상 clear 버튼 표시' }}
        />
        <MDSInput
          custom={{ deleteIcon: 'never' }}
          value={value}
          onChange={setValue}
          label={{ main: 'custom.deleteIcon: never', sub: '항상 표시 안함' }}
        />
        <MDSInput
          custom={{ deleteIcon: 'onFocus' }}
          value={value}
          onChange={setValue}
          label={{
            main: 'custom.deleteIcon: onFocus',
            sub: '내용이 있을 때, textField에 포커스 하면 표시. (*기본값)',
          }}
        />
      </Wrapper>
    );
  },
};
