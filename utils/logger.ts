const PREFIX = '[MDS-V2]';
const PREFIX_STYLE = 'font-weight: bold;';

const getStyledPrefix = (color: string) => [`%c${PREFIX}`, `${PREFIX_STYLE} color: ${color};`];

const getCallSite = () => {
  try {
    throw new Error();
  } catch (e: any) {
    const stack = e.stack?.split('\n');
    if (stack && stack.length > 3) {
      // "    at <functionName> (<filePath>:<lineNumber>:<columnNumber>)"
      return stack[3].trim();
    }
  }
  return '';
};

type Param = {
  title: string;
  message?: string;
  data?: Record<string, any>;
  printStackTrace?: boolean;
};

const generateLogContent = (
  level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR',
  { title, message, data, printStackTrace }: Param,
) => {
  const logContent: any[] = [`[${level}] ${title}`];
  if (message) {
    logContent.push(`\n\n📝 Message: ${message}`);
  }
  if (data) {
    logContent.push('\n\n📦 Data:', data);
  }
  if (printStackTrace) {
    logContent.push(`\n\n📍 Stack Trace:\n${getCallSite()}`);
  }
  return logContent;
};

const debug = ({ title, message, data, printStackTrace = false }: Param) => {
  const logContent = generateLogContent('DEBUG', { title, message, data, printStackTrace });
  console.debug(...getStyledPrefix('#9E9E9E'), ...logContent); // Gray
};

const info = ({ title, message, data, printStackTrace = false }: Param) => {
  const logContent = generateLogContent('INFO', { title, message, data, printStackTrace });
  console.info(...getStyledPrefix('#2196F3'), ...logContent); // Blue
};

const warning = ({ title, message, data, printStackTrace }: Param) => {
  const logContent = generateLogContent('WARNING', { title, message, data, printStackTrace });
  console.warn(...getStyledPrefix('#FF9800'), ...logContent); // Orange
};

const error = ({ title, message, data, printStackTrace }: Param) => {
  const logContent = generateLogContent('ERROR', { title, message, data, printStackTrace });
  console.error(...getStyledPrefix('#F44336'), ...logContent); // Red
};

export const mdsLogger = {
  debug,
  info,
  warning,
  error,
};
