

interface IconProps {
    name:string,
    label?:string,
    small?:boolean,
    onClick?:()=>void,
    button?:boolean
}


const Icon = ({name, label, onClick, small, button}: IconProps) => {

    const props = {
        className: `icon ${small ? 'icon-sm' : ''} icon-${name} ${onClick ? 'clickable': ''}`,
        title: label || name,
        onClick: ()=>onClick && onClick()
    }

    const title = label || name;

    if (button) {
        return (
            <button {...props}>
                { title }
            </button>
        )
    }

    return (
        <span {...props}>
            { title}
        </span>
    )
}

export default Icon;