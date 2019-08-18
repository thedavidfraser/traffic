import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Button from '../../components/Button/Button.js';
import './SelectVehicleAndYear.scss';

class SelectVehicleAndYear extends React.Component {
  static propTypes = {
    isShowSelectedOnly: PropTypes.bool,
    selectedVehicleKeys: ImmutablePropTypes.list,
    onSetVehicleKey: PropTypes.func.isRequired,
    vehicleLabels: ImmutablePropTypes.map.isRequired,
  };

  static defaultProps = {
    isShowSelectedOnly: false,
    selectedVehicleKeys: Immutable.List(),
  };

  onClick = (key) => {
    const { onSetVehicleKey } = this.props;

    onSetVehicleKey(key);
  };

  render() {
    const { isShowSelectedOnly, selectedVehicleKeys, vehicleLabels } = this.props;
    const keys = isShowSelectedOnly ?
      selectedVehicleKeys :
      vehicleLabels.keySeq();

    return (
      <div className="select-vehicle-and-year">
        {keys.map((key) => (
          <Button
            id={key}
            isSelected={selectedVehicleKeys.includes(key)}
            key={key}
            label={vehicleLabels.get(key)}
            onClick={this.onClick}
          />
        ))}
      </div>
    );
  }
}

export default SelectVehicleAndYear;
