import { Text, View, ActivityIndicator, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import Toast, { ToastTypes } from './Toast';
import { Colors, FontSizes } from './defaultConfig';
const animationDuration = 500;
export default class ToastContainer extends React.Component {
    constructor(props) {
        super(props);
        this.hide = () => {
            Animated.timing(this.state.position, {
                toValue: -100,
                duration: animationDuration
            }).start();
        };
        this.state = { position: new Animated.Value(-100) };
    }
    componentDidMount() {
        Animated.timing(this.state.position, {
            toValue: 0,
            duration: animationDuration
        }).start();
        if (this.props.options.duration && this.props.options.duration > animationDuration) {
            setTimeout(() => {
                this.hide();
            }, this.props.options.duration - animationDuration);
        }
    }
    render() {
        const { options, message, id } = this.props;
        return (React.createElement(Animated.View, { style: [styles.container, {
                    bottom: this.state.position
                }] },
            React.createElement(TouchableOpacity, { activeOpacity: 1, style: styles.wrapper, onPress: () => {
                    this.hide();
                    setTimeout(() => {
                        Toast.hideByid(id);
                    }, animationDuration);
                } },
                React.createElement(View, { style: styles.icon }, renderIcon(options.type)),
                React.createElement(Text, { style: styles.message }, "message"))));
    }
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    wrapper: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Colors.toastBackground,
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1
    },
    message: {
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: FontSizes.toastMessage,
        color: Colors.toastText
    },
    icon: {
        alignSelf: 'center'
    }
});
const renderIcon = (type) => {
    if (type === ToastTypes.PROGRESS) {
        return (React.createElement(ActivityIndicator, { style: { alignSelf: 'center' } }));
    }
    else if (type === ToastTypes.ERROR) {
    }
    else if (type === ToastTypes.WARNING) {
    }
    else if (type === ToastTypes.SUCCESS) {
    }
    else if (type === ToastTypes.INFO) {
    }
    else {
        return React.createElement(View, null);
    }
};
