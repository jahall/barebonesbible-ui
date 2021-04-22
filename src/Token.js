import React from 'react';


class Token extends React.Component {
    render() {
      var strongs = this.props.strongs;
      var type = this.props.type;
      var text = this.props.text;
      text = <span onClick={(e) => this.props.handleClick(e, strongs)}>{text}</span>;
      if (this.props.clicked) {
        text = <span className="token-clicked">{text}</span>;
      }
      if (strongs) {
        text = <a href="#">{text}</a>;
      }
      return <span className={"token-" + type}>{text}</span>
    }
  }
  
  export default Token;