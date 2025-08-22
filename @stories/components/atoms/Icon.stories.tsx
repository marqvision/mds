import { Meta } from '@storybook/react';
import styled from '@emotion/styled';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { MDSIcon, MDSIconProps, MDSTypography } from '../../../components';
import { MDSTHEME_COLORS } from '../../@helper';

const meta: Meta<typeof MDSIcon.ArrowLeft> = {
  title: '2. Components/atoms/Icon',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  args: {
    color: 'color/content/neutral/default/normal',
    size: 24,
  },
  argTypes: {
    color: {
      control: 'select',
      options: MDSTHEME_COLORS,
      description: '아이콘의 색상을 지정합니다.',
      defaultValue: 'color/content/neutral/default/normal',
    },
    size: {
      control: 'number',
      defaultValue: 24,
      description: '아이콘의 크기를 지정합니다.',
    },
  },
};

export default meta;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;
const Item = styled.div`
  ${({ theme }) => `
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
    
    border: 1px dashed ${theme.color.content.neutral.default.normal};
  `}
`;
const VariantBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
const VariantItem = styled.div`
  text-align: center;
`;

export const Variants = (props: MDSIconProps) => {
  return (
    <>
      <MDSIcon.ArrowLeft {...props} variant="border" />
      <MDSIcon.ArrowLeft {...props} variant="fill" />
      <MDSIcon.ArrowLeft {...props} variant="outline" />
      <MDSIcon.ChartCirclePie {...props} variant="outline3_1" />
      <MDSIcon.ChartCirclePie {...props} variant="outline2_1_1" />
      <MDSIcon.ChartCirclePie {...props} variant="fill_2_1_1" />
      <MDSIcon.CommentAdd {...props} variant="left" />
      <MDSIcon.CommentAdd {...props} variant="right" />
      <MDSIcon.Language {...props} />
    </>
  );
};

const VariantSet = {
  Default: ['outline', 'border', 'fill'],
  OutlineFill: ['outline', 'fill'],
  BorderFill: ['border', 'fill'],
  Orientation: ['vertical', 'horizontal'],
};
const IconVariant = {
  ArrowLeft: VariantSet['Default'],
  ArrowRight: VariantSet['Default'],
  ArrowUp: VariantSet['Default'],
  ArrowDown: VariantSet['Default'],

  Check: VariantSet['Default'],
  AddPlus: VariantSet['Default'],
  Minus: VariantSet['Default'],
  CloseDelete: VariantSet['Default'],
  Flag: [...VariantSet['Default'], 'border_circle'],
  Help: VariantSet['Default'],
  ErrorWarning: VariantSet['Default'],
  Priority: VariantSet['Default'],
  Info: VariantSet['BorderFill'],
  Send: VariantSet['OutlineFill'],
  HourglassDelay: VariantSet['OutlineFill'],
  View: VariantSet['OutlineFill'],
  Cards: VariantSet['OutlineFill'],
  EyesVisibility: ['on', 'off'],
  Trash: VariantSet['OutlineFill'],
  Star: VariantSet['OutlineFill'],
  Tips: VariantSet['OutlineFill'],
  Verified: VariantSet['OutlineFill'],
  Folder: VariantSet['OutlineFill'],
  Label: VariantSet['OutlineFill'],
  More: VariantSet['Orientation'],
  Notifications: VariantSet['OutlineFill'],
  Settings: VariantSet['OutlineFill'],
  AccountProfile: VariantSet['OutlineFill'],
  StoreMarket: VariantSet['OutlineFill'],
  Image: VariantSet['OutlineFill'],
  Images: VariantSet['OutlineFill'],
  Pdf: VariantSet['OutlineFill'],
  ChartBar: VariantSet['Default'],
  Lock: VariantSet['OutlineFill'],
  ClusterHubSellerIntel: VariantSet['OutlineFill'],
  Email: VariantSet['OutlineFill'],
  Celebration: VariantSet['OutlineFill'],
  Pin: VariantSet['OutlineFill'],
  Unpin: VariantSet['OutlineFill'],
  AssignmentConfirm: VariantSet['OutlineFill'],
  Document: VariantSet['OutlineFill'],
  Ppt: VariantSet['OutlineFill'],
  ChartCirclePie: ['outline3_1', 'outline2_1_1', 'fill_2_1_1'],
  CopyContent: VariantSet['OutlineFill'],
  Archive: VariantSet['OutlineFill'],
  SellerPerson: VariantSet['OutlineFill'],
  Group: VariantSet['OutlineFill'],
  ServerDNS: VariantSet['OutlineFill'],
  CommentAdd: ['left', 'right'],
  Comment: ['fill_left', 'fill_right', 'outline_left', 'outline_right'],
  SiteMapTree: VariantSet['OutlineFill'],
  DragHandle: VariantSet['Orientation'],
  AddPayment: VariantSet['OutlineFill'],
  Note: VariantSet['OutlineFill'],
  ThumbUp: VariantSet['OutlineFill'],
  ThumbDown: VariantSet['OutlineFill'],
  Siren: VariantSet['OutlineFill'],
  Shopping: VariantSet['OutlineFill'],
  Chat: VariantSet['OutlineFill'],
  Sellers: VariantSet['OutlineFill'],
  Performance: VariantSet['OutlineFill'],
  Home: VariantSet['OutlineFill'],

  // Editor
  Circle: [...VariantSet['OutlineFill'], 'outline_small', 'fill_small'],
  FormulaComponent: ['Ci', 'Li', 'Pi', 'Si'],
};

export const Showcase = (props: MDSIconProps) => {
  return (
    <Grid>
      {Object.entries(MDSIcon).map(([key, _Icon]) => {
        const Icon = _Icon as (props: MDSIconProps) => EmotionJSX.Element;
        const variantList = key in IconVariant ? IconVariant[key as keyof typeof IconVariant] : [''];
        return (
          <Item key={key}>
            <MDSTypography>{key}</MDSTypography>
            <VariantBox>
              {variantList.map((v) =>
                v === '' ? (
                  <VariantItem key={v}>
                    {/* @ts-ignore */}
                    <Icon {...props} />
                    <MDSTypography variant="body" size="xs">
                      {v}
                    </MDSTypography>
                  </VariantItem>
                ) : (
                  <VariantItem key={v}>
                    {/* @ts-ignore */}
                    <Icon {...props} variant={v} />
                    <MDSTypography variant="body" size="xs">
                      {v}
                    </MDSTypography>
                  </VariantItem>
                )
              )}
            </VariantBox>
          </Item>
        );
      })}
    </Grid>
  );
};
