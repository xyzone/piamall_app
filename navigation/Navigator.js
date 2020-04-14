import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = (site_navi) => {
    navigator = site_navi
}

export const navigateTo = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate(
            {
                routeName,
                params
            }
        )
    )
}