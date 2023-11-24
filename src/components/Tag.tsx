
interface TagsProps {
    small?: boolean
}



const Tags = ({ small = false }: TagsProps) => {
    return (
        <ul className="tags d-flex" data-small={ small }>
            <li className="bg-white box-shadow">
                <a href="/">Past questions</a>
            </li>
            <li>Past questions</li>
            <li>Past questions</li>
        </ul>
    )
}

export default Tags;