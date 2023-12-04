import { concatErrors } from "@/utils/helpers/concaterrors";


interface RqErrorProps {
error:Error
}

export function RqError({error}:RqErrorProps){
return (
    <div className='w-full h-full flex items-center justify-center'>

        <div className=" flex flex-col items-center justify-center gap-1
            max-w-[90%]  md:max-w-[60%] max-h-[80%] overflow-y-scroll 
          scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-transparent "
        >
        {/* <p className="w-full h-full bg-red-100 text-red-700 text-lg font-bold">{error.name}</p>
        <p className='w-full h-full bg-red-100 text-red-700 text'>{error.message}</p>

        {error.stack && <p className="w-full h-full bg-red-100 text-red-700"> stack {error.stack}</p>}
       
       <p className="w-full h-full bg-red-100 text-red-700">{JSON.stringify(error?.cause)}</p> */}

            <div className="p-1 w-full h-full bg-error text-error-content text-center rounded-lg">
                {concatErrors(error)}
            </div>
        </div>

    </div>
);
}
