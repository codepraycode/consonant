
interface TextInputProps {
    name: string,
    label: string,
    value?: string,
    placeholder?: string,
    className?: string,
    onChange:(val:string | File)=>void,
}

export const TextInput = (props: TextInputProps) => {

    const {
        name, label, value, placeholder, onChange
    } = props


    return(
        <div className={`form-group ${props.className || ''}`}>
            <label htmlFor={name} className="sr-only">{label}</label>
            <input
                name={name}
                placeholder={placeholder || label}
                className="box-shadow"
                onChange={(e)=>onChange(e.target.value)}
                // value={value || ''}
            />
        </div>
    )
}