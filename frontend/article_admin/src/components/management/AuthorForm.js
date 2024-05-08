import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import BackToDashboard from './BackToDashboard';
import FormError from './FormError';


function AuthorForm (props) {

    const {index} = useParams()
    const [authorData, setAuthorData] = useState({
        name: '',
        surname: '',
        job_description: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (props.edit){
            fetchResource("author");
        }
      }, []);

    function fetchResource(target) {
        const token = localStorage.getItem('jwt');
        fetch(`${process.env.REACT_APP_API}${target}/${index}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response)=>{
            if (response.status === 200){
                return (response.json())
            }
            else{
                if (response.status === 401){
                    setAuthorData({
                        name: '',
                        surname: '',
                        job_description: '',
                    })
                    return (401)
                }
            }})
        .then((data)=> {
            if (data === 401){
                localStorage.setItem("loggedOut", true)
                return
            }
            else if (target == "author"){
                setAuthorData({ name: data.name,
                                surname: data.surname,
                                job_description: data.job_description,})
            }
            })
    };

    if (localStorage.getItem("loggedOut") != "false"){
        navigate('/dashboard')
    }
    const formInputStyle = {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        fontSize: '16px', 
        resize: 'vertical',
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData({ ...authorData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        var url = `${process.env.REACT_APP_API}author/create`
        var method = "POST"
        if (props.edit){
            url = `${process.env.REACT_APP_API}author/update/${index}`
            method = "PUT"
        }
        fetch(url,{
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(authorData)
        })
        .then((response)=>{
            if (response.status === 201 || response.status === 200){
                navigate("/dashboard")
            }
            else{
                if (response.status === 401){
                    localStorage.setItem("loggedOut", true)
                    return
                }else {
                    return (response.json())
                }
            }
        })
        .then((data)=>{
            if (data) {
                if (data.message){
                    setError(data.message)
                }
                else if (data.error){
                    setError(data.error)
                }
            }
        })
    }

    function errorRenderer () {
        if (error !== "null"){
            return(
                <FormError message={error}/>
            )
        }
    }

    function contentRenderer(){
        if (localStorage.getItem("loggedOut") != "false"){
            navigate('/login')
        }
        else {
            return(
                <div>
                    <BackToDashboard/>
                    <form onSubmit={handleSubmit}>
                        <h2>Create Author</h2>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={authorData.name}
                            onChange={handleChange}
                            required
                            style={formInputStyle}
                            />
                        </div>
                        <div>
                            <label htmlFor="surname">Surname:</label>
                            <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={authorData.surname}
                            onChange={handleChange}
                            required
                            style={formInputStyle}
                            />
                        </div>
                        <div>
                            <label htmlFor="job_description">Job Description:</label>
                            <textarea
                            id="job_description"
                            name="job_description"
                            value={authorData.job_description}
                            onChange={handleChange}
                            required
                            style={formInputStyle}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    {errorRenderer()}
                </div>
            )
        }
    }

    return (
        contentRenderer()
    );
};

export default AuthorForm;
