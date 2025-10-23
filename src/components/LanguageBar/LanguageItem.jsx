import clsx from "clsx";
export default function LanguageItem({
  langInfo,
  inputName,
  handleFn,
  isPrimary,
}) {
  return (
    <label
      className={clsx(
        "flex justify-center items-center cursor-pointer p-[0.5rem] rounded-xl has-checked:bg-[#394150] has-checked:text-[#F9FAFB]",
        isPrimary ? null : "w-[30%]"
      )}>
      {langInfo.name}
      <input
        className="hidden"
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
