import { getRegExpByKeyword } from '../@utils';

export const HighLightLabel = ({ searchText, label }: { searchText: string; label: string }) => {
  if (!searchText) return <>{label}</>;

  const regex = getRegExpByKeyword(searchText); // g 플래그 들어간 정규식이라고 가정
  const result: React.ReactNode[] = [];

  let lastIndex = 0;

  label.replace(regex, (match, offset) => {
    if (lastIndex < offset) {
      result.push(label.slice(lastIndex, offset));
    }

    result.push(
      <span key={offset} className="highlight">
        {match}
      </span>
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < label.length) {
    result.push(label.slice(lastIndex));
  }

  return <>{result}</>;
};
