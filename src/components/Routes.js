import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Projects from '../scenes/Projects';
import Project from '../scenes/Project';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Signup from '../scenes/Signup';
import NavigationBar from './NavigationBar';
import Note from '../scenes/Note';

const Routes = ()  => (
  <Router>
    <div>
      <NavigationBar />
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>

      { /* Private */}
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={Project} />
      <Route exact path="/notes/:id" component={Note} />
    </div>
  </Router>
);

export default Routes;
