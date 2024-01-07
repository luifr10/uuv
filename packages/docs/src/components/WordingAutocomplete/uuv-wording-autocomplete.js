import { PrimeReactProvider } from 'primereact/api';
import React, { useRef, useState } from "react";
import { AutoComplete } from 'primereact/autocomplete';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './uuv-wording-autocomplete.css';
import frAutocompletionSuggestion from '@site/docs/04-wordings/01-generated-wording-description/fr-autocompletion-suggestion.json';
import enAutocompletionSuggestion from '@site/docs/04-wordings/01-generated-wording-description/en-autocompletion-suggestion.json';
import Highlighter from "react-highlight-words";
import { Toast } from 'primereact/toast';
import { translate } from "@docusaurus/Translate";
function buildItemsForLanguage(lang) {
    switch (lang) {
        case 'fr':
            return frAutocompletionSuggestion;
        default:
            return enAutocompletionSuggestion;
    }
}

function getPlaceholder() {
    return translate({id: 'autocomplete.placeholder', message: 'Enter a keyword to find a phrase'});
}

export function UuvWordingAutocomplete({lang}) {
    const inputItems = buildItemsForLanguage(lang);
    const placeholder = getPlaceholder();
    const [searchText, setSearchText] = useState(null);
    const [value, setValue] = useState('');
    const [items, setItems] = useState(inputItems);
    const toast = useRef(null)
    const normalizeString = (data) => data?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const search = (event) => {
        const textToSearch = event.query;
        setItems(inputItems.filter(item => normalizeString(item.suggestion)?.includes(normalizeString(textToSearch))));
        setSearchText(textToSearch);
    }

    const itemTemplate = (item) => {
        return (
            <Highlighter
                highlightClassName="HighlightWord"
                searchWords={[searchText]}
                autoEscape={true}
                sanitize={normalizeString}
                textToHighlight={item.suggestion}
            />
        );
    };

    const onSelect = (item) => {
        window.location.href = `${window.location.pathname}#${item.link}`;
        navigator.clipboard.writeText(item.suggestion);
       let summary = translate({id: 'autocomplete.toast.summary', message: 'Success'});
       let detail = translate({id: 'autocomplete.toast.detail', message: 'Sentence "{suggestion}" copied to clipboard'}, {suggestion: item.suggestion});
        toast.current.show({ severity: 'success',life: 3000, summary: summary, detail: detail });
    };

    return (
        <PrimeReactProvider>
            <div className="flex AutocompleteContainer">
                <div className="p-float-label Autocomplete">
                    <AutoComplete
                        inputId="ac"
                        field="suggestion"
                        value={value}
                        suggestions={items}
                        completeMethod={search}
                        itemTemplate={itemTemplate}
                        onChange={(e) => setValue(e.value)}
                        onSelect={(e) => onSelect(e.value)}
                    />
                        <label htmlFor="ac">{placeholder}</label>
                </div>
            </div>
            <Toast ref={toast} />
        </PrimeReactProvider>
    );
}
