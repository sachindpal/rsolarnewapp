import "react-native";
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreenRender from "../src/app/Home/HomeScreenRender";

test('renders correctly', () => {
  const tree = renderer.create(<HomeScreenRender />).toJSON();
  expect(tree).toMatchSnapshot();
});