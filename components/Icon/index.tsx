import { ReactNode, SVGAttributes } from 'react';
import { resolveColor } from '../../@system/resolvers';
import { Features, IconVariant } from './@types';
import * as Arrows from './set/Arrows';
import * as Symbols from './set/Symbols';
import * as Editor from './set/Editor';
import * as Animation from './set/Animation';

export type MDSIconProps<IC = ''> = Features<IC> & SVGAttributes<SVGElement>;

function createIcon<IC = ''>(Icon: (features: Features<IC>) => ReactNode) {
  const IconComponent = ({ size, color = 'color/content/neutral/default/normal', ...rest }: MDSIconProps<IC>) => {
    const props = {
      color: resolveColor(color),
      variant: 'variant' in rest ? (rest.variant as Features<keyof IconVariant>['variant']) : undefined,
      width: size || 24,
      height: size || 24,
    };

    return (
      <svg width={props.width} height={props.height} viewBox="0 0 24 24" color={props.color} {...rest}>
        {/* todo-@jamie: fix types */}
        {/* @ts-ignore */}
        <Icon variant={props.variant} />
      </svg>
    );
  };
  IconComponent.displayName = `MDSIcon.${Icon.name}`;

  return IconComponent;
}

function createAnimationIcon(Icon: (props: Record<string, unknown>) => ReactNode) {
  const IconComponent = ({ color = 'color/content/neutral/default/normal', ...rest }: MDSIconProps) => {
    const props = {
      color: resolveColor(color),
    };

    return <Icon {...props} {...rest} />;
  };
  IconComponent.displayName = `MDSIcon.${Icon.name}`;

  return IconComponent;
}

