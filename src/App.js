import React, { Component } from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_KEY = '6351dad7ec9d4c4f9f03bab9b5180c38';
const STATION_URL = 'https://api.wmata.com/Rail.svc/json/jStations?';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectOrigin = this.onSelectOrigin.bind(this);
    this.onSelectDestination = this.onSelectDestination.bind(this);
    this.getStations = this.getStations.bind(this);
  }

  state = {
    stations: [],
    startStation: 'Select...',
    destinationStation: 'Select...',
  }

  //function to handle user selecting origin station
  onSelectOrigin(event) {
    this.setState({originStation: event.label})
  }

  //function to handle user selecting destination station
  onSelectDestination(event) {
    this.setState({destinationStation: event.label})
  }

  componentDidMount() {
      this.getStations();
  }

  //make API request to get list of stations and set state for the app
  getStations() {
    axios
      .get(STATION_URL, {
        headers: {
            'api_key': API_KEY,
        }
      })
      .then(res => {
        const stationsObj = res.data.Stations
        let stationsList =  [];

        for (var station of stationsObj) {
            stationsList.push({value: station['Code'], label: station['Name']});
        }
        this.setState({stations: stationsList});
      })

      .catch(err => {
        console.log(err);
      });
  }

  render () {
    const {stations, originStation, destinationStation} = this.state;

    return(
      <div onClick = {this.getStations}>
        <StationField
          options = {stations}
          onChange =  {this.onSelectOrigin}
          placeholder = {originStation}
        >
          Start Station
        </StationField>
        <StationField
          options = {stations}
          onChange = {this.onSelectDestination}
          placeholder = {destinationStation}
        >
          End Station
        </StationField>
      </div>
    )
  }
}

const StationField = ({options, onChange, placeholder, children}) => (
  <div>
    {children}
    <Select
        name="Station"
        placeholder = {placeholder}
        options={options}
        onChange = {onChange}
    />
  </div>
);

export default App;
