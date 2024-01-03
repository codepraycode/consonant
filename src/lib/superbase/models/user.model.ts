import { BaseModel, supabase } from "@/helpers/superbase.helper";
import SuperBase from "..";
import logger from "@/utils/logger";




class UserModel extends BaseModel {

    /* =============== Class attributes ================ */
    email?: string
    username?:string
    password?:string
    matricNo?:string
    firstname?:string
    lastname?:string
    department?:string



    /* =============== Static attributes ================ */
    static auth = supabase.auth;


    /* =============== Constructor ================ */

    /* =============== Private Methods ================ */

    /* =============== Instance Methods ================ */

    /* =============== Static Methods ================ */

    static handleAuthResponse({data, error}: Record<string, any>) {
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

    
    
    static async passwordlessSignIn(email: string) {
        const cls = this.auth;

        
        const { data, error } = this.handleAuthResponse(
            await cls.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: 'http://localhost:3020/auth/callback/',
                    shouldCreateUser: false
                }
            })
        )

        // console.log({data, error})

        return {data,error};

    }


    static async verifyOtp(tokenHash: string, type:any = 'email') {
        const cls = this.auth;

        
        const { data, error } = this.handleAuthResponse(

            await cls.verifyOtp({ token_hash: tokenHash, type})
        )

        // console.log({data, error})

        return {data,error};

    }

    static async signOut() {
        const cls = this.auth;

        
        const { data, error } = this.handleAuthResponse(

            await cls.signOut()
        )

        // console.log({data, error})

        return {data,error};

    }

    static async getUser() {
        const cls = this.auth;

        
        const { data: { user } } = await cls.getUser()
        // console.log({data, error})

        console.log(user)
        return user;

    }
    
}


export default UserModel;
