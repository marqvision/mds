import { SymbolTypeProps } from '../@types';
import { Wrapper } from './Wrapper';

export const Symbol = (props: SymbolTypeProps & Required<Pick<SymbolTypeProps, 'size'>>) => {
  const { color, size } = props;

  return (
    <Wrapper size={size} color={color} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_14529_9471)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200.001 0H60.0005V0.155752L0.15652 59.9995H0V200L0.00033292 165.001H35.0005V200H140V199.81L199.81 140H200.001V0ZM140.842 35.0002H34.9989V165H165V60.3405L106.419 118.921L81.6695 94.1724L140.842 35.0002Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_14529_9471">
          <rect width="100%" height="100%" fill="white" />
        </clipPath>
      </defs>
    </Wrapper>
  );
};
