import "./InputFieldInverted.css"
import {useState} from "react";


function InputFieldInverted(props) {

    // const [inputValue, setInputValue] = useState("");
    //
    // const handleChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    return (
        <>
            <input placeholder={props.placeholder} className="input-field-inverted shadow" type={props.type} value={props.value} onChange={props.onChange} />
        </>
        )
}

export default InputFieldInverted;