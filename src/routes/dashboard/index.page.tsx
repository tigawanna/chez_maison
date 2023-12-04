import { LayoutDashboard, Receipt, Store, Users2Icon } from "lucide-react";
import { Link, PageProps } from "rakkasjs";

export default function Page({}:PageProps) {
    const parts = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="w-8 h-8" />,
      },
      {
        name: "Bills",
        href: "/dashboard/bills",
        icon: <Receipt className="w-8 h-8" />,
      },
      {
        name: "Shops",
        href: "/dashboard/shops",
        icon: <Store className="w-8 h-8" />,
      },
      {
        name: "Tenants",
        href: "/dashboard/tenants",
        icon: <Users2Icon className="w-8 h-8" />,
      },
    ];
return (
  <div className="w-full h-full min-h-screen flex items-center justify-center">
    <div className="flex flex-wrap sm:items-center justify-center w-full h-full gap-3">
      {parts.map((part) => (
        <Link
          key={part.href}
          href={part.href}
          className="h-32 sm:h-[200px] w-[90%] md:w-[40%] flex flex-col items-center justify-center  bg-base-200 shadow-xl 
              hover:text-accent  rounded-lg"
        >
          <div
            className="text-4xl font-bold hover:scale-[200%] duration-200 transition-transform 
            flex gap-8 items-center justify-center"
          >
            {part.icon}
            <> {part.name} </>
          </div>
        </Link>
      ))}
    </div>
  </div>
);}
