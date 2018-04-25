require("babel-register")({
    // This will override `node_modules` ignoring - you can alternatively pass
    // an array of strings to be explicitly matched or a regex / glob
    ignore: false
});

jest.mock('react-native-root-siblings', () => {
    const RealComponent = require.requireActual('View');
    const React = require('React');
    class View extends React.Component {
        render() {
            return React.createElement('View', this.props, this.props.children);
        }
    }
    View.propTypes = RealComponent.propTypes;
    return View;
});
