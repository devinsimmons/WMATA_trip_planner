import React from 'react';
import renderer from 'react-test-renderer';

import App, {TripReport, Schedule} from './App';
import './App.css';
/*import { isTouchCapable } from 'react-select/src/utils';*/
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


describe('App', () => {
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('TripReport', () => {
  const testJSX = 
    <TripReport travelTime = {5}>
    </TripReport>;
  test('has a valid snapshot', () => {
    const component = renderer.create(
      testJSX
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has one div element', () => {
    const element = shallow(testJSX);
    expect(element.find('div').length).toBe(1);
  }); 

  it('has one div element', () => {
    const element = shallow(testJSX);
    expect(element.find('p').length).toBe(1);
  }); 
});

describe('Schedule', () => {
  const trainInfo = [{
    DestinationName: "Friendship Heights",
    Min: "BRD"
  }];
  const testJSX =       
    <Schedule 
      classStyle = {'arrivals'}
      trains = {trainInfo}
    >
    </Schedule>;

  test('has a valid snapshot', () => {
    const component = renderer.create(testJSX);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows one train arriving', () => {
    const element = shallow(testJSX);
    //with one entry, the component should contain two paragraph elements
    expect(element.find('p').length).toBe(2);
  });
})