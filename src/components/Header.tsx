'use client'
import { signOut } from "@/helpers/auth.helper";
import {useUser} from "@/hooks/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {

    

    const router = useRouter();
    const pathname = usePathname()
    const [showMenu, setShowMenu] = useState(false);

    

    const user = useUser();


    return (
        <header>

            {pathname !== '/' && <h1>
                <Link href={"/"} className="logo">Consonant</Link>
            </h1>}

            <nav className="nav" role="navigation">


                <ul className="nav-list" role="list">
                    {/* Disabled user login */}
                    {/* {!user && (
                        <li>
                            <Link
                                href={"/auth/login"}
                            >Log In</Link>
                        </li>)
                    } */}


                    {user && <li>
                        <Link
                            href={"#"}
                            className="nav-list-dropdown-anchor text-overflow"
                            data-open={showMenu}

                            onClick={(e)=>{
                                e.preventDefault();

                                setShowMenu(true)
                            }}

                            onBlur={()=>setShowMenu(false)}
                        >
                            {user.email}
                        </Link>
                        <ul className="nav-list-dropdown" role="list">
                            <li>
                                <Link href={"/admin"}>Your dashboard</Link>
                            </li>

                            <li>
                                <Link
                                    href={"/api/signout"}
                                    onClick={async (e)=>{
                                        e.preventDefault();

                                        await signOut();

                                        router.replace('/');
                                    }}
                                >Logout</Link>
                            </li>
                        </ul>
                    </li>}
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
