export const Debugger = (props: { data: any; styleObject?: React.CSSProperties }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: -500,
        width: '400px',
        height: '500px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        zIndex: 1000,
        overflow: 'auto',
        ...props.styleObject,
      }}
    >
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};
