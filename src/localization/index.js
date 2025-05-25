import { useSelector } from 'react-redux';
import translations from './translations';
import { selectCurrentLanguage } from '../redux/slices/language';
const useTranslation = (key) => {
    const language = useSelector(selectCurrentLanguage);
    return translations[language][key] || key;
};

export default useTranslation;
