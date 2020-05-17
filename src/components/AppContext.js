import React from 'react';

export const AppContext = React.createContext({
    appBarTitle: 'Corvid-19 Tracker',
    updateAppBarTitle: () => {},
    fetchCounties: () => {}
});