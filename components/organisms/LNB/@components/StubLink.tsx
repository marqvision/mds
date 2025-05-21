import { LinkComponentProps } from '../../../../types';

type Props = LinkComponentProps;

/*
 * LinkComponent 를 주입하지 않았을 때 출력될 대체 컴포넌트
 */
export const StubLink = (props: Props) => {
  const { to, children, className, onMouseEnter, onMouseLeave } = props;

  const href = typeof to === 'object' ? to.pathname : to;

  return (
    <a href={href} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
};