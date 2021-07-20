import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
