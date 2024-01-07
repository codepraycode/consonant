import { useState, useCallback, useRef } from "react"



type Option = {
    key:string,
    label:string,
    value:string
}
interface SelectInputProps {
    name: string,
    label: string,
    value?: string,
    onChange:(val:string | File)=>void,
    placeholder?: string,
    multiple?:boolean,
    options: Option[]
}


export const Select = (props: SelectInputProps) => {

    const {
        name, label, placeholder, multiple, options, onChange
    } = props


    const selectRef = useRef<HTMLSelectElement | null>(null);


    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);


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


    const handleSelect = (item:any)=>{
        if (!selectRef.current) return

        
        // selectRef.current.setAttribute('value', item.value);// = item.value
        
        onChange(item.value)
        setSelected(()=>item);
        setActive(false)
    }


    return(
        <div className="form-group" onBlur={handleBlur}>
  
            <select
                name={name}
                className="sr-only"
                multiple={multiple}
                ref={selectRef}
                // onChange={()=>selected && onChange(selected.value)}
            />

            <button
                className="select-btn box-shadow"
                data-show={active}
                type="button"
                onClick={()=>setActive(p=>!p)}
            >
                <span className="placeholder">{ selected?.label || placeholder || label }</span>
                <i className="icon icon-chevron-down"></i>
            </button>

            <ul className="options box-shadow" role="list">
                {
                    options.map((item)=>(
                        <li className="option-item" key={item.key} onClick={()=>handleSelect(item)}>
                            {multiple && <span className="checkbox" />}
                            <button type="button">{item.label}</button>
                        </li>
                    ))
                }
                {/* <li className="option-item">
                    {multiple && <span className="checkbox" />}
                    <button type="button">Option 2</button>
                </li> */}
            </ul>
        </div>
    )
};


