import React, { MouseEvent } from 'react';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
};

/*
 * LinkComponent 를 주입하지 않았을 때 출력될 대체 컴포넌트
 */
export const StubLink = (props: Props) => {
  const { to, children, className, onMouseEnter, onMouseLeave } = props;

  return (
    <a href={to} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
};
