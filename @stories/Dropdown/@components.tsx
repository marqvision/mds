import { PropsWithChildren } from 'react';

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};
