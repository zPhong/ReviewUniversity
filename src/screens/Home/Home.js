import * as React from 'react';
import { logo } from '../../assets';
import './css/Home.css';

const Title = 'Review trường đại học';
class Home extends React.Component {
  renderHeader = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-0">
        <a className="navbar-brand" href="#">
          <img src={logo} className="rounded mx-auto d-block Logo" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link active" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="#">
              Features
            </a>
            <a className="nav-item nav-link" href="#">
              Pricing
            </a>
            <a
              className="nav-item nav-link disabled"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </div>
        </div>
      </nav>
    );
  };

  renderTitle = () => {
    return (
      <div className="Title">
        <h2 className="font-weight-bold text-light mb-5">{Title}</h2>
        <form className="mb-3">
          <div className="form-row TitleForm">
            <div className="d-flex flex-fill">
              <input
                type="text"
                className="form-control h-100"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
            </div>
            <div className="col-auto px-0">
              <button
                className="btn btn-danger"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div className="Container">
        <div className="px-3 bg-dark pb-1">
          {this.renderHeader()}
          {this.renderTitle()}
        </div>
      </div>
    );
  }
}

export default Home;
