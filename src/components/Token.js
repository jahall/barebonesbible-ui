import React from 'react';


const toIgnore = [
  "and", "at", "be", "is", "has", "he", "her", "his", "my",
  "of", "on", "she", "the", "to", "were", "will", "would", "your",
];


class Token extends React.Component {
  render() {
    var strongs = this.props.strongs;
    var type = this.props.type;
    var text = this.props.text;
    var clickable = (typeof strongs !== 'undefined' && strongs.length > 0);
    if (toIgnore.includes(text.trim().toLowerCase())) {
      type = "o";
      clickable = false;
    }
    if (clickable) {
      text = <span onClick={(e) => this.props.handleClick(e, strongs)}>{text}</span>;
      if (strongs.some(code => this.props.clickedCodes.includes(code))) {
        text = <span className="token-clicked">{text}</span>;
      }
      text = <a href="#">{text}</a>;
    }
    return <span className={"token-" + type}>{text}</span>;
  }
}
  
export default Token;