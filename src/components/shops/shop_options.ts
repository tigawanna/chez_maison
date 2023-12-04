export const util_options = [
    { value: 'both', label: 'Both' },
    { value: 'elec', label: 'Elec' },
    { value: 'water', label: 'Water' },
]

export function getDefaultOption(options: { value: string; label: string; }[], value?: string) {
    if (value) {
        return options.find(o => o.value === value)
    }
    return options[0]
}
