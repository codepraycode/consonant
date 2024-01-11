'use client';

import Icon from "../Icon";

const HandlerButton = ({label, onClick}:{label?:string, onClick?: ()=>void}) => {

    return (

        <Icon name="upload" label="Add new material" onClick={()=> onClick ? onClick() : window.scrollTo(0,0)}/>
    )
}

export default HandlerButton;
