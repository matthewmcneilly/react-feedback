import React, { Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Add CSS Selectors for when card hovered change darken background colour
// User data should be read in and used as props for the card templates

export class Card extends Component {
  render() {
    const containerStyle = {
      backgroundColor: "#FF9900",
      width: "250px",
      height: "125px",
      overflow: "hidden",
      borderRadius: "4px",
      margin: "0 20px 20px 0",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const titleStyle = {
      textAlign: "center",
      color: 'white'
    };

    const { title, id, description } = this.props;
    return (
        <Col s={12} md={4}>
          <Link to={`/projects/${id}`}>
            <div style={containerStyle}>
            <h4 style={titleStyle}>{title}</h4>
            </div>
          </Link>
        </Col>

    );
  }
}

Card.defaultProps = {
  title: 'Loading',
  description: 'Loading'
};

Card.proptypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string
}

export default Card;
