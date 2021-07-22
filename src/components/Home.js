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

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 200,
  },
  content: {
    minHeight: 250,
  },
});

function Home(){
    const [ blogs, setBlogs ] = useState([])
    const classes = useStyles();

    async function fetchBlogs(){
        await fetch('http://localhost:3001/blogs')
              .then(res => res.json())
              .then(data => setBlogs(data))
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

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
                    <Button size="small" color="primary">
                        Delete
                    </Button>
                </CardActions>
            </Card>)
            )}           
        </div>
    )
}

export default Home