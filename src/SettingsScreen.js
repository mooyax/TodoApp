import React from 'react';
import { View, Text, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>SettingPage</Text>
                <Text>個人属性の設定ページ</Text>
            </View>
        );
    }
}