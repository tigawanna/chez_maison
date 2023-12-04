import { LayoutProps } from "rakkasjs";

interface PrintLayoutProps {

}

export default function PrintLayout({children}:LayoutProps){
  return (
    <div className='w-full h-full'>
    {children}
    </div>
  );
};


