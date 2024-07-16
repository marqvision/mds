import styled from '@emotion/styled';
import { COLOR_TOKENS as color } from '../foundation/colors';
import { MDSTypography } from '../components';

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
  gap: 4px;
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

export const ColorItem = () => (
  <ColorBox color={color.bg.fill.primary.default.completed} name="color.bg.fill.primary.default.completed" />
);

export const WithEmotionTheme = () => {
  const Box = styled.div`
    ${({ theme }) => `
      background: ${theme.color.bg.fill.teal.default};
      border: 10px solid ${theme._raw_color.blue100};
      padding: 32px;
      border-radius: 8px;
      width: 300px;
      height: 300px;
    `};
  `;

  return <Box />;
};

const Palette = ({ title, colors }: { title: string; colors: { [name: string]: string } }) => {
  return (
    <div>
      <MDSTypography>{title}</MDSTypography>
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

const Container = styled.div`
  & + & {
    margin-top: 128px;
  }
`;
export const SystemColorTokens = () => {
  return (
    <div>
      <Container>
        <MDSTypography variant="T24">bg/fill</MDSTypography>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <MDSTypography variant="T20">neutral</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.neutral.default} />
              <Palette title="strong" colors={color.bg.fill.neutral.strong} />
              <Palette title="tint" colors={color.bg.fill.neutral.tint} />
              <Palette title="weak" colors={color.bg.fill.neutral.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">primary</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.primary.default} />
              <Palette title="tint" colors={color.bg.fill.primary.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">critical</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.critical.default} />
              <Palette title="tint" colors={color.bg.fill.critical.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">success</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.success.default} />
              <Palette title="tint" colors={color.bg.fill.success.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">warning</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.warning.default} />
              <Palette title="tint" colors={color.bg.fill.warning.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">teal</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.teal.default} />
              <Palette title="tint" colors={color.bg.fill.teal.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">purple</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.fill.purple.default} />
              <Palette title="tint" colors={color.bg.fill.purple.tint} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">inverse</MDSTypography>
            <ColorPalette>
              <Palette title="white.default" colors={color.bg.fill.inverse.default} />
              <Palette title="white.tint" colors={color.bg.fill.inverse.tint} />
              <Palette title="primary" colors={{ primary: color.bg.fill.inverse.primary }} />
            </ColorPalette>
          </div>
        </div>
      </Container>

      <Container>
        <MDSTypography variant="T24">bg/surface</MDSTypography>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <MDSTypography variant="T20">neutral</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.neutral.default} />
              <Palette title="secondary" colors={color.bg.surface.neutral.secondary} />
              <Palette title="tertiary" colors={color.bg.surface.neutral.tertiary} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">primary</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.primary.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">critical</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.critical.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">success</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.success.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">warning</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.warning.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">teal</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.teal.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">purple</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.purple.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">inverse</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.inverse} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">selected</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.bg.surface.selected.default} />
            </ColorPalette>
          </div>
        </div>
      </Container>

      <Container>
        <MDSTypography variant="T24">content</MDSTypography>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ height: 29 }} />
            <ColorPalette>
              <Palette title="on_default_color" colors={{ on_default_color: color.content.on_default_color }} />
              <Palette title="placeholder" colors={{ placeholder: color.content.placeholder.normal }} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">neutral</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.neutral.default} />
              <Palette title="secondary" colors={color.content.neutral.secondary} />
              <Palette title="tertiary" colors={color.content.neutral.tertiary} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">primary</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.primary.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">critical</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.critical.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">success</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.success.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">warning</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.warning.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">teal</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.teal.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">purple</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.purple.default} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">inverse</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.inverse.default} />
              <Palette title="_" colors={{ primary: color.content.inverse.primary }} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">selected</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.content.selected.default} />
            </ColorPalette>
          </div>
        </div>
      </Container>

      <Container>
        <MDSTypography variant="T24">border</MDSTypography>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <MDSTypography variant="T20">neutral</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.neutral.default} />
              <Palette title="_" colors={{ strong: color.border.neutral.strong.normal }} />
              <Palette title="_" colors={{ weak: color.border.neutral.weak.normal }} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">primary</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.primary.default} />
              <Palette title="weak" colors={color.border.primary.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">critical</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.critical.default} />
              <Palette title="weak" colors={color.border.critical.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">success</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.success.default} />
              <Palette title="weak" colors={color.border.success.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">warning</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.warning.default} />
              <Palette title="weak" colors={color.border.warning.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">teal</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.teal.default} />
              <Palette title="weak" colors={color.border.teal.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">purple</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.purple.default} />
              <Palette title="weak" colors={color.border.purple.weak} />
            </ColorPalette>
          </div>
          <div>
            <MDSTypography variant="T20">inverse</MDSTypography>
            <ColorPalette>
              <Palette title="default" colors={color.border.inverse.default} />
              <Palette title="_" colors={{ primary: color.border.inverse.primary.normal }} />
            </ColorPalette>
          </div>
        </div>
      </Container>
    </div>
  );
};
export const ComponentColorTokens = () => {
  return (
    <Container>
      <MDSTypography variant="T24">Comp</MDSTypography>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <MDSTypography variant="T20">divider</MDSTypography>
          <ColorPalette>
            <Palette title="_" colors={color.comp.divider.color} />
          </ColorPalette>
        </div>
        <div>
          <MDSTypography variant="T20">input</MDSTypography>
          <ColorPalette>
            <Palette title="bg" colors={color.comp.input.color.bg} />
            <Palette title="border" colors={color.comp.input.color.border} />
          </ColorPalette>
        </div>
        <div>
          <MDSTypography variant="T20">table</MDSTypography>
          <ColorPalette>
            <Palette title="bg.default" colors={color.comp.table.color.bg.default} />
            <Palette title="bg.viewing" colors={color.comp.table.color.bg.viewing} />
            <Palette title="border.horizontal" colors={color.comp.table.color.border.horizontal} />
            <Palette title="border.vertical" colors={color.comp.table.color.border.vertical} />
          </ColorPalette>
        </div>
        <div>
          <MDSTypography variant="T20">dimmed</MDSTypography>
          <ColorPalette>
            <Palette title="_" colors={color.comp.dimmed.color} />
          </ColorPalette>
        </div>
      </div>
    </Container>
  );
};

export const RawColors = () => {
  return (
    <ColorPalette>
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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
      <Palette
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

      <Palette
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
      <Palette
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
      <Palette
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

      <Palette
        title="BlueTeal"
        colors={{
          blueTeal: 'linear-gradient(90deg, rgba(95, 193, 210, 1) 0%, rgba(79, 121, 236, 1) 100%)',
        }}
      />
    </ColorPalette>
  );
};
