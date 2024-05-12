import React, { useState, useEffect } from 'react';
import Articles from './Articles';
import SideMenu from './SideMenu';
import Authors from './Authors';
import Categories from './Categories';
import {useNavigate} from 'react-router-dom';
import CreateButton from '../management/Create';


function Dashboard (props) {

    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exception, setError] = useState(null)
    const [authors_expanded, setAuthorsExpanded] = useState(false)
    const [categories_expanded, setCategoriesExpanded] = useState(false)
    const [articles_expanded, setArticlesExpanded] = useState(true)
    const [article_reload, setArticleReload] = useState(false)
    const [author_reload, setAuthorReload] = useState(true)
    const [categories_reload, setCategoriesReload] = useState(true)
    const [create_destination, setCreateDestination] = useState("article")
    const navigate = useNavigate()

  
    useEffect(() => {
      fetchResource("article");
    }, []);

    const deleteResource = (target, index) =>{
        const token = localStorage.getItem('jwt');
        fetch(`${process.env.REACT_APP_API}${target}/delete/${index}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response)=>{
            if (response.status === 200){
                return (fetchResource(target))
            }
            else{
                if (response.status === 401){
                    localStorage.setItem("loggedOut", true)
                }
        }})
    }

    const fetchResource = (target) => {
        const token = localStorage.getItem('jwt');
        fetch(`${process.env.REACT_APP_API}${target}`,{
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
                    setArticles([])
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
            if (target == "article"){
                setArticles([...data])
            }
            else if (target == "category"){
                setCategories([...data])
            }
            else if (target == "author"){
                setAuthors([...data])
            }
            })
    };

    const selectTab = (tab) => {
        if (tab == "article"){
            setArticlesExpanded(true)
            setAuthorsExpanded(false)
            setCategoriesExpanded(false)
            setArticleReload(false)
            setAuthorReload(true)
            setCategoriesReload(true)
            setCreateDestination(tab)
            fetchResource(tab)
        }
        else if (tab == "author"){
            setArticlesExpanded(false)
            setAuthorsExpanded(true)
            setCategoriesExpanded(false)
            setArticleReload(true)
            setAuthorReload(false)
            setCategoriesReload(true)
            setCreateDestination(tab)
            fetchResource(tab)
        }
        else if (tab == "category"){
            setArticlesExpanded(false)
            setAuthorsExpanded(false)
            setCategoriesExpanded(true)
            setArticleReload(true)
            setAuthorReload(true)
            setCategoriesReload(false)
            setCreateDestination(tab)
            fetchResource(tab)
        }
    }

    const renderer = () =>{
        if (localStorage.getItem("loggedOut")=="true"){
            console.log("in here")
            navigate("/login")
        }
        if (articles_expanded){
            return(
                renderArticles()
            )
        }
        if (authors_expanded){
            return(
                renderAuthors()
            )
        }
        if (categories_expanded){
            return(
                renderCategories()
            )
        }
    }

    const renderArticles = () =>{
        if (article_reload){
            fetchResource("article")
        }
        if (articles.length != 0) {
            return(
                <Articles articles={articles} deleteResource={deleteResource} style={{ marginLeft: '20px', width: '50vw' }}/>
            )
        }
    }

    const renderAuthors = () =>{
        if (author_reload){
            fetchResource("author")
        }
        if (authors.length != 0) {
            return(
                <Authors authors={authors} deleteResource={deleteResource} style={{ marginLeft: '20px', width: '50vw' }}/>
            )
        }
    }

    const renderCategories = () =>{
        if (categories_reload){
            fetchResource("category")
        }
        if (categories.length != 0) {
            return(
                <Categories categories={categories} deleteResource={deleteResource} style={{ marginLeft: '20px', width: '50vw' }}/>
            )
        }
    }

    return (
        <div>
            <SideMenu selectTab={selectTab}/>
            <CreateButton destination={create_destination}/>
            <div className="dashboard">
                {renderer()}
            </div>
        </div>
    )

};

export default Dashboard;
