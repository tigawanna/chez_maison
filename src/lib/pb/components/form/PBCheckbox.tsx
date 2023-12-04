import { Checkbox } from "@radix-ui/react-checkbox";

interface PBCheckboxProps {

}

export function PBCheckbox({}:PBCheckboxProps){
return (
  <div className="w-full h-full flex items-center justify-center">
    <Checkbox id="terms" />
    <label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
);
}
