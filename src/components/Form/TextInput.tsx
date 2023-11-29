
interface TextInputProps {
    name: string,
    label: string,
    value?: string,
    placeholder?: string,
}

export const TextInput = (props: TextInputProps) => {

    const {
        name, label, value, placeholder
    } = props
    return(
        <div className="form-group">
            <label htmlFor={name} className="sr-only">{label}</label>
            <input
                name={name}
                placeholder={placeholder || label}
                className="box-shadow"
                // value={value || ''}
            />
        </div>
    )
}