import React from 'react'
interface TheIconProps {
    Icon: any;
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

           <button type="button" data-testid={data_testid} onClick={handleClick}>
                <Icon  />
           </button>
           

    );
};

