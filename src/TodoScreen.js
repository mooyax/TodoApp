
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Platform,
  ScrollView, 
  //TextInput,
  //Button,
  AsyncStorage,
  KeyboardAvoidingView, 
  TouchableOpacity,
  Animated
} from 'react-native';

import {  FlatList, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
  SearchBar,
  Input,
  Button,
  ListItem,
} from 'react-native-elements';


import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


const AnimatedIcon = Animated.createAnimatedComponent(Icon2);

import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

import { connect } from 'react-redux'
import {addTodo, deleteTodo, toggleTodo } from './actionCreators'


const STATUSBAR_HEIGHT = getStatusBarHeight();

const TODO = "@todoapp.todo"

const TodoItem = (props) => {
  let icon = null
  if (props.done === true) {
    icon = <Icon2 name="done" right/>
  }
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <ListItem bottomDivider>
          {icon}
        <ListItem.Content>
            <ListItem.Title>{props.title}</ListItem.Title>
        </ListItem.Content>   
      </ListItem>
    </TouchableOpacity>
  )
}

class TodoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      filterText: "",
    }
  }



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

  onAddItem = () => {
    const title = this.state.inputText
    if (title == "") {
      return
    }
    console.log("ADD")
    this.props.addTodo(title)
    this.setState({
      inputText: ""
    })

  }

  onDeleteItem = (todoItem) => { 
    console.log("DELETE")
    this.props.deleteTodo(todoItem);
  }

  onTapTodoItem = (todoItem) => {
    console.log("TAP")
    this.props.toggleTodo(todoItem)
  }

  renderRightActions = (progress, todoItem) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    return (
      <RectButton onPress={console.log('renderRight_REctButton')}>
        <AnimatedIcon
          name="delete"
          size={34}
          color="#f00"
          style={[styles.actionIcon]}
        /> 
      </RectButton>
    );
  };


  render() {
    const filterText = this.state.filterText
    let todo = this.props.todos
    if (filterText !== "") {
      todo = todo.filter(t => t.title.includes(filterText))
    }

    const platform = Platform.OS == 'ios' ? 'ios' : 'android'



    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">    
        <SearchBar
          platform={platform}
          cancelButtonTitle="Cancel"
          onChangeText={(text) => this.setState({filterText: text})}
          onClear={() => this.setState({filterText: ""})}
          value={this.state.filterText}
          placeholder="Type filter text"
        />
        <FlatList
          data={todo}
          extraData={this.state}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => 
            <Swipeable 
              renderRightActions={(progress) => this.renderRightActions(progress,item)} 
              > 
              <TodoItem
                title={item.title}
                done={item.done}
                onTapTodoItem={() => this.onTapTodoItem(item)}
              />
            </Swipeable>
          }
          keyExtractor={(item, index) => "todo_" + item.index}
        />
        <View style={styles.input}>
          <Input
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
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
            onPress={this.onAddItem}
            buttonStyle={styles.inputButton}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo(text) {
      dispatch(addTodo(text))
    },
    toggleTodo(todo) {
      dispatch(toggleTodo(todo))
    },
    deleteTodo(todo) {
      dispatch(deleteTodo(todo))
    }
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  filter: {
    height: 30,
    flexDirection: "row",
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
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
    backgroundColor: "white"
  },
  todoItem: {
    fontSize: 20,
    backgroundColor: "white"
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


