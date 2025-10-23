import updateChoosedLangHelper from './helpers/updateChoosedLangHelper';
import updateLangPairsHelper from './helpers/updateLangPairsHelper'
import defaultLangsHelper from './helpers/defaultLangsHelper';
import switchHelper from './helpers/switchHelper';
import { create } from "zustand";


const zuSentence = "Hello, how are you?";

const useLangData = create((set) => ({
    langData: {
        inputBox: {
            langPair: "en",
            sentence: zuSentence,
            length: zuSentence.length,
            defaultLangs: [
                {
                    name: "Detect Language",
                    code: "auto",
                    checked: false,
                },
                {
                    name: "English",
                    code: "en",
                    checked: true,
                },
                {
                    name: "French",
                    code: "fr",
                    checked: false,
                },
            ],
            choosedLanguage: {
                name: "Choose language",
                code: undefined,
                checked: false,
            },
        },
        outputBox: {
            langPair: "fr",
            sentence: "",
            defaultLangs: [
                {
                    name: "English",
                    code: "en",
                    checked: false,
                },
                {
                    name: "French",
                    code: "fr",
                    checked: true,
                },
            ],
            choosedLanguage: {
                name: "Choose language",
                code: undefined,
                checked: false,
            },
        },
    },

    updateSenValues: (inputValue) =>
        set((state) => ({
            ...state,
            langData: {
                ...state.langData,
                inputBox: {
                    ...state.langData.inputBox,
                    sentence: inputValue,
                    length: inputValue.length,
                },
            },
        })),
    updateTransText: (text) =>
        set((state) => ({
            ...state,
            langData: {
                ...state.langData,
                outputBox: { ...state.langData.outputBox, sentence: text },
            },
        })),

    updateLangPairs: (whichBox, langValue) =>
        set((state) => updateLangPairsHelper(state, whichBox, langValue)),

    updateChoosedLang: (whichBox, keyName, value) =>
        set((state) => updateChoosedLangHelper(state, whichBox, keyName, value)),

    updateDefaultLangs: (whichBox, langValue) =>
        set((state) => defaultLangsHelper(state, whichBox, langValue)),
    handleSwitch: () => set((state) => switchHelper(state)),
}));


export default useLangData