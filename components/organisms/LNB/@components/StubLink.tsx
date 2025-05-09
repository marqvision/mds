import React from 'react';

type Props = {
  to: string;
  children: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>;

/*
 * LinkComponent 를 주입하지 않았을 때 출력될 대체 컴포넌트
 */
export const StubLink = (props: Props) => {
  const { to, children, ...restProps } = props;

  return (
    <a href={to} {...restProps}>
      {children}
    </a>
  );
};
