import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Console from '../client/components/Console';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Console', () => {
    it('Renders div with output from props', () => {
      const props = { output: 'Hello' };
      const wrapper = shallow(<Console {...props} />);
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.text()).toEqual('Hello');
    });
  });
});
