import { HTMLAttributes, ReactElement } from 'react';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

export type Features = {
  title?: string;
  /**
   * Select Container Main Icon
   */
  mainIcon?: ReactElement;
  /**
   * Title 왼쪽에 가는 Icon
   */
  titleIcon?: ReactElement;
  disabled?: boolean;
};

export type MDSSelectContainerProps = Features & HTMLAttributes<HTMLDivElement>;
