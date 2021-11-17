import React  from 'react';
import { View, Text, } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '../actions/actionCreators';


// 選択肢の定義
const buttons  = {
   "ライト":"light", "ダーク":"dark", "システム":"auto"
};


const SettingsScreen=()=> {
    const theme = useSelector(state => state.todos.currentTheme);
    const selectedIndex = Object.values(buttons).indexOf(theme);
    const {colors} = useTheme();

    const dispatch = useDispatch();


    const updateIndex = (selectedIndex) => {

        dispatch(Actions.themeSettings(Object.values(buttons)[selectedIndex]));
    };



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: colors.text }}>SettingPage</Text>
            <Text style={{ color: colors.text }}>個人属性の設定ページ</Text>

        <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={Object.keys(buttons)}      
         />
      </View>
    );
}


export default SettingsScreen;