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
      let className = this.getClass();
      text = (
        <span
          className={className}
          onClick={(e) => this.props.handleClick(e, strongs)}
          onMouseEnter={() => this.props.handleHover(strongs)}
          onMouseLeave={() => this.props.handleHover([])}
        >{text}
        </span>
      );
      text = <button>{text}</button>;
    }
    return <span className={"token-" + type}>{text}</span>;
  }

  getClass() {
    let strongs = this.props.strongs;
    if (strongs.some(code => this.props.clickedCodes.includes(code))) {
      return "box token-clicked";
    } else if (strongs.some(code => this.props.hoveredCodes.includes(code))) {
      return "box token-hovered";
    } else {
      return "";
    }
  }
}
  
export default Token;