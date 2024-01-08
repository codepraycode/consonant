'use client';

import { useCourses } from "@/hooks";
import { DocumentUpload, Select, TextInput } from "./Form";
import { ChangeEvent, useMemo, useState } from "react";
import { useFormik } from "formik";
import { postMaterial } from "@/utils/requests";
import { useRouter } from "next/navigation";
import { useAdminContext } from "@/context/AdminContext";
import HandlerButton from "./Form/HandlerButton";
import { values } from "lodash";

export const MaterialUploadForm = ()=>{


    const {loading:adminLoading, error:adminError, postNewMaterial} = useAdminContext();
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
        handleSubmit(values)
     },
    //  onReset: (values)=>{
    //     console.log("Reset form");

    //     values.title = '';
    //     values.asset = '';
    //     values.course = ''
    //  }
   });


    function handleSubmit(values:any) {
        const {title, course, asset} = values
        const data = new FormData();

        data.set('title', title)
        data.set('course', course)
        data.set('asset', asset)

        setSubmitting(true);
        setSubmitError(null);

        postNewMaterial(data)
        .then(()=>{
            formik.resetForm({
                values: {
                    title: '',
                    course: '',
                    asset: '',
                },
            });
        })
        .catch((err: any)=>{
            setSubmitError(err.message);
        }).finally(()=>setSubmitting(false))
   }

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


    const formError = submitError || adminError;

    const touched = (()=>{
        return formik.values.asset !== formik.initialValues.asset ||
               formik.values.course !== formik.initialValues.course ||
               formik.values.title !== formik.initialValues.title
    })();

    return (
        <>
            


            <div className="d-flex align-center justify-between">
                <h1 className="mt-5 px-1">Upload Resource</h1>

                {touched && <HandlerButton
                    label="Reset form"
                    onClick={()=>{
                        formik.resetForm();
                    }}
                />}
            </div>

            <form className="upload-form" onSubmit={formik.handleSubmit}>
                {submitting && <span>Submitting...</span>}
                {formError && <span>{formError}</span>}
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
        </>
    )
}