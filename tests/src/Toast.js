import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastContainer';
export var ToastTypes;
(function (ToastTypes) {
    ToastTypes["PROGRESS"] = "PROGRESS";
    ToastTypes["ERROR"] = "ERROR";
    ToastTypes["WARNING"] = "WARNING";
    ToastTypes["SUCCESS"] = "SUCCESS";
    ToastTypes["DIALOG"] = "DIALOG";
    ToastTypes["INFO"] = "INFO";
})(ToastTypes || (ToastTypes = {}));
const defaultOptions = {
    type: ToastTypes.PROGRESS,
    duration: 2000,
    transparent: true,
    closable: false,
    animationType: 'slide',
    backdrop: true
};
let fallBackTimeout;
class Toast extends Component {
}
Toast.toasts = {};
Toast.showInfo = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.INFO }));
    return Toast.show(message, newOptions);
};
Toast.showProgress = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.PROGRESS }));
    return Toast.show(message, newOptions);
};
Toast.showWarning = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.WARNING }));
    return Toast.show(message, newOptions);
};
Toast.showError = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.ERROR }));
    return Toast.show(message, newOptions);
};
Toast.showSuccess = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.SUCCESS }));
    return Toast.show(message, newOptions);
};
Toast.showDialog = (message, options) => {
    const newOptions = Object.assign({}, defaultOptions, Object.assign({}, options, { type: ToastTypes.DIALOG }));
    return Toast.show(message, newOptions);
};
Toast.addTimeout = (toast, options) => {
    switch (options.type) {
        case ToastTypes.PROGRESS:
            fallBackTimeout = setTimeout(() => {
                toast.destroy();
            }, 60000);
            break;
        case ToastTypes.DIALOG:
            break;
        default:
            if (options.duration) {
                setTimeout(() => toast.destroy(), options.duration);
            }
            break;
    }
};
Toast.show = (message, options, id = 'default') => {
    if (options && !(typeof options === 'object')) {
        console.warn('Toast options must be an object');
        return;
    }
    const newOptions = Object.assign({}, defaultOptions, options || {});
    if (!!Toast.toasts[id]) {
        return Toast.toasts[id];
    }
    const toast = new RootSiblings(React.createElement(ToastContainer, { options: newOptions, message: message, id: id }, " "));
    toast.id = id;
    Toast.addTimeout(toast, newOptions);
    Toast.toasts[id] = toast;
    return toast;
};
Toast.hide = (toast) => {
    setTimeout(() => {
        if (toast instanceof RootSiblings) {
            clearTimeout(fallBackTimeout);
            toast.destroy();
            Toast.toasts[toast.id] = null;
        }
        else {
        }
    }, 0);
};
Toast.hideByid = (id) => {
    const toast = Toast.toasts[id];
    if (!toast) {
        return;
    }
    setTimeout(() => {
        if (toast.destroy !== undefined) {
            clearTimeout(fallBackTimeout);
            toast.destroy();
            Toast.toasts[toast.id] = null;
            console.log('Did hide toast with id', id);
        }
        else {
        }
    }, 0);
};
Toast.update = (toast, message, options) => {
    const newOptions = Object.assign({}, defaultOptions, options);
    if (toast instanceof RootSiblings) {
        clearTimeout(fallBackTimeout);
        toast.update(React.createElement(ToastContainer, { options: newOptions, message: message, id: toast.id }, " "));
        Toast.addTimeout(toast, newOptions);
    }
    else {
        console.warn(`Toast.update expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
    }
};
export { RootSiblings as Manager };
export default Toast;
