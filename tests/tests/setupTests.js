import { configure } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
console.error = (message) => {
    return message;
};
configure({ adapter: new ReactSixteenAdapter() });
require('react-native-mock');
