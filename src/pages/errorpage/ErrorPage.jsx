import "./ErrorPage.css"

function ErrorPage() {
    return (
        <>
            <div className="scale">
                <h1 className="fault-code">404</h1>
            </div>
            <p className="error-message"><span>Oeps!</span> Sorry, we kunnen deze pagina niet meer vinden</p>
        </>
    )
}

export default ErrorPage