import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastContainer';
import { ViewStyle, TextStyle } from 'react-native';
import { ToastConfigurationHelper } from './config';

export enum ToastTypes {
    PROGRESS = 'PROGRESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    TEXT = 'TEXT'
}

export interface ToastConfiguration {
    animationTime?: number;
    renderInfoIcon?: () => JSX.Element;
    renderSuccessIcon?: () => JSX.Element;
    renderWarningIcon?: () => JSX.Element;
    renderErrorIcon?: () => JSX.Element;
    renderActivityIndicator?: () => JSX.Element;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    actionButtonStyle?: ViewStyle;
    actionButtonTextStyle?: TextStyle;
    actionButtonTextCapitalize?: boolean;
}

export interface ToastOptions {
    duration?: number;
    closable?: boolean;
    textStyles?: TextStyle;
    containerStyle?: ViewStyle;
    actionButtonText?: string;
    actionButtonStyle?: ViewStyle;
    actionButtonTextStyle?: TextStyle;
    actionButtonOnPress?: () => any;
    renderCustomIcon?: () => JSX.Element;
}

const defaultOptions: ToastOptions = {
    duration: 2000,
    closable: true
};

interface ToastSchedule {
    id?: string;
    message: string;
    options: ToastOptions;
    type: ToastTypes;
    toast?: Toast & RootSiblings;
}

function mergeOptions(options: ToastOptions): ToastOptions {
    if (options && !(typeof options === 'object')) {
        console.warn('Toast options must be an object');
        return defaultOptions;
    }
    return Object.assign({}, defaultOptions, options);
}

export default class Toast extends Component<any, any>  {

    private static queue: Array<ToastSchedule & RootSiblings> = [];

    static configure(config: ToastConfiguration) {
        ToastConfigurationHelper.config = Object.assign({}, ToastConfigurationHelper.config, config);
    }

    /**
     * Hides a given toast
     */
    static hide = (toast: Toast & RootSiblings) => {
        if (!toast) {
            return;
        }
        setTimeout(() => {
            if (toast instanceof RootSiblings) {
                toast.destroy();
                Toast.removeScheduleFromQueue(toast.id);
                if (Toast.queue.length > 0) {
                    Toast.createToast(Toast.queue[0]);
                }
            } else {
                console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
            }
        }, 0);
    }

    /**
     * Hides toast by its id
     */
    static hideById = (id: string) => {
        const scheduled = Toast.queue.find(schedule => schedule.id === id);
        if (!scheduled) {
            return;
        }
        Toast.hide(scheduled.toast);
    }

    /**
     * Update current toast with a new message, type or other options
     */
    static update = (toast: Toast & RootSiblings, message: string, options?: ToastOptions, type?: ToastTypes) => {
        if (!toast) {
            console.warn('Toast can not be undefined');
        }
        let scheduled: ToastSchedule = Toast.queue.find(schedule => schedule.id === toast.id);
        if (scheduled && scheduled.toast instanceof RootSiblings) {
            scheduled.toast
                .update(<ToastContainer options={mergeOptions(options)} message={message} id={scheduled.id} type={type || scheduled.type}>
                </ToastContainer>);
        } else if (scheduled && !scheduled.toast) {
            scheduled.message = message;
            scheduled.options = mergeOptions(options);
            scheduled.type = type;
        } else {
            console.warn(`Toast is not in the queue any more`);
        }
    }

    /**
     * Update toast with given id
     */
    static updateById = (id: string, message: string, options?: ToastOptions, type?: ToastTypes) => {
        let scheduled: ToastSchedule = Toast.queue.find(schedule => schedule.id === id);
        if (scheduled && scheduled.toast) {
            Toast.update(scheduled.toast, message, options, type);
        } else {
            console.warn(`Toast is not in the queue any more`);
        }
    }

    static showInfo = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.INFO, id);
    }

    static show = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.TEXT, id);
    }

    static showProgress = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.PROGRESS, id);
    }
    static showWarning = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.WARNING, id);
    }
    static showError = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.ERROR, id);
    }
    static showSuccess = (message: string, options?: ToastOptions, id?: string) => {
        return Toast.addToQueue(message, mergeOptions(options), ToastTypes.SUCCESS, id);
    }

    private static removeScheduleFromQueue(id: string) {
        Toast.queue = Toast.queue.filter(schedule => schedule.id !== id);
    }

    private static addToQueue = (message: string, options?: ToastOptions, type: ToastTypes = ToastTypes.TEXT, id: string = 'default') => {
        const toastSchedule: ToastSchedule = {
            id: id,
            message: message,
            options: mergeOptions(options),
            type: type
        };
        let scheduled = Toast.queue.find(schedule => schedule.id === id);
        scheduled ? scheduled = Object.assign(scheduled, toastSchedule) : Toast.queue.push(toastSchedule);
        if (Toast.queue.length === 1 && !Toast.queue[0].toast) {
            Toast.createToast(toastSchedule);
        }
    }

    private static createToast = (schedule: ToastSchedule) => {
        const toast = new RootSiblings(<ToastContainer
            options={schedule.options}
            message={schedule.message}
            id={schedule.id}
            type={schedule.type} />);
        toast.id = schedule.id;
        schedule.toast = toast;
        return toast;
    }

}

export {
    RootSiblings as Manager
};
