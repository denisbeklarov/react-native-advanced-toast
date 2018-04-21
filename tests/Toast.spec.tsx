
import { expect } from "chai";
import { spy } from "sinon";
import Toast from "../src/Toast";
import * as Enzyme from 'enzyme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';


describe("<Toast />", () => {
    it("renders the the text", () => {
        const wrapper: any = Enzyme.shallow(<Toast />);
        expect(wrapper.find("<Text>")).to.have.length(1);
    });
});