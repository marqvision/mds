import { useState } from 'react';
import { MDSSegmentedButton } from '../../../components';
import { MDSIcon } from '../../../components/atoms/Icon';
import { SegmentedButtonProps } from '../../../components/molecules/SegmentedButton/@types';
import type { Meta, StoryObj } from '@storybook/react';

const SegmentedButtonWithState = (args: SegmentedButtonProps<string | number>) => {
  const [selected, setSelected] = useState(args.value);
  return <MDSSegmentedButton {...args} value={selected} onChange={setSelected} />;
};

const meta = {
  title: '2. Components/molecules/SegmentedButton',
  component: MDSSegmentedButton,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['width', 'selected'] },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MDSSegmentedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'hug',
    variant: 'fill',
    value: 0,
    buttonGroupList: [
      {
        label: 'Button 1',
        value: 0,
        icon: undefined,
        selectedIcon: undefined,
      },
      {
        label: 'Button 2',
        value: 1,
        icon: undefined,
        selectedIcon: undefined,
      },
    ],
    size: 'medium',
    onChange: (value: string | number) => console.log(`Button clicked: ${value}`),
  },
  render: (args) => <SegmentedButtonWithState {...args} />,
};

export const TintVariant: Story = {
  args: {
    type: 'hug',
    variant: 'border',
    value: 0,
    buttonGroupList: [
      {
        label: 'Option 1',
        value: 0,
      },
      {
        label: 'Option 2',
        value: 1,
      },
      {
        label: 'Option 3',
        value: 2,
      },
    ],
    size: 'medium',
    onChange: (value: string | number) => console.log(`Button clicked: ${value}`),
  },
  render: (args) => <SegmentedButtonWithState {...args} />,
};

export const Sizes = {
  render: () => {
    const handleClick = () => {
      // Story example - no action needed
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>Small</h4>
          <MDSSegmentedButton
            type="hug"
            variant="fill"
            value="small"
            size="small"
            buttonGroupList={[
              { label: 'Small', value: 'small' },
              { label: 'Text', value: 'text' },
            ]}
            onChange={handleClick}
          />
        </div>
        <div>
          <h4>Medium</h4>
          <MDSSegmentedButton
            type="hug"
            variant="fill"
            value="medium"
            size="medium"
            buttonGroupList={[
              { label: 'Medium', value: 'medium' },
              { label: 'Text', value: 'text' },
            ]}
            onChange={handleClick}
          />
        </div>
        <div>
          <h4>Large</h4>
          <MDSSegmentedButton
            type="hug"
            variant="fill"
            value="large"
            size="large"
            buttonGroupList={[
              { label: 'Large', value: 'large' },
              { label: 'Text', value: 'text' },
            ]}
            onChange={handleClick}
          />
        </div>
      </div>
    );
  },
};

export const TypeComparison = {
  render: () => {
    const handleClick = () => {
      // Story example - no action needed
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <div>
          <h4>Hug (fit-content)</h4>
          <MDSSegmentedButton
            type="hug"
            variant="fill"
            value="first"
            buttonGroupList={[
              { label: 'First', value: 'first' },
              { label: 'Second', value: 'second' },
              { label: 'Third', value: 'third' },
            ]}
            onChange={handleClick}
          />
        </div>
        <div>
          <h4>Fit (전체 너비)</h4>
          <MDSSegmentedButton
            type="fit"
            variant="fill"
            value="first"
            buttonGroupList={[
              { label: 'First', value: 'first' },
              { label: 'Second', value: 'second' },
              { label: 'Third', value: 'third' },
            ]}
            onChange={handleClick}
          />
        </div>
        <div>
          <h4>Fixed (고정 너비)</h4>
          <MDSSegmentedButton
            type="fixed"
            fixedWidth="300px"
            variant="fill"
            value="first"
            buttonGroupList={[
              { label: 'First', value: 'first' },
              { label: 'Second', value: 'second' },
              { label: 'Third', value: 'third' },
            ]}
            onChange={handleClick}
          />
        </div>
      </div>
    );
  },
};

