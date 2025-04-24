import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { MDSCheckbox, MDSDropdown, MDSInput, MDSTypography } from '../../components';
import { FolioCommonEnumsApplicationStepEnum, StatusList } from './@constants';
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
  const { color } = useTheme();

  const [list, setList] = useState<FolioCommonEnumsApplicationStepEnum[]>([]);
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const description = `
    modules={[
      ...props.modules,
      {
        type: 'sticky-top',
        element: (
          <label
            style={{
              padding: '12px 12px 16px',
              display: 'inline-flex',
              gap: '12px',
              cursor: 'pointer',
              alignItems: 'center',
            }}
          >
            <MDSCheckbox value={checked} onChange={setChecked} />
            <MDSTypography color="color/content/critical/default/normal">커스텀 체크박스</MDSTypography>
          </label>
        ),
      },
      {
        type: 'sticky-bottom',
        element: (
          <div style={{ padding: '12px', borderTop: \`1px solid ${color.border.neutral.default.normal}\` }}>
            <MDSInput
              value={value}
              onChange={setValue}
              custom={{ add: { label: 'Add', onSubmit: () => undefined } }}
              fullWidth
            />
          </div>
        ),
      },
    ]}
  `;

  return (
    <Wrapper>
      <MDSTypography>with sticky top and sticky bottom element</MDSTypography>
      <div>
        isChecked:{' '}
        <span style={{ backgroundColor: '#eee', padding: '2px 4px', borderRadius: '4px' }}>
          {checked ? 'true' : 'false'}
        </span>
      </div>
      <div>
        text field value:{' '}
        {value && <span style={{ backgroundColor: '#eee', padding: '2px', borderRadius: '4px' }}>{value}</span>}
      </div>
      <MDSDropdown
        {...props}
        label="Value"
        value={list}
        onChange={setList}
        list={Object.values(StatusList)}
        modules={[
          ...props.modules,
          {
            type: 'sticky-top',
            element: (
              <label
                style={{
                  padding: '0 12px 16px',
                  display: 'inline-flex',
                  gap: '12px',
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
              >
                <MDSCheckbox value={checked} onChange={setChecked} />
                <MDSTypography color="color/content/critical/default/normal">커스텀 체크박스</MDSTypography>
              </label>
            ),
          },
          {
            type: 'sticky-bottom',
            element: (
              <div style={{ padding: '12px', borderTop: `1px solid ${color.border.neutral.default.normal}` }}>
                <MDSInput
                  value={value}
                  onChange={setValue}
                  custom={{ add: { label: 'Add', onSubmit: () => undefined } }}
                  fullWidth
                />
              </div>
            ),
          },
        ]}
        onSelect={undefined}
      />
      <MDSTypography
        as="code"
        style={{ backgroundColor: '#ddd', whiteSpace: 'pre', borderRadius: '4px', fontWeight: 400 }}
      >
        {description}
      </MDSTypography>
    </Wrapper>
  );
};

export const WithStickyElement: Story = {
  args: {
    modules: ['search'],
    isFoldAll: true,
  },
  render: (props) => <InnerElement {...props} />,
};
