import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { PlainFormButton } from "../../shared/form/FormButton";
import { FormInput } from "../../shared/form/FormInput";
import { concatErrors } from "../../shared/helpers/concaterrors";
import { loginUser } from "../../state/pb/config";

interface LoginFormProps {

}
type UserInputs= {
    email: string,
    password: string
}
export const LoginForm = ({}:LoginFormProps) => {
    const [input, setInput] = useState<UserInputs>({ email: "", password: "" })
    const [error, setError] = useState({ name: "", message: "" })

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };


    const mutation = useMutation({
        mutationFn: (input:UserInputs) => loginUser(input),
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        meta: {
            invalidates: [['user']]
        }
    })
    // const timeline = ['approved_on', 'funded_on', 'completed_on']
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("about to save ",input)
        mutation.mutate(input);
    };
return (
 <div className='w-full h-full flex items-center justify-center'>
        <form onSubmit={handleSubmit}
            className="w-full md:w-[60%] h-full flex flex-col items-center justify-center  p-2 ">



            <FormInput
                error={error}
                handleChange={handleChange}
                input={input}
                label="Title"
                prop="email"
                type="text"
            />

            <FormInput
                error={error}
                handleChange={handleChange}
                input={input}
                label="password"
                prop="password"
                type="password"
            />


            <PlainFormButton
                disabled={mutation.isPending}
                isSubmitting={mutation.isPending}
                label="Submit"
            />

            <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                {error?.message !== "" ? (
                    <div
                        className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 
                        border-red-800 text-red-900  rounded-xl"
                    >
                        {error.message}
                    </div>
                ) : null}
            </div>
        </form>
 </div>
);
}
