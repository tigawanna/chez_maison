import { Loader } from "lucide-react";

;

interface RqLoadingProps {

}

export function RqLoading({}:RqLoadingProps){
return (
    <div className='w-full h-full   flex items-center justify-center'>
     <Loader className="aniamte-spin"/>
    </div>
);
}
