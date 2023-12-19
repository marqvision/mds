import styled from '@emotion/styled';
import { COLOR_TOKENS } from '../foundation/colors';

export default {
  title: '1. Foundation/Colors',
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
};

const ColorPalette = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ColorBox = styled.div<{ color: string; name: string }>`
  ${({ color, name }) => `
    width: 100px;
    height: 56px;
    position: relative;

    :before {
      width: 100%;
      height: 56px;
      top: 0;
      left: 0;
      position: absolute;
      background: ${color};
      content: "${name}";
    }
  `}
`;
const ColorWithAlphaBox = styled.div`
  width: 100%;
  height: 56px;
  background-image: repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px);
`;
const ColorItem = ({ title, colors }: { title: string; colors: { [name: string]: string } }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {Object.entries(colors).map(([name, color]) =>
          color.includes('rgba') ? (
            <ColorWithAlphaBox>
              <ColorBox key={name} color={color} name={name} />
            </ColorWithAlphaBox>
          ) : (
            <ColorBox key={name} color={color} name={name} />
          )
        )}
      </div>
    </div>
  );
};

export const RawColors = () => {
  return (
    <ColorPalette>
      <ColorItem
        title="White"
        colors={{
          white: '#ffffff',
          whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
          whiteAlpha40: 'rgba(255, 255, 255, 0.4)',
          whiteAlpha30: 'rgba(255, 255, 255, 0.3)',
          whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
          whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
          clear: 'rgba(255, 255, 255, 0)',
        }}
      />
      <ColorItem
        title="Blue"
        colors={{
          blue50: '#e9eefd',
          blue100: '#d7e1fb',
          blue200: '#c0cff8',
          blue300: '#a3b9f5',
          blue400: '#7999f1',
          blue500: '#4f79ec',
          blue600: '#2d5fe9',
          blue700: '#1648d2',
          blue800: '#1f3f99',
          blue900: '#142a66',
        }}
      />
      <ColorItem
        title="Bluegrey"
        colors={{
          bluegrey50: '#f9fafb',
          bluegrey100: '#f1f4f6',
          bluegrey150: '#eaedf0',
          bluegrey200: '#dfe3e8',
          bluegrey300: '#c4cdd5',
          bluegrey400: '#aab5c0',
          bluegrey500: '#919eab',
          bluegrey600: '#768695',
          bluegrey700: '#637381',
          bluegrey750: '#515e6b',
          bluegrey800: '#454f5b',
          bluegrey850: '#343e49',
          bluegrey900: '#212b36',
          bluegrey1000: '#161c24',
        }}
      />
      <ColorItem
        title="Red"
        colors={{
          red50: '#fce9e6',
          red100: '#fcd2cb',
          red200: '#f6beb4',
          red300: '#f2a091',
          red400: '#ec755f',
          red500: '#e64a2d',
          red600: '#e12705',
          red700: '#cb1400',
          red800: '#871703',
          red900: '#5a0f02',
        }}
      />
      <ColorItem
        title="Orange"
        colors={{
          orange50: '#ffefe5',
          orange100: '#ffe0cc',
          orange200: '#ffd0b2',
          orange300: '#ffbb8f',
          orange400: '#ff9d5c',
          orange500: '#ff7e29',
          orange600: '#ff6500',
          orange700: '#d35200',
          orange800: '#a13f00',
          orange900: '#662800',
        }}
      />
      <ColorItem
        title="Yellow"
        colors={{
          yellow50: '#fff3dc',
          yellow100: '#ffe5b6',
          yellow200: '#ffda95',
          yellow300: '#ffcb6c',
          yellow400: '#ffbd42',
          yellow500: '#fdaf1e',
          yellow600: '#f1a416',
          yellow700: '#ca8402',
          yellow800: '#9b6500',
          yellow900: '#4c3000',
        }}
      />
      <ColorItem
        title="Green"
        colors={{
          green50: '#e5f7e5',
          green100: '#ccefcc',
          green200: '#b2e7b2',
          green300: '#8fdc8f',
          green400: '#5ccc5c',
          green500: '#29bc29',
          green600: '#00ad00',
          green700: '#008c00',
          green800: '#1c5e20',
          green900: '#004600',
        }}
      />
      <ColorItem
        title="Teal"
        colors={{
          teal50: '#e5f5f7',
          teal100: '#cdecf1',
          teal200: '#b3e1e9',
          teal300: '#91d5e0',
          teal400: '#5fc1d2',
          teal500: '#2caec4',
          teal600: '#049eb8',
          teal700: '#037e93',
          teal800: '#025e6e',
          teal900: '#013f49',
        }}
      />
      <ColorItem
        title="LightBlue"
        colors={{
          lightblue50: '#e5f6fe',
          lightblue100: '#ccedfd',
          lightblue200: '#b2e4fc',
          lightblue300: '#8fd8fb',
          lightblue400: '#5cc7f9',
          lightblue500: '#29b5f8',
          lightblue600: '#00a7f6',
          lightblue700: '#007eba',
          lightblue800: '#005c96',
          lightblue900: '#004262',
        }}
      />
      <ColorItem
        title="Indigo"
        colors={{
          indigo50: '#f0ecfa',
          indigo100: '#e3daf6',
          indigo200: '#d4c7f0',
          indigo300: '#c1adeb',
          indigo400: '#a588e1',
          indigo500: '#8963d8',
          indigo600: '#7245d0',
          indigo700: '#512aa3',
          indigo800: '#3d1f7a',
          indigo900: '#281551',
        }}
      />
      <ColorItem
        title="Purple"
        colors={{
          purple50: '#f4e5f7',
          purple100: '#eaccef',
          purple200: '#dfb2e7',
          purple300: '#d18fdc',
          purple400: '#bd5ccd',
          purple500: '#a829bd',
          purple600: '#9700b0',
          purple700: '#78008c',
          purple800: '#5a0069',
          purple900: '#3c0046',
        }}
      />
      <ColorItem
        title="Magenta"
        colors={{
          magenta50: '#fae7f0',
          magenta100: '#f7d0e2',
          magenta200: '#f2b8d3',
          magenta300: '#ed98bf',
          magenta400: '#e469a2',
          magenta500: '#dc3a85',
          magenta600: '#d5146d',
          magenta700: '#aa1057',
          magenta800: '#7f0c41',
          magenta900: '#55082b',
        }}
      />

      <ColorItem
        title="Brown"
        colors={{
          brown50: '#f0ecea',
          brown100: '#e2d9d7',
          brown200: '#d2c6c2',
          brown300: '#bfaca6',
          brown400: '#a1877e',
          brown500: '#846156',
          brown600: '#6c4335',
          brown700: '#56352a',
          brown800: '#40281f',
          brown900: '#2b1a15',
        }}
      />
      <ColorItem
        title="Grey"
        colors={{
          grey50: '#fafafa',
          grey100: '#f5f5f5',
          grey200: '#eeeeee',
          grey300: '#dddddd',
          grey400: '#cccccc',
          grey500: '#aaaaaa',
          grey600: '#777777',
          grey700: '#555555',
          grey800: '#333333',
          grey900: '#111111',
        }}
      />
      <ColorItem
        title="Black"
        colors={{
          black: '#000000',
          blackAlpha90: 'rgba(0, 0, 0, 0.9)',
          blackAlpha80: 'rgba(0, 0, 0, 0.8)',
          blackAlpha70: 'rgba(0, 0, 0, 0.7)',
          blackAlpha60: 'rgba(0, 0, 0, 0.6)',
          blackAlpha50: 'rgba(0, 0, 0, 0.5)',
          blackAlpha40: 'rgba(0, 0, 0, 0.4)',
          blackAlpha30: 'rgba(0, 0, 0, 0.3)',
          blackAlpha20: 'rgba(0, 0, 0, 0.2)',
          blackAlpha10: 'rgba(0, 0, 0, 0.1)',
          blackAlpha5: 'rgba(0, 0, 0, 0.05)',
        }}
      />

      <ColorItem
        title="BlueTeal"
        colors={{
          blueTeal: 'linear-gradient(90deg, rgba(95, 193, 210, 1) 0%, rgba(79, 121, 236, 1) 100%)',
        }}
      />
    </ColorPalette>
  );
};

