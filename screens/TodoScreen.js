
import React, { useState, useCallback, } from 'react';
import { 
  StyleSheet, 
  View, 
  StatusBar, 
  Platform,
  KeyboardAvoidingView, 
  TouchableOpacity,
  Animated,
} from 'react-native';

import {  FlatList, } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useTheme } from '@react-navigation/native';

import {
  SearchBar,
  Input,
  Button,
  ListItem,
} from 'react-native-elements';


import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


const AnimatedIcon = Animated.createAnimatedComponent(Icon2);

import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useDispatch, useSelector } from "react-redux";
import { Actions } from '../actions/actionCreators';


const HEADER_HEIGHT = 44;
const STATUSBAR_HEIGHT = getStatusBarHeight();

const TODO = "@todoapp.todo"

const TodoItem = (props) => {
  let icon = null
  if (props.done === true) {
    icon = <Icon2 name="done" color={props.iconColor} />
  }
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <ListItem
        title={props.title}
        titleStyle={props.titleStyle}
        rightIcon={icon}
        bottomDivider
        containerStyle={props.containerStyle}
      />
    </TouchableOpacity>
  )
}



const TodoScreen = () => {


  const [inputText, setInputText] = useState("")
  const [filterText, setFilterText] = useState("")
  const [refsArray, setRefsArray] = useState([])

  const dispatch = useDispatch();

  const  todos = useSelector(state => state.todos.todos);
   // ステートをグローバルストアから取り出す
 
   const {colors} = useTheme();

   
  //uncheckTodoItem = () => {
  //  return this.props.todos.length
  //}

 /*
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.todo != nextState.todo){
      return true
    }
    if(this.state.inputText == "" && nextState.inputText == "" && this.state.filterText == "" && nextState.filterText == ""){
      return false
    }
    return true
  }
 */

  const onAddItem = useCallback(() => {

    const title = inputText
    if (title == "") {
      return
    };
    dispatch(Actions.todoAdd(title));
    setInputText("");

  },[inputText,dispatch]);


  const onDeleteItem = useCallback((todoItem) => { 
    dispatch(Actions.todoDelete(todoItem));
  },[dispatch]);

  const onTapTodoItem = useCallback((todoItem) => {
    dispatch(Actions.todoToggle(todoItem));
  },[dispatch]);

  const renderRightActions = (progress, todoItem) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 1],
    });

    const pressHandler = () => {
      close(todoItem);
      dispatch(Actions.todoDelete(todoItem));
    };

    return (
      <Animated.View > 
        <AnimatedIcon
          name="delete"
          size={34}
          color="#f00"
          style={[styles.actionIcon]}
          onPress={pressHandler}
        /> 
      </Animated.View> 
    );
  };

  close = (todoItem) => {
    refsArray[todoItem.index].close();
  };

  let todo = todos
  if (filterText !== "") {
    todo = todo.filter(t => t.title.includes(filterText))
  }

  const platform = Platform.OS == 'ios' ? 'ios' : 'android'
  return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({
          ios: HEADER_HEIGHT+ 44, // iOS
          android:HEADER_HEIGHT + StatusBar.currentHeight, // android 
        })}
        >    
        <SearchBar
          platform={platform}
          cancelButtonTitle="Cancel"
          onChangeText={(text) => setFilterText(text)}
          onClear={() => setFilterText("")}
          value={filterText}
          placeholder="Type filter text"
          containerStyle={{backgroundColor: colors.background,color:colors.text}}
          inputStyle={{backgroundColor: colors.background,color:colors.text}}
          inputContainerStyle={{backgroundColor: colors.card,color:colors.text}}
        />
        <FlatList
          data={todo}
          //extraData={state}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => 
            <Swipeable 
              ref={ref => refsArray[item.index] =ref}
              renderRightActions={(progress) => renderRightActions(progress,item)} 　
              friction={2}
              > 
              <TodoItem
                title={item.title}
                done={item.done}
                onTapTodoItem={() => onTapTodoItem(item)}
                containerStyle={{backgroundColor: colors.background,color:colors.text}}
                titleStyle={{color:colors.text}}
                iconColor={colors.text}
              />
            </Swipeable>
          }
          keyExtractor={(item, index) => "todo_" + item.index}
        />
        <View style={styles.input}>
          <Input
            onChangeText={(text) => setInputText(text)}
            inputStyle={{color: colors.text}}  
            value={inputText}
            containerStyle={styles.inputText}
            placeholder='input text'
          />
          <Button
            icon={
              <Icon
                name='pluscircle'
                size={30}
                color='#ff6347'
              />
            }
            title=""
            onPress={onAddItem}
            buttonStyle={styles.inputButton,{backgroundColor:colors.background}}
          />
        </View>
      </KeyboardAvoidingView>
  );
}

export default TodoScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    paddingTop: STATUSBAR_HEIGHT,
  },
  filter: {
    height: 30,
    flexDirection: "row",
  },
  separator: {
    //backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  todolist: {
    flex: 1
  },
  input: {
    ...ifIphoneX({
      paddingBottom: 30,
      height: 80
    },{
      height: 50,
    }),
    //height: 70,
    flexDirection: "row",
    paddingRight: 10,
  },
  inputText: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  inputButton: {
    width: 48,
    height: 48,
    borderWidth: 0,
    //backgroundColor: "white"
  },
  todoItem: {
    fontSize: 20,
    //backgroundColor: "white"
  },
  todoItemDone: {
    fontSize: 20,
    backgroundColor: "red",
  },
  actionIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});




