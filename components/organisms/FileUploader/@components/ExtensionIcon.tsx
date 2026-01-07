import React, { cloneElement } from 'react';
import { MDSThemeColorPath } from '../../../../types';
import { MDSIcon } from '../../../atoms/Icon';

const ICON_LIST: Record<string, React.ReactElement> = {
  default: <MDSIcon.AttachFile />,

  webp: <MDSIcon.Image variant="fill" />,
  png: <MDSIcon.Image variant="fill" />,
  jpg: <MDSIcon.Image variant="fill" />,
  jpeg: <MDSIcon.Image variant="fill" />,
  svg: <MDSIcon.Image variant="fill" />,
  gif: <MDSIcon.Image variant="fill" />,
  bmp: <MDSIcon.Image variant="fill" />,
  tiff: <MDSIcon.Image variant="fill" />,
  tif: <MDSIcon.Image variant="fill" />,
  heic: <MDSIcon.Image variant="fill" />,
  heif: <MDSIcon.Image variant="fill" />,
  ico: <MDSIcon.Image variant="fill" />,
  apng: <MDSIcon.Image variant="fill" />,

  doc: <MDSIcon.Document variant="fill" color="color/content/primary/default/normal" />,
  docx: <MDSIcon.Document variant="fill" color="color/content/primary/default/normal" />,

  ppt: <MDSIcon.Ppt variant="fill" color="color/content/critical/default/normal" />,
  pptx: <MDSIcon.Ppt variant="fill" color="color/content/critical/default/normal" />,
  pdf: <MDSIcon.Pdf variant="fill" color="color/content/critical/default/normal" />,

  csv: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
  xls: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
  xlsx: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
};

type PropsWithFileName = {
  fileName: string;
  extension?: never;
};

type PropsWithExtension = {
  fileName?: never;
  extension: string;
};

type Props = {
  color?: MDSThemeColorPath;
  size?: number;
} & (PropsWithFileName | PropsWithExtension);

export const ExtensionIcon = (props: Props) => {
  const { fileName, extension: _extension, size = 24 } = props;

  const extension = _extension?.toLowerCase() || fileName?.split('.').pop()?.toLowerCase();
  const key = extension && extension in ICON_LIST ? extension : 'default';

  const IconComponent = ICON_LIST[key];
  const color = props.color || IconComponent.props.color;

  if (!IconComponent) return null;
  return cloneElement(IconComponent, { color, size });
};

ExtensionIcon.displayName = 'MDSFileUploader.ExtensionIcon';
