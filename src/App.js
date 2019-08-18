import React from 'react';
import Immutable from 'immutable';
import Button from './components/Button/Button.js';
import Chart from './components/Chart/Chart.js';
import SelectCountPoints from './components/SelectCountPoints/SelectCountPoints.js';
import SelectVehicleAndYear from './components/SelectVehicleAndYear/SelectVehicleAndYear.js';
import logo from './logo.svg';
import './App.scss';

// TODO set up proxy, take into account paginiation
const urls = [
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2000.json',
    year: 2000,
  },
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2001.json',
    year: 2001,
  },
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2002.json',
    year: 2002,
  },
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2003.json',
    year: 2003,
  },
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2004.json',
    year: 2004,
  },
  {
    localAuthority: 71,
    url: 'data/average-annual-daily-flow-by-direction-2005.json',
    year: 2005,
  },
];

const vehicleLabels = Immutable.Map({
  all_motor_vehicles: 'all motor vehicles',
  pedal_cycles: 'pedal cycles',
  two_wheeled_motor_vehicles: 'two wheeled motor vehicles',
  cars_and_taxis: 'cars and taxis',
  buses_and_coaches: 'buses and coaches',
  lgvs: 'lgvs',
  all_hgvs: 'all hgvs',
  hgvs_2_rigid_axle: 'hgvs 2 rigid axle',
  hgvs_3_rigid_axle: 'hgvs 3 rigid axle',
  hgvs_4_or_more_rigid_axle: 'hgvs 4 or more rigid axle',
  hgvs_3_or_4_articulated_axle: 'hgvs 3 or 4 articulated axle',
  hgvs_5_articulated_axle: 'hgvs 5 articulated axle',
  hgvs_6_articulated_axle: 'hgvs 6 articulated axle',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countPoints: Immutable.Map(),
      data: Immutable.Map(),
      isCountPointSelectEnabled: false,
      isVehicleSelectEnabled: false,
      selectedCountPoints: Immutable.List(),
      selectedVehicleKeys: Immutable.List(['all_motor_vehicles']),
    };
    // this.fetchContent();
  }

  onCountPointSelect = () => {
    const { isCountPointSelectEnabled } = this.state;

    this.setState({
      isCountPointSelectEnabled: !isCountPointSelectEnabled,
      isVehicleSelectEnabled: false,
    });
  }

  onVehicleSelect = () => {
    const { isVehicleSelectEnabled } = this.state;

    this.setState({
      isCountPointSelectEnabled: false,
      isVehicleSelectEnabled: !isVehicleSelectEnabled,
    });
  }

  onSelectCountPoint = (countPointId) => {
    let { selectedCountPoints } = this.state;
    const indexOf = selectedCountPoints.indexOf(countPointId);

    selectedCountPoints = indexOf >= 0 ?
      selectedCountPoints.delete(indexOf) :
      selectedCountPoints.push(countPointId);

    this.setState({
      selectedCountPoints,
    });
  }

  fetchContent({ localAuthority, url, year }) {
    const setResponseToState = this.setResponseToState;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        setResponseToState(myJson, localAuthority, year);
      });
  }

  onSetVehicleKey = (key) => {
    let { selectedVehicleKeys } = this.state;
    const indexOf = selectedVehicleKeys.indexOf(key);

    selectedVehicleKeys = indexOf >= 0 ?
      selectedVehicleKeys.delete(indexOf) :
      selectedVehicleKeys.push(key);

    this.setState({
      selectedVehicleKeys,
    });
  }

  setResponseToState = (response, localAuthority, year) => {
    let { data, countPoints } = this.state;
    const localAuthorityYearData = Immutable.fromJS(response);

    data = data.setIn(
      [String(localAuthority), String(year)],
      localAuthorityYearData,
    );

    localAuthorityYearData.get('data').forEach((countPoint) => {
      const id = String(countPoint.get('count_point_id'));

      countPoints = countPoints.set(id, countPoint);
    });

    this.setState({ data, countPoints });
  }

  // tick() {
  //   this.setState(state => ({
  //     seconds: state.seconds + 1
  //   }));
  // }

  componentDidMount() {
    urls.forEach(({ localAuthority, url, year }) => {
      this.fetchContent({ localAuthority, url, year });
    });
    
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    const {
      countPoints,
      data,
      selectedVehicleKeys,
      isCountPointSelectEnabled,
      isVehicleSelectEnabled,
      selectedCountPoints,
    } = this.state;
    const localAuthorityYearData = data.getIn(['71', '2000', 'data']);

    return (
      <div className="app">
        <div className="app__add">
          <Button
            label="Add Count Point"
            onClick={this.onCountPointSelect}
          />
          <SelectCountPoints
            countPoints={countPoints}
            isShowSelectedOnly
            selectedCountPoints={selectedCountPoints}
            onSelectCountPoint={this.onSelectCountPoint}
          />
        </div>
        <div className="app__add">
          <Button
            label="Add vehicle & year"
            onClick={this.onVehicleSelect}
          />
          <SelectVehicleAndYear
            selectedVehicleKeys={selectedVehicleKeys}
            isShowSelectedOnly
            onSetVehicleKey={this.onSetVehicleKey}
            vehicleLabels={vehicleLabels}
          />
        </div>
        {isCountPointSelectEnabled && (
          <div className="app__select">
            <h2 className="app__select-heading">Select Count Points</h2>
            <SelectCountPoints
              countPoints={countPoints}
              selectedCountPoints={selectedCountPoints}
              onSelectCountPoint={this.onSelectCountPoint}
            />
          </div>
        )}
        {isVehicleSelectEnabled && (
          <div className="app__select">
            <h2 className="app__select-heading">Select Vehicle</h2>
            <SelectVehicleAndYear
              selectedVehicleKeys={selectedVehicleKeys}
              onSetVehicleKey={this.onSetVehicleKey}
              vehicleLabels={vehicleLabels}
            />
          </div>
        )}
        <div className="app__chart">
          <Chart
            countPoints={countPoints}
            data={localAuthorityYearData}
            selectedVehicleKeys={selectedVehicleKeys}
            selectedCountPoints={selectedCountPoints}
          />
        </div>
      </div>
    );
  }
}

export default App;
