import { useState } from "react";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { MonthlyBills } from "../../state/api/bills";
import { BillsForm } from "./BillsForm";


interface MutateBillProps {

    bill:MonthlyBills
   
    custom_icon?: {
        Icon: IconType;
        size: string;
    }
}

export function MutateBill({bill, custom_icon}: MutateBillProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className='flex items-center justify-center'>
            <div
             className='h-full  w-full flex items-center justify-center rounded-full aspect-square  
            relative bottom-[20%] top-[60%] right-[15%]'>
                <TheIcon
                    Icon={custom_icon?.Icon ?? FaPlus}
                    size={custom_icon?.size ?? '40'}
                    iconAction={() => setOpen(true)} data_testid="open-shop-form" />
            </div>

            <ReactModalWrapper
                child={
                    <div className='z-50'> 
                    <BillsForm 
                        setOpen={setOpen} 
                    
                        bill={bill}
                        />
                         </div>
                }
                closeModal={() => setOpen(false)}
                delay={0}
                isOpen={open}

                styles={{
                    overlay_top: '0%',
                    overlay_right: '0%',
                    overlay_left: '0%',
                    overlay_bottom: '0%',
                    content_bottom: '2%',
                    content_right: '2%',
                    content_left: '2%',
                    content_top: '2%'

                }} />
        </div>
    );
}



