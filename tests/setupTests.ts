import { configure } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

// const { JSDOM } = require('jsdom');

// const jsdom = new JSDOM();
// const { window } = jsdom;

// function copyProps(src, target) {
//     const props = Object.getOwnPropertyNames(src)
//         .filter(prop => typeof target[prop] === 'undefined')
//         .map(prop => Object.getOwnPropertyDescriptor(src, prop));
//     Object.defineProperties(target, props as any);
// }
// declare var global: any
// global.window = window;
// global.document = window.document;
// global.navigator = {
//     userAgent: 'node.js',
// };

// copyProps(window, global);

// Ignore React Web errors when using React Native
console.error = (message) => {
    return message;
};


configure({ adapter: new ReactSixteenAdapter() });

require('react-native-mock');