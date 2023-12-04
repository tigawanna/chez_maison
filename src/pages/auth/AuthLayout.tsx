import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentTitle } from '@mantine/hooks';
import { AppUser } from '../../state/types/base';



interface AuthLayoutProps {
  user: AppUser;
}

export default function AuthLayout({ user }: AuthLayoutProps){
  useDocumentTitle('Auth')
  const [searchBarParams, setSearchBarParams] = useSearchParams();
  const navigate = useNavigate();
  const navigate_to = searchBarParams.get('callbackUrl')
  // console.log("navigate to ==== ",navigate_to)
  // console.log("user ==== ",user)
  
  useEffect(() => {
    if (user?.email) {
      if (navigate_to) {
        if (navigate_to === '/auth') {
          navigate('/');
        } else {
          navigate(navigate_to)
        }
      }
      else {
        navigate(-1)
      }
    }
  }, [user?.email])

  if (user?.email) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center text-lg font-bold">
        Already logged in
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  )
}

