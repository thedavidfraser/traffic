import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

class Button extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: '',
    isSelected: false,
  }

  onClick = () => {
    const { id, onClick } = this.props;

    onClick(id);
  };

  render() {
    const { id, isSelected, label } = this.props;

    return (
      <div className={`button${isSelected ? ' button--selected' : ''}`}>
        <button
          className="button__button"
          key={id}
          onClick={this.onClick}
        >
          {label}
        </button>
      </div>
    );
  }
}

export default Button;
