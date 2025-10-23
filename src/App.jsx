import { useEffect } from "react";
import TranslationBox from "./components/TranslationBox/TranslationBox";
import useLangData from "./store/useLangData";
import { Logo } from "./ui/icons";

export default function App() {
  const sentence = useLangData((state) => state.langData.inputBox.sentence);
  const updateTransText = useLangData((state) => state.updateTransText);
  const inputLang = useLangData((state) => state.langData.inputBox.langPair);
  const outputLang = useLangData((state) => state.langData.outputBox.langPair);

  useEffect(() => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLang}&tl=${outputLang}&dt=t&q=${sentence}`;
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      updateTransText(data[0][0][0]);
    };
    getData();
  }, [sentence, inputLang, outputLang]);

  return (
    <article className="w-full flex flex-col items-center py-[3rem] px-[2rem] text-white bg-[url('./assets/hero_img-sm.jpg')] bg-no-repeat bg-contain md:bg-[url('./assets/hero_img.jpg')]">
      <header className="flex justify-center my-[3rem]">
        <Logo />
      </header>
      <main className="w-full flex flex-col gap-[0.7rem] md:w-[95%] lg:flex-row">
        <TranslationBox isInput={true} />
        <TranslationBox isInput={false} />
      </main>
    </article>
  );
}
