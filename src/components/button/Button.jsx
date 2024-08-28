import "./Button.css"

function Button(props) {

    return(

        <button type={props.type} className={`shadow default-button ${props.className}`} onClick={props.onClick}>

            {props.text}

        </button>
    )
}
export default Button;