export const ColorTokens = () => {
  return (
    <div>
      <div>
        <h1>BG - Fill</h1>
        <ColorPalette>
          <ColorItem title="Neautral" colors={COLOR_TOKENS.bg.fill.neutral} />
          <ColorItem title="Primary" colors={COLOR_TOKENS.bg.fill.primary} />
          <ColorItem title="Critical" colors={COLOR_TOKENS.bg.fill.critical} />
          <ColorItem title="Success" colors={COLOR_TOKENS.bg.fill.success} />
          <ColorItem title="Warning" colors={COLOR_TOKENS.bg.fill.warning} />
          <ColorItem title="Teal" colors={COLOR_TOKENS.bg.fill.teal} />
          <ColorItem title="Purple" colors={COLOR_TOKENS.bg.fill.purple} />
          <ColorItem
            title="Inverse"
            colors={{
              primary: COLOR_TOKENS.bg.fill.inverse.primary,
              ...COLOR_TOKENS.bg.fill.inverse.white,
            }}
          />
        </ColorPalette>
      </div>
      <div>
        <h1>BG - surface</h1>
        <ColorPalette>
          <ColorItem title="Neautral" colors={COLOR_TOKENS.bg.surface.neutral} />
          <ColorItem title="Primary" colors={COLOR_TOKENS.bg.surface.primary} />
          <ColorItem title="Critical" colors={COLOR_TOKENS.bg.surface.critical} />
          <ColorItem title="Success" colors={COLOR_TOKENS.bg.surface.success} />
          <ColorItem title="Warning" colors={COLOR_TOKENS.bg.surface.warning} />
          <ColorItem title="Teal" colors={COLOR_TOKENS.bg.surface.teal} />
          <ColorItem title="Purple" colors={COLOR_TOKENS.bg.surface.purple} />
          <ColorItem title="Inverse" colors={COLOR_TOKENS.bg.surface.inverse} />
          <ColorItem title="Selected" colors={COLOR_TOKENS.bg.surface.selected} />
        </ColorPalette>
      </div>
      <div>
        <h1>Content</h1>
        <ColorPalette>
          <ColorItem title="onDefaultColor" colors={{ onDefaultColor: COLOR_TOKENS.content.onDefaultColor }} />
          <ColorItem title="placeholder" colors={{ placeholder: COLOR_TOKENS.content.placeholder }} />
          <ColorItem title="Neautral" colors={COLOR_TOKENS.content.neutral} />
          <ColorItem title="Primary" colors={COLOR_TOKENS.content.primary} />
          <ColorItem title="Critical" colors={COLOR_TOKENS.content.critical} />
          <ColorItem title="Success" colors={COLOR_TOKENS.content.success} />
          <ColorItem title="Warning" colors={COLOR_TOKENS.content.warning} />
          <ColorItem title="Teal" colors={COLOR_TOKENS.content.teal} />
          <ColorItem title="Purple" colors={COLOR_TOKENS.content.purple} />
          <ColorItem title="Inverse" colors={COLOR_TOKENS.content.inverse} />
          <ColorItem title="Selected" colors={COLOR_TOKENS.content.selected} />
        </ColorPalette>
      </div>
      <div>
        <h1>Border</h1>
        <ColorPalette>
          <ColorItem title="Neautral" colors={COLOR_TOKENS.border.neutral} />
          <ColorItem title="Primary" colors={COLOR_TOKENS.border.primary} />
          <ColorItem title="Critical" colors={COLOR_TOKENS.border.critical} />
          <ColorItem title="Success" colors={COLOR_TOKENS.border.success} />
          <ColorItem title="Warning" colors={COLOR_TOKENS.border.warning} />
          <ColorItem title="Teal" colors={COLOR_TOKENS.border.teal} />
          <ColorItem title="Purple" colors={COLOR_TOKENS.border.purple} />
          <ColorItem title="Inverse" colors={COLOR_TOKENS.border.inverse} />
          <ColorItem title="Selected" colors={COLOR_TOKENS.border.selected} />
        </ColorPalette>
      </div>
    </div>
  );
};
