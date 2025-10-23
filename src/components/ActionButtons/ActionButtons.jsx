import { SoundIcon, CopyIcon, AlphaIcon } from "../../ui/icons/index";
import useLangData from "../../store/useLangData";
import { useEffect, useState } from "react";

export default function ActionButtons({ isInput }) {
  const whichBox = isInput ? "inputBox" : "outputBox";
  const boxData = useLangData((state) => state.langData[whichBox]);
  const [voices, setVoices] = useState([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(boxData.sentence);
  };

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(boxData.sentence);
    const reg = new RegExp(`^${boxData.langPair}`);
    const currentVoice = voices.find((voice) => voice.lang.match(reg));
    utterance.voice = currentVoice;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      if (allVoices.length > 0) setVoices(allVoices);
    };
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () =>
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  return (
    <footer className="w-full h-[82px] flex items-end justify-between relative">
      <section className="h-full flex items-end gap-[0.5rem]">
        <button onClick={handleSpeech} className="action-btns">
          <SoundIcon />
        </button>
        <button onClick={handleCopy} className="action-btns">
          <CopyIcon />
        </button>
      </section>
      {isInput ? (
        <section className="w-[23%] h-full flex flex-col items-end gap-[0.5rem]">
          <p className="mr-1.5 text-[0.75rem]">{boxData.length}/500</p>
          <button
            className="w-full h-[50px] bg-[#263FA9] flex items-center justify-center border-2 border-[#7CA9F3] rounded-2xl font-bold cursor-pointer"
            type="submit">
            <AlphaIcon />
            Translate
          </button>
        </section>
      ) : null}
    </footer>
  );
}
