import React from 'react'
import { IconType } from 'react-icons';
import { IconContext } from "react-icons/lib";
interface TheIconProps {
    Icon: IconType;
    size?: string;
    color?: string;
    iconstyle?: string;
    iconAction?: () => any;
   data_testid?:string
}

export const TheIcon = (
    {
        Icon,
        color,
        iconAction,
        iconstyle,
        size,
        data_testid
    }: TheIconProps
) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        iconAction && iconAction()
        // other logic for handling the icon's click event
    }
    return (
        <IconContext.Provider value={{
            size, color, className: iconstyle
        }}>
           <button type="button" data-testid={data_testid} onClick={handleClick}>
                <Icon  />
           </button>
           
        </IconContext.Provider>
    );
};

