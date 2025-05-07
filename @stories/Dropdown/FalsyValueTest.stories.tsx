import { useState } from 'react';
import { MDSDropdown, MDSTypography } from '../../components';
import { Story } from './index.stories';
import { Wrapper } from './@components';
import type { Meta } from '@storybook/react';

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

const InnerElement = (props: typeof MDSDropdown.arguments) => {
  const [value, setValue] = useState<any>();
  const [list, setList] = useState<any[]>([]);

  const allList = [
    { label: '0', value: 0 },
    { label: 'false', value: false },
    { label: 'true', value: true },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
    {
      label: (
        <div style={{ backgroundColor: 'lightblue', padding: '12px 16px' }}>
          <MDSTypography weight="medium" color="color/content/critical/default/normal">
            undefined with element label
          </MDSTypography>
        </div>
      ),
      value: undefined,
    },
  ];

  return (
    <Wrapper>
      <MDSTypography>Processing for various values</MDSTypography>
      <MDSTypography>-1 is always used as a whole selection</MDSTypography>
      <MDSTypography>
        In single selection case,{' '}
        <span style={{ backgroundColor: '#eee', padding: '2px 4px', borderRadius: '4px' }}>null</span> is selectable,
        but it is not displayed as selected in filter button. Because it&apos;s used to represent &quot;All&quot;
        selection.
      </MDSTypography>
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSDropdown
          {...props}
          label="Multiple dropdown"
          value={list}
          onChange={setList}
          list={allList}
          modules={props.modules}
          onSelect={undefined}
        />
        <MDSDropdown
          {...props}
          label="Single dropdown"
          value={value}
          onChange={setValue}
          list={allList}
          modules={props.modules}
          onSelect={undefined}
        />
      </div>
    </Wrapper>
  );
};

export const FalsyValueTest: Story = {
  args: {
    modules: ['search'],
    isFoldAll: true,
  },
  render: (props) => <InnerElement {...props} />,
};
