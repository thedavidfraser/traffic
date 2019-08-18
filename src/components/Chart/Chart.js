import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.scss';

class Chart extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.list,
    selectedVehicleKeys: ImmutablePropTypes.list,
    selectedCountPoints: ImmutablePropTypes.list,
  };

  static defaultProps = {
    data: Immutable.List(),
    selectedVehicleKeys: Immutable.List(),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data, selectedVehicleKeys, selectedCountPoints } = this.props;
    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Traffic volume by type 2000',
      },
      series: [],
      xAxis: {
        categories: [],
      },
    };

    const dataSlice = data.filter(countPoint =>
      selectedCountPoints.includes(String(countPoint.get('count_point_id'))),
    );
    const first = data.first();

    selectedVehicleKeys.forEach((dataKey, index) => {
      options.series.push({
        name: dataKey,
        data: dataSlice.map((item) => item.get(dataKey)).toJS(),
      });
    });

    dataSlice.forEach((item) => {
      options.xAxis.categories.push(
        `${item.get('road_name')} (${item.get('direction_of_travel')})`,
      );
    });

    return (
      <div className="chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />      
      </div>
    );
  }
}

export default Chart;
