import { produce } from "immer";

const updateChoosedLangHelper = (baseState, whichBox, keyName, value) => {
    const nextState = produce(baseState, (draft) => {
        draft.langData[whichBox].choosedLanguage[keyName] = value;
    });
    return nextState;
};

export default updateChoosedLangHelper