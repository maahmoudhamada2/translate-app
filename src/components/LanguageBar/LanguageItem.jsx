export default function LanguageItem({ langInfo, inputName, handleFn }) {
  return (
    <label>
      {langInfo.name}
      <input
        onClick={handleFn}
        type="radio"
        name={inputName}
        value={langInfo.code}
      />
    </label>
  );
}
