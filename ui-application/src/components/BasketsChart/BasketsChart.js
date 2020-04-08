import React from 'react';
import styles from './BasketsChart.module.css';
import RegionSelector from "../RegionSelector";

const BasketsChart = props => {
  return (
    <div className={styles.root}>
      <div className={styles.selector}>
        <RegionSelector/>
      </div>
    </div>
  )
};

export default BasketsChart;