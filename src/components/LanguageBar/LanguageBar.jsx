import { SwitchIcon, ExpandDownIcon } from "../../ui/icons";
import LangSelectionList from "./LangSelectionList";
import useLangData from "../../store/useLangData";
import LanguageItem from "./LanguageItem";
import { useState } from "react";

export default function LanguageBar({ isInput }) {
  const whichBox = isInput ? "inputBox" : "outputBox";
  const [expand, setExpand] = useState(false);
  const updateLangPairs = useLangData((state) => state.updateLangPairs);
  const choosedLanguage = useLangData(
    (state) => state.langData[whichBox].choosedLanguage
  );
  const handleSwitch = useLangData((state) => state.handleSwitch);

  const updateChoosedLang = useLangData((state) => state.updateChoosedLang);
  const toggleList = () => setExpand((prev) => !prev);
  const defaultLangs = useLangData(
    (state) => state.langData[whichBox].defaultLangs
  );

  const updateDefaultLangs = useLangData((state) => state.updateDefaultLangs);

  const handleDefaultBtns = (e) => {
    const inputValue = e.target.value;

    updateDefaultLangs(whichBox, inputValue);
    updateChoosedLang(whichBox, "checked", false);
    updateLangPairs(whichBox, inputValue);
  };

  return (
    <header>
      {defaultLangs.map((lang, idx) => (
        <LanguageItem
          key={idx}
          langInfo={lang}
          inputName={isInput ? "lang-pair-one" : "lang-pair-two"}
          role="primary"
          handleFn={handleDefaultBtns}
        />
      ))}
      {choosedLanguage.code === undefined ? (
        <button type="button" onClick={toggleList}>
          {choosedLanguage.name}
          <ExpandDownIcon />
        </button>
      ) : (
        <LanguageItem
          langInfo={choosedLanguage}
          role="primary"
          inputName={isInput ? "lang-pair-one" : "lang-pair-two"}
          handleFn={toggleList}
        />
      )}
      {expand ? (
        <LangSelectionList isInput={isInput} toggleList={toggleList} />
      ) : null}
      {!isInput ? (
        <button onClick={handleSwitch} type="button">
          <SwitchIcon />
        </button>
      ) : null}
    </header>
  );
}
