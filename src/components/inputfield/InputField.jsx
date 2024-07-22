import "./InputField.css"
import {useState} from "react";


function InputField(props) {

    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <input placeholder={props.placeholder} className="input-field shadow" type="text" value={inputValue} onChange={handleChange} />
        </>
        )
}

export default InputField;