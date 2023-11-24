
interface TagsProps {
    small?: boolean,
    items: string[]
}



const Tags = ({ small = false, items }: TagsProps) => {
    return (
        <ul className="tags d-flex" data-small={ small }>
            { items.map((item, i)=>(
                <li key={i} className="bg-white box-shadow">
                    <a href="#">{item.toUpperCase()}</a>
                </li>
            )) }
        </ul>
    )
}

export default Tags;