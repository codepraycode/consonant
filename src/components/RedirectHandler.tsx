'use client';

import { parseHash } from "@/utils/url";
import Link from "next/link";
import { useEffect, useState } from "react";

// const SE = RVER = typeof window === 'undefined';
const location = window && window.location;


interface FeedBack {
    message: string,
    redirect:string,
    redirectLabel:string
}


const RedirectHandler = () => {

    const [feedback, setFeedback] = useState<FeedBack | null>(null);

    const confirmToken = async () => {
        if(!window) return

        if(feedback) return

        const hash_obj = parseHash(location.hash);
        
        fetch(`/api/signin/callback`, {
            method: 'POST',
            // headers: {
            //   'Content-type': 'application/json'
            // },
            body: JSON.stringify({
                hash: hash_obj.access_token,
                type: hash_obj.type
            })
        })
        .then((res)=>res.json())
        .then(({ data })=>{
            setFeedback(()=>data);
        }).catch((err: any)=>{
            console.error(err);


            setFeedback(()=>({
                message: 'Could not authenticated',
                redirectLabel: 'Login again',
                redirect:'/auth/login'
            }))
        })

        // setLoading(true)
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
