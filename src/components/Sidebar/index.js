import React, { useContext } from 'react';
import styles from './sidebar.module.scss';
import { isNotEmptyArray } from '../../utils';
import { AppContext } from '../../context';

const Sidebar = ({ specs, handleChecked }) => {
  const { vehicles } = useContext(AppContext);

  return (
    <aside className={styles.sidebar}>
      {isNotEmptyArray(vehicles) && (
        <div>
          <p className={styles.list_header}>Fuel Type</p>
          <ul className={styles.list}>
            {Object.keys(specs?.fuelType).map(specification => (
              <li key={specification}>
                <input
                  type="radio"
                  id={specification}
                  name="fuelType"
                  value={specification}
                  onChange={event => handleChecked('fuelType', event)}
                />
                <label htmlFor={specification}> {specification}</label>
              </li>
            ))}
          </ul>

          <p className={styles.list_header}>Body Type</p>
          <ul className={styles.list}>
            {Object.keys(specs?.bodyType).map(specification => (
              <li key={specification}>
                <input
                  type="radio"
                  id={specification}
                  name="bodyType"
                  value={specification}
                  onChange={event => handleChecked('bodyType', event)}
                />
                <label htmlFor={specification}> {specification}</label>
              </li>
            ))}
          </ul>

          <p className={styles.list_header}>Engine Power PS</p>
          <ul className={styles.list}>
            {Object.keys(specs?.enginePowerPS).map(specification => (
              <li key={specification}>
                <input
                  type="radio"
                  id={specification}
                  name="enginePowerPS"
                  value={specification}
                  onChange={event => handleChecked('enginePowerPS', event)}
                />
                <label htmlFor={specification}> {specification}</label>
              </li>
            ))}
          </ul>

          <p className={styles.list_header}>Engine Power KW</p>
          <ul className={styles.list}>
            {Object.keys(specs?.enginePowerPS).map(specification => (
              <li key={specification}>
                <input
                  type="radio"
                  id={specification}
                  name="enginePowerKW"
                  value={specification}
                  onChange={event => handleChecked('enginePowerKW', event)}
                />
                <label htmlFor={specification}> {specification}</label>
              </li>
            ))}
          </ul>

          <p className={styles.list_header}>Engine Capacity</p>
          <ul className={styles.list}>
            {Object.keys(specs?.engineCapacity).map(specification => (
              <li key={specification}>
                <input
                  type="radio"
                  id={specification}
                  name="engineCapacity"
                  value={specification}
                  onChange={event => handleChecked('engineCapacity', event)}
                />
                <label htmlFor={specification}> {specification}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
