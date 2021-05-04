import Modal from 'react-bootstrap/Modal';
import React from 'react';


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
          occurPhrase = <>Occurs only <strong>once</strong>; see {this.refToUrl(meta.refs[0])}</>;
        } else {
          occurPhrase = (
            <>
              Occurs <strong>{meta.count}</strong> times; first occurrences can be found
              in {this.joinList(meta.refs.map(this.refToUrl))}
            </>
          );
        }
        let part = (
          <>
            <Modal.Header closeButton={isFirst}>
              <Modal.Title>
                <span className="sid">({code})</span>&nbsp;
                <span className={lan}>{meta.lemma}</span> &ndash;&nbsp;
                <span class="translit">{meta.tlit}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="modal-section"><span className="modal-key">Strongs:</span> {meta.def}</p>
              <p className="modal-section"><span className="modal-key">KJV:</span> {meta.kjv}</p>
              <p className="modal-section"><span className="modal-key">Derivation:</span> {meta.deriv}</p>
              <p className="modal-section"><span className="modal-key">References:</span> {occurPhrase}</p>
            </Modal.Body>
          </>
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
    return <a key={ref} className="ref" href={url}>{book} {c}:{v}</a>
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
  
export default TokenModal;