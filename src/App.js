import React, { Component } from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_KEY = '6351dad7ec9d4c4f9f03bab9b5180c38';
const STATIONS_LIST = 'https://api.wmata.com/Rail.svc/json/jStations?';
const NEXT_TRAIN = 'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/';
const STATION_TO_STATION = 'https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectOrigin = this.onSelectOrigin.bind(this);
    this.onSelectDestination = this.onSelectDestination.bind(this);
    this.getStations = this.getStations.bind(this);
    this.getNextTrainAtStation = this.getNextTrainAtStation.bind(this);
    this.getTravelTime = this.getTravelTime.bind(this);
  }

  state = {
    stations: [],
    originStation: 'Select...',
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
    this.setState({originStationCode: event.value})
    this.getNextTrainAtStation(event.value).then( data => {
        this.setState({originTrains: data});
    });
  }

  //function to handle user selecting destination station
  onSelectDestination(event) {
    this.setState({destinationStation: event.label});
    this.setState({destinationStationCode: event.value});
    this.getNextTrainAtStation(event.value).then( data => {
        this.setState({destinationTrains: data});
    });
  }

  //makes an API request to calculate the travel time between stations
  getTravelTime() {
    const {originStation, destinationStation, originStationCode, destinationStationCode} = this.state;
    //only make the request if both fields have been filled in
    if (originStation !== destinationStation && [originStation, destinationStation].indexOf('Select...') === -1) {
        const url = `${STATION_TO_STATION}${'FromStationCode='}${originStationCode}${'&ToStationCode='}${destinationStationCode}`
        axios.get(url, {
            headers: {
                'api_key': API_KEY
            }
        })
        .then( res => {
            const time = res.data.StationToStationInfos[0].RailTime;
            this.setState({travelTime: time});
        })
        .catch(err => {
            console.log(err);
        });
    }
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

    //anytime the user changes one of the fields, the app checks for the travel time
    //between selected stations
    this.getTravelTime();

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

        //this gets all the stations from the api, extracts necessary info, and adds them
        //to the select. the value and label props are necessary for the react-select lib
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
    const {
        stations, 
        originStation, 
        destinationStation, 
        originTrains, 
        destinationTrains,
        travelTime
    } = this.state;

    return(
        <div>
            <div> 
                <StationField 
                classStyle = {'left-search'}
                options = {stations}
                onChange =  {this.onSelectOrigin}
                placeholder = {originStation}
                label = {'Start Station'}
                >
                <Schedule
                    classStyle = {'arrivals'}
                    trains = {originTrains}
                >
                </Schedule>
                </StationField>

                <StationField
                classStyle = {'right-search'}
                options = {stations}
                onChange = {this.onSelectDestination}
                placeholder = {destinationStation}
                label = {'End Station'}
                >
                <Schedule
                    classStyle = {'arrivals'}
                    trains = {destinationTrains}
                >
                </Schedule>
                </StationField>
            </div>
            <div>
                {
                    travelTime &&
                    <TripReport travelTime = {travelTime}>
                    </TripReport>
                }
            </div>
        </div>
    )
  }
}

const StationField = ({classStyle, options, onChange, placeholder, label, children}) => (
  <div className = {classStyle}>
    {label}
    <Select
        name="Station"
        placeholder = {placeholder}
        options={options}
        onChange = {onChange}
    />
    {children}
  </div>
);

const Schedule = ({classStyle, trains}) => (
  <div className = {classStyle}>
    {trains.map(train => {
        console.log(trains);
      return(
        <div key = {train.LocationCode + train.DestinationCode + train.Min}>
          <p>Destination: {train.DestinationName}</p>
          <p>Arrival: {train.Min} Minutes</p>
        </div>
      )
    })}
  </div>
);
export default App;

const TripReport = ({travelTime}) => (
    <div>
        <p>This trip will take {travelTime} minutes</p>
    </div>
)

//exporting my components so that I can test them
export {
    StationField,
    Schedule, 
    TripReport
};