export const MDSIcon = {
  // arrows
  ArrowLeft: createIcon(Arrows.ArrowLeft),
  ArrowRight: createIcon(Arrows.ArrowRight),
  ArrowUp: createIcon(Arrows.ArrowUp),
  ArrowDown: createIcon(Arrows.ArrowDown),

  // symbols
  Check: createIcon(Symbols.Check),
  AddPlus: createIcon(Symbols.AddPlus),
  Minus: createIcon(Symbols.Minus),
  CloseDelete: createIcon(Symbols.CloseDelete),
  Flag: createIcon(Symbols.Flag),
  Help: createIcon(Symbols.Help),
  ErrorWarning: createIcon(Symbols.ErrorWarning),
  Priority: createIcon(Symbols.Priority),
  Info: createIcon(Symbols.Info),
  Send: createIcon(Symbols.Send),
  HourglassDelay: createIcon(Symbols.HourglassDelay),
  View: createIcon(Symbols.View),
  Cards: createIcon(Symbols.Cards),
  EyesVisibility: createIcon(Symbols.EyesVisibility),
  Trash: createIcon(Symbols.Trash),
  Star: createIcon(Symbols.Star),
  Tips: createIcon(Symbols.Tips),
  Verified: createIcon(Symbols.Verified),
  Folder: createIcon(Symbols.Folder),
  Label: createIcon(Symbols.Label),
  More: createIcon(Symbols.More),
  NotificationsOff: createIcon(Symbols.NotificationsOff),
  Settings: createIcon(Symbols.Settings),
  AccountProfile: createIcon(Symbols.AccountProfile),
  StoreMarket: createIcon(Symbols.StoreMarket),
  Home: createIcon(Symbols.Home),
  Language: createIcon(Symbols.Language),
  Apps: createIcon(Symbols.Apps),
  Menu: createIcon(Symbols.Menu),
  MenuClose: createIcon(Symbols.MenuClose),
  BoxPackage: createIcon(Symbols.BoxPackage),
  PersonAlert: createIcon(Symbols.PersonAlert),
  Money: createIcon(Symbols.Money),
  GridView: createIcon(Symbols.GridView),
  ListView: createIcon(Symbols.ListView),
  ListNumbered: createIcon(Symbols.ListNumbered),
  ListBulleted: createIcon(Symbols.ListBulleted),
  Filter: createIcon(Symbols.Filter),
  Sort: createIcon(Symbols.Sort),
  PullLeft: createIcon(Symbols.PullLeft),
  PullRight: createIcon(Symbols.PullRight),
  PushLeft: createIcon(Symbols.PushLeft),
  PushRight: createIcon(Symbols.PushRight),
  TailArrowDown: createIcon(Symbols.TailArrowDown),
  TailArrowUp: createIcon(Symbols.TailArrowUp),
  TailArrowLeft: createIcon(Symbols.TailArrowLeft),
  TailArrowRight: createIcon(Symbols.TailArrowRight),
  AngleBracket: createIcon(Symbols.AngleBracket),
  Northeast: createIcon(Symbols.Northeast),
  Compare: createIcon(Symbols.Compare),
  Swap: createIcon(Symbols.Swap),
  SwapVertical: createIcon(Symbols.SwapVertical),
  ArrowSplit: createIcon(Symbols.ArrowSplit),
  ArrowMerge: createIcon(Symbols.ArrowMerge),
  TriangleDown: createIcon(Symbols.TriangleDown),
  TriangleUp: createIcon(Symbols.TriangleUp),
  Search: createIcon(Symbols.Search),
  SearchImage: createIcon(Symbols.SearchImage),
  SearchTrend: createIcon(Symbols.SearchTrend),
  SearchEarth: createIcon(Symbols.SearchEarth),
  SeeDetails: createIcon(Symbols.SeeDetails),
  Edit: createIcon(Symbols.Edit),
  Download: createIcon(Symbols.Download),
  Upload: createIcon(Symbols.Upload),
  Refresh: createIcon(Symbols.Refresh),
  Reset: createIcon(Symbols.Reset),
  OpenNew: createIcon(Symbols.OpenNew),
  Unfold: createIcon(Symbols.Unfold),
  Fold: createIcon(Symbols.Fold),
  Calendar: createIcon(Symbols.Calendar),
  Timer: createIcon(Symbols.Timer),
  Shopping: createIcon(Symbols.Shopping),
  AttachFile: createIcon(Symbols.AttachFile),
  Groups: createIcon(Symbols.Groups),
  LinkUrl: createIcon(Symbols.LinkUrl),
  Task: createIcon(Symbols.Task),
  InProgress: createIcon(Symbols.InProgress),
  InProgressWOStar: createIcon(Symbols.InProgressWOStar),
  Sell: createIcon(Symbols.Sell),
  Magic: createIcon(Symbols.Magic),
  SuperBolt: createIcon(Symbols.SuperBolt),
  Sellers: createIcon(Symbols.Sellers),
  CalendarCheckEvent: createIcon(Symbols.CalendarCheckEvent),
  Tag: createIcon(Symbols.Tag),
  ProtectionStar: createIcon(Symbols.ProtectionStar),
  ProtectionCheck: createIcon(Symbols.ProtectionCheck),
  ProtectionSearch: createIcon(Symbols.ProtectionSearch),
  Protection: createIcon(Symbols.Protection),
  Insight: createIcon(Symbols.Insight),
  Formula: createIcon(Symbols.Formula),
  Print: createIcon(Symbols.Print),
  ChartLine: createIcon(Symbols.ChartLine),
  ChartTable: createIcon(Symbols.ChartTable),
  ChartNumber: createIcon(Symbols.ChartNumber),
  AutoMagic: createIcon(Symbols.AutoMagic),
  ChartLeaderBoard: createIcon(Symbols.ChartLeaderBoard),
  ChartMonitoring: createIcon(Symbols.ChartMonitoring),
  CompareImage: createIcon(Symbols.CompareImage),
  ProtectionWarning: createIcon(Symbols.ProtectionWarning),
  Image: createIcon(Symbols.Image),
  Images: createIcon(Symbols.Images),
  Pdf: createIcon(Symbols.Pdf),
  ChartBar: createIcon(Symbols.ChartBar),
  Lock: createIcon(Symbols.Lock),
  ClusterHubSellerIntel: createIcon(Symbols.ClusterHubSellerIntel),
  Email: createIcon(Symbols.Email),
  NoEmail: createIcon(Symbols.NoEmail),
  Celebration: createIcon(Symbols.Celebration),
  Pin: createIcon(Symbols.Pin),
  AssignmentConfirm: createIcon(Symbols.AssignmentConfirm),
  Document: createIcon(Symbols.Document),
  Ppt: createIcon(Symbols.Ppt),
  ChartCirclePie: createIcon(Symbols.ChartCirclePie),
  CopyContent: createIcon(Symbols.CopyContent),
  Archive: createIcon(Symbols.Archive),
  SellerPerson: createIcon(Symbols.SellerPerson),
  Group: createIcon(Symbols.Group),
  ServerDNS: createIcon(Symbols.ServerDNS),
  Comment: createIcon(Symbols.Comment),
  CommentAttached: createIcon(Symbols.CommentAttached),
  CommentAdd: createIcon(Symbols.CommentAdd),
  ExcelSheet: createIcon(Symbols.ExcelSheet),
  Assignment: createIcon(Symbols.Assignment),
  Pending: createIcon(Symbols.Pending),
  FolderAdd: createIcon(Symbols.FolderAdd),
  Chat: createIcon(Symbols.Chat),
  Recipient: createIcon(Symbols.Recipient),
  Gavel: createIcon(Symbols.Gavel),
  Bank: createIcon(Symbols.Bank),
  CreditCard: createIcon(Symbols.CreditCard),
  Note: createIcon(Symbols.Note),
  SiteMapTree: createIcon(Symbols.SiteMapTree),
  DragHandle: createIcon(Symbols.DragHandle),
  ThumbUp: createIcon(Symbols.ThumbUp),
  ThumbDown: createIcon(Symbols.ThumbDown),
  Regenerate: createIcon(Symbols.Regenerate),
  Block: createIcon(Symbols.Block),
  History: createIcon(Symbols.History),
  Siren: createIcon(Symbols.Siren),
  TrendingUp: createIcon(Symbols.TrendingUp),
  TrendingDown: createIcon(Symbols.TrendingDown),

  // editor
  Bold: createIcon(Editor.Bold),
  Italic: createIcon(Editor.Italic),
  TextFormat: createIcon(Editor.TextFormat),
  Underline: createIcon(Editor.Underline),
  Sign: createIcon(Editor.Sign),
  Bookmark: createIcon(Editor.Bookmark),
  Connected: createIcon(Editor.Connected),
  ScheduleSend: createIcon(Editor.ScheduleSend),
  ImageNotSupported: createIcon(Editor.ImageNotSupported),
  Crop: createIcon(Editor.Crop),
  CropFree: createIcon(Editor.CropFree),
  CropSquare: createIcon(Editor.CropSquare),
  FlipX: createIcon(Editor.FlipX),
  FlipY: createIcon(Editor.FlipY),
  Rotate90CW: createIcon(Editor.Rotate90CW),
  Rotate90CCW: createIcon(Editor.Rotate90CCW),
  Undo: createIcon(Editor.Undo),
  Redo: createIcon(Editor.Redo),
  Circle: createIcon(Editor.Circle),
  Shapes: createIcon(Editor.Shapes),
  Rectangle: createIcon(Editor.Rectangle),
  Triangle: createIcon(Editor.Triangle),
  Line: createIcon(Editor.Line),
  ShapeArrow: createIcon(Editor.ShapeArrow),
  FormulaComponent: createIcon(Editor.FormulaComponent),
  Eth: createIcon(Editor.Eth),

  // Animation
  IndicatorCircle: createAnimationIcon(Animation.IndicatorCircle),
};
