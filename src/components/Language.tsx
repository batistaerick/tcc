'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiMicrosofttranslator } from 'react-icons/si';

export default function Language() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  function handleChangeLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  }

  return (
    <SiMicrosofttranslator
      className="cursor-pointer"
      size={20}
      onClick={handleChangeLanguage}
    />
  );
}
