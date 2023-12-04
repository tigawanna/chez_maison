
import { AppUser } from "../../state/types/base";
import { NavElemets } from "./NavElemets";

interface ToolbarProps {
  user: AppUser
}

export const Toolbar = ({user}: ToolbarProps) => {
return (
<div className="w-full h-full flex  justify-start items-center">
  <NavElemets user={user} sidebar={false}/>
</div>
  );
};
