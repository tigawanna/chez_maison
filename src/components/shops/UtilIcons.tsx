import { TheIcon } from "../../shared/wrappers/TheIcon";
import { ShopResponse } from "../../state/api/shops";
import { GiElectric, GiWaterDrop } from 'react-icons/gi'


interface UtilIconsProps {
utils:ShopResponse['utils']
}

export function UtilIcons({utils}:UtilIconsProps){

if(utils=="both"){
    return( 
        <div className='flex justify-center items-center '>
        <TheIcon Icon={GiElectric} color="gold" size='20' />
        < TheIcon Icon={GiWaterDrop} color="blue" size='20' />
        </div>
    )
}    

    if (utils == "elec") {
        return (
            <div className='flex justify-center items-center '>
                <TheIcon Icon={GiElectric} color="gold" size='20' />
            </div>
        )
    } 
    if (utils == "water") {
        return (
            <div className='flex justify-center items-center '>
                < TheIcon Icon={GiWaterDrop} color="blue" size='20' />
            </div>
        )
    }    
   

return null
}
