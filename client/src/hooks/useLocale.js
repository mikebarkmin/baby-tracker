import { de, enGB } from 'date-fns/locale';

const useLocale = () => {
  let locale = 'en';
  let dateLocale = enGB;
  if (navigator.language === 'de') {
    locale = 'de';
    dateLocale = de;
  }

  return {
    locale,
    dateLocale
  };
};

export default useLocale;
