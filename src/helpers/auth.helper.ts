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
    const auth = global._supabaseInstance.auth;

    
    const { data, error } = handleAuthResponse(
        await auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: 'http://localhost:3020/auth/callback/',
                shouldCreateUser: false
            }
        })
    )

    // console.log({data, error})

    if (error) throw (error)

    return {
        message: "Check your email for authentication link",
        email
    };

}

export async function getUser() {
    const auth = global._supabaseInstance.auth;
    
    const { data: { user } } = await auth.getUser()
    // console.log({data, error})

    return user;
}


export async function sessionAvailable(): Promise<boolean> {
    const auth = global._supabaseInstance.auth;
    
    
    const { data, error } = await auth.getSession()
    // console.log({data, error})

    if (error) throw({
        message: error.message || 'Could not verify authentication, try again'
    })

    return true;
}

export async function signOut() {
    const auth = global._supabaseInstance.auth;

    
    const { error } = handleAuthResponse(

        await auth.signOut()
    )

    // console.log({data, error})

    if (error) throw (error);

    return;

}

