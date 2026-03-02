import React from 'react'
import { useLanguage } from '../state/LanguageContext'

const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();
    return (
        <div className='gap-4'>
            <p>Language: {language}</p>
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("fr")}>FR</button>
            <button onClick={() => changeLanguage("es")}>ES</button>
        </div>
    )
}

export default LanguageSelector