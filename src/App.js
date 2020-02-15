/* eslint-disable no-duplicate-case */
import React from "react";
import Weather from "./app_content/weatherComponent";
import "./css/App.css";
import Form from "./app_content/form";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

//api call api.openweathermap.org/data/2.5/weather?q=London,uk

const API_KEY = "410463b3935acea56c8171825dbb4440";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      icon: undefined,
      main: undefined,
      farenheit: undefined,
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calculateFarenheit(temp) {
    let far = (temp - 273.15) * 1.8;
    let finalFarenheit = Math.floor(far + 32);
    return finalFarenheit;
  }

  getWeatherIcon(icons, rangeID) {
    // eslint-disable-next-line default-case
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async (e, _city, _country) => {
    e.preventDefault();

    const city = _city;
    const country = _country;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );

    const response = await api_call.json();
    console.log(response);
    this.setState({
      city: response.name,
      country: response.sys.country,
      temp_min: this.calculateFarenheit(response.main.temp_min),
      temp_max: this.calculateFarenheit(response.main.temp_max),
      farenheit: this.calculateFarenheit(response.main.temp),
      description: response.weather[0].description
    });

    this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
  };
  render() {
    return (
      <div className="App">
        <Form
          loadWeather={this.getWeather}
          cityTextUpdated={this.cityTextUpdated}
          countryTextUpdated={this.countryTextUpdated}
        />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          farenheit={this.state.farenheit}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
