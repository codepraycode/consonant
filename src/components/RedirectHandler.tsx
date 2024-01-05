'use client';

import { parseHash } from "@/utils/url";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// const SE = RVER = typeof window === 'undefined';
let location: any | undefined;
let localstorage: any |undefined;


if (window) {
    location = window.location;
    localstorage = window.localStorage;
}


interface FeedBack {
    message: string,
    redirect:string,
    redirectLabel:string
}


const RedirectHandler = () => {

    const [feedback, setFeedback] = useState<FeedBack | null>(null);


    const params = useSearchParams();
    const router = useRouter();

    // console.log(params.get('token_hash'), params.get('type'))

    const confirmToken = async () => {
        if(!window) return

        if(feedback) return

        // console.log(window.location.href);

        const hash_obj = parseHash(location.hash);
        console.log(hash_obj)

        // localstorage.setItem('supabase.auth.token', JSON.stringify(hash_obj))

        // const hash_obj = {
        //     token_hash: params.get('token_hash'),
        //     type: params.get('type'),
        // }
        
        // fetch(`/api/signin/callback`, {
        //     method: 'POST',
        //     // headers: {
        //     //   'Content-type': 'application/json'
        //     // },
        //     body: JSON.stringify({
        //         hash: params.get('token_hash'),
        //         type: params.get('type')
        //     })
        // })
        // .then((res)=>res.json())
        // .then(({ data, error })=>{
        //     if (error) return setFeedback(()=>({
        //         message: error.message || 'Authentication failed',
        //         redirect:error.redirect || '/auth/login',
        //         redirectLabel: error.redirectLabel || 'Login again',
        //     }))


        //     // setFeedback(()=>data);
        //     router.push('/admin');
        // }).catch((err: any)=>{
        //     console.error(err);


        //     setFeedback(()=>({
        //         message: 'Could not authenticated',
        //         redirectLabel: 'Login again',
        //         redirect:'/auth/login'
        //     }))
        // })

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
