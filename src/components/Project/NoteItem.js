import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Thumbnail } from 'react-bootstrap';

class NoteItem extends Component {
  render() {
    const { id, title, createdOn, content } = this.props;
    const titleStyle = {
      textAlign: "center",
      color: 'white'
    };
    const containerStyle = {
      backgroundColor: "#FFDE00",
      width: "125px",
      height: "125px",
      overflow: "hidden",
      borderRadius: "4px",
      margin: "0 20px 20px 0",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <Link to={`/notes/${id}`}>
        <div style={containerStyle}>
          <h4 style={titleStyle}>{title}</h4>
          <span>{createdOn}</span>
        </div>
      </Link>
    );
  }
}

export default NoteItem;
