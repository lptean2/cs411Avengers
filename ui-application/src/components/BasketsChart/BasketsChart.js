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
  const trendSeriesData = useSelector(state => state.data.trendSeriesData);
  const basketMetaData = useSelector(state => state.data.basketMetaData);

  const allBaskets = useSelector(state => state.data.allBaskets);

  const priceSeries = useMemo(() => {
    return Object.entries(priceSeriesData).map(([basketId, seriesData]) => {
      const basketObject = allBaskets.find(b => String(b.ID) === basketId) ?? {};
      return {
        name: `${basketObject?.Name ?? basketId} AVG Price`,
        data: seriesData.map(({date, price}) => {
          const dateString = String(date);
          const year = dateString.slice(0, 4);
          const month = dateString.slice(4, 6);
          const dateMoment = moment(`${year}-${Number(month) + 1}`, "YYYY-MM");
          return [dateMoment.valueOf(), price]
        }),
        yAxis: 0,
      };
    });
  }, [allBaskets, priceSeriesData]);
  const trendSeries = useMemo(() => {
    const series = [];
    const itemSet = new Set();
    Object.entries(trendSeriesData).forEach(([basketId, basketTrendSeriesData]) => {
      Object.entries(basketTrendSeriesData).forEach(([itemName, itemTrendSeriesData]) => {
        if (!itemSet.has(itemName)) {
          itemSet.add(itemName);
          series.push({
            name: `${itemName} Trend`,
            yAxis: 1,
            data: Object.entries(itemTrendSeriesData).map(([date, value]) => {
              const dateString = String(date);
              const year = dateString.slice(0, 4);
              const month = dateString.slice(4, 6);
              const dateMoment = moment(`${year}-${month}`, "YYYY-MM");
              return [dateMoment.valueOf(), value]
            }),
          });
        }
      });
    });
    return series;
  }, [trendSeriesData]);


  const options = useMemo(() => {
    return {
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      tooltip: {
        valueDecimals: 2,
      },
      yAxis: [
        {
          title: {
            text: 'Price',
          },
        },
        {
          title: {
            text: 'Google Trend Score',
          },
          opposite: false,
        }
      ],
      series: [
        ...priceSeries,
        ...trendSeries,
      ],
    }
  }, [priceSeries, trendSeries]);

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