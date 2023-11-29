'use client'
import { useState, useCallback } from "react"

interface SelectInputProps {
    name: string,
    label: string,
    value?: string,
    placeholder?: string,
    multiple?:boolean
}


export const Select = (props: SelectInputProps) => {

    const {
        name, label, placeholder, multiple
    } = props


    const [active, setActive] = useState(false);


    const handleBlur = useCallback((e: { currentTarget: any; }) => {
      const currentTarget = e.currentTarget;

      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container
        if (!currentTarget!.contains(document.activeElement)) {
        //   onBlur();
        setActive(false)
        }
      });
    },
    []
  );


    return(
        <div className="form-group" onBlur={handleBlur}>
  
            <select
                name={name}
                className="sr-only"
                multiple={multiple}
            />

            <button
                className="select-btn box-shadow"
                data-show={active}
                type="button"
                onClick={()=>setActive(p=>!p)}
            >
                { placeholder || label }
                <i className="icon icon-chevron-down"></i>
            </button>

            <ul className="options box-shadow" role="list">
                <li className="option-item">
                    {multiple && <span className="checkbox" />}
                    <button type="button">Option 1</button>
                </li>
                <li className="option-item">
                    {multiple && <span className="checkbox" />}
                    <button type="button">Option 2</button>
                </li>
            </ul>
        </div>
    )
};


