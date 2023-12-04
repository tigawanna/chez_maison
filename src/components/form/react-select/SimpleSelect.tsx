
import CreatableSelect from "react-select/creatable";
interface SimpleSelectProps {
  select_options: { value: string; label: string }[];
  handleSelectChange: (e: SelectOption) => void;
  defaultValue?: SelectOption;
  label: string;
}
export type SelectOption = { value: string; label: string } | null;

export function SimpleSelect({
  label,
  select_options,
  handleSelectChange,
  defaultValue,
}: SimpleSelectProps) {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <CreatableSelect
        aria-label={label}
        options={select_options}
        defaultValue={defaultValue ?? select_options[0]}
        name={label}

        theme={(theme) => {
            const styles = getComputedStyle(document.documentElement);
            const cssColor = styles?.getPropertyValue("background-color");
            // console.log({styles, cssColor})
            // console.log(theme)
          return {
            ...theme,
            colors: {
              ...theme.colors,
              primary: "",
              neutral0: cssColor,
              neutral80: "",
            },
          };
        }}
        className="w-[90%] p-[6px] m-1  min-w-[150px] text-accent 
        rounded-sm  "
        onChange={(e) => {
          if (e) {
            handleSelectChange(e);
          }
        }}
      />
    </div>
  );
}

{
  /* <SimpleSelect
    label="floor-select"
    select_options={floor_options}
    handleSelectChange={handleSelectChange} />
const handleSelectChange = (e: SelectOption) => {
    if (e) {
        setFloor(e)
    }
} */
}
