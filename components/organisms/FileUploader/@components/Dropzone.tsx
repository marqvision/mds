import React, { Children, cloneElement, isValidElement } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { TRANSITION_TIMING } from '../@constants';
import { useDropzoneHandlers } from '../@hooks/useDropzoneHandlers';
import { FileData, FileUploaderController, LabelType } from '../@types';
import { Label } from './Label';

const Styled = {
  Wrapper: styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 6px;
  `,
  Dropzone: styled.div`
    border: 1px solid ${({ theme }) => theme.comp.input.color.border.normal};
    border-radius: ${({ theme }) => theme.comp.fileUploader.dropzone.radius};
    overflow: hidden;
    display: grid;
    place-items: center;
    transition: ${TRANSITION_TIMING};
    background-color: ${({ theme }) => theme.comp.input.color.bg.normal};

    &.isHighlighted,
    &:focus-within {
      &:not(.isReadonly) {
        border-color: ${({ theme }) => theme.comp.input.color.border.focus};
        outline: 3px solid ${({ theme }) => theme.comp.input.color.border['focus-effect']};
      }
    }

    &.isDisabled:not(.isReadonly) {
      background-color: ${({ theme }) => theme.comp.input.color.bg.disabled};
    }
  `,
};

type Props<T extends FileData = FileData> = {
  controller?: FileUploaderController<boolean, T>;
  isReadonly?: boolean;
  isDisabled?: boolean;
  label?: LabelType;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Dropzone = <T extends FileData = FileData>(props: React.PropsWithChildren<Props<T>>) => {
  const {
    controller,
    label,
    children: _children,
    isReadonly,
    className,
    height = '200px',
    minHeight,
    maxHeight,
    style,
  } = props;

  const isDisabled = controller?.options.isDisabled;

  const handlers = useDropzoneHandlers(controller);

  const isActive = !isDisabled && !isReadonly;
  const children = Children.map(_children, injectProps({ isDisabled, isReadonly }));

  const dropzoneElement = (
    <Styled.Dropzone
      className={clsx({ isDisabled, isReadonly }, className)}
      style={{ height, minHeight, maxHeight, ...style }}
      tabIndex={isActive ? 0 : undefined}
      onDrop={isActive ? handlers?.onDrop : undefined}
      onDragOver={isActive ? handlers?.onDragOver : undefined}
      onDragLeave={isActive ? handlers?.onDragLeave : undefined}
      onPaste={isActive ? handlers?.onPaste : undefined}
    >
      {children}
    </Styled.Dropzone>
  );

  if (label) {
    return (
      <Styled.Wrapper>
        <Label isDisabled={isDisabled} label={label} />
        {dropzoneElement}
      </Styled.Wrapper>
    );
  }

  return dropzoneElement;
};

Dropzone.displayName = 'MDSFileUploader.Dropzone';

const injectProps =
  (props: Partial<Props>) =>
  (child: React.ReactNode): React.ReactNode => {
    if (!isValidElement(child)) return child;

    if (
      isValidElement(child) &&
      isComponentType(child.type) &&
      (child.type.displayName === 'MDSFileUploader.Placeholder' ||
        child.type.displayName === 'MDSFileUploader.GridImage' ||
        child.type.displayName === 'MDSFileUploader.GridFile' ||
        child.type.displayName === 'MDSFileUploader.ScrollWrapper')
    ) {
      return cloneElement(child, {
        ...props,
        ...child.props,
        children: Children.map(child.props.children, injectProps(props)),
      });
    }

    if (child.props.children && child.props.children.length > 0) {
      return cloneElement(child, {
        ...child.props,
        children: Children.map(child.props.children, injectProps(props)),
      });
    }
    return child;
  };

const isComponentType = (type: unknown): type is React.FC & { displayName?: string } => {
  return typeof type === 'function';
};
