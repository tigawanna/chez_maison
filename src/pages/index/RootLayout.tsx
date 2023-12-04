import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { ReactProgress } from '../../shared/loaders/ReactProgress';
import { NavElemets } from '../../components/toolbar/NavElemets';
import { useState } from 'react';
import { SideDrawer } from '../../components/toolbar/SideDrawer';
import { HeaderToggle } from '../../components/toolbar/HeaderToggle';
import { useAuthGuard } from '../../shared/hooks/useAuthGuard';
import useScrollToTopOnRouteChange from '../../shared/hooks/useScrollToTop';
import { AppUser } from '../../state/types/base';





interface RootLayoutProps {
  user: AppUser;

}

export default function RootLayout({ user }: RootLayoutProps){

  useAuthGuard(user, false)
  const navigation = useNavigation()
  const location = useLocation()
  useScrollToTopOnRouteChange()

  const [open, setOpen] = useState(false)

  return (
    <div className="w-full min-h-screen  dark:bg-slate-900 flex ">

      <HeaderToggle setOpen={setOpen} />

      <div className='fixed top-0 right-0 left-0 z-40'>
        <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
      </div>



      <div
        className="h-screen w-[5%] fixed top-[10%]
         bg-opacity-80 dark:bg-opacity-90  p-1 hidden md:block
        z-30"
      >
        <Toolbar user={user} />
      </div>


      <SideDrawer
        open={open}
        closeModal={() => setOpen(false)}
      >
        <NavElemets user={user} closeModal={() => setOpen(false)} sidebar={open}/>
      </SideDrawer>



      <main className=" w-full  min-h-screen z-20 h-full mt-[12%]  md:ml-[5%] sm:mt-[10%] md:mt-[5%] ">
        <Outlet />
      </main>

    </div>
  );
};
