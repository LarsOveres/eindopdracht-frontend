import "./InputFieldInverted.css"

function InputFieldInverted(props) {

    return (
        <>
            <input placeholder={props.placeholder} className="input-field-inverted shadow" type={props.type} value={props.value} onChange={props.onChange} />
        </>
        )
}

export default InputFieldInverted;