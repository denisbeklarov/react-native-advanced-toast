/// <reference types="react" />
import { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
export declare enum ToastTypes {
    PROGRESS = "PROGRESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    SUCCESS = "SUCCESS",
    DIALOG = "DIALOG",
    INFO = "INFO",
}
export interface ToastOptions {
    type?: ToastTypes;
    duration?: number;
    transparent?: boolean;
    closable?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    backdrop?: boolean;
}
declare class Toast extends Component<any, any> {
    static toasts: {
        [key: string]: Toast & RootSiblings;
    };
    id: number;
    static showInfo: (message: string, options?: ToastOptions) => any;
    static showProgress: (message: string, options?: ToastOptions) => any;
    static showWarning: (message: string, options?: ToastOptions) => any;
    static showError: (message: string, options?: ToastOptions) => any;
    static showSuccess: (message: string, options?: ToastOptions) => any;
    static showDialog: (message: string, options?: ToastOptions) => any;
    static addTimeout: (toast: any, options?: ToastOptions) => void;
    static show: (message: string, options?: ToastOptions, id?: string) => any;
    static hide: (toast: any) => void;
    static hideByid: (id: string) => void;
    static update: (toast: any, message: string, options: ToastOptions) => void;
}
export { RootSiblings as Manager };
export default Toast;
