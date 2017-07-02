import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

// does app render without throwing 
it('renders without crashing', () => {
  shallow(<App />);
});
