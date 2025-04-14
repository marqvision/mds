// @ts-nocheck
import { PropsWithChildren } from 'react';
import { useState } from '@storybook/preview-api';
import { MDSChip, MDSDropdown, MDSIcon, MDSInput, MDSTag, MDSTypography2 } from '../../components';
import { StatusList } from './@constants';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSDropdown> = {
  component: MDSDropdown,
  title: '2. Components/molecules/Dropdown',
  args: {
    value: '',
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDropdown>;

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};

const tag = (
  <MDSTag variant="tint" color="yellow" size="medium">
    Tag
  </MDSTag>
);

const icon = <MDSIcon.AddPlus variant="outline" />;

export const DropdownSingle: Story = {
  args: {
    modules: [
      'sort',
      'search',
      {
        type: 'bottom-button',
        label: 'Sticky bottom button',
        icon: icon,
        preventClose: true,
        onClick: () => {
          alert('clicked');
        },
      },
    ],
  },
  render: function Render(props) {
    const [value, setValue] = useState<number | undefined>(undefined);
    const allList = [
      {
        label: 'Value1',
        value: 1,
        imgUrl:
          'https://s.pstatic.net/dthumb.phinf/?src=%22https%3A%2F%2Fshared-comic.pstatic.net%2Fthumb%2Fwebtoon%2F769209%2Fthumbnail%2Fthumbnail_IMAG21_3511dcdd-6e33-4171-8839-598d6d266215.jpg%22&type=nf216_280&service=navermain',
        rightSection: tag,
      },
      { label: 'Value2', value: 2, isDisabled: true },
      { label: 'Divider' },
      {
        label: 'Click button',
        onClick: () => {
          alert('clicked');
        },
      },
      {
        label: 'Click button disabled',
        onClick: () => {
          alert('clicked');
        },
        isDisabled: true,
      },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
    ];

    const sample = `
      <MDSDropdown label="Label" value={value} onChange={setValue} list={allList} modules={['sort', 'search']} />
    `;

    const text = `
      {
        type: 'bottom-button',
        label: 'Sticky bottom button',
        icon: icon,
        isDisabled?: boolean,
        // onClick 이후 해당 드롭다운이 닫힐지 닫히지 않을지 (default: false) 
        preventClose: false,
        onClick: () => {
          alert('clicked');
        }
      }
    `;

    const dropItemType = `
      {
        value: T;
        label: string | ReactElement;
        subLabel?: string | SubLabel;
        isDisabled?: boolean;
        icon?: ReactElement;
        imgUrl?: string;
        rightSection?: ReactElement;
        style?: CSSProperties;
        onClick?: () => void;
        children?: DropdownItem<T>[]
      }
      - value가 없고(undefined) onClick이 없고 children이 없으면 label로 표현됨
    `;

    return (
      <Wrapper>
        <MDSTypography2>Single select (sort, search)</MDSTypography2>
        <MDSTypography2 as="code" style={{ whiteSpace: 'pre', backgroundColor: '#ddd', borderRadius: '4px' }}>
          {sample}
        </MDSTypography2>
        <MDSTypography2>DropdownItem Type</MDSTypography2>
        <MDSTypography2 as="code" style={{ whiteSpace: 'pre', backgroundColor: '#ddd', borderRadius: '4px' }}>
          {dropItemType}
        </MDSTypography2>
        <MDSTypography2>Sticky bottom button</MDSTypography2>
        <MDSTypography2 as="code" style={{ whiteSpace: 'pre', backgroundColor: '#ddd', borderRadius: '4px' }}>
          {text}
        </MDSTypography2>
        <MDSDropdown {...props} label="Label" value={value} onChange={setValue} list={allList} onSelect={undefined} />
      </Wrapper>
    );
  },
};

export const DropdownMulti: Story = {
  args: {
    modules: ['sort', 'search'],
  },
  render: function Render(props) {
    const [list, setList] = useState<number[]>([]);
    const allList = [
      { label: 'Value1', value: 1, subLabel: 'Hi' },
      { label: 'Value2', value: 2, subLabel: { label: 'Hi2 top', position: 'top' }, isDisabled: true },
      { label: 'Value3', value: 3, subLabel: { label: 'Hi2 bottom include Search', includeSearch: true } },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
    ];
    const [indeterminate, setIndeterminate] = useState<number[]>([4, 5]);

    const reset = () => {
      setList([]);
      setIndeterminate([4, 5]);
    };

    const text = `
      <MDSDropdown
        label="Label"
        value={list}
        onChange={setList}
        list={allList}
        modules={['sort', 'search']}
      />
    `;

    return (
      <Wrapper>
        <MDSTypography2>Multi select (search, sort)</MDSTypography2>
        <MDSTypography2
          as="code"
          style={{ backgroundColor: '#ddd', whiteSpace: 'pre', borderRadius: '4px', fontWeight: 400 }}
        >
          {text}
        </MDSTypography2>
        <MDSTypography2>indeterminate: {indeterminate.join(', ')}</MDSTypography2>
        <MDSDropdown
          {...props}
          label="Value"
          value={list}
          onChange={(value, indeterminate) => {
            setList(value);
            setIndeterminate(indeterminate || []);
          }}
          list={allList}
          indeterminate={indeterminate}
          onSelect={undefined}
        />
        <button onClick={reset}>reset</button>
      </Wrapper>
    );
  },
};

export const Dropdown1DepthSingle: Story = {
  args: {
    modules: ['search', '1-depth-single'],
  },
  render: function Render(props) {
    const [list, setList] = useState<number[]>([]);
    const allList = [
      { label: 'Value1', value: 1 },
      { label: 'Value2', value: 2 },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
      { label: 'Divider :)' },
      {
        label: 'Group',
        children: [
          { label: 'Value6', value: 6 },
          { label: 'Value7', value: 7 },
        ],
      },
      {
        label: 'Group2 - disabled',
        isDisabled: true,
        children: [
          { label: 'Value8', value: 8 },
          { label: 'Value9', value: 9 },
        ],
      },
    ];

    const text = `
      <MDSDropdown
        label="Label"
        value={list}
        onChange={setList}
        list={allList}
        modules={['search', '1-depth-single']}
      />
    `;

    return (
      <Wrapper>
        <MDSTypography2>Multi + Single</MDSTypography2>
        <MDSTypography2
          as="code"
          style={{ backgroundColor: '#ddd', borderRadius: '4px', fontWeight: 400, whiteSpace: 'pre' }}
        >
          {text}
        </MDSTypography2>
        <MDSDropdown {...props} label="Value" value={list} onChange={setList} list={allList} onSelect={undefined} />
      </Wrapper>
    );
  },
};

export const DropdownMulti2Depth: Story = {
  args: {
    modules: ['search'],
    isFoldAll: true,
  },
  render: function Render(props) {
    const [list, setList] = useState<number[]>([]);

    return (
      <Wrapper>
        <MDSTypography2>2depth multi dropdown</MDSTypography2>
        <MDSDropdown
          {...props}
          label="Value"
          value={list}
          onChange={setList}
          list={Object.values(StatusList)}
          modules={props.modules}
          onSelect={undefined}
        />
      </Wrapper>
    );
  },
};

export const DropdownMultiInfinite: Story = {
  args: {
    modules: ['search'],
  },
  render: function Render(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState<number[]>([]);
    const [allList, setAllList] = useState([
      {
        label: 'Value0',
        value: 0,
        imgUrl:
          'https://s.pstatic.net/dthumb.phinf/?src=%22https%3A%2F%2Fs.pstatic.net%2Fmimgnews%2Fimage%2Forigin%2F006%2F2024%2F11%2F11%2F126914.jpg%3Fut%3D20241111112816%22&type=nf312_208&service=navermain',
      },
      { label: 'Value1', value: 1 },
      { label: 'Divider1' },
      { label: 'Value2', value: 2 },
      { label: 'Value3', value: 3 },
      { label: 'Divider2' },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
    ]);

    const handleMutate = () => {
      setIsLoading(true);
      setTimeout(() => {
        setAllList((ps) => [
          ...ps,
          ...[...new Array(10)].map((_, index) => ({
            label: `Value${index + ps.length}`,
            value: index + ps.length,
          })),
        ]);
        setIsLoading(false);
      }, 1000);
    };

    const code = `
      <MDSDropdown
          label="Value"
          value={list}
          onChange={setList}
          list={allList}
          modules={[
            {
              type: 'infinite',
              total: 1234,
              isLoading,
              hasNextPage: true,
              onScrollBottom: handleMutate,
            }
          ]}
        />
    `;

    return (
      <Wrapper>
        <MDSTypography2>Infinite dropdown</MDSTypography2>
        <MDSTypography2 as="code" style={{ backgroundColor: '#ddd', borderRadius: '4px', whiteSpace: 'pre' }}>
          {code}
        </MDSTypography2>
        <MDSDropdown
          {...props}
          label="Value"
          value={list}
          onChange={setList}
          list={allList}
          modules={[
            ...(props.modules || []),
            {
              type: 'infinite',
              total: 1234,
              isLoading,
              hasNextPage: true,
              onScrollBottom: handleMutate,
            },
          ]}
          onSelect={undefined}
        />
      </Wrapper>
    );
  },
};

const ele = <MDSTypography2 color="color/content/critical/default/normal">Log out</MDSTypography2>;

export const DropdownMenu: Story = {
  args: {},
  render: function Render(props) {
    const list = [
      {
        label: 'Log in',
        onClick: () => {},
      },
      {
        label: ele,
        onClick: () => {},
      },
    ];

    const code = `
      const list = [
        { label: 'Log in', onClick: () => { /* login */ } },
        { label: (
            <MDSTypography2  color="color/content/critical/default/normal">Log out</MDSTypography2>
          ), 
          onClick: () => {/* log out */}
        }
      ];

      <MDSDropdown
        list={list}
        renderAnchor={() => <MDSChip variant="border" color="blue" size="medium">커스텀 버튼</MDSChip>}
      />
    `;

    return (
      <Wrapper>
        <MDSTypography2>메뉴 형태로 사용</MDSTypography2>
        <MDSTypography2
          as="code"
          style={{ backgroundColor: '#ddd', whiteSpace: 'pre', borderRadius: '4px', fontWeight: 400 }}
        >
          {code}
        </MDSTypography2>
        <div>
          <MDSDropdown
            list={list}
            renderAnchor={() => (
              <MDSChip variant="border" color="blue" size="medium">
                커스텀 버튼
              </MDSChip>
            )}
            onSelect={undefined}
          />
        </div>
      </Wrapper>
    );
  },
};

export const WithChip: Story = {
  render: function Render() {
    const [list, setList] = useState<number[]>([]);
    const allList = [
      { label: 'Value1', value: 1 },
      { label: 'Value2', value: 2 },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
      { label: 'Divider :)' },
      {
        label: 'Group',
        children: [
          { label: 'Value6', value: 6 },
          { label: 'Value7', value: 7 },
        ],
      },
    ];

    return (
      <Wrapper>
        <MDSDropdown
          value={list}
          list={allList}
          onChange={setList}
          width="fit-anchor"
          renderAnchor={(value, returnObj, list) => (
            <MDSInput
              onChange={setList}
              value={value}
              list={list}
              variant="select"
              custom={{ withChip: true }}
              placeholder="Select"
            />
          )}
          onSelect={undefined}
        />
      </Wrapper>
    );
  },
};

export const OnSelect: Story = {
  render: function Render() {
    const [list, setList] = useState<number[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const allList = [
      { label: 'Value1', value: 1 },
      { label: 'Value2', value: 2 },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
      { label: 'Divider :)' },
      {
        label: 'Group',
        isDisabled,
        children: [
          { label: 'Value6', value: 6 },
          { label: 'Value7', value: 7 },
        ],
      },
    ];

    const handleSelect = (newValue: number[], selectedValue: number[], isSelected: boolean) => {
      const LIMIT = 3;

      let all = isSelected ? [...newValue, ...selectedValue] : selectedValue.filter((v) => !newValue.includes(v));

      if (all.includes(1)) {
        setIsDisabled(true);
        all = all.filter((v) => ![6, 7].includes(v));
      } else {
        setIsDisabled(false);
      }

      if (isSelected && all.length > LIMIT) {
        alert('limit 3');
        return [...selectedValue, ...newValue.slice(0, LIMIT - selectedValue.length)];
      }

      return all;
    };

    return (
      <Wrapper>
        <MDSTypography2>Limit: 3적용 / Value1 선택한 경우 Group disabled</MDSTypography2>
        <MDSDropdown
          label="OnSelectTest"
          value={list}
          list={allList}
          modules={['search']}
          onChange={setList}
          onSelect={handleSelect}
        />
      </Wrapper>
    );
  },
};

const BUTTON = <button onClick={() => alert('Inside clicked!')}>BUTTON</button>;

export const SubLabel: Story = {
  args: {
    subLabelPosition: 'bottom',
    includeSearch: false,
  },
  argTypes: {
    subLabelPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'tooltip', 'bracket'],
    },
    includeSearch: [true, false],
  },
  render: function Render(args) {
    const [list, setList] = useState<number[]>([]);
    const allList = [...Array(50)].map((_, index) => ({
      label: `Label ${index} ${[...Array(index)].map(() => 'AAA').join('')}`,
      value: index,
      subLabel: {
        label: `${Math.ceil(Math.random() * 100)}`,
        includeSearch: args.includeSearch,
        position: args.subLabelPosition,
      },
    }));

    return (
      <Wrapper>
        {args.includeSearch ? 'true' : 'false'}
        <MDSDropdown
          label="SubLabelCase"
          value={list}
          list={allList}
          width="420px"
          modules={[
            'search',
            {
              type: 'bottom-button',
              label: [...Array(1)].map(() => 'LONG_TEXT').join(','),
              icon,
              onClick: () => {
                alert('Outside clicked!');
              },
              rightSection: BUTTON,
            },
          ]}
          onChange={setList}
        />
      </Wrapper>
    );
  },
};
