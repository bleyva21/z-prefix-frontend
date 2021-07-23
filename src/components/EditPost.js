import {useLocation, Link} from 'react-router-dom'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {useState} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    main: {
      width: '800px',
    },
  }));

function EditPost(){
    const { state } = useLocation()
    const blog = state.item
    const classes = useStyles();
    const [bodyValue, setBodyValue] = useState(blog.text);
    const [nameValue, setNameValue] = useState(blog.author);
    const [titleValue, setTitleValue] = useState(blog.title);
    const [imageUrl, setImageUrl] = useState(blog.image)

    async function updateBlog(){
        await fetch('https://leyva-z-prefix-backend.herokuapp.com/blogs', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: blog.id,
                author: nameValue,
                title: titleValue,
                image: imageUrl,
                text: bodyValue
            })
        })
    }


    function handleNameChange(e){
        setNameValue(e.target.value)
    }

    function handleTitleChange(e){
        setTitleValue(e.target.value)
    }

    function handleBodyChange(e){
        setBodyValue(e.target.value)
    }

    function handleImageChange(e){
        setImageUrl(e.target.value)
    }


    function handleSubmit(e){
        e.preventDefault()
        updateBlog()
        window.location.href = 'https://leyva-z-prefix-frontend.herokuapp.com/'
    }

    return(
        <>
        <div className='createMain' >
            <h1>Update this Blog-Post</h1><br/>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField defaultValue={blog.author} className='name' required id="outlined-required" label="Name" variant="outlined" onChange={handleNameChange}/>
            <TextField defaultValue={blog.title} required id="outlined-required" label="Title" variant="outlined" onChange={handleTitleChange}/>
            <TextField defaultValue={blog.image} id="outlined-required" label="Optional Image URL" variant="outlined" onChange={handleImageChange}/>
            <TextField
                required
                className={classes.main}
                defaultValue={blog.text}
                id="outlined-multiline-flexible"
                label="Body"
                multiline
                maxRows={16}
                onChange={handleBodyChange}
                variant="outlined"
            />
            <br/>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to='/'>
                <Button variant='contained' color='primary' type='submit'>Cancel</Button>
            </Link>
            <Button variant='contained' color='primary' type='submit'>Submit Changes</Button>
        </form>
        </div>
        </>
    )
}

export default EditPost