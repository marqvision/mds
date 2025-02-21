import { useCallback, useState } from 'react';
import { MDSSelectContainer } from '../../components';
import { Doc } from './Doc';
import { ValueEnum } from './@types';
import { LABEL_MAP } from './@constants';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSSelectContainer.Wrapper> = {
  title: '2. Components/Select container',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: Doc,
      layout: 'centered',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

export const DefaultPreview: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  render: function Render() {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" containerSizing="fit">
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const VerticalOrientation: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    orientation: {
      defaultValue: { summary: 'vertical' },
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} containerSizing="hug">
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const VariantCenter: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      defaultValue: { summary: 'left' },
      options: ['left', 'center'],
      control: { type: 'radio' },
    },
  },
  args: {
    variant: 'center',
  },
  render: function Render({ variant }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" containerSizing={300} variant={variant}>
        {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.StoragePlaceholder, ValueEnum.LongNameForTesting].map(
          (value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          )
        )}
      </MDSSelectContainer.Wrapper>
    );
  },
};

export const DisabledItem: StoryObj<typeof MDSSelectContainer.Item> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    disabled: {
      defaultValue: {
        summary: 'boolean toggle',
      },
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    disabled: true,
  },

  render: function Render({ disabled }) {
    const [_, setItem] = useState(ValueEnum.Lorem);

    return (
      <MDSSelectContainer.Item<ValueEnum>
        title={{ label: LABEL_MAP[ValueEnum.Lorem] }}
        value={ValueEnum.Lorem}
        isSelected
        onClick={() => {
          setItem(ValueEnum.Lorem);
        }}
        disabled={disabled}
      />
    );
  },
};

export const OrientationFit: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    orientation: {
      defaultValue: { summary: 'vertical' },
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} containerSizing="fit">
          {[ValueEnum.Lorem, ValueEnum.Xyz123, ValueEnum.LongNameForTesting].map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationHug: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    orientation: {
      defaultValue: {
        summary: 'vertical',
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  render: function Render({ orientation = 'vertical' }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation={orientation} containerSizing="hug">
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationHorizontalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    orientation: {
      defaultValue: {
        summary: 'vertical',
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    containerSizing: 200,
  },
  render: function Render({ containerSizing = 200 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation="horizontal" containerSizing={containerSizing}>
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};

export const OrientationVerticalFixed: StoryObj<typeof MDSSelectContainer.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    orientation: {
      defaultValue: {
        summary: 'vertical',
      },
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    containerSizing: 200,
  },
  render: function Render({ containerSizing = 80 }) {
    const [selectedItem, setSelectedItem] = useState(ValueEnum.Lorem);

    const handleSelect = useCallback((value: ValueEnum) => {
      setSelectedItem(value);
    }, []);

    return (
      <div style={{ minHeight: '500px', display: 'flex' }}>
        <MDSSelectContainer.Wrapper value={selectedItem} orientation="vertical" containerSizing={containerSizing}>
          {Object.values(ValueEnum).map((value) => (
            <MDSSelectContainer.Item<ValueEnum>
              key={value}
              title={{ label: LABEL_MAP[value] }}
              value={value}
              onClick={() => handleSelect(value)}
            />
          ))}
        </MDSSelectContainer.Wrapper>
      </div>
    );
  },
};
