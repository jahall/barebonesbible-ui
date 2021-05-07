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
              <p className="modal-section"><span className="modal-key">Strongs:</span> {meta.def} &mdash; {meta.kjv} &mdash; {meta.deriv}</p>
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