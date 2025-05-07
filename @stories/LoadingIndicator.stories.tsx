import { MDSButton, MDSLoadingIndicator } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSLoadingIndicator> = {
  component: MDSLoadingIndicator,
  title: '2. Components/molecules/LoadingIndicator',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', display: 'grid', placeItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MDSLoadingIndicator>;

export const Preview: Story = {
  args: {},
};

export const IndicatorColor: Story = {
  args: {
    color: 'indicator',
    size: 22,
    backgroundColor: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'save 중인 상태에서 마우스 대신 출력 시 보여줄 전용 스타일 입니다.',
      },
    },
  },
};

export const ButtonLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'MDSButton 내 Loading indicator 가 적용됩니다.',
      },
    },
  },
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MDSButton variant="tint" size="small" color="green" isLoading>
          Loading
        </MDSButton>
        <MDSButton variant="fill" size="medium" color="blue" isLoading>
          Loading
        </MDSButton>
        <MDSButton variant="border" size="large" color="red" isLoading="hideLabel">
          Loading
        </MDSButton>
        <MDSButton variant="tint" size="large" color="purple" isLoading="hideLabel">
          Loading
        </MDSButton>
      </div>
    );
  },
};

export const Size: Story = {
  args: {
    size: 30,
    strokeWidth: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '사이즈, stroke 두께를 임의로 지정할 수 있습니다.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    progress: 30,
  },
  parameters: {
    docs: {
      description: {
        story: '중앙에 진행도를 출력합니다. 최소 사이즈는 46 입니다.',
      },
    },
  },
};

export const Progress: Story = {
  args: {
    isDeterminate: true,
    progress: 30,
  },
  parameters: {
    docs: {
      description: {
        story: 'circle stroke 으로 진행도를 보여줍니다.',
      },
    },
  },
};

export const Background: Story = {
  args: {
    backgroundColor: true,
  },
  parameters: {
    docs: {
      description: {
        story: '회색 배경을 출력합니다. loading indicator 전용 색상입니다.',
      },
    },
  },
};
