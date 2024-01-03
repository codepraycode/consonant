import RedirectHandler from "@/components/RedirectHandler";
import { useRouter } from "next/navigation";




const CallbackPage = () => {

    return (
        <section className="form-section">


            <h1 className="fs-3 fw-800 text-center">
                Consonant
            </h1>
            <br/>
            {/* <br/> */}

            <div className="form-card-">
                <RedirectHandler/>
            </div>
        </section>
    )
}


export default CallbackPage;
