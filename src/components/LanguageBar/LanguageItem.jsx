export default function LanguageItem({
  langInfo,
  inputName,
  handleFn,
  isPrimary,
}) {
  return (
    <label>
      {langInfo.name}
      <input
        readOnly
        checked={langInfo.checked}
        onClick={handleFn}
        type="radio"
        name={inputName}
        value={langInfo.code}
      />
    </label>
  );
}
