import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Link, withRouter } from "react-router-dom";


class TokenModal extends React.Component {
  constructor(props) {
    super(props);
    this.refToUrl = this.refToUrl.bind(this);
  }

  render() {
    const strongsLookup = this.props.strongsLookup;
    if (strongsLookup === null) {
      return <></>;
    }
    var parts = [];
    var isFirst = true;
    for (const code of this.props.clickedCodes) {
      let lan = (code.startsWith("H")) ? "hebrew" : "greek";
      let meta = strongsLookup[lan][code];
      if (meta !== undefined) {
        var occurPhrase;
        if (meta.count === 1) {
          occurPhrase = <>Occurs <strong><Link to={"/strongs/" + code}>only once</Link></strong>; see {this.refToUrl(meta.refs[0])}</>;
        } else {
          occurPhrase = (
            <>
              Occurs <strong><Link to={"/strongs/" + code}>{meta.count} times</Link></strong>; first occurrences can be found
              in {this.joinList(meta.refs.map(this.refToUrl))}
            </>
          );
        }
        let def = this.makeCleverDef(meta)
        let part = (
          <span key={code}>
            <Modal.Header closeButton={isFirst}>
              <Modal.Title>
                <span className="sid">({code})</span>&nbsp;
                <span className={lan}>{meta.lemma}</span> &ndash;&nbsp;
                <span className="translit">{meta.tlit}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="modal-section"><span className="modal-key">Definition:</span> {def}</p>
              <p className="modal-section"><span className="modal-key">References:</span> {occurPhrase}</p>
            </Modal.Body>
          </span>
        );
        parts.push(part);
        isFirst = false;
      }
    }
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        {parts}
      </Modal>
    );
  }

  makeCleverDef(meta) {
    let def1 = meta.def.replace(/[.;]\s*$/, "");
    let def2 = meta.kjv.replace(/[.;]\s*$/, "");
    let deriv = meta.deriv.replace(/[.;]\s*$/, "");
    let sep = <>&mdash;</>;
    let badDef1 = def1.startsWith("[") || def1.startsWith("(")|| def1.startsWith("properly");
    let badDef2 = def2.startsWith("[") || def2.startsWith("(")|| def2.startsWith("properly");
    if ((badDef1 || def2.length < def1.length) && !badDef2) {
      /* Hack from https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript */
      def2 = [def1, def1 = def2][0];
    }
    let firstBit = def1.split(/[,(;]/, 1)[0];
    let secondBit = def1.substring(firstBit.length);
    if (firstBit.length < 30 && !firstBit.includes("[")) {
      return <><strong>{firstBit}</strong>{secondBit} {sep} {def2} {sep} {deriv}</>;
    } else {
      return <>{def1} {sep} {def2} {sep} {deriv}</>;
    }
  }

  refToUrl(ref) {
    let [book, c, v] = ref.split(".");
    let cv = c + "." + v;
    let url = "/books/" + book + "/" + cv + "/" + cv
    return (
      <Link
        key={ref}
        className="ref"
        to={url}
        onClick={this.props.handleClose}
      >{book} {c}:{v}</Link>
    );
  }

  joinList(refs) {
    if (refs.length === 1) {
      return refs[0]
    }
    var padded = [refs[0]];
    for (let i = 1; i < refs.length; i++) {
      let sep = (i < refs.length - 1) ? ", " : " and ";
      padded.push(sep);
      padded.push(refs[i]);
    }
    return padded;
  }
}
  
export default withRouter(TokenModal);