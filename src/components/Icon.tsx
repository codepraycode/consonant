


const Icon = ({name, label, onClick}:{name:string, label?:string, onClick?:()=>void}) => {
    return (
        <span
            className={`icon icon-sm icon-${name} ${onClick ? 'clickable': ''}`}
            title={label || name}
            onClick={()=>onClick && onClick()}
        >
            { label || name}
        </span>
    )
}

export default Icon;