import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TheIcon } from "../../shared/wrappers/TheIcon";

interface HeaderToggleProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderToggle = ({setOpen}:HeaderToggleProps) => {
return (
    <div className=" flex justify-start items-center fixed top-[2%] left-[2%] z-50 gap-3">
        <TheIcon Icon={FaBars} iconAction={() => setOpen(prev=>!prev)} size='25px' />
        <Link to='/' className='text-xl font-bold'>AWESOME</Link>
    </div>
);
}
