import React from 'react';
import { shallow } from 'enzyme';
import { CardAddNew } from './CardAddNew';

it('will respond onClick', () => {
  const mockShowModal = () => {};
  const wrapper = shallow(<CardAddNew showModal={mockShowModal} />);
  expect(wrapper.find('div').first().props().onClick).toEqual(mockShowModal);
});
 
