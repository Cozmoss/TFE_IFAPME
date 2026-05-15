import { createContext, useState, useContext } from 'react'
import { FR } from './fr.js'
import { NL } from './nl.js'
import { EN } from './en.js'

const i18nContext = createContext()


export default function I18nProvider({ children }) {
    const SUPPORTED = ['fr', 'en', 'nl']
    const browserLang = navigator.language.slice(0, 2)
    const defaultLang = SUPPORTED.includes(browserLang) ? browserLang : 'fr'
  const [language, setLanguage] = useState(defaultLang)
    const translations = {fr: FR, nl: NL, en: EN}

    function t(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], translations[language])
    }

  return (
    <i18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </i18nContext.Provider>

  )

}

export function useI18n() {
  return useContext(i18nContext)
}
