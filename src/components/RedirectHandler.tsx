'use client';

import { sessionAvailable } from "@/helpers/auth.helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface FeedBack {
    message: string,
    redirect:string,
    redirectLabel:string
}


const RedirectHandler = () => {

    const [feedback, setFeedback] = useState<FeedBack | null>(null);
    
    const router = useRouter();

    const confirmToken = async () => {

        try {

            const done = await sessionAvailable();
    
            if (done) return router.push('/admin');
        } catch(error:any) {
            setFeedback(()=>({
                message: error.message || 'Could not authenticate',
                redirect: '/auth/login',
                redirectLabel:'Try again'
            }))
        }
    }

    confirmToken();

    let template = <h4>Authenticating...</h4>

    if (feedback) {
        template = (
            <>
                <h4>{feedback.message}</h4>
                <Link href={feedback.redirect}>{feedback.redirectLabel}</Link>
            </>
        )
    }



    return (
        <div className="form-card-feedback">
            { template }
        </div>
    );
}


export default RedirectHandler;
