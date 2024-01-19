'use client'
import { TextInput } from "@/components/Form";
import { passwordlessSignIn } from "@/helpers/auth.helper";
import { useFormik } from "formik";
import { useState } from "react";



interface FeedBack {
    message: string,
    error?:boolean
}


const LoginPage = () => {


    const [feedback, setFeedback] = useState<FeedBack | null>(null);
    const [loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {

            if (loading) return;

            handleLogin(values.email);
        },
    });

    const handleLogin = (email:string) => {

        setLoading(true)
        passwordlessSignIn(email)        
        .then((data)=>{
            setFeedback(()=>({message:data.message}))
        })
        .catch(error=>{
            return setFeedback(()=>({
                message:error.message || 'Could not authenticate',
                error:true
            }))

        })
        .finally(()=>setLoading(false))
    }



    let formTemplate = (
        <form onSubmit={formik.handleSubmit} className="mt-1">
            <TextInput
                name="email"
                label="Enter email address"
                onChange={(val)=>{
                    formik.setFieldValue('email', val);
                }}
                value={formik.values.email}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
            </button>
        </form>
    )

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

                { feedback && <p>{feedback.message}
                    <br/>
                    {!feedback.error && <small>Please close this page as you go check your mail</small>}
                    </p> }
                { (!feedback || feedback.error) && formTemplate }



                
            </div>
        </section>
    )
}


export default LoginPage;