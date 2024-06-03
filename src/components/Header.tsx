import {useTranslation} from "react-i18next";
import React from "react";

const Header = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="flex items-center justify-between gap-6 p-2">
            <div className="flex items-center gap-6 p-2">
                <img src="/images/pql_logo.jpeg" alt="logo" className="w-[50px]"/>
                <span className="font-bold">{t('title')}</span>
            </div>
            <div>
                <select
                    value={i18n.language}
                    onChange={e => {
                        changeLanguage(e.target.value);
                    }}
                >
                    {['en', 'es'].map(lang => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    )
}

export default Header;
