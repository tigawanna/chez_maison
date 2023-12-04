import { ProfileMenu } from './ProfileMenu';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { TheIcon } from './../../shared/wrappers/TheIcon';

import { useState } from 'react';
import { FaHome, FaTasks, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { MdNotifications, MdOutlineDashboard } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { IconContext, IconType } from 'react-icons';
import { useDarkTheme } from '../../shared/hooks/useDarkTheme';
import { makeImageUrl } from '../../state/pb/config';
import { AppUser } from '../../state/types/base';
import { GrTest } from 'react-icons/gr';
import { BsPeople, BsShopWindow } from 'react-icons/bs';







interface NavElemetsProps {
user:AppUser
sidebar:boolean
closeModal?: () => void
}

export const NavElemets = ({user,sidebar,closeModal}:NavElemetsProps) => {



const [isOpen, setIsOpen] = useState(false);
const avatar = makeImageUrl('staff', user?.id as string, user?.avatar as string);
const {modeIcon,theme,toggleTheme} = useDarkTheme()

return (
    <div className='w-full  h-screen dark:text-white
    flex flex-col justify-start'>



        <ReactModalWrapper
            child={
            <ProfileMenu user={user} setIsOpen={setIsOpen} />}
            closeModal={() => setIsOpen(false)}
            isOpen={isOpen}

            styles={{
                overlay_top: '0%',
                overlay_right: '0%',
                overlay_left: '0%',
                overlay_bottom: '0%',
                content_bottom: '10%',
                content_right: '0%',
                content_left: '50%',
                content_top: '0%',
                
            

            }}
        />

        <div 
        onClick={() => closeModal?.()} 
        className="h-[50%] flex flex-col justify-evenly items-center gap-2
        rounded-xl  font-bold dark:font-normal ">
            <IconContext.Provider value={{
                size: '1.5rem',
            }}>
          
     

            <NavElemetLink
            Icon={FaHome}
            link_name="Home"
            link_path="/"
            sidebar={sidebar}

            />
            <NavElemetLink
            Icon={BsShopWindow}
            link_name="Shops"
            link_path="/shops"
            sidebar={sidebar}
            />
            <NavElemetLink
            Icon={BsPeople}
            link_name="Tenants"
            link_path="/tenants"
            sidebar={sidebar}
            />
            
            {import.meta.env.VITE_ENV ==="DEV"&&
            <NavElemetLink
            Icon={GrTest}
            link_name="Test"
            link_path="/test"
            sidebar={sidebar}
            />}


            {/* <div className="w-full  flex justify-center items-center 
              hover:text-rose-700">
            <Link 
            className='w-fit h-fit flex items-center justify-center gap-2'
            to="/test"><GrTest/>
            <h3 className='text-sm font-normal'>Test</h3>
            </Link>
            </div> */}


            {/* <div className="w-full  h-full flex justify-center items-center 
      hover:text-rose-700">
                <Link to="/about">About</Link>
            </div> */}
        </IconContext.Provider>
        </div>

        <div className="h-[35%]   flex flex-col justify-end items-center">

            <div className="w-fit h-full p-1 mx-5 flex justify-center items-center   ">
                <TheIcon
                    Icon={modeIcon}
                    size={"1.5rem"}
                    iconAction={toggleTheme}
                />
            </div>
            <div className="  rounded-md  flex justify-center items-center w-16 h-full  aspect-square">
                {!avatar ? (
                    <TheIcon
                        Icon={FaUserCircle}
                        size={"1.5rem"}
                        color={""}
                        iconAction={() => setIsOpen(true)}
                        data-testid="open-user-menu"
                    />

                ) : (
                    <img
                        src={avatar}
                        alt={""}
                        data-testid="open-user-menu"
                        className="rounded-full  h-[35px] hover:border-accent
                        border-2 border-slate-900 dark:border-slate-100 aspect-square"
                        onClick={() => setIsOpen(true)}
                    />
                )}
            </div>
        </div>
 </div>
);
}


interface NavElemetLinkProps {
sidebar:boolean
Icon:IconType
link_path:string
link_name:string
}

export function NavElemetLink({Icon,link_path,link_name,sidebar}:NavElemetLinkProps){
return (
    <div className="w-full  flex justify-center items-center
         hover:text-blue-700">
        <Link
            className='w-fit h-fit flex items-center justify-center gap-2'
            to={link_path}><Icon/>
            {sidebar&&<h3 className='text-sm font-normal'>{link_name}</h3>}
        </Link>
    </div>
);
}
