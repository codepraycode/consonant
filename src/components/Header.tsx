'use client'
import { signOut } from "@/helpers/auth.helper";
import {useUser} from "@/hooks/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {

    

    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    

    const user = useUser();


    return (
        <header>

            <nav className="nav" role="navigation">
                {/* <h1>Consonant</h1> */}
                <ul className="nav-list" role="list">
                    {!user && (
                        <li>
                            <Link
                                href={"/auth/login"}
                            >Log In</Link>
                        </li>)
                    }


                    {user && <li>
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

                                        router.replace('/auth/login');
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
