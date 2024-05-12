function FormError (props){
    return(
        <div>
            <p style={{ color: 'red', fontWeight: 'bold' }}>
                {props.message}
            </p>
        </div>
    )
};

export default FormError;