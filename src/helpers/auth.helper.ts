import { SITE_URL } from "@/env";
import { supabase } from "@/lib/superbase";
import logger from "@/utils/logger";




function handleAuthResponse({data, error}: Record<string, any>) {
    const _parsed_error = {code: '', message:''};

    if (error) {

        logger.error("AUTHENTICATION ERROR::", error)


        if (error.stack?.includes("Signups not allowed for otp")) {
            _parsed_error.code = 'USER-NOT-FOUND'
            _parsed_error.message = "User does not exist"
        }
        else {
            _parsed_error.code = 'AUTH-ERROR'
            _parsed_error.message = "Authentication error"
        }
    }


    return {data, error: error && {..._parsed_error, ...error}}
}


export const passwordlessSignIn = async (email: string) => {
    const auth = supabase.auth;

    
    const { error } = handleAuthResponse(
        await auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${SITE_URL}/auth/callback/`,
                shouldCreateUser: false
            }
        })
    )


    if (error) throw (error)

    return {
        message: "Check your email for authentication link",
        email
    };

}

export async function getUser() {
    const auth = supabase.auth;
    
    const { data: { user } } = await auth.getUser()

    return user;
}


export async function sessionAvailable(): Promise<boolean> {
    const auth = supabase.auth;
    
    
    const { error } = await auth.getSession()

    if (error) throw({
        message: error.message || 'Could not verify authentication, try again'
    })

    return true;
}

export async function signOut() {
    const auth = supabase.auth;

    
    const { error } = handleAuthResponse(

        await auth.signOut()
    )

    if (error) throw (error);

    return;

}

