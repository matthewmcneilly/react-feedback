import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';
import RotateLoader from 'respinner/lib/RotateLoader';
import { loadRoute } from '../actions/project';
import { isLoading, getActiveProjectId } from '../reducers/Project';
import { getProject } from '../reducers/Entities';
import NotesSection from '../components/Project/NotesSection';
import UsersSection from '../components/Project/UsersSection';
import ChatSection from '../components/Project/ChatSection';

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 52
  },
  titleSection: {
    backgroundColor: '#f8f8f8',
    padding: '40px 30px',
    borderBottom: '1px solid #e7e7e7'
  },
  title: {
    margin: 0,
    marginBottom: 20,
    fontSize: 30,
  },
  left: {
    position:'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: 0,
    boxSizing: 'border-box'
  },
  right: {
    position:'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f8f8',
    borderLeft: '1px solid #e7e7e7'
  },
  sections: {
    padding: '0px 30px'
  }
}


// called after render method
class Project extends Component {
  componentDidMount() {
    // get id for project to be displayed
    const projectId = this.props.match.params.id;
    this.props.handleOnRouteLoad(projectId);
  }

  // if project is loading i.e. notes being fetched display rotate loader
  // if finished loading renderContent
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
    ) : this.renderContent();
  }

  renderProjectTitle() {
    const { title, notes, description } = this.props.project;

    return (
      <div style={styles.titleSection}>
        <h1 style={styles.title}>{title}</h1>
        <p>{description}</p>
      </div>
    )
  }

  // inject project title and notes into JSX components
  renderContent() {
    const { title, notes, description, discussion } = this.props.project;
    return (
      <div style={{display: 'inline-flex', flexDirection: 'row'}}>
        <div style={styles.left}>
          {this.renderProjectTitle()}
          <div style={styles.sections}>
            <NotesSection noteIds={notes} />
            <UsersSection />
          </div>
        </div>
        <div style={styles.right}>
          <ChatSection discussionId={discussion} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Project" style={styles.wrapper}>
        { this.renderLoading() }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const activeProjectId = getActiveProjectId(state);
  const project = getProject(state, activeProjectId);

  return {
    ...props,
    isLoading: isLoading(state),
    activeProjectId,
    project: project ? project : {},
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleOnRouteLoad: (projectId) => dispatch(loadRoute({projectId}))
  };
}

export default passedProps => {
  const ProjectWithRouteInfo = props => {
    const newProps = {...passedProps, ...props};
    return <Project {...newProps} />;
  }
  return <PrivateRoute {...passedProps} component={connect(mapStateToProps, mapDispatchToProps)(ProjectWithRouteInfo)} />
}
