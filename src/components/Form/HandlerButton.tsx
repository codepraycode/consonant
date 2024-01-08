'use client';

const HandlerButton = ({label, onClick}:{label?:string, onClick?: ()=>void}) => {

    const title = label || "Upload material"
    return (
        <button
            // href={"/admin/upload"}
            onClick={(e)=> onClick ? onClick() : window.scrollTo(0,0)}
            title={title}
            className="btn bg-elem border-none box-shadow upload">

            <span className="icon icon-upload"/>
            {title}
        </button>
    )
}

export default HandlerButton;
