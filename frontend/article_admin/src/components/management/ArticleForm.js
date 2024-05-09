import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import FormError from './FormError';
import BackToDashboard from './BackToDashboard';


function ArticleForm (props) {
    const {index} = useParams()
    const navigate = useNavigate()
    const [articleData, setArticleData] = useState({
        title: '',
        summary: '',
        content: '',
        published: false,
        published_date: '',
        author: '',
        category: '',
    });
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const formInputStyle = {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        fontSize: '16px', 
        resize: 'vertical',
      }


    useEffect(() => {
        if (props.edit){
            fetchResource("article")
        }
        fetchResource("author");
        fetchResource("category");
      }, []);
    
    function fetchResource(target) {
        const token = localStorage.getItem('jwt');
        var url = `${process.env.REACT_APP_API}${target}`
        if (props.edit && target === "article"){
            url = `${process.env.REACT_APP_API}${target}/${index}`
        }
        fetch(url,{
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
                    setAuthors([])
                    setCategories([])
                    return (401)
                }
            }})
        .then((data)=> {
            if (data === 401){
                localStorage.setItem("loggedOut", true)
                return
            }
            else if (target === "category"){
                setCategories([...data])
            }
            else if (target === "author"){
                setAuthors([...data])
            }
            else if (target === "article"){
                setArticleData({
                    title: data.title,
                    summary: data.summary,
                    content: data.content,
                    published: data.published,
                    published_date: data.published_date,
                    author: data.article_author.id,
                    category: data.article_category.id,
                })
            }
            })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setArticleData({ ...articleData, [name]: value });
    };

    const handleTextareaResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        var url = `${process.env.REACT_APP_API}article/create`
        var method = "POST"
        console.log(articleData)
        if (props.edit){
            url = `${process.env.REACT_APP_API}article/update/${index}`
            method = "PUT"
        }
        fetch(url,{
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(articleData)
        })
        .then((response)=>{
            if (response.status === 201 || response.status === 200){
                navigate("/dashboard")
            }
            else{
                if (response.status === 401){
                    localStorage.setItem("loggedOut", true)
                }
                else {
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
    };

    function errorRenderer () {
        if (error !== "null"){
            return(
                <FormError message={error}/>
            )
        }
    }

    function contentRender () {
        if (localStorage.getItem("loggedOut") != "false"){
            navigate('/login')
        }
        else {
            return(
                <div>
                    <BackToDashboard/>
                        <form onSubmit={handleSubmit} style={{ marginLeft: '20px', width: '50vw' }} >
                            <h2>Create Article</h2>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input
                                type="text"
                                id="title"
                                name="title"
                                value={articleData.title}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
                                    fontSize: '16px', 
                                    resize: 'vertical',
                                }}
                                />
                            </div>
                            <div>
                                <label htmlFor="summary">Summary:</label>
                                <textarea
                                id="summary"
                                name="summary"
                                value={articleData.summary}
                                onChange={handleChange}
                                required
                                onInput={handleTextareaResize} 
                                style={formInputStyle}
                                />
                            </div>
                            <div>
                                <label htmlFor="content">Content:</label>
                                <textarea
                                id="content"
                                name="content"
                                value={articleData.content}
                                onChange={handleChange}
                                required
                                onInput={handleTextareaResize} 
                                style={formInputStyle}
                                />
                            </div>
                            <div>
                                <label htmlFor="published">Published:</label>
                                <input
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={articleData.published}
                                onChange={(e) =>
                                    setArticleData({ ...articleData, published: e.target.checked })
                                }
                                />
                            </div>
                            {articleData.published && (
                                <div>
                                <label htmlFor="published_date">Published Date:</label>
                                <input
                                    type="date"
                                    id="published_date"
                                    name="published_date"
                                    value={articleData.published_date}
                                    onChange={handleChange}
                                    style={formInputStyle}
                                />
                                </div>
                            )}
                            <div>
                                <label htmlFor="author">Author:</label>
                                <select
                                id="author"
                                name="author"
                                value={articleData.author}
                                onChange={handleChange}
                                required
                                style={formInputStyle}

                                >
                                <option value="">Select Author</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                    {author.name} {author.surname}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <div >
                                <label htmlFor="category">Category:</label>
                                <select
                                id="category"
                                name="category"
                                value={articleData.category}
                                onChange={handleChange}
                                required
                                style={formInputStyle}
                                >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                    {category.name}
                                    </option>
                                ))}
                                </select>
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

export default ArticleForm;
