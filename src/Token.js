import React from 'react';


class Token extends React.Component {
    render() {
      var code = this.props.code;
      var type = this.props.type;
      var text = this.props.text;
      text = <span onClick={(e) => this.props.handleClick(e, code)}>{text}</span>;
      if (this.props.clicked) {
        text = <span className="token-clicked">{text}</span>;
      }
      if (code) {
        text = <a href="#">{text}</a>;
      }
      return <span className={"token-" + type}>{text}</span>
    }
  }
  
  export default Token;