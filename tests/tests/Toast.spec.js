import { expect } from "chai";
import { Toast } from "../src/Toast";
import * as Enzyme from 'enzyme';
import React from 'react';
describe("<Toast />", () => {
    it("renders the the text", () => {
        const wrapper = Enzyme.shallow(React.createElement(Toast, null));
        expect(wrapper.find("<Text>")).to.have.length(1);
    });
});
