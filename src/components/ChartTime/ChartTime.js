import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ChartTime.scss';

class ChartTime extends React.Component {
  static propTypes = {
    countPoint: ImmutablePropTypes.map,
    countPointId: PropTypes.string,
    localAuthorityData: ImmutablePropTypes.map,
    selectedVehicleKeys: ImmutablePropTypes.list,
  };

  static defaultProps = {
    countPoint: Immutable.Map(),
    countPointId: '',
    localAuthorityData: Immutable.List(),
    selectedVehicleKeys: Immutable.List(),
  };

  render() {
    const {
      countPoint,
      countPointId,
      localAuthorityData,
      selectedVehicleKeys,
    } = this.props;
    const options = {
      chart: {
        type: 'spline',
      },
      title: {
        text: `${countPoint.get('road_name')} (${countPoint.get('direction_of_travel')}) traffic volume by year`,
      },
      series: [],
      xAxis: {
        categories: [],
      },
    };

    const years = localAuthorityData.keySeq().toJS();

    options.xAxis.categories = years;

    selectedVehicleKeys.forEach((dataKey, index) => {
      options.series.push({
        name: dataKey,
        data: years.map((year) => {
          const yearData = localAuthorityData.getIn([year, 'data']);
          let amount;

          yearData.forEach((countPointData) => {
            if (String(countPointData.get('count_point_id')) === countPointId) {
              amount = countPointData.get(dataKey);
            }
          });

          return amount;
        }),
      });
    });

    return (
      <div className="chart-time">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />      
      </div>
    );
  }
}

export default ChartTime;
