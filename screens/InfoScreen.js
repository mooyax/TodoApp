import React from 'react';
import { View, Text, } from 'react-native';
import { useTheme } from '@react-navigation/native';

const InfoScreen=()=> {

    const { colors } = useTheme();
 

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text }}>todoの説明ページ</Text>
        </View>
    );
}

export default InfoScreen; 