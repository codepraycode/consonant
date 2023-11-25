import { Content } from "@/types";
import Image from "next/image";
import Tags from "./Tag";
import { formatDateDistance } from "@/utils/time";


const FilePreview = ({file}: {file: Content }) => (
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
                <h2>{file.title}</h2>

                <Tags items={file.departments}/>
                <p>By {file.owner?.firstName} <span className="fw-800 dot-sep">&#183;</span> { formatDateDistance(file.createdAt) }</p>
            </div>


            <div className="cta">

                {/* Download */}
                <button className="icon icon-download btn box-shadow" />
                <button className="icon icon-link btn box-shadow" />
            </div>
        </div>

        {/* Feeds */}
    </section>
);

export default FilePreview;
