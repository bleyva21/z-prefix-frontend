import './NewPost.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  main: {
    width: '500px',
  },
}));

function NewPost(){
    const classes = useStyles();
    const [bodyValue, setBodyValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [imageUrl, setImageUrl] = useState('')

    async function postBlog(){
        await fetch('https://leyva-z-prefix-backend.herokuapp.com/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
        postBlog()
        window.location.href = 'https://leyva-z-prefix-frontend.herokuapp.com/'
    }

    return (
        <div className='createMain' >
            <h1>Create a New Blog-Post</h1><br/>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField className='name' required id="outlined-required" label="Name" variant="outlined" onChange={handleNameChange}/>
            <TextField required id="outlined-required" label="Title" variant="outlined" onChange={handleTitleChange}/>
            <TextField id="outlined-required" label="Optional Image URL" variant="outlined" onChange={handleImageChange}/>
            <TextField
                required
                className={classes.main}
                id="outlined-multiline-flexible"
                label="Body"
                multiline
                maxRows={4}
                onChange={handleBodyChange}
                variant="outlined"
            />
            <br/>
            <Button variant='contained' color='primary' type='submit'>Submit</Button>
        </form>
        </div>
    )
}

export default NewPost