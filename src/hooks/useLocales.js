import { useTranslation } from 'react-i18next';
// '@mui
import { enUS, jaJP } from '@mui/material/locale';
import { patchUser } from '../redux/slices/users';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'app.lang-en',
    value: 'en',
    systemValue: enUS,
    icon: '/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'app.lang-ja',
    value: 'ja',
    systemValue: jaJP,
    icon: '/icons/flags/ic_flag_ja.png',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem("i18nextLng");

  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);

    const user = JSON.parse(localStorage.getItem("user"));
    user.locale = newlang;
    localStorage.setItem('user', JSON.stringify(user));
    
    patchUser({
      'locale': newlang
    });
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    langStorage,
    allLang: LANGS,
  };
}
