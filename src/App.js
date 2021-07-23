import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/newpost'>
            <NewPost/>
          </Route>
          <Route exact path='/editpost'>
            <EditPost/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
