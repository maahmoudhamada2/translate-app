import { produce } from "immer";

const updateLangPairsHelper = (baseState, whichBox, langValue) => {
    const nextState = produce(baseState, (draft) => {
        draft.langData[whichBox].langPair = langValue;
    });
    return nextState;
};

export default updateLangPairsHelper