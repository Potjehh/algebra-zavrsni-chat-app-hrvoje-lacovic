import React, { Component } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import './App.css';

//nasumicno ime, boja i zivotinja
function randomName() {
  const adjectives = ['Half', 'Deserted', 'Steep', 'United', 'Useless', 'Suitable', 'Foamy', 'Unhappy', 'Educated', 'Grouchy', 'Oceanic', 'Seemly', 'Drunk', 'Utter', 'Traditional', 'Fat', 'Brown', 'Asleep', 'Flat', 'Thin', 'Sweltering', 'Well-off', 'Horrible', 'Hideous', 'Jable', 'Existing', 'Lamentable', 'Classy', 'Abaft', 'Equable', 'Immense', 'Immediate', 'Adaptable', 'Synonymous', 'Panicky', 'Chunky', 'Jagged', 'Aspiring', 'Sweet', 'Obtainable', 'Female', 'Cagey'];
  const nouns = ['statement', 'housing', 'wealth', 'month', 'marriage', 'investment', 'chapter', 'woman', 'chest', 'delivery', 'bonus', 'direction', 'signature', 'aspect', 'teacher', 'ability', 'passion', 'entertainment', 'music', 'dinner', 'year', 'village', 'world', 'employee', 'error', 'assumption', 'childhood', 'college', 'economics', 'football', 'writer', 'passenger', 'income', 'hat', 'desk', 'politics', 'chemistry', 'population', 'cell', 'difference', 'editor', 'obligation', 'boyfriend', 'girlfriend', 'solution', 'loss', 'photo', 'hair', 'session', 'length', 'operation'];
  const animal = ['horse', 'panda', 'rabbit', 'dog', 'cat', 'mouse', 'elephant', 'bear', 'hippopotamus', 'raccoon'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const spiritAnimal = animal[Math.floor(Math.random() * animal.length)]
  const name = adjective + ' ' + noun + ' ' + spiritAnimal;
  return { name, spiritAnimal };
}

function randomColor() {
  let color;
  do {
    color = '#' + (Math.floor(Math.random() * 0xFFFFFF).toString(16)).padStart(6, '0');
  } while (color === '#b5edf3');
  return color;
} //nasumicna boja ali izbjegava da postavi istu nasumicnu boju korisniku kao boju pozadine aplikacije radi bolje preglednosti dodan do while u slucaju da nasumicna boja ispadne ista kao pozadinska

class App extends Component {
  constructor(props) {
    super(props);
    const memberName = randomName();
    this.state = {
      messages: [],
      member: {
        username: memberName.name,
        color: randomColor(),
        avatar: memberName.spiritAnimal /* odabir avatara po dodijeljenoj zivotinji*/
      }
    }
  }

  //poziv na scaledrone room 
  componentDidMount() {
    this.drone = new window.Scaledrone("nh7Bahgldn3RdBo9", {
      data: this.state.member
    });

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-Potjeh");

    room.on('data', (data, member) => {
     
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }
 //slanje poruka, dodan if da izbjegne error koji bi izbacila prazna poruka, sprjecava slanje prazne poruke
  onSendMessage = (message) => {
    if(message.trim() === ""){
      return;
    }
    this.drone.publish({
      room: "observable-Potjeh",
      message
    });
  }

  render() {
    return (
      <div className="App">
      <h1 className="nazivChatApp"> Hrvoje Chat App </h1>
        <Messages messages={this.state.messages} currentMember={this.state.member} />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;

