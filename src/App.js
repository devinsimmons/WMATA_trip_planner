import React, { Component } from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_KEY = '6351dad7ec9d4c4f9f03bab9b5180c38';
const STATIONS_LIST = 'https://api.wmata.com/Rail.svc/json/jStations?';
const NEXT_TRAIN = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectOrigin = this.onSelectOrigin.bind(this);
    this.onSelectDestination = this.onSelectDestination.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getNextTrainAtStation = this.getNextTrainAtStation.bind(this);
  }

  state = {
    stations: [],
    startStation: 'Select...',
    destinationStation: 'Select...',
    originTrains: [],
    destinationTrains: []
  }

  componentDidMount() {
    this.getStations();
  }

  //function to handle user selecting origin station
  onSelectOrigin(event) {
    this.setState({originStation: event.label});
    this.getNextTrainAtStation(event.value).then( data => {
        this.setState({originTrains: data});
    });
  }

  //function to handle user selecting destination station
  onSelectDestination(event) {
    this.setState({destinationStation: event.label});
    this.getNextTrainAtStation(event.value).then( data => {
        this.setState({destinationTrains: data});
    });
  }

  //making an asynchronous request to the api. this is necessary because I want to return the
  //results of the funciton, rather than update the state within the then method
  //i am determining the train arrival schedule for a particular station
  async getNextTrainAtStation(stationCode) {
    const res = await axios.get(NEXT_TRAIN + stationCode, {
        headers: {
            'api_key': API_KEY,
        }
    });
    return res.data.Trains; 
  }

  //make API request to get list of stations and set state for the app
  getStations() {
    axios
      .get(STATIONS_LIST, {
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
    const {stations, originStation, destinationStation, originTrains, destinationTrains} = this.state;

    return(
      <div onclick = {console.log(this.state)}> 
        <StationField
          options = {stations}
          onChange =  {this.onSelectOrigin}
          placeholder = {originStation}
        >
          Start Station
        </StationField>
        <Schedule
          trains = {originTrains}
        >
        </Schedule>
        <StationField
          options = {stations}
          onChange = {this.onSelectDestination}
          placeholder = {destinationStation}
        >
          End Station
        </StationField>
        <Schedule
          trains = {destinationTrains}
        >
        </Schedule>
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

const Schedule = ({trains}) => (
  trains.map(train => {
      return(
        <div key = {train}>
          <p>Destination: {train.Destination}</p>
          <p>Arrival: {train.Min} Minutes</p>
        </div>
      )
  })
);
export default App;
