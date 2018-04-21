import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ToastConfiguration } from './Toast';
/**
 * Class for configuring Toast to not expose configuration to public
 * It makes configuartion readonly for public users
 */
export class ToastConfigurationHelper {
    static config: ToastConfiguration = {
        animationTime: 500,
        actionButtonTextCapitalize: true,
        renderActivityIndicator: () => <ActivityIndicator style={{ alignSelf: 'center' }} />
    };
}