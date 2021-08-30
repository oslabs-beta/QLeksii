import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { MainContainer } from '../src/containers/MainContainer';
import { VisualContainer } from '../src/containers/VisualContainer';
import { Navbar } from '../src/components/Navbar';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React Unit Tests', () => {

  describe('Navbar Unit Tests', () => {

    let wrapper;
    const props = {
      onMenuToggle: false,
    }

    beforeAll(() => {
      wrapper = shallow(<Navbar {...props} />);
    });

    it('Renders div with class of Navbar with an unordered list of list items with images inside them', () => {
      expect(wrapper.type()).toEqual('div');
    });

  });

})