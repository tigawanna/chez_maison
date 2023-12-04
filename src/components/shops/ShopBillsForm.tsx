import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PlainFormButton } from "../../shared/form/FormButton";
import { FormInput } from "../../shared/form/FormInput";
import { concatErrors } from "../../shared/helpers/concaterrors";
import { ErrorWrapper } from "../../shared/wrappers/ErrorWrapper";
import { BillResponse, BillUpdateFields, updateBill } from "../../state/api/bills";
import { useBillsStore } from "../../state/zustand/bills";


interface ShopBillsFormProps {
    bill: Omit<BillResponse, "expand">
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ShopBillsForm({bill,setOpen}:ShopBillsFormProps){
    const bills_store = useBillsStore()
    // console.log("is  new bill === ",is_new_bill)
    const [input, setInput] = useState(bill);
    const [error, setError] = useState({ name: "", message: "" })


    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };


    const update_bill_mutation = useMutation({
        mutationFn: (input: BillUpdateFields) => updateBill(input),
        meta: { invalidates: [bills_store.one_shop_query_key] },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
            setInput(data)
            setOpen(false)
        },
    })
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        update_bill_mutation.mutate(input)
    };


    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="text-xl font-bold border-b ">{bill.month}  {bill.year}</div>
            <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-center items-center">

                <div className="w-full flex flex-wrap items-center justify-center">

                    <div className="min-w-[40%] flex flex-wrap justify-center items-center">

                        <FormInput
                            error={error}
                            handleChange={handleChange}
                            input={input}
                            label="Elec"
                            prop="elec_readings"
                            input_props={{
                                type: "number",
                                style: {
                                    width: '100%'
                                }
                            }}
                        />
                        <FormInput
                            error={error}
                            handleChange={handleChange}
                            input={input}
                            label="Water"
                            prop="water_readings"
                            input_props={{
                                type: "number",
                                style: {
                                    width: '100%'
                                }
                            }}
                        />
    
                    </div>
                    <div className="min-w-[40%] flex flex-wrap justify-center items-center">

                        <FormInput
                            error={error}
                            handleChange={handleChange}
                            input={input}
                            label="Month"
                            prop="month"
                            input_props={{
                                type: "number",
                                style: {
                                    width: '100%'
                                }
                            }}
                        />
                        <FormInput
                            error={error}
                            handleChange={handleChange}
                            input={input}
                            label="Year"
                            prop="year"
                            input_props={{
                                type: "number",
                                style: {
                                    width: '100%'
                                }
                            }}
                        />

                    </div>

           

                </div>

              
                {update_bill_mutation.isError && <ErrorWrapper err={update_bill_mutation.error} />}

                    <PlainFormButton
                        isSubmitting={update_bill_mutation.isPending}
                        disabled={update_bill_mutation.isPending}
                        label="update"
                    />
            </form>
        </div>
    );
}
