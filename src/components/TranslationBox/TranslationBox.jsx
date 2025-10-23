import useLangData from "../../store/useLangData";
import ActionButtons from "../ActionButtons/ActionButtons";
import LanguageBar from "../LanguageBar/LanguageBar";

export default function TranslationBox({ isInput }) {
  const whichBox = isInput ? "inputBox" : "outputBox";
  const updateSentence = useLangData((state) => state.updateSenValues);
  const content = useLangData((state) => state.langData[whichBox].sentence);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <LanguageBar isInput={isInput} />
      <textarea
        id="translation-field"
        onChange={(e) => {
          const inputValue = e.target.value;
          updateSentence(inputValue);
        }}
        disabled={isInput ? false : true}
        maxLength={500}
        value={content}></textarea>
      <ActionButtons isInput={isInput} content={content} />
    </form>
  );
}
