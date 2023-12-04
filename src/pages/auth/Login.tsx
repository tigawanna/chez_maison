import { LoginForm } from '../../components/auth/LoginForm';
import { AppUser } from '../../state/types/base';


interface LoginProps {
  user?: AppUser;
}

export default function Login({ user }: LoginProps){


  return (

    <div
  className="w-full min-h-screen   h-full 
  flex flex-col items-center justify-center  ">
      <LoginForm />
    </div>

  )
}