const InteractiveExampleComponent = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedVariant, setSelectedVariant] = useState('fill');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '500px' }}>
      <h4>탭 예제</h4>
      <MDSSegmentedButton
        type="hug"
        variant="border"
        value={selectedTab}
        buttonGroupList={[
          { label: '개요', value: 'overview' },
          { label: '상세정보', value: 'details' },
          { label: '설정', value: 'settings' },
        ]}
        onChange={setSelectedTab}
      />

      <h4>크기 선택</h4>
      <MDSSegmentedButton
        type="hug"
        variant="fill"
        value={selectedSize}
        buttonGroupList={[
          { label: 'S', value: 'small' },
          { label: 'M', value: 'medium' },
          { label: 'L', value: 'large' },
        ]}
        onChange={setSelectedSize}
      />

      <h4>스타일 선택</h4>
      <MDSSegmentedButton
        type="fit"
        variant={selectedVariant as 'fill' | 'tint'}
        value={selectedVariant}
        buttonGroupList={[
          { label: 'Fill', value: 'fill' },
          { label: 'Tint', value: 'tint' },
        ]}
        onChange={setSelectedVariant}
      />

      <div
        style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          minHeight: '100px',
        }}
      >
        <h5>선택된 값들:</h5>
        <p>탭: {selectedTab}</p>
        <p>크기: {selectedSize}</p>
        <p>스타일: {selectedVariant}</p>
      </div>
    </div>
  );
};

export const InteractiveExample = {
  render: () => <InteractiveExampleComponent />,
};

export const LongTextExample = {
  render: () => {
    const handleClick = () => {
      // Story example - no action needed
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>긴 텍스트 - Hug</h4>
          <MDSSegmentedButton
            type="hug"
            variant="fill"
            value="performance"
            buttonGroupList={[
              { label: 'Performance Reports', value: 'performance' },
              { label: 'Analytics Dashboard', value: 'analytics' },
              { label: 'User Management', value: 'users' },
            ]}
            onChange={handleClick}
          />
        </div>
        <div style={{ width: '400px' }}>
          <h4>긴 텍스트 - Fit</h4>
          <MDSSegmentedButton
            type="fit"
            variant="border"
            value="performance"
            buttonGroupList={[
              { label: 'Performance', value: 'performance' },
              { label: 'Analytics', value: 'analytics' },
              { label: 'Users', value: 'users' },
            ]}
            onChange={handleClick}
          />
        </div>
      </div>
    );
  },
};

const IconOnlyComponent = () => {
  const [viewMode, setViewMode] = useState('table');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4>아이콘만 - Table vs Grid (Tint Variant)</h4>
        <MDSSegmentedButton
          size="medium"
          type="fit"
          buttonGroupList={[
            {
              icon: <MDSIcon.ChartTable />,
              selectedIcon: <MDSIcon.ChartTable />,
              label: '',
              value: 'table',
            },
            {
              icon: <MDSIcon.GridView />,
              selectedIcon: <MDSIcon.GridView />,
              label: '',
              value: 'grid',
            },
          ]}
          value={viewMode}
          variant="border"
          onChange={setViewMode}
        />
      </div>

      <div>
        <h4>아이콘만 - Fill Variant</h4>
        <MDSSegmentedButton
          size="medium"
          type="hug"
          buttonGroupList={[
            {
              icon: <MDSIcon.ChartTable />,
              selectedIcon: <MDSIcon.ChartTable />,
              label: '',
              value: 'table',
            },
            {
              icon: <MDSIcon.GridView />,
              selectedIcon: <MDSIcon.GridView />,
              label: '',
              value: 'grid',
            },
          ]}
          value={viewMode}
          variant="fill"
          onChange={setViewMode}
        />
      </div>

      <div>
        <h4>다양한 크기</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <span style={{ marginRight: '10px' }}>Small:</span>
            <MDSSegmentedButton
              size="small"
              type="hug"
              buttonGroupList={[
                {
                  icon: <MDSIcon.ChartTable />,
                  selectedIcon: <MDSIcon.ChartTable />,
                  label: '',
                  value: 'table',
                },
                {
                  icon: <MDSIcon.GridView />,
                  selectedIcon: <MDSIcon.GridView />,
                  label: '',
                  value: 'grid',
                },
              ]}
              value={viewMode}
              variant="border"
              onChange={setViewMode}
            />
          </div>
          <div>
            <span style={{ marginRight: '10px' }}>Large:</span>
            <MDSSegmentedButton
              size="large"
              type="hug"
              buttonGroupList={[
                {
                  icon: <MDSIcon.ChartTable />,
                  selectedIcon: <MDSIcon.ChartTable />,
                  label: '',
                  value: 'table',
                },
                {
                  icon: <MDSIcon.GridView />,
                  selectedIcon: <MDSIcon.GridView />,
                  label: '',
                  value: 'grid',
                },
              ]}
              value={viewMode}
              variant="border"
              onChange={setViewMode}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h5>현재 선택된 뷰 모드: {viewMode}</h5>
      </div>
    </div>
  );
};

export const IconOnly = {
  render: () => <IconOnlyComponent />,
};

// 기존 스토리는 호환성을 위해 유지
export const SegmentedButtonStories: Story = Basic;
