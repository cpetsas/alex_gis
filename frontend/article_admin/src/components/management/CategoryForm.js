import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import BackToDashboard from './BackToDashboard';
import FormError from './FormError';


function CategoryForm (props) {

    const {index} = useParams()
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    useEffect(() => {
        if (props.edit){
            fetchResource("category");
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
                    setCategoryData({
                        name: '',
                        description: '',
                    })
                    return (401)
                }
            }})
        .then((data)=> {
            if (data === 401){
                localStorage.setItem("loggedOut", true)
                return
            }
            else if (target == "category"){
                setCategoryData({ name: data.name,
                                description: data.description,})
            }
            })
    };

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
        const token = localStorage.getItem('jwt');
        var url = `${process.env.REACT_APP_API}category/create`
        var method = "POST"
        if (props.edit){
            url = `${process.env.REACT_APP_API}category/update/${index}`
            method = "PUT"
        }
        fetch(url,{
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(categoryData)
        })
        .then((response)=>{
            if (response.status === 201 || response.status === 200){
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

    function renderPageTitle () {
        if (props.edit){
            return(<h2>Edit Category</h2>)
        } else {
            return(<h2>Create Category</h2>)
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
                        {renderPageTitle()}
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
                    {errorRenderer()}
                </div>
            )
        }
    }

    return (
        contentRender()
    );
};

export default CategoryForm;
