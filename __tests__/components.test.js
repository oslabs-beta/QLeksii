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

    it('Renders div', () => {
      expect(wrapper.type()).toEqual('div');
    });

    it('Div has class of navbar', () => {
      expect(wrapper.hasClass('Navbar')).toEqual(true);
    });

    it('Div has unordered list', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('Div has list items with image tag inside', () => {
      expect(wrapper.find('img')).toHaveLength(2);
    })

    it('list item img has class of logo', () => {
      expect(wrapper.find('.logo').exists()).toEqual(true);
    })

  });

  describe('Visual Container Unit Tests', () => {
    
    let wrapper;
    const props = {
      tables: ['doctor', 'patients', 'nurses'],
      fields: {firstName: true, lastName: true},
      uri: 'mongodb+srv://',
    }

    beforeAll(() => {
      wrapper = shallow(<VisualContainer {...props} />);
    });

    it('Renders div', () => {
      expect(wrapper.type()).toEqual('div');
    });

    it('Tests if visual container has class of VisualContainer', () => {
      expect(wrapper.hasClass('VisualContainer')).toEqual(true);
    });

    it('Tests if visual container has class of container', () => {
      expect(wrapper.find('.container').exists()).toEqual(true);
    });

    it('Tests if Visualizer Exists', () => {
      expect(wrapper.find('Visualizer').exists()).toEqual(true);
    });

    
  })

})