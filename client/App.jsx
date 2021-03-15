import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import CreatePlaylist from './CreatePlaylist'


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Route exact path="/" component={Home}/>
          <Route exact path="/create" component={CreatePlaylist}/>
        </Router>
      </>
    )
  }
}

export default App
