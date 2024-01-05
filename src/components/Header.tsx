'use client'
import {useUser} from "@/hooks/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const Header = () => {

    

    
    const [showMenu, setShowMenu] = useState(false);

    

    const user = useUser();

    // console.log(params)


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



const AppHeader = () => {

    const params = usePathname();
    if (params.includes('/auth')) return null;

    return <Header/>;
}
export default AppHeader;
