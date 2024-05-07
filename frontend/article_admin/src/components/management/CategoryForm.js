import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import BackToDashboard from './BackToDashboard';
import FormError from './FormError';


const CategoryForm = ({ onSubmit }) => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    console.log(localStorage.getItem("loggedOut"))
    if (localStorage.getItem("loggedOut") != "false"){
        navigate('/login')
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
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("here");
        const token = localStorage.getItem('jwt');
        fetch(`${process.env.REACT_APP_API}category/create`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(categoryData)
        })
        .then((response)=>{
            if (response.status === 201){
                navigate("/dashboard")
            }
            else{
                if (response.status === 401){
                    localStorage.setItem("loggedOut", true)
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

    function contentRender(){
        if (localStorage.getItem("loggedOut") != "false"){
            navigate('/login')
        } else {
            return (
                <div>
                    <BackToDashboard/>
                    <form onSubmit={handleSubmit}>
                        <h2>Create Category</h2>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                type="text"
                                id="name"
                                name="name"
                                value={categoryData.name}
                                onChange={handleChange}
                                required
                                style={formInputStyle}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                id="description"
                                name="description"
                                value={categoryData.description}
                                onChange={handleChange}
                                required
                                style={formInputStyle}
                                />
                            </div>
                        <button type="submit">Submit</button>
                    </form>
                    (errorRenderer())
                </div>
            )
        }
    }

    return (
        contentRender()
    );
};

export default CategoryForm;
