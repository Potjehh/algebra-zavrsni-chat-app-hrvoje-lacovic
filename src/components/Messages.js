import {Component} from "react";
import React from "react";
import { v4 } from 'uuid';
import * as animalImages from '../images';


class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="ListaPoruka">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }
  
  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const uniqueID = v4();
    const className = messageFromMe ?
      "Poruka-poruka TrenutniClan" : "Poruka-poruka";
    return (
      <li key={uniqueID} 
      className={className}>
        <span
          className="avatar"
          style={{backgroundColor: member.clientData.color}} >
             <img width={45} height={45} src={animalImages[member.clientData.avatar]} alt={`${member.clientData.avatar} avatar`} />
          </span>
     
        <div className="SadrzajPoruke">
          <div className="korisnickoIme">
            {member.clientData.username}
          </div>
          <div className="tekst" style={{backgroundColor: member.clientData.color}}>{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
