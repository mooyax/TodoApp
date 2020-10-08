import React from 'react';
import { Provider } from "react-redux";
import store from "./src/store";

import 'react-native-gesture-handler';
import NavigatorContainerComponent from './src/NavigatorContainerComponent';


export default () => {
    return (
      <Provider store={store}>
        <NavigatorContainerComponent />
      </Provider>
    )
}