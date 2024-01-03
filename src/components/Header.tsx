'use client'
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";


const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const navigation = useRouter();

    const params = usePathname()


    // console.log(params)
    if (params.includes('/auth')) return null;


    return (
        <header>

            <nav className="nav" role="navigation">
                {/* <h1>Consonant</h1> */}
                <ul className="nav-list" role="list">
                    <li>
                        <Link
                            href={"#"}
                            className="nav-list-dropdown-anchor"
                            data-open={showMenu}

                            onClick={(e)=>{
                                e.preventDefault();

                                setShowMenu(true)
                            }}

                            onBlur={()=>setShowMenu(false)}
                        >
                            codepraycode
                        </Link>
                        <ul className="nav-list-dropdown" role="list">
                            <li>
                                <Link href={"/admin"}>Your dashboard</Link>
                            </li>

                            <li>
                                <Link
                                    href={"/api/signout"}
                                >Logout</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}

export default Header;
