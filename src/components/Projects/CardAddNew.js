import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setModalVisibility } from '../../actions/projects';

// Add CSS Selectors for when card hovered change darken background colour

export class CardAddNew extends Component {
  render() {

    const glyphStyle = {
      fontSize: "30px",
      color: "white",
      positon: 'relative',
      marginTop: '-5px'
    };
    const containerStyle = {
      backgroundColor: "#ddd",
      width: "125px",
      height: "125px",
      overflow: "hidden",
      borderRadius: "4px",
      margin: "0 20px 20px 0",
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    };

    return (

      <div className="CardAddNew" style={containerStyle} onClick={this.props.showModal}>
          <span className="glyphicon glyphicon-plus" style={glyphStyle}></span>
      </div>
    );
  }
}

CardAddNew.proptypes = {
  showModal: React.PropTypes.func.isRequired
};

CardAddNew.defaultProps = {
 showModal: () => {}
};

function mapDispatchToProps(dispatch) {
  return {
    showModal: () => dispatch(setModalVisibility({isVisible: true}))
  };
}

export default connect(undefined, mapDispatchToProps)(CardAddNew);
