import { ClientSuspense, Link } from "rakkasjs";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";
import { Home } from "lucide-react";
import React from "react";
const BreadCrumbs = React.lazy(() => import("./BreadCrumbs"));

interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  return (
    <header
      className="w-full flex flex-col  justify-between items-center  
      sticky top-0 z-30 gap-1"
    >
      <div className="w-full flex justify-between  bg-primary py-2 px-3">
        <Link href="/" className="text-2xl font-bold">
          <Home />
        </Link>
        <MiniSettingsModal />
      </div>

      <div className="w-fit flex bg-primary rounded-xl p-auto">
        <ClientSuspense fallback={<div className="h-5"></div>}>
          <BreadCrumbs />
        </ClientSuspense>
      </div>
    </header>
  );
}
