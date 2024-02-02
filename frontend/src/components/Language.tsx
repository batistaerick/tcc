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
    flex h-9 w-9 transform items-center justify-center text-xs font-medium
    transition-colors duration-500 ease-in-out
    hover:bg-slate-400 dark:hover:bg-slate-700
  `;

  return (
    <div className="flex">
      <button
        className={`
          rounded-l-xl
          ${buttonStyle}
          ${
            language === 'en'
              ? 'bg-slate-400 dark:bg-slate-700'
              : 'bg-slate-300 dark:bg-slate-500'
          }
        `}
        onClick={() => handleChangeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`
          rounded-r-xl
          ${buttonStyle}
          ${
            language === 'pt'
              ? 'bg-slate-400 dark:bg-slate-700'
              : 'bg-slate-300 dark:bg-slate-500'
          }
        `}
        onClick={() => handleChangeLanguage('pt')}
      >
        PT
      </button>
    </div>
  );
}
