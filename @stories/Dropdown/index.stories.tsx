// @ts-nocheck
import React, { useState } from 'react';
import { MDSChip, MDSDropdown, MDSTag, MDSTypography } from '../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSDropdown> = {
  component: MDSDropdown,
  title: '2. Components/Dropdown',
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

const Wrapper = ({ children }: React.PropsWithChildren) => {
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

export const DropdownSingle: Story = {
  args: {
    modules: ['sort', 'search'],
  },
  render: function Render(props) {
    const [value, setValue] = useState<number>();
    const allList = [
      {
        label: 'Value1',
        value: 1,
        imgUrl:
          'https://s.pstatic.net/dthumb.phinf/?src=%22https%3A%2F%2Fshared-comic.pstatic.net%2Fthumb%2Fwebtoon%2F769209%2Fthumbnail%2Fthumbnail_IMAG21_3511dcdd-6e33-4171-8839-598d6d266215.jpg%22&type=nf216_280&service=navermain',
      },
      { label: 'Value2', value: 2 },
      { label: 'Divider' },
      { label: 'Click button', onClick: () => {} },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
    ];

    return (
      <Wrapper>
        <MDSTypography>Single select (sort, search)</MDSTypography>
        <MDSTypography
          variant="T14"
          as="code"
          style={{ backgroundColor: '#ddd', padding: '8px', borderRadius: '4px', fontWeight: 400 }}
        >
          DropdownItem Type <br />
          &#123; label: string | ReactElement, value: T, onClick?: () =&gt; void, imgUrl?: string, icon?: ReactElement,
          rightSection?: ReactElement, children?: DropdownItem[] &#125; <br />
          <br />
          &lt;MDSDropdown label="Label" value=&#123;value&#125; onChange=&#123;setValue&#125; list=&#123;allList&#125;
          modules=['sort', 'search'] /&gt;
          <br />
          <br />- value가 없고(undefined) onClick이 없고 children이 없으면 label로 표현됨
        </MDSTypography>
        <MDSDropdown {...props} label="Label" value={value} onChange={setValue} list={allList} />
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
      { label: 'Value1', value: 1 },
      { label: 'Value2', value: 2 },
      { label: 'Value3', value: 3 },
      { label: 'Value4', value: 4 },
      { label: 'Value5', value: 5 },
    ];

    return (
      <Wrapper>
        <MDSTypography>Multi select (search, sort)</MDSTypography>
        <MDSTypography
          variant="T14"
          as="code"
          style={{ backgroundColor: '#ddd', padding: '8px', borderRadius: '4px', fontWeight: 400 }}
        >
          &lt;MDSDropdown label="Label" value=&#123;list&#125; onChange=&#123;setList&#125; list=&#123;allList&#125;
          modules=['sort', 'search'] /&gt;
        </MDSTypography>
        <MDSDropdown {...props} label="Value" value={list} onChange={setList} list={allList} />
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
    ];

    return (
      <Wrapper>
        <MDSTypography>Multi + Single</MDSTypography>
        <MDSTypography
          variant="T14"
          as="code"
          style={{ backgroundColor: '#ddd', padding: '8px', borderRadius: '4px', fontWeight: 400 }}
        >
          &lt;MDSDropdown label="Label" value=&#123;list&#125; onChange=&#123;setList&#125; list=&#123;allList&#125;
          modules=['search', '1-depth-single'] /&gt;
        </MDSTypography>
        <MDSDropdown {...props} label="Value" value={list} onChange={setList} list={allList} />
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

    return (
      <Wrapper>
        <MDSTypography>Infinite dropdown</MDSTypography>
        <MDSTypography
          variant="T14"
          as="code"
          style={{ backgroundColor: '#ddd', padding: '8px', borderRadius: '4px', fontWeight: 400 }}
        >
          &lt;MDSDropdown
          <br /> &nbsp;&nbsp;label="Label"
          <br /> &nbsp;&nbsp;value=&#123;list&#125;
          <br /> &nbsp;&nbsp;onChange=&#123;setList&#125;
          <br /> &nbsp;&nbsp;list=&#123;allList&#125; <br />
          &nbsp;&nbsp;modules=[
          <br /> &nbsp;&nbsp;&nbsp;&nbsp;'sort', <br />
          &nbsp;&nbsp;&nbsp;&nbsp;'search', <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#123; type: 'infinite', total: 1234, isLoading, onScrollBottom: handleMutate, &#125;
          <br />
          &nbsp;&nbsp;]
          <br />
          /&gt;
        </MDSTypography>
        <MDSDropdown
          {...props}
          label="Value"
          value={list}
          onChange={setList}
          list={allList}
          modules={[
            ...props.modules,
            {
              type: 'infinite',
              total: 1234,
              isLoading,
              onScrollBottom: handleMutate,
            },
          ]}
        />
      </Wrapper>
    );
  },
};

export const DropdownMenu: Story = {
  args: {},
  render: function Render(props) {
    const list = [
      {
        label: 'Log in',
        onClick: () => {},
      },
      {
        label: (
          <MDSTypography variant="T14" color="color/content/critical/default/normal">
            Log out
          </MDSTypography>
        ),
        onClick: () => {},
      },
    ];

    return (
      <Wrapper>
        <MDSTypography>메뉴 형태로 사용</MDSTypography>
        <MDSTypography
          variant="T14"
          as="code"
          style={{ backgroundColor: '#ddd', padding: '8px', borderRadius: '4px', fontWeight: 400 }}
        >
          const list = [<br /> &#123; label: 'Log in', onClick: () =&gt; &#123; /* login */ &#125; &#125;, <br />
          &#123; label: ( &lt;MDSTypography variant="T14" color="color/content/critical/default/normal"&gt; Log out
          &lt;/MDSTypography&gt; ), onClick: () = &#123;/* log out */&#125; &#125; ];
          <br />
          <br />
          &lt;MDSDropdown list=&lt;list&gt; renderAnchor= &lt;() =&gt; ( &lt;MDSChip variant="border" color="blue"
          size="medium"&gt; 커스텀 버튼 &lt;/MDSChip&gt; )&gt; /&gt;
        </MDSTypography>
        <div>
          <MDSDropdown
            list={list}
            renderAnchor={() => (
              <MDSChip variant="border" color="blue" size="medium">
                커스텀 버튼
              </MDSChip>
            )}
          />
        </div>
      </Wrapper>
    );
  },
};
