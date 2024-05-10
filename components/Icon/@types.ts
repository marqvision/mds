import type { MDSThemeColorPath } from '../../foundation';

type VariantSet = {
  Default: 'outline' | 'border' | 'fill';
  OutlineFill: 'outline' | 'fill';
  BorderFill: 'border' | 'fill';
  Orientation: 'vertical' | 'horizontal';
};
export type IconVariant = {
  // arrows
  ArrowLeft: VariantSet['Default'];
  ArrowRight: VariantSet['Default'];
  ArrowUp: VariantSet['Default'];
  ArrowDown: VariantSet['Default'];

  // symbols
  Check: VariantSet['Default'];
  AddPlus: VariantSet['Default'];
  Minus: VariantSet['Default'];
  CloseDelete: VariantSet['Default'];
  Flag: VariantSet['Default'] | 'border_circle';
  Help: VariantSet['Default'];
  ErrorWarning: VariantSet['Default'];
  Priority: VariantSet['Default'];
  Info: VariantSet['BorderFill'];
  Send: VariantSet['OutlineFill'];
  HourglassDelay: VariantSet['OutlineFill'];
  View: VariantSet['OutlineFill'];
  Cards: VariantSet['OutlineFill'];
  EyesVisibility: 'on' | 'off';
  Trash: VariantSet['OutlineFill'];
  Star: VariantSet['OutlineFill'];
  Tips: VariantSet['OutlineFill'];
  Verified: VariantSet['OutlineFill'];
  Folder: VariantSet['OutlineFill'];
  Label: VariantSet['OutlineFill'];
  More: VariantSet['Orientation'];
  NotificationsOff: VariantSet['OutlineFill'];
  // NotificationsOn: VariantSet['OutlineFill'];
  Settings: VariantSet['OutlineFill'];
  AccountProfile: VariantSet['OutlineFill'];
  StoreMarket: VariantSet['OutlineFill'];
  Image: VariantSet['OutlineFill'];
  Images: VariantSet['OutlineFill'];
  Pdf: VariantSet['OutlineFill'];
  ChartBar: VariantSet['Default'];
  Lock: VariantSet['OutlineFill'];
  ClusterHubSellerIntel: VariantSet['OutlineFill'];
  Email: VariantSet['OutlineFill'];
  Celebration: VariantSet['OutlineFill'];
  Pin: VariantSet['OutlineFill'];
  AssignmentConfirm: VariantSet['OutlineFill'];
  Document: VariantSet['OutlineFill'];
  Ppt: VariantSet['OutlineFill'];
  ChartCirclePie: 'outline3_1' | 'outline2_1_1' | 'fill_2_1_1';
  CopyContent: VariantSet['OutlineFill'];
  Archive: VariantSet['OutlineFill'];
  SellerPerson: VariantSet['OutlineFill'];
  Group: VariantSet['OutlineFill'];
  ServerDNS: VariantSet['OutlineFill'];
  CommentAdd: 'left' | 'right';
  SiteMapTree: VariantSet['OutlineFill'];
  DragHandle: VariantSet['Orientation'];

  // Editor
  Circle: VariantSet['OutlineFill'] | 'outline_small' | 'fill_small';
  FormulaComponent: 'Ci' | 'Li' | 'Pi' | 'Si';
};

type BaseFeatures = {
  /**
   * 아이콘의 크기.
   */
  size?: number;
  /**
   * 아이콘의 색상.
   */
  color?: MDSThemeColorPath;
};
type ConditionalVariant<IconName> = IconName extends keyof IconVariant
  ? {
      /**
       * 아이콘의 스타일 종류.
       * 일부 아이콘은 해당 속성을 지원하지 않습니다.
       */
      variant: IconVariant[IconName];
    }
  : NonNullable<unknown>;

export type Features<IconName = ''> = BaseFeatures & ConditionalVariant<IconName>;
