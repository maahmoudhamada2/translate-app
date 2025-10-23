import { produce } from "immer";

const defaultLangsHelper = (baseState, whichBox, langValue) => {
    const nextState = produce(baseState, (draft) => {
        draft.langData[whichBox].defaultLangs.forEach((lang) =>
            lang.code === langValue ? (lang.checked = true) : (lang.checked = false)
        );
    });
    return nextState;
};

export default defaultLangsHelper;