import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const Select = ({ type, items, handleChange, testId }) => {
  const selectStyle = {
    container: prevStyles => ({
      ...prevStyles,
      width: '300px',
      fontSize: '14px'
    })
  };

  return (
    <ReactSelect
      placeholder={`Filter by ${type}`}
      styles={selectStyle}
      options={items?.map(item => {
        return {
          value: item,
          label: item
        };
      })}
      data-testid={testId}
      onChange={handleChange}
    />
  );
};

Select.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  handleChange: PropTypes.func
};

export default Select;
