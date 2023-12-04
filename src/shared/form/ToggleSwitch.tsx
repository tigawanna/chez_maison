import { MantineColor, Switch } from "@mantine/core";
import { ReactNode } from "react";

interface ToggleSwitchProps {
    label?:ReactNode
    description?:ReactNode
    error?:ReactNode
    offLabel?:ReactNode
    color?: MantineColor
    radius?:	number | "xs" | "sm" | "md" | "lg" | "xl"
    size?:"sm" | "md" | "lg" | "xl"
    labelPosition?:"left" | "right"
    checked:boolean
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export function ToggleSwitch(
    {
    label,
    description,
    error,
    offLabel,
    radius,
    setChecked,
    size,
    checked,
    color,
    labelPosition
}:ToggleSwitchProps){

return (
    <Switch
    label={label}  
    checked={checked} 
    onChange={(event) => setChecked(event.currentTarget.checked)}
    description={description}
    error={error}
    offLabel={offLabel}
    radius={radius}
    size={size}
    color={color}
    labelPosition={labelPosition}

    />
);
}
