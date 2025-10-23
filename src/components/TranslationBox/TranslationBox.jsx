import useLangData from "../../store/useLangData";
import ActionButtons from "../ActionButtons/ActionButtons";
import LanguageBar from "../LanguageBar/LanguageBar";
import clsx from "clsx";

export default function TranslationBox({ isInput }) {
  const whichBox = isInput ? "inputBox" : "outputBox";
  const updateSentence = useLangData((state) => state.updateSenValues);
  const content = useLangData((state) => state.langData[whichBox].sentence);

  return (
    <form
      className={clsx(
        "w-full py-[2rem] px-[1rem] flex flex-col relative border-2 border-[#394150] rounded-3xl",
        isInput ? "bg-[#212936CC]" : "bg-[#121826CC]"
      )}
      onSubmit={(e) => e.preventDefault()}>
      <LanguageBar isInput={isInput} />
      <textarea
        className="w-full h-[150px] font-bold resize-none focus-visible:outline-0 p-[1rem]"
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
