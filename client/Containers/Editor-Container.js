import React, { Component } from 'react';
import io from 'socket.io-client';
import Editor from '../Components/Editor';
const socket = io('localhost:3000');
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class EditorContainer extends Component {
  // Temporarily placing socket logic inside this container component
  // Can move elsewhere when refactoring, but note that socket logic needs to be handled in a single place
  constructor() {
    super();
    this.state = {
      code: 'Start coding!',
      consoleOutput: 'Console output will display here',
      room: '',
      roomList: ['room1'], 
      roomInfo: [{room1: "hello we are exited"}]
    };
    // Listen for 'code sent from server'
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
    this.runCode = this.runCode.bind(this);
  }



  // emit 'room' event when component mounts
  componentDidMount() {
    socket.emit('room', { room: this.state.room }); 
    console.log("component mounted")
    fetch('http://localhost:3000/getRooms', {
      method: 'GET',
      headers: {'Content-Type':'application/json'}
    })
      .then(res => res.json())
      .then(data => {
        console.log("icecream", data)
        let roomListArray = [];
        let roomContents = [];
        for (let i = 0; i < data.length; i++){ 
          const { room_name, contents } = data[i];  
          roomListArray.push(room_name);
          roomContents.push({ room_name: contents })
        }
        this.setState({ roomList: roomListArray,
                        roonInfo: roomContents })
      })
      .catch(error => console.error(error))
  }


  // TODO: add logic for switching rooms (need to implement in UI first)
  // Use in editorDidMount?

  // Handle local state updates
  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.state.room,
      newCode: text
    });
  }

  handleClick(e) {
    const { value } = e.target;
    const { roomInfo } = this.state;
    for (let i = 0; i < roomInfo.length; i++){
      if (roomInfo[i][value]){
        const { contents } = roomInfo[i]
        this.setState({ code : contents })
        }
    }
  }

  // Update local state to match text input from other clients
  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode });
  }

  runCode(code) {
    this.setState({ consoleOutput: eval(code) }, () =>
      console.log(this.state.consoleOutput)
    );
  }

  // TODO: Update the state to match what other clients have already put there.
  render() {

    const options = this.state.roomList
 // const options = this.state.room
    const defaultOption = this.state.roomList[0];
    
 // -> should render the contents of the room that user chooses 
 // this.setState({code:   })  fetch requst again? to get the contents of the room
    return (
      <div>
        
        <h1>Current Room: {this.state.room}</h1>
        
        <Editor
          code={this.state.code}
          room={this.state.room}
          updateCodeinState={this.updateCodeinState.bind(this)}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
        <Dropdown options={options} onChange={this._onSelect} onClick={this.handleClick} value={defaultOption} placeholder="Select an option" />
      </div>
    );
  }
  }

export default EditorContainer;
