'use client'
import { TextInput } from "@/components/Form";



const LoginPage = () => {

    const handleLogin = () => {
        console.log("Login..")
    }


    return (
        <section className="form-section">

            <div className="form-card">

                <h1>
                    <span>Sign into your account</span>


                    {/* <span>Don&#39;t have an account</span> */}

                </h1>

                <form onSubmit={handleLogin} className="mt-1">
                    <TextInput
                        name="email"
                        label="Enter email address"                        
                    />

                    <TextInput
                        name="password"
                        label="Enter password"
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