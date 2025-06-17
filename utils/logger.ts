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

const debug = ({ title, message, data, printStackTrace = false }: Param) => {
  const logContent: any[] = [`[DEBUG] ${title}`];
  if (message) {
    logContent.push(`\n\n📝 Message: ${message}`);
  }
  if (data) {
    logContent.push('\n\n📦 Data:', data);
  }
  if (printStackTrace) {
    logContent.push(`\n\n📍 Stack Trace:\n${getCallSite()}`);
  }
  console.debug(...getStyledPrefix('#9E9E9E'), ...logContent); // Gray
};

const info = ({ title, message, data, printStackTrace = false }: Param) => {
  const logContent: any[] = [`[INFO] ${title}`];
  if (message) {
    logContent.push(`\n\n📝 Message: ${message}`);
  }
  if (data) {
    logContent.push('\n\n📦 Data:', data);
  }
  if (printStackTrace) {
    logContent.push(`\n\n📍 Stack Trace:\n${getCallSite()}`);
  }
  console.info(...getStyledPrefix('#2196F3'), ...logContent); // Blue
};

const warning = ({ title, message, data }: Param) => {
  const logContent: any[] = [`[WARNING] ${title}`];
  if (message) {
    logContent.push(`\n\n📝 Message: ${message}`);
  }
  if (data) {
    logContent.push('\n\n📦 Data:', data);
  }
  logContent.push(`\n\n📍 Stack Trace:\n`);
  console.warn(...getStyledPrefix('#FF9800'), ...logContent); // Orange
};

const error = ({ title, message, data }: Param) => {
  const logContent: any[] = [`[ERROR] ${title}`];
  if (message) {
    logContent.push(`\n\n📝 Message: ${message}`);
  }
  if (data) {
    logContent.push('\n\n📦 Data:', data);
  }
  logContent.push(`\n\n📍 Stack Trace:\n`);
  console.error(...getStyledPrefix('#F44336'), ...logContent); // Red
};

export const mdsLogger = {
  debug,
  info,
  warning,
  error,
};
