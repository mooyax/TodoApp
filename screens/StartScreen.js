import React from 'react';
import { View, Text, Button} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { I18n } from 'aws-amplify';
import Amplify from 'aws-amplify'; 
import config from '../aws-exports'; 
import { withAuthenticator } from 'aws-amplify-react-native'


config.Analytics={disabled:true}
Amplify.configure(config); 

const StartScreen=({navigation})=> {

    const { colors } = useTheme();
 

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text }}>スタートページ</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}

export const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        type: 'string',
        displayOrder: 1,
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        type: 'string',
        displayOrder: 2,
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        type: 'password',
        displayOrder: 3,
      },
    ]
  };

export default withAuthenticator(StartScreen,false, [], null, null, signUpConfig); 

const dict = {
    'ja': {
      'Back to Sign In': 'サインイン画面に戻る',
      'Confirm': '確認',
      'Confirmation Code': '検証コード',
      'Confirm a Code': '検証コードの確認',
      'Confirm Sign Up': 'アカウントの検証',
      'Create a new account': 'アカウントの新規登録',
      'Email': 'メールアドレス',
      'Enter your confirmation code': '検証コードを入力してください',
      'Enter your new password': '新しいパスワードを入力してください',
      'Enter your password': 'パスワードを入力してください',
      'Enter your username': 'ユーザー名を入力してください',
      'Forgot Password': 'パスワードをお忘れの方 ',
      'Hello': 'こんにちは ',
      'Password': 'パスワード',
      'Password cannot be empty': 'パスワードは必須入力です',
      'Phone Number': '電話番号',
      'Please Sign In / Sign Up': 'サインインまたは新規登録をしてください',
      'Resend code': '検証コードの再送',
      'Send': '検証コードの送信',
      'Sign In': 'サインイン',
      'Sign Out': 'サインアウト',
      'Sign Up': 'アカウントの新規登録',
      'Sign in': 'サインイン',
      'Sign in to your account': 'サインイン -STV',
      'Submit': '実行',
      'User does not exist': 'ユーザーが存在しません',
      'Username': 'ユーザー名',
      'Username cannot be empty': 'ユーザー名は必須入力です',
      'Username/client id combination not found.': 'ユーザー名が見つかりません',
    }
  };
  
  I18n.putVocabularies(dict);
  I18n.setLanguage('ja');