import React from 'react';
import { shallow } from 'enzyme';
import { Card } from './Card';

const props = {
  title: 'My Title',
  description: 'This is the description'
};

const wrapper = shallow(<Card {...props} />);

it('has title', () => {
  expect(wrapper.find('h3').first().props().children).toEqual(props.title);
});

it('has description', () => {
  expect(wrapper.find('p').first().props().children).toEqual(props.description);
});
