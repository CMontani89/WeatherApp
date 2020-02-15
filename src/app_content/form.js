import React from "react";
import "./form.css";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined
    };
  }

  cityInput = e => {
    this.setState({
      city: e.target.value
    });
  };

  country = e => {
    this.setState({
      country: e.target.value
    });
  };

  loadWeather = e => {
    this.props.loadWeather(e, this.state.city, this.state.country);
  };

  render() {
    return (
      <div className="container ">
        <div className="row form">
          <div className="col-md-3 offset-md-2">
            <input
              onBlur={this.cityInput}
              type="text"
              className="form-control"
              name="city"
              autoComplete="off"
              placeholder="City"
            ></input>
          </div>
          <div className="col-md-3">
            <input
              onBlur={this.country}
              type="text"
              className="form-control"
              name="country"
              autoComplete="off"
              placeholder="Country"
            ></input>
          </div>
          <div className="col-md-3 mt-md-0 text-md-left">
            <button className="btn btn-warning" onClick={this.loadWeather}>
              Get Weather
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
