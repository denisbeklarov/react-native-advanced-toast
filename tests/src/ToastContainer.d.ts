/// <reference types="react" />
import { Animated } from 'react-native';
import React from 'react';
import { ToastOptions } from './Toast';
export declare type ToastContainerProps = {
    message: string;
    options: ToastOptions;
    id: string;
};
export declare type ToastContainerState = {
    position: Animated.Value;
};
export default class ToastContainer extends React.Component<ToastContainerProps, ToastContainerState> {
    constructor(props: ToastContainerProps);
    componentDidMount(): void;
    hide: () => void;
    render(): JSX.Element;
}
