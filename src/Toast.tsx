import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastContainer';
import { ViewStyle, TextStyle } from 'react-native';
import { ToastConfigurationHelper } from './config';

console.disableYellowBox = true;

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
    textProps?: TextStyle;
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
}

function mergeOptions(options: ToastOptions): ToastOptions {
    return Object.assign({}, defaultOptions, options);
}

export default class Toast extends Component<any, any>  {

    private static queue: Array<ToastSchedule> = [];

    fallBackTimeout: any;

    static configure(config: ToastConfiguration) {
        ToastConfigurationHelper.config = Object.assign({}, ToastConfigurationHelper.config, config);
    }

    /**
     * Hides a given toast
     */
    static hide = (toast: Toast & RootSiblings) => {
        setTimeout(() => {
            if (toast instanceof RootSiblings) {
                clearTimeout(toast.fallBackTimeout);
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
        const toast = Toast.queue.find(schedule => schedule.id === id);
        if (!toast) {
            console.warn('Toast not exists');
            return;
        }
        Toast.hide(toast);
    }

    /**
     * Update current toast with a new message, type or other options
     */
    static update = (toast: Toast & RootSiblings, message: string, type: ToastTypes, options?: ToastOptions) => {
        if (options && !(typeof options === 'object')) {
            console.warn('Toast options must be an object');
            return;
        }
        const newOptions = Object.assign({}, defaultOptions, options);

        if (toast instanceof RootSiblings) {
            clearTimeout(toast.fallBackTimeout);
            toast.update(<ToastContainer options={newOptions} message={message} id={toast.id} type={type}> </ToastContainer>);
            Toast.addTimeout(toast, toast.type, options.duration);
        } else {
            console.warn(`Toast.update expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
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

    private static addTimeout = (toast: Toast & RootSiblings, type: ToastTypes, duration: number) => {
        switch (type) {
            case ToastTypes.PROGRESS:
                // destroy progress timeout if the progress lasts more then 60 seconds
                toast.fallBackTimeout = setTimeout(() => {
                    Toast.hide(toast);
                }, 60000);
                break;
            default:
                // do not autoclose if duration set to 0
                if (duration) {
                    setTimeout(() => Toast.hide(toast), duration);
                }
                break;
        }

    }

    private static addToQueue = (message: string, options?: ToastOptions, type: ToastTypes = ToastTypes.TEXT, id: string = 'default') => {
        const newOptions = Object.assign({}, defaultOptions, options || {});
        const toastSchedule: ToastSchedule = {
            id: id,
            message: message,
            options: newOptions,
            type: type
        };
        Toast.queue.push(toastSchedule);
        if (Toast.queue.length === 1) {
            Toast.createToast(toastSchedule);
        }
    }

    private static createToast = (schedule: ToastSchedule) => {
        if (schedule.options && !(typeof schedule.options === 'object')) {
            console.warn('Toast options must be an object');
            return;
        }
        const toast = new RootSiblings(<ToastContainer
            options={schedule.options}
            message={schedule.message}
            id={schedule.id}
            type={schedule.type} />);
        toast.id = schedule.id;
        Toast.addTimeout(toast, schedule.type, schedule.options.duration);
        return toast;
    }

}

export {
    RootSiblings as Manager
};
