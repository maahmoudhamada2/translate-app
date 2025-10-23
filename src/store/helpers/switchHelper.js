import { produce } from "immer";

const switchHelper = (baseState) => {
    const nextState = produce(baseState, (draft) => {
        const nextOutBox = draft.langData.inputBox;
        const nextInpBox = draft.langData.outputBox;
        const detectBtn = draft.langData.inputBox.defaultLangs.find(
            (lang) => lang.code === "auto"
        );
        const nextOutBtns = nextOutBox.defaultLangs.filter(
            (lang) => lang !== detectBtn
        );
        const nextInpBtns = [detectBtn, ...nextInpBox.defaultLangs];
        nextOutBox.defaultLangs = nextOutBtns;
        nextInpBox.defaultLangs = nextInpBtns;
        nextInpBox.length = nextInpBox.sentence.length;
        draft.langData.inputBox = nextInpBox;
        draft.langData.outputBox = nextOutBox;
    });
    return nextState;
};

export default switchHelper;