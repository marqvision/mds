import React, { useState } from 'react';
import { MDSInputProps } from '../index';

type SplitType = 'whitespace' | 'linebreak';

const SPLIT_REGEX: Record<SplitType, RegExp> = {
  whitespace: /\s+/g, // 공백
  linebreak: /[\r\n\t]+/g, // 줄바꿈, 탭
};

type KeywordObject = { keyword: string };

type StringKeywordParameters = {
  /** 키워드 타입 (기본값: 'string') */
  type?: 'string';
  /** 현재 키워드 목록 */
  value: string[];
  /** 키워드 목록 변경 핸들러 */
  onChange: (value: string[]) => void;
  initialValue?: never;
};

type ObjectKeywordParameters<T extends KeywordObject> = {
  /** 키워드 타입 */
  type: 'object';
  /** 현재 키워드 객체 목록 */
  value: T[];
  /** 키워드 객체 목록 변경 핸들러 */
  onChange: (value: T[]) => void;
  /** 새 키워드 생성 시 사용할 초기값 */
  initialValue?: Partial<T>;
};

type Parameters<T extends KeywordObject> = {
  /** 붙여넣기 시 텍스트 분할 방식 (기본값: 'linebreak') */
  splitType?: SplitType | RegExp;
  /** 새 키워드 추가 시 위치 (기본값: 'end') */
  addDirection?: 'prepend' | 'append';
} & (StringKeywordParameters | ObjectKeywordParameters<T>);

export const useMDSInputKeywordManager = <T extends KeywordObject>(params: Parameters<T>) => {
  const { type, value, onChange, initialValue, splitType = 'linebreak', addDirection = 'append' } = params;

  const [inputValue, setInputValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const regExp: RegExp = splitType instanceof RegExp ? splitType : SPLIT_REGEX[splitType];

  const handleChange = (text: string) => {
    setIsError(false);
    setInputValue(text);
  };

  // 전달받은 텍스트 리스트를 중복확인 후 키워드 목록에 추가
  const add = (textList: string[]) => {
    const keywordList = parseKeywordList(params);
    const newKeywords = textList.filter((text) => !isKeywordExists(text, keywordList));
    if (!newKeywords.length) return;

    if (type === 'object') {
      const newKeywordObjects = newKeywords.map((text) => ({ ...initialValue, keyword: text }) as T);
      const newValues =
        addDirection === 'prepend' ? [...newKeywordObjects, ...value] : [...value, ...newKeywordObjects];
      onChange(newValues);
    } else {
      const newValues = addDirection === 'prepend' ? [...newKeywords, ...value] : [...value, ...newKeywords];
      onChange(newValues);
    }

    setInputValue('');
  };

  // input 에 입력된 텍스트에 대한 처리
  const handleAdd = (text: string) => {
    const trimmedValue = text.trim();
    if (!trimmedValue) return;
    setIsError(false);

    const keywordList = parseKeywordList(params);
    if (isKeywordExists(trimmedValue, keywordList)) {
      setIsError(true);
      return;
    }
    const keywords = Array.from(new Set(parseTextToArray(trimmedValue, regExp)));
    add(keywords);
  };

  // 클립보드 텍스트 붙여넣기 처리
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!e.clipboardData) return;
    e.preventDefault();
    setIsError(false);
    const pastedValues = Array.from(new Set(parseTextToArray(e.clipboardData.getData('text/plain'), regExp)));
    add(pastedValues);
  };

  const removeKeyword = (text: string) => {
    if (type === 'object') {
      onChange(value.filter((item) => item.keyword !== text));
    } else {
      onChange(value.filter((item) => item !== text));
    }
  };

  const inputProps: MDSInputProps<string> = {
    variant: 'textField',
    value: inputValue,
    onChange: handleChange,
    custom: {
      add: {
        onSubmit: handleAdd,
      },
      onEnter: handleAdd,
    },
    status: isError ? 'error' : undefined,
    inputProps: {
      onPaste: handlePaste,
    },
  };

  return {
    inputProps,
    handlers: {
      remove: removeKeyword,
    },
  };
};

// 키워드 목록을 문자열 목록으로 변환
const parseKeywordList = <T extends KeywordObject>({ type, value }: Parameters<T>): string[] => {
  return type === 'object' ? value.map((item) => item.keyword) : value;
};

// 클립보드의 텍스트를 정규 표현식에 따라 분할하여 배열로 변환
const parseTextToArray = (clipboardText: string, regExp: RegExp): string[] => {
  return clipboardText
    .split(regExp)
    .map((t) => t.trim())
    .filter(Boolean);
};

// 키워드가 이미 존재하는지 확인
const isKeywordExists = (inputValue: string, keywords: (string | KeywordObject)[]): boolean => {
  const normalizedInput = inputValue.toLowerCase();
  return keywords.some((item) =>
    typeof item === 'string' ? item.toLowerCase() === normalizedInput : item.keyword.toLowerCase() === normalizedInput
  );
};
