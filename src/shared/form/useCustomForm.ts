import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";



/**
This hook is used to create a custom form with initial values and a react query useMutation function.
@template T - The type of variables passed to the mutation function.
@template R - The return type of the mutation function.
@param {Object} props - The props for this hook.
@param {T} props.initialValues - The initial values of the form.
@param {UseMutationResult<R, Error, T, unknown>} props.mutation - The react query mutation function used to submit the form.
@returns {Object} - An object containing the functions and state variables for the custom form.
*/


interface UseCustomFormProps<T,R> {
    initialValues:T;
    mutation:UseMutationResult<R, Error,T, unknown>
    inputValidation(inpt: T, setError: React.Dispatch<React.SetStateAction<{
        name: string;
        message: string;
    }>>): boolean
}

export function useCustomForm<T,R>({initialValues,mutation,inputValidation}:UseCustomFormProps<T,R>){
    
    const [input, setInput] = useState<T>(initialValues);
    const [error, setError] = useState({ name: "", message: "" })
    const [success, setSuccess] = useState<R|undefined>()
    
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if(inputValidation(input,setError)){
          mutation.mutate(input, {
                onSuccess(data, variables, context) {
                    setSuccess(data)
                },
            });
        }
 
     
    };
    return { handleChange,handleSubmit,input, error, setError, setInput,success };
}
