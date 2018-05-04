/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-advanced-toast';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

Toast.configure({
    renderInfoIcon: () => <Icon name='info-circle' size={20} color={'white'} />,
    renderErrorIcon: () => <Icon name='close' size={20} color={'red'} />,
    renderWarningIcon: () => <Icon name='warning' size={20} color={'yellow'} />,
    renderSuccessIcon: () => <Icon name='check' size={20} color={'green'} />
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title={'With action'}
                    onPress={() => {
                        Toast.show('Please enable notifications', {
                            duration: 0,
                            actionButtonOnPress: () => {
                                Toast.hideById('notification');
                            },
                            actionButtonText: 'Enable',
                            renderCustomIcon: () => <Icon name='bell' size={20} color={'white'} />
                        }, 'notification');
                    }}
                />
                <Button
                    title={'Plain text'}
                    onPress={() => {
                        Toast.show('Wow! Great results!', {}, 'plain');
                    }}
                />
                <Button
                    title={'Error'}
                    onPress={() => {
                        Toast.showError('We messed up!', {}, 'error');
                    }}
                />
                <Button
                    title={'Success'}
                    onPress={() => {
                        Toast.showSuccess('You have earned you first million! Congrats!', {}, 'success');
                    }}
                />
                <Button
                    title={'Progress'}
                    onPress={() => {
                        Toast.showProgress('Wait for our slow server...', { duration: 0 }, 'wait');
                    }}
                />
                 <Button
                    title={'Much text'}
                    onPress={() => {
                        Toast.showWarning('We know, that we schould NOT put much context inside the toast, still we may need it. So you have to read this now.', { duration: 3000 }, 'much_text');
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
