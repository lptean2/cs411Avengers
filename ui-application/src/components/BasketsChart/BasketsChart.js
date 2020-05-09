import React, {useMemo} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import styles from './BasketsChart.module.css';
import RegionSelector from "../RegionSelector";
import {useSelector} from "react-redux";
import moment from 'moment';
/*
100: {date: 200304, price: 1.3280000388622284}
101: {date: 200305, price: 1.2880000174045563}
102: {date: 200306, price: 1.3299999833106995}
103: {date: 200307, price: 1.324999988079071}
104: {date: 200308, price: 1.311000019311905}
105: {date: 200309, price: 1.2569999694824219}
106: {date: 200310, price: 1.2380000054836273}

 */
const BasketsChart = props => {
  const priceSeriesData = useSelector(state => state.data.priceSeriesData);
  const allBaskets = useSelector(state => state.data.allBaskets);
  const region = useSelector(state => state.app.selectedRegionId);

  const options = useMemo(() => {
    const basketNames = [];
    const series =  Object.entries(priceSeriesData).map(([basketId, seriesData]) => {
      const basketObject = allBaskets.find(b => String(b.ID) === basketId) ?? {};
      const label = basketObject?.Name ?? basketId;
      basketNames.push(label);
      return {
        name: label,
        data: seriesData.map(({date, price}) => {
          const dateString = String(date);
          const year = dateString.slice(0, 4);
          const month = dateString.slice(4, 6);
          const dateMoment = moment(`${year}-${Number(month) + 1}`, "YYYY-MM");
          return [dateMoment.valueOf(), price]
        })
      };
    });
    return {
      title: {
        text: basketNames.join(', '),
      },
      subtitle: {
        text: ""
      },
      tooltip: {
        valueDecimals: 2,
      },
      series,
    }
  }, [priceSeriesData, allBaskets]);

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