'use client';

import { useCourses } from "@/hooks";
import { Select } from "./Form";
import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { useAdminContext } from "@/context/AdminContext";
import HandlerButton from "./Form/HandlerButton";
import DocumentUpload from "./Form/DocumentUpload";
import Icon from "./Icon";

const MaterialUploadForm = ()=>{


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

    const formError = submitError || adminError;

    const touched = formik.values.asset !== formik.initialValues.asset ||
               formik.values.course !== formik.initialValues.course ||
               formik.values.title !== formik.initialValues.title
    

    const onboardFile = (file: File) => {
        const title = file.name.replace(/\.[^/.]+$/, "");
        formik.setFieldValue('title', title);
        formik.setFieldValue('asset', file);
    }

    return (
        <>
            


            <div className="d-flex align-center justify-between">
                <h1>Upload Material</h1>

                {/* {(touched && !submitting) && (
                    <Icon
                        name="reset" label="Reset form"
                        onClick={()=>formik.resetForm()}
                    />)
                } */}
            </div>

            <form className="upload-form" onSubmit={formik.handleSubmit}>

                {submitting && <span className="my-1">Submitting...</span>}
                {formError && <span className="text-error my-1">{formError}</span>}

                <DocumentUpload
                    name="asset"
                    onChange={onboardFile}
                    remove={()=>{
                        formik.setFieldValue('asset', null);
                    }}
                    value={formik.values.asset as unknown as File}
                    label={formik.values.title}
                />
{/* 
                <Select
                    name="course"
                    label="Select course for this resource"
                    options={course_options}
                    onChange={(val)=>{
                        formik.setFieldValue('course', val);
                    }}
                    value={formik.values.course}
                /> */}

                <button
                    type="submit"
                    className="btn"
                    disabled={submitting}
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
                    {submitting ? 'Uploading...' : "Upload"}
                </button>
            </form>
        </>
    )
}

export default MaterialUploadForm;