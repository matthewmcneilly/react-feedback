import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
  render() {

    const jumboStyle = {
      paddingLeft: "40px"
    };

    const style = {
      textAlign: "left",
      paddingLeft: "40px"
    };

    return (



      // Redux applications require at least one reducer
        <div className="Home">
          <Jumbotron style={jumboStyle}>
           <h1>Welcome to Feedback</h1>
           <p><i>An application for students by students. </i></p>
          </Jumbotron>

          <div style={style}>
            <h2>Context</h2>
            <ul>
              <li>All you needs in one application.</li>
              <li>No more app switching!</li>
              <li>Improving productivity with project centered notes and discussions.</li>
              <li>Great for any work environment but perfect for University students.</li>
            </ul>
          </div>
          <div style={style}>
            <h2>Collaboration</h2>
            <ul>
              <li>Instant communication with fellow students and lecturers.</li>
              <li>No more waiting on emails!</li>
              <li>Collaborate and improve upon your notes.</li>
              <li>Achieve higher grades with better preparation.</li>
            </ul>
            <p></p>
          </div>
          <div style={style}>
            <h2>Competition</h2>
            <ul>
              <li>Help drive motivation by discussing your progress with friends.</li>
              <li>Never leave that assignment to the last moment again!</li>
              <li>We inspire competition through collaboration.</li>
            </ul>
          </div>
        </div>
    );
  }
}

export default Home;
