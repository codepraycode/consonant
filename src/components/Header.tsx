import Link from "next/link";
import SearchFiles from "./Search"


const Header = () => {
    return (
        <header>

            <div className="nav">
                <Link href={"/admin"}>codepraycode</Link>
            </div>
            
        </header>
    )
}

export default Header;
