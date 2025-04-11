import ReactHtmlParser from 'html-react-parser';
import { getRegExpByKeyword } from '../@utils';

export const HighLightLabel = ({ searchText, label }: { searchText: string; label: string }) => {
  const regex = getRegExpByKeyword(searchText);
  const getConvertedText = (text: string): string => {
    return searchText ? text?.replace(regex, '<span class="highlight">$&</span>') : text;
  };

  return ReactHtmlParser(getConvertedText(label));
};
