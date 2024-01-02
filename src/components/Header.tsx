'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Header = () => {

    const [showMenu, setShowMenu] = useState(false);
    const navigation = useRouter();

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
                                    href={"/logout"}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        // window.open('/login', null)
                                        navigation.replace('/login')
                                    }}
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
