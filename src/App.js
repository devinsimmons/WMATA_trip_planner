import React, { Component } from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const stations = [
  {
      "Address": {
          "City": "Rockville",
          "State": "MD",
          "Street": "15903 Somerville Drive",
          "Zip": "20855"
      },
      "Code": "A15",
      "Lat": 39.1199273249,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.1646273343,
      "Name": "Shady Grove",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Rockville",
          "State": "MD",
          "Street": "251 Hungerford Drive",
          "Zip": "20850"
      },
      "Code": "A14",
      "Lat": 39.0843216075,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.1461253392,
      "Name": "Rockville",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Rockville",
          "State": "MD",
          "Street": "1600 Chapman Avenue",
          "Zip": "20852"
      },
      "Code": "A13",
      "Lat": 39.0624676517,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.1208179517,
      "Name": "Twinbrook",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Rockville",
          "State": "MD",
          "Street": "5500 Marinelli Road",
          "Zip": "20852"
      },
      "Code": "A12",
      "Lat": 39.0481513573,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.112829859,
      "Name": "White Flint",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Bethesda",
          "State": "MD",
          "Street": "10300 Rockville Pike",
          "Zip": "20852"
      },
      "Code": "A11",
      "Lat": 39.02926895,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.10384972,
      "Name": "Grosvenor",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Bethesda",
          "State": "MD",
          "Street": "8810 Rockville Pike",
          "Zip": "20814"
      },
      "Code": "A10",
      "Lat": 39.0000564843,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0969522905,
      "Name": "Medical Center",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Bethesda",
          "State": "MD",
          "Street": "7450 Wisconsin Avenue",
          "Zip": "20814"
      },
      "Code": "A09",
      "Lat": 38.9843936603,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0941291922,
      "Name": "Bethesda",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "5337 Wisconsin Avenue NW",
          "Zip": "20015"
      },
      "Code": "A08",
      "Lat": 38.9594838736,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.084995805,
      "Name": "Friendship Heights",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "4501 Wisconsin Avenue NW",
          "Zip": "20016"
      },
      "Code": "A07",
      "Lat": 38.9488514351,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0795873255,
      "Name": "Tenleytown",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "4200 Connecticut Avenue NW",
          "Zip": "20008"
      },
      "Code": "A06",
      "Lat": 38.9432652883,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0629861805,
      "Name": "Van Ness UDC",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "3599 Connecticut Avenue NW",
          "Zip": "20008"
      },
      "Code": "A05",
      "Lat": 38.9347628908,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0580425191,
      "Name": "Cleveland Park",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "2700 Connecticut Ave., NW",
          "Zip": "20008"
      },
      "Code": "A04",
      "Lat": 38.9250851371,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0524180207,
      "Name": "Woodley Park Zoo",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "1525 20th St. NW",
          "Zip": "20036"
      },
      "Code": "A03",
      "Lat": 38.9095980575,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0434143597,
      "Name": "Dupont Circle",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "1001 Connecticut Avenue NW",
          "Zip": "20036"
      },
      "Code": "A02",
      "Lat": 38.9032019462,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0397008272,
      "Name": "Farragut North",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "607 13th St. NW",
          "Zip": "20005"
      },
      "Code": "A01",
      "Lat": 38.8983144732,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0280779971,
      "Name": "Metro Center",
      "StationTogether1": "C01",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "630 H St. NW",
          "Zip": "20001"
      },
      "Code": "B01",
      "Lat": 38.8983168097,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0219153904,
      "Name": "Gallery Place",
      "StationTogether1": "F01",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "450 F Street NW",
          "Zip": "20001"
      },
      "Code": "B02",
      "Lat": 38.8960903176,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0166389566,
      "Name": "Judiciary Square",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "701 First St. NE",
          "Zip": "20002"
      },
      "Code": "B03",
      "Lat": 38.8977660392,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0074142921,
      "Name": "Union Station",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "200 Florida Ave N.E.",
          "Zip": "20002"
      },
      "Code": "B35",
      "Lat": 38.9070162121,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0030204472,
      "Name": "New York Avenue",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "919 Rhode Island Avenue NE",
          "Zip": "20018"
      },
      "Code": "B04",
      "Lat": 38.9210596891,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -76.9959369166,
      "Name": "Rhode Island Avenue",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "801 Michigan Avenue NE",
          "Zip": "20017"
      },
      "Code": "B05",
      "Lat": 38.9332109913,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -76.9945342851,
      "Name": "Brookland",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "550 Galloway Street NE",
          "Zip": "20011"
      },
      "Code": "B06",
      "Lat": 38.9518467675,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0022030768,
      "Name": "Fort Totten",
      "StationTogether1": "E06",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Washington",
          "State": "DC",
          "Street": "327 Cedar Street NW",
          "Zip": "20012"
      },
      "Code": "B07",
      "Lat": 38.976078531,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0181766987,
      "Name": "Takoma",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Silver Spring",
          "State": "MD",
          "Street": "8400 Colesville Road",
          "Zip": "20910"
      },
      "Code": "B08",
      "Lat": 38.9939493747,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0310178268,
      "Name": "Silver Spring",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Forest Glen",
          "State": "MD",
          "Street": "9730 Georgia Avenue",
          "Zip": "20910"
      },
      "Code": "B09",
      "Lat": 39.0149542752,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0429165548,
      "Name": "Forest Glen",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Silver Spring",
          "State": "MD",
          "Street": "11171 Georgia Avenue",
          "Zip": "20902"
      },
      "Code": "B10",
      "Lat": 39.0375271436,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0501070535,
      "Name": "Wheaton",
      "StationTogether1": "",
      "StationTogether2": ""
  },
  {
      "Address": {
          "City": "Silver Spring",
          "State": "MD",
          "Street": "12501 Georgia Avenue",
          "Zip": "20906"
      },
      "Code": "B11",
      "Lat": 39.0617837655,
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lon": -77.0535573593,
      "Name": "Glenmont",
      "StationTogether1": "",
      "StationTogether2": ""
  }
];

let stationInfo = [];

for (var station of stations) {
  stationInfo.push({value: station['Code'], label: station['Name']});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectOrigin = this.onSelectOrigin.bind(this);
    this.onSelectDestination = this.onSelectDestination.bind(this);
  }

  state = {
    stationList: stationInfo,
    startStation: 'Select...',
    destinationStation: 'Select...',
  }

  onSelectOrigin(event) {
    this.setState({originStation: event.label})
  }

  onSelectDestination(event) {
    this.setState({destinationStation: event.label})
  }

  render () {
    const {stationList, originStation, destinationStation} = this.state;

    return(
      <div>
        <StationField
          options = {stationList}
          onChange =  {this.onSelectOrigin}
          placeholder = {originStation}
        >
          Start Station
        </StationField>
        <StationField
          options = {stationList}
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
