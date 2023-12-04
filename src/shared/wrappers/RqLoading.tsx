import { LoaderElipse } from "../loaders/Loaders";

interface RqLoadingProps {

}

export function RqLoading({}:RqLoadingProps){
return (
    <div className='w-full h-full   flex items-center justify-center'>
     <LoaderElipse/>
    </div>
);
}
