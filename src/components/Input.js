import React from 'react';

class Input extends React.Component {
  state = {
    text: ''
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e)  {
    e.preventDefault();
    const message = this.state.text;
    if(message.trim() !== '') {
      this.setState({text: ''});
      this.props.onSendMessage(message);
    }
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message here"
            autoFocus={true}
          />
          <button>Pošalji</button>
        </form>
      </div>
    );
  }
}

export default Input;