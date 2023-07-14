import { useTranslation } from 'react-i18next';

export default function Language() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  async function handleChangeLanguage(newLanguage: 'en' | 'pt') {
    if (language !== newLanguage) {
      await changeLanguage(newLanguage);
    }
  }

  const buttonStyle = `
    flex h-6 w-8 transform items-center justify-center
    text-xs font-medium text-white
    transition-colors duration-500 ease-in-out
    hover:bg-slate-700
  `;

  return (
    <div className="flex">
      <button
        className={`
          rounded-l-full
          ${buttonStyle}
          ${language === 'en' ? 'bg-slate-700' : 'bg-slate-500'}
        `}
        onClick={() => handleChangeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`
          rounded-r-full
          ${buttonStyle}
          ${language === 'pt' ? 'bg-slate-700' : 'bg-slate-500'}
        `}
        onClick={() => handleChangeLanguage('pt')}
      >
        PT
      </button>
    </div>
  );
}
