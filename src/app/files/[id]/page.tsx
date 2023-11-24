import Tags from "@/components/Tag";
import Image from "next/image";
import Link from "next/link";



const FileInfoPage = () => {
    return (
        <>
            <section className="file-preview d-flex align-center">
                <div className="img-preview">
                    <Image
                        src={"/images/icons/file.svg"}
                        width={100}
                        height={100}
                        alt="Document preview"
                    />
                </div>


                <div>
                    <div className="details-preview">
                        <h2>SEN 201</h2>

                        <Tags />
                        <p>By XXXXXX . 4 months ago</p>
                    </div>


                    <div className="cta">

                        {/* Download */}
                        <button className="icon icon-download btn box-shadow" />
                        <button className="icon icon-link btn box-shadow" />
                    </div>
                </div>

                {/* Feeds */}
            </section>


            <section className="mt-5">
                <h2>Related materials</h2>


                <div className="file-listing">

                    {[1,2,3,4,5].map((i)=>(
                        <Link href={`/files/${i}`} key={i} className="file-content box-shadow">
                            <span className="icon icon-file"/>

                            <div>
                                <h3>SEN 201</h3>

                                {/* <Tags small/> */}
                                <p>By XXXXXX (4 months ago)</p>

                                {/* <button>View</button> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}


export default FileInfoPage;