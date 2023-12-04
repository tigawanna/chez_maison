import { concatErrors } from "@/utils/helpers/concaterrors";


interface ErrorOutputProps {
err:any
}

export function ErrorWrapper({err}:ErrorOutputProps){
return (
    <div className="p-2 w-full text-error text-center rounded-lg">
        {concatErrors(err)}
    </div>
);
}
