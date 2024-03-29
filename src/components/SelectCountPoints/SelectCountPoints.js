import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Button from '../../components/Button/Button.js';
import './SelectCountPoints.scss';

class SelectCountPoints extends React.Component {
  static propTypes = {
    countPoints: ImmutablePropTypes.map,
    countPointIds: ImmutablePropTypes.list,
    onSelectCountPoint: PropTypes.func.isRequired,
    selectedCountPoints: ImmutablePropTypes.list,
  };

  static defaultProps = {
    countPoints: Immutable.List(),
    countPointIds: null,
    selectedCountPoints: Immutable.List(),
  };

  onClick = (countPointId) => {
    const { onSelectCountPoint } = this.props;

    onSelectCountPoint(countPointId);
  };

  render() {
    const { countPoints, selectedCountPoints } = this.props;
    const countPointIds = this.props.countPointIds || countPoints.keySeq();

    return (
      <div className="select-count-points">
        {countPointIds.map((id) => (
          <Button
            id={String(id)}
            isSelected={selectedCountPoints.includes(String(id))}
            key={id}
            label={
              [
                id,
                countPoints.getIn([id, 'road_name']),
                countPoints.getIn([id, 'start_junction_road_name']),
              ].join(' ')
            }
            onClick={this.onClick}
          />
        ))}
      </div>
    );
  }
}

export default SelectCountPoints;
