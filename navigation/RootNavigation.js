import { NavigationActions } from 'react-navigation';
import * as React from 'react';
export const navigationRef = React.createRef(); 
 
export const navigateTo = (routeName, params) => {
    navigationRef.current?.navigate(routeName, params);
}