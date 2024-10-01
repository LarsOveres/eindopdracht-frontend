import "./InputField.css"

function InputField(props) {

    return (
        <>
            <input placeholder={props.placeholder} className="input-field" type={props.type} value={props.value} onChange={props.onChange} />
        </>
        )
}

export default InputField;