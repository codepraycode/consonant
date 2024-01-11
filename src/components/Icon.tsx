


const Icon = ({name, label, onClick, small}:{name:string, label?:string, small?:boolean, onClick?:()=>void}) => {
    return (
        <span
            className={`icon ${small ? 'icon-sm' : ''} icon-${name} ${onClick ? 'clickable': ''}`}
            title={label || name}
            onClick={()=>onClick && onClick()}
        >
            { label || name}
        </span>
    )
}

export default Icon;