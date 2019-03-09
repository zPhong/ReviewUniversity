import * as React from 'react';
import './css/AutoCompleteTextInput.css';

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      value: ''
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const {
      currentTarget: { value }
    } = e;
    const newValue = value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(newValue.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      value: newValue
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        showSuggestions: false,
        value: filteredSuggestions[activeSuggestion]
      });
    }
  };

  onBlur = () => {
    this.setState({ showSuggestions: false });
  };

  renderSuggestionList = () => {
    const { filteredSuggestions, showSuggestions, value } = this.state;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        return (
          <ul className="suggestions">
            {filteredSuggestions.map(suggestion => {
              return <li key={suggestion}>{suggestion}</li>;
            })}
          </ul>
        );
      }
      return (
        <div className="no-suggestions">
          <em>Không có kết quả !!</em>
        </div>
      );
    }
    return null;
  };

  render() {
    const { onChange, onKeyDown } = this;
    const { value } = this.state;
    return (
      <React.Fragment>
        <div className="w-100 h-100 p-0" style={{ overflow: 'visible' }}>
          <div className="row" style={{ flex: 1 }}>
            <span className="glyphicon glyphicon-search" />
            <input
              type="text"
              onBlur={this.onBlur}
              className="form-control h-100 border-0"
              placeholder="Tìm theo tên trường đại học / cao đẳng"
              aria-label="Tìm theo tên trường đại học / cao đẳng"
              aria-describedby="button-addon2"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={value}
            />
            {this.renderSuggestionList()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
