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
    <header className="w-full h-[60px] flex items-center gap-[2rem] border-b-2 border-[#394150] text-[#D2D5DA] font-bold text-[0.875rem] ">
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
        <button
          className="flex items-center gap-[0.5rem] cursor-pointer"
          type="button"
          onClick={toggleList}>
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
        <button
          className="action-btns absolute top-[40px] right-[30px]"
          onClick={handleSwitch}
          type="button">
          <SwitchIcon />
        </button>
      ) : null}
    </header>
  );
}
