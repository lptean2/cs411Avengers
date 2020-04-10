import React, {useMemo} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import styles from './BasketsChart.module.css';
import RegionSelector from "../RegionSelector";

const BasketsChart = props => {
  const options = useMemo(() => {
    return {
      title: {
        text: 'My stock chart'
      },
      series: [{
        data: [1, 2, 3, 1, 5, 2]
      }]
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.selector}>
        <RegionSelector/>
      </div>
      <HighchartsReact
        containerProps={{ className: styles.chart }}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
};

export default BasketsChart;