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
    <footer>
      <section>
        <button onClick={handleSpeech} className="action-btns">
          <SoundIcon />
        </button>
        <button onClick={handleCopy} className="action-btns">
          <CopyIcon />
        </button>
      </section>
      {isInput ? (
        <section>
          <p>{boxData.length}/500</p>
          <button type="submit">
            <AlphaIcon />
            Translate
          </button>
        </section>
      ) : null}
    </footer>
  );
}
