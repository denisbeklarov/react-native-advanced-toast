# React Native Advanced Toast

It is a simple javascript-only toast component for React Native.

Features:
* Queued toast notifications
* Multiple types of notifications
* Easy configuration

## Installation
```
npm install react-native-advanced-toast
```

## Import 
```
import Toast from 'react-native-advanced-toast';
```

## Configuration

```
Toast.configure({
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
});
```

## Usage

```
Toast.showInfo('My toast message');
Toast.showWarning('My toast message');
Toast.showSuccess('My toast message');
Toast.showError('My toast message');
Toast.showProgress('My toast message');
```

## Advanced usage

```
Toast.showInfo('My toast message', {...options}, 'customId');
```
Possible options:
```
 	duration?: number;
    closable?: boolean;
    textProps?: TextStyle;
Toast.showInfo('My toast message');    containerStyle?: ViewStyle;
    actionButtonText?: string;
    actionButtonStyle?: ViewStyle;
    actionButtonTextStyle?: TextStyle;
    actionButtonOnPress?: () => any;
    renderCustomIcon?: () => JSX.Element;
```

## Hide toast manually
```
Toast.hide(toast)
```
or 
```
Toast.hideById(toastId)
```

Example:
```
const toast = Toast.showInfo('My toast message');
Toast.hide(toast);
const toast2 = Toast.showSuccess('My toast message', {duration: 5000}, 'myAwesomeToast');
Toast.hideById('myAwesomeToast');
```

Thank you for using it!

Feel free to submit PRs.