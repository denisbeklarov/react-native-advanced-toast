import { Text, View, StyleSheet, Animated, TouchableOpacity, Easing, Dimensions } from 'react-native';
import React from 'react';
import Toast, { ToastOptions, ToastTypes } from './Toast';
import { ToastConfigurationHelper } from './config';

export type ToastContainerProps = {
    message: string,
    options: ToastOptions,
    id: string
    type: ToastTypes
};

export type ToastContainerState = {
    positionBottom: Animated.Value;
    positionTop: Animated.Value;
    height: number;
    appearing: boolean;
};

const screenHeight = Dimensions.get('window').height;

export default class ToastContainer extends React.Component<ToastContainerProps, ToastContainerState> {

    private config = ToastConfigurationHelper.config;
    private animationDuration = this.config.animationTime;
    private hidingTimer: any;

    constructor(props: ToastContainerProps) {
        super(props);
        this.state = {
            positionBottom: new Animated.Value(0),
            positionTop: new Animated.Value(screenHeight),
            height: 0,
            appearing: true
        };
    }

    componentDidMount() {
        Animated.timing(this.state.positionTop, {
            toValue: this.state.height,
            duration: this.animationDuration,
            easing: Easing.elastic(0.1)
        }).start(() => {
            this.setState({
                appearing: false
            });
            this.updateHidingTimer();
        });
    }

    updateHidingTimer = (props: ToastContainerProps = this.props) => {
        clearTimeout(this.hidingTimer);
        if (props.options.duration && props.options.duration > this.animationDuration) {
            this.hidingTimer = setTimeout(() => {
                this.hide();
            }, props.options.duration - this.animationDuration);
        }
    }

    componentWillReceiveProps(props: ToastContainerProps) {
        this.updateHidingTimer(props);
    }

    hide = () => {
        clearTimeout(this.hidingTimer);
        Animated.timing(this.state.positionBottom, {
            toValue: -this.state.height,
            duration: this.animationDuration,
            easing: Easing.elastic(1)
        }).start(() => Toast.hideById(this.props.id));
    }

    setHeight(event) {
        this.setState({
            height: event.nativeEvent.layout.height
        });
    }

    render() {
        const { message } = this.props;
        const containerStyle = StyleSheet.flatten([styles.container, this.config.containerStyle, this.props.options.containerStyle]);
        const textMessageStyle = StyleSheet.flatten([styles.message, this.config.textStyle, this.props.options.textStyles]);
        return (
            <Animated.View style={[{
                bottom: this.state.appearing ? null : this.state.positionBottom,
                top: this.state.appearing ? this.state.positionTop : null
            }]}>
                <View style={containerStyle} onLayout={(event) => {
                    this.setHeight(event);
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.wrapper}
                        onPress={() => {
                            if (this.props.options.closable) {
                                this.hide();
                            }
                        }}>
                        <View style={styles.icon}>
                            {this.props.options.renderCustomIcon ? this.props.options.renderCustomIcon() : this.renderIcon(this.props.type)}
                        </View>
                        <Text style={textMessageStyle}>{message}</Text>
                        {this.renderActionButton()}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }

    private renderActionButton = () => {

        const { actionButtonText, actionButtonStyle, actionButtonTextStyle } = this.props.options;
        const buttonStyle = StyleSheet.flatten([styles.actionButton, this.config.actionButtonStyle, actionButtonStyle]);
        const textStyle = StyleSheet.flatten([styles.actionButtonText, this.config.actionButtonTextStyle, actionButtonTextStyle]);

        if (actionButtonText) {
            return <TouchableOpacity style={buttonStyle}
                onPress={this.props.options.actionButtonOnPress || null}>
                <Text style={textStyle}>
                    {this.config.actionButtonTextCapitalize ? actionButtonText.toUpperCase() : actionButtonText}
                </Text>
            </TouchableOpacity >;
        }
        return null;
    }

    private renderIcon = (type: ToastTypes) => {
        if (type === ToastTypes.PROGRESS) {
            return this.config.renderActivityIndicator ? this.config.renderActivityIndicator() : null;
        } else if (type === ToastTypes.ERROR) {
            return this.config.renderErrorIcon ? this.config.renderErrorIcon() : null;
        } else if (type === ToastTypes.WARNING) {
            return this.config.renderWarningIcon ? this.config.renderWarningIcon() : null;
        } else if (type === ToastTypes.SUCCESS) {
            return this.config.renderSuccessIcon ? this.config.renderSuccessIcon() : null;
        } else if (type === ToastTypes.INFO) {
            return this.config.renderInfoIcon ? this.config.renderInfoIcon() : null;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#37474F',
        alignSelf: 'stretch',
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    wrapper: {
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    message: {
        alignSelf: 'flex-start',
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        color: '#fff',
        margin: 10
    },
    icon: {
        alignSelf: 'center',
        marginRight: 10
    },
    actionButton: {
        marginLeft: 10,
        height: '100%',
        justifyContent: 'center'
    },
    actionButtonText: {
        color: '#64DD17',
        fontWeight: 'bold',
        fontSize: 16
    }
});
