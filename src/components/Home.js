import './Home.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 600
  },
  media: {
    height: 200,
  },
  content: {
    minHeight: 250,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid #000',
    borderRadius: '25px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

function Home(){
    const [ blogs, setBlogs ] = useState([])
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [curId, setCurId] = useState()

    const handleOpen = (id) => {
        setCurId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function fetchBlogs(){
        await fetch('http://localhost:3001/blogs')
              .then(res => res.json())
              .then(data => setBlogs(data))
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    async function handleDelete(){
        await fetch('http://localhost:3001/blogs', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: curId
            })
        })
        setOpen(false)
        window.location.href = 'http://localhost:3001'
    }

    function html(){
        return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Are you sure you want to delete this post?</h2>
          <Button size="small" color="variant" onClick={handleDelete} >Confirm</Button>
          <Button size="small" color="primary" onClick={handleClose}>Cancel</Button>
        </div>
        )
    }

    return(
        <div className='main' >
            {console.log(blogs)}
            {blogs.map(item => (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={item.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleOpen(item.id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>)
            )}   
           <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {html()}
            </Modal> 
        </div>
    )
}

export default Home