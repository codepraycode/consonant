'use client';

import { useCourses } from "@/hooks";
import { DocumentUpload, Select, TextInput } from "./Form";
import { ChangeEvent, useMemo, useState } from "react";
import { useFormik } from "formik";
import { postMaterial } from "@/utils/requests";
import { useRouter } from "next/navigation";

export const MaterialUploadForm = ()=>{

    const router = useRouter();
    const {loading, courses, error} = useCourses();

    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string|null>(null);

    const formik = useFormik({
     initialValues: {
       title: '',
       course: '',
       asset: '',
     },
    //  validate,
     onSubmit: values => {
    //    console.log(JSON.stringify(values, null, 2));
        // console.log(values)
        const {title, course, asset} = values
        const data = new FormData();

        data.set('title', title)
        data.set('course', course)
        data.set('asset', asset)

        setSubmitting(true);
        setSubmitError(null);

        postMaterial(data).then(()=>{
            router.replace('/admin');
        }).catch(err=>{
            setSubmitError(err.message);
        }).finally(()=>setSubmitting(false))
     }
   });


    const course_options = useMemo(()=>{
        if (!courses) return []
        return courses.map((item)=>{
            return {
                key: item.id as string,
                label: item.code + `${item.title ? '-'+item.title : ''} `,
                value: item.id as string
            }
        })
    },[courses])

    return (
        <form className="upload-form" onSubmit={formik.handleSubmit}>
            {submitting && <span>Submitting...</span>}
            {submitError && <span>{submitError}</span>}
            <TextInput
                name="title"
                label="Enter material label"
                onChange={(val)=>{
                    formik.setFieldValue('title', val);
                }}
                value={formik.values.title}
            />

            <Select
                name="course"
                label="Select course for this material"
                options={course_options}
                onChange={(val)=>{
                    formik.setFieldValue('course', val);
                }}
                value={formik.values.course}
            />

            <DocumentUpload
                name="asset"
                onChange={(file)=>{
                    formik.setFieldValue('asset', file);
                }}
                remove={()=>{
                    formik.setFieldValue('asset', null);
                }}
                value={formik.values.asset as unknown as File}
            />


            <button
                type="submit"
                className="btn"
                style={{
                    display:'block',
                    width: '100%',
                    paddingBlock:'.8rem',
                    background: 'rgb(60, 59, 59)',
                    border:0,
                    color:'white',
                    borderRadius: '.2rem'
                }}
            >
                Upload File
            </button>
        </form>
    )
}