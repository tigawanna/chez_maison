import React from 'react'
import { Link } from 'react-router-dom';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { useQueryClient } from '@tanstack/react-query';
import { AppUser } from '../../state/types/base';
import { useDarkTheme } from '../../shared/hooks/useDarkTheme';
import { pb, makeImageUrl } from '../../state/pb/config';



interface ProfileMenuProps {
user:AppUser
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileMenu = ({user,setIsOpen}: ProfileMenuProps) => {

const queryClient = useQueryClient();
const theme = useDarkTheme()

    const logout = () => {
        pb.authStore.clear();
        localStorage.removeItem('provider')
        queryClient.invalidateQueries({queryKey:["user"]});
        setIsOpen(prev => !prev)
    };

const avatar = makeImageUrl('staff', user?.id as string, user?.avatar as string);
return (
 <div className='w-full h-full rounded-xl 
 dark:text-slate-100 bg-slate-200  dark:bg-slate-800 
 flex flex-col items-center justify-evenly gap-2'>
        

{ user?<div className="  rounded-md  flex flex-col justify-center items-center m-2">  

    <div className="  rounded-md  flex flex-col justify-center items-center w-[200px]  aspect-square m-2">
        <img
            src={avatar}
            alt={""}
            className="rounded-[7%]  w-full
              border-2 border-slate-900 dark:border-slate-100 aspect-square"
            // onClick={() => setIsOpen(true)}
        />

                <div className="w-full p-2 flex flex-col  justify-start items-start   ">
                    <h1 className="md:text-xl font-bold ">{user?.name}</h1>
                    <h1 className="md:text-lg font-serif">{user?.email}</h1>
                    <h1 className="px-2 border border-slate-400  rounded-lg">{user?.type}</h1>
                </div>
        </div>

        <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
            <button
                onClick={() => logout()}
                aria-label="logout-user"
                className='p-2  font-semibold rounded-lg
                    border border-slate-900 dark:border-slate-100
                   hover:scale-110 hover:bg-slate-700 hover:text-slate-100'
            >Sign out</button>
        </div>
        </div>:<Link 
        onClick={()=>setIsOpen(false)}
        className='p-2 border-4 border-purple-900 rounded-xl '
        to='/auth'>
        Login</Link> }



        <div className="w-fit p-1 mx-5 flex justify-center items-center   ">
            <TheIcon
                Icon={theme.modeIcon}
                size={"30"}
                iconAction={theme.toggleTheme}
            />
        </div>



 </div>
);
}
