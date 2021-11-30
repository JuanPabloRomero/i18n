import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import localeEsMessages from "../locales/es.json";

import JobsList from "./JobsList";

const defaultPreferences = {
    theme: {
        tableHeader: "table-light"
    }
}

const customPreferences = {
    theme: {
        tableHeader: "table-dark"
    }
}

const App = () => {

    const [language, setLanguage] = useState(localeEsMessages)
    const [preferences, setPreferences] = useState(defaultPreferences)

    useEffect(() => {
        const loadLanguage = async () => {
            let languageLoaded
            try {
                languageLoaded = await import(`../locales/${navigator.language}.json`);
            } catch (error) {
                languageLoaded = localeEsMessages
            }
            setLanguage(languageLoaded)
            if (languageLoaded !== localeEsMessages) {
                setPreferences(customPreferences)
            }
        }
        loadLanguage()
    }, [])

    return (
        <IntlProvider locale={navigator.language} messages={language}>
            <JobsList preferences={preferences}/>
        </IntlProvider>
    )
}

export default App
