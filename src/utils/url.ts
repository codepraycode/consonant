'use client'
interface AuthHash {
    access_token: string,
    expires_at: string,
    expires_in: string,
    refresh_token: string,
    token_type: string,
    type: string,
    [k:string]: string
}


const IS_SERVER = typeof window === "undefined";
export default function getURL() {
  return IS_SERVER ? window.location : '';
}




export function parseHash(hash:string): AuthHash {
    const hash_obj: AuthHash = {
        access_token: '',
        expires_at: '',
        expires_in: '',
        refresh_token: '',
        token_type: '',
        type: '',
    };


    const _raw = hash.replace('#','');

    let _raw_split = _raw.split('&');

    _raw_split.forEach((item)=>{

        const [field, value] = item.split('=');

        hash_obj[field] = value;
    })

    return hash_obj
}

