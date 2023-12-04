import { PageProps } from "rakkasjs";
import { PasswordResetForm } from "./components/ResetPasswordForm";

export function ResetPasswordPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <PasswordResetForm />
    </div>
  );
}
