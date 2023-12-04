import { concatErrors } from "../helpers/concaterrors";

interface ErrorOutputProps {
err:any
}

export function ErrorWrapper({err}:ErrorOutputProps){
return (
    <div className="p-1 w-full h-full bg-red-100 text-red-700 text-center rounded-lg">
        {concatErrors(err)}
    </div>
);
}
