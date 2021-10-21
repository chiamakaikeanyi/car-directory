import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context';
import Layout from '../../components/Layout/index';
import EmptyState from '../../components/EmptyState/index';
import Select from '../../components/Select';
import styles from './listing.module.scss';
import { isNotEmptyArray, groupArrayByKeys } from '../../utils';
import Sidebar from '../../components/Sidebar';

const Listing = () => {
  const context = useContext(AppContext);
  const {
    makes,
    selectedMake,
    models,
    selectedModel,
    loadMakes,
    setSelectedMake,
    loadModels,
    setSelectedModel,
    loadVehicles,
    vehicles,
    error,
    loadMakesFromCache
  } = context;

  const [filters, setFilters] = useState({
    fuelType: '',
    bodyType: '',
    enginePowerKW: null,
    enginePowerPS: null,
    engineCapacity: null
  });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const localMakes = window.localStorage.getItem('makes');
    if (isNotEmptyArray(JSON.parse(localMakes))) {
      loadMakesFromCache(JSON.parse(localMakes));
    } else {
      loadMakes(makes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMakeChange(item) {
    setSelectedMake(item.value);
    loadModels(item.value);
  }

  function handleModelChange(item) {
    setSelectedModel(item.value);
    if (selectedMake && item.value) {
      loadVehicles(selectedMake, item.value);
    }
  }

  function handleChecked(type, event) {
    const updatedFilters = {
      ...filters,
      [type]:
        type === 'fuelType' || type === 'bodyType' ? event.target.value : Number(event.target.value)
    };
    setFilters(updatedFilters);

    const filtered = Object.values(vehicles)?.filter(item => {
      return (
        (!!updatedFilters['fuelType'] && item['fuelType'] === updatedFilters['fuelType']) ||
        (!!updatedFilters['bodyType'] && item['bodyType'] === updatedFilters['bodyType']) ||
        (!!updatedFilters['enginePowerKW'] &&
          item['enginePowerKW'] === updatedFilters['enginePowerKW']) ||
        (!!updatedFilters['enginePowerPS'] &&
          item['enginePowerPS'] === updatedFilters['enginePowerPS']) ||
        (!!updatedFilters['engineCapacity'] &&
          item['engineCapacity'] === updatedFilters['engineCapacity'])
      );
    });

    setFilteredData(filtered);
  }

  const specs = {
    fuelType: groupArrayByKeys(vehicles, 'fuelType'),
    bodyType: groupArrayByKeys(vehicles, 'bodyType'),
    enginePowerPS: groupArrayByKeys(vehicles, 'enginePowerPS'),
    enginePowerKW: groupArrayByKeys(vehicles, 'enginePowerKW'),
    engineCapacity: groupArrayByKeys(vehicles, 'engineCapacity')
  };

  return (
    <Layout>
      <Sidebar specs={specs} handleChecked={handleChecked} />
      <section className={styles.wrapper}>
        <div className={styles.select_wrapper}>
          <Select type="Make" items={makes} handleChange={handleMakeChange} />
          <Select type="Model" items={models} handleChange={handleModelChange} />
        </div>

        {error && <EmptyState text={error} />}

        {!error && vehicles?.length === 0 && (
          <EmptyState text="No vehicle to display. Select make and model" />
        )}

        {!error && vehicles?.length > 0 && (
          <>
            <p>
              Showing results for vehicle with make{' '}
              <span className={styles.selected}>{selectedMake}</span> and model{' '}
              <span className={styles.selected}>{selectedModel}</span>
            </p>

            <div className={styles.container}>
              <table className={styles.table}>
                <thead className={styles.item_header}>
                  <tr className={styles.item_row}>
                    <th className={styles.item_header}>S/N</th>
                    <th className={styles.item_header}>Make</th>
                    <th className={styles.item_header}>Model</th>
                    <th className={styles.item_header}>Engine Power PS</th>
                    <th className={styles.item_header}>Engine Power KW</th>
                    <th className={styles.item_header}>Fuel Type</th>
                    <th className={styles.item_header}>Body Type</th>
                    <th className={styles.item_header}>Engine Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.values(filteredData).length > 0
                    ? Object.values(filteredData)
                    : Object.values(vehicles)
                  ).map((item, index) => (
                    <tr key={index} className={styles.item_row}>
                      <td className={styles.item}>{index + 1}</td>
                      <td className={styles.item}>{item.make}</td>
                      <td className={styles.item}>{item.model}</td>
                      <td className={styles.item}>{item.enginePowerPS}</td>
                      <td className={styles.item}>{item.enginePowerKW}</td>
                      <td className={styles.item}>{item.fuelType}</td>
                      <td className={styles.item}>{item.bodyType}</td>
                      <td className={styles.item}>{item.engineCapacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

Listing.defaultProps = { items: [] };
Listing.propTypes = { items: PropTypes.array };

export default Listing;
