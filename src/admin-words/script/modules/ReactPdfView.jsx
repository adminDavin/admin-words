import { Document, Page, setOptions } from "react-pdf/build/entry.webpack";
import React, { Component } from "react";

setOptions({
  cMapUrl: "cmaps/",

  cMapPacked: true
});

class ReactPdfView extends Component {
  state = {
    file: "java-se-product-editions-397069.pdf",
    numPages: null
  };
  onFileChange = event => {
    this.setState({ file: event.target.file[0] });
  };
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { file, numPages } = this.state;
    return (
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>

        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>&nbsp;
            <input type="file" onChange={this.onFileChange} />
          </div>

          <div className="Example__container__document">
            <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
              {Array.from(
                new Array(numPages),

                (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                )
              )}
            </Document>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactPdfView;
