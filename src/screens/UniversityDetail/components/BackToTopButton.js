import React from "react";
import './css/BackToTopButton.css';

class BackToTopButton extends React.Component {

  constructor() {
    super();
    this.state = {
      intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button title="Back to top"
              id="back-to-top"
              className="scroll"
              onClick={() => {
                this.scrollToTop();
              }}>
        <img src={'https://cdn2.iconfinder.com/data/icons/game-center-mixed-icons/512/arrow4.png'} className="rounded mx-auto d-block arrow-icon" alt="arrow" />
      </button>
    );
  }

}

export default BackToTopButton;