import logger from "@/utils/logger";
import { loadSupabase } from "@/utils/supabase-config";


// loadSupabase()

// console.log(global)

class UserModel {

    /* =============== Class attributes ================ */
    email?: string
    username?:string
    password?:string
    matricNo?:string
    firstname?:string
    lastname?:string
    department?:string



    /* =============== Static attributes ================ */
    // static auth = global._supabaseInstance.auth;


    /* =============== Constructor ================ */

    /* =============== Private Methods ================ */

    /* =============== Instance Methods ================ */

    /* =============== Static Methods ================ */


    
    
    // static async passwordlessSignIn(email: string) {
    //     const cls = this.auth;

        
    //     const { data, error } = this.handleAuthResponse(
    //         await cls.signInWithOtp({
    //             email,
    //             options: {
    //                 emailRedirectTo: 'http://localhost:3020/auth/callback/',
    //                 shouldCreateUser: false
    //             }
    //         })
    //     )

    //     // console.log({data, error})

    //     return {data,error};

    // }


    // static async verifyOtp(tokenHash: string, type:any = 'email') {
    //     const cls = this.auth;

        
    //     const { data, error } = this.handleAuthResponse(

    //         await cls.verifyOtp({ token_hash: tokenHash, type})
    //     )

    //     // console.log({data, error})

    //     return {data,error};

    // }

    // static async signOut() {
    //     const cls = this.auth;

        
    //     const { data, error } = this.handleAuthResponse(

    //         await cls.signOut()
    //     )

    //     // console.log({data, error})

    //     return {data,error};

    // }

    // static async getUser() {
    //     const cls = this.auth;

        
    //     const { data: { user } } = await cls.getUser()
    //     // console.log({data, error})

    //     return user;

    // }
    
}


export default UserModel;
