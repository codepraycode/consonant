'use client'
import { TextInput } from "@/components/Form";
import Link from "next/link";



const LoginPage = () => {

    const handleLogin = () => {
        console.log("Login..")
    }


    return (
        <section className="form-section">


            <h1 className="fs-3 fw-800 text-center">
                Consonant
            </h1>
            <br/>
            {/* <br/> */}

            <div className="form-card">

                <h2 className="form-card-head">
                    <span>Sign into your account</span>

                    <br/>

                    {/* <Link href={"/"}>Don&#39;t have an account</Link> */}

                </h2>

                <form onSubmit={handleLogin} className="mt-1">
                    <TextInput
                        name="email"
                        label="Enter email address"
                        onChange={(val)=>console.log(val)}
                    />

                    <TextInput
                        name="password"
                        label="Enter password"
                        onChange={(val)=>console.log(val)}
                    />

                    <button>
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}


export default LoginPage;