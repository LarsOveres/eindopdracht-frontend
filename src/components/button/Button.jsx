import "./Button.css"

function Button(props) {






    return(

        <button type="submit" className={`shadow default-button ${props.className}`}>

            {props.text}

        </button>
    )
}

export default Button;