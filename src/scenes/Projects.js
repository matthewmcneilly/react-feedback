import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from '../components/Projects/Card';
import CardAddNew from '../components/Projects/CardAddNew';
import PrivateRoute from '../components/PrivateRoute';
import { loadRoute } from '../actions/projects';
import { isLoading } from '../reducers/Projects';
import { getProjects } from '../reducers/Entities';
import RotateLoader from 'respinner/lib/RotateLoader';
import NewProjectModal from '../components/Projects/NewProjectModal';

class Projects extends Component {
  componentWillMount() {
    this.props.handleOnRouteLoad();
  }

  // render contant or rotate loader depending of loading status
  renderLoading() {
    return this.props.isLoading ? (
      <div style={{width: '60px', margin: 'auto'}}>
        <RotateLoader
          duration={2}
          stroke="#4197ff"
          opacity={0.4}
          size={60}
        />
      </div>
      ) : this.renderGrid();
  }

  // map through each project and inject data into card component
  renderGrid() {
    const { projects } = this.props;
    return (
      <div>

        { projects.map(p => <Card key={p.id} title={p.title} description={p.description} id={p.id} />) }
        <CardAddNew />
      </div>
    );
  }

  render() {
    return (
      <div className="Projects">
        <Grid>
          <Row>
            { this.renderLoading() }
            <NewProjectModal />
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    isLoading: isLoading(state),
    projects: getProjects(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleOnRouteLoad: () => dispatch(loadRoute())
  };
}

export default props => <PrivateRoute {...props } component={connect(mapStateToProps, mapDispatchToProps)(Projects)} />
