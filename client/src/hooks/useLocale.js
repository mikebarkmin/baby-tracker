import { de, enGB, enUS, enCA, fr } from 'date-fns/locale';

const useLocale = () => {
  let locale;
  let dateLocale;

  switch (navigator.language) {
    case 'de':
    case 'de-AT':
    case 'de-CH':
    case 'de-DE':
    case 'de-LI':
    case 'de-LU':
      locale = 'deDE';
      dateLocale = de;
      break;
    case 'da':
    case 'da-DK':
      locale = 'daDK';
      dateLocale = dk;
    case 'en-GB':
      locale = 'enUS';
      dateLocale = enGB;
      break;
    case 'en-CA':
      locale = 'enUS';
      dateLocale = enCA;
      break;
    case 'fr':
    case 'fr-CA':
    case 'fr-CH':
    case 'fr-FR':
    case 'fr-LU':
    case 'fr-MC':
      locale = 'fr';
      dateLocale = fr;
      break;
    default:
      locale = 'enUS';
      dateLocale = enUS;
      break;
  }

  return {
    locale,
    dateLocale
  };
};

export default useLocale;
