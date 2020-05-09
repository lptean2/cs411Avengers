import React, {useMemo} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import styles from './BasketsChart.module.css';
import RegionSelector from "../RegionSelector";
import {useSelector} from "react-redux";
import moment from 'moment';

require("highcharts/modules/annotations")(Highcharts);

const BasketsChart = props => {
  const priceSeriesData = useSelector(state => state.data.priceSeriesData);
  const trendSeriesData = useSelector(state => state.data.trendSeriesData);
  const basketMetaData = useSelector(state => state.data.basketMetaData);
  const itemSeriesData = useSelector(state => state.data.itemSeriesData);
  const allItems = useSelector(state => state.data.allItems);
  const displayBasketBreakout = useSelector(state => state.app.displayBasketBreakout);

  const allBaskets = useSelector(state => state.data.allBaskets);

  const priceSeries = useMemo(() => {
    if (displayBasketBreakout) {
      return Object.entries(itemSeriesData).map(([itemId, seriesData]) => {
        const item = allItems?.find(item => item.ID === String(itemId)) ?? {};
        return {
          name: `${item.SearchTerm ?? itemId} Price`,
          data: seriesData.map(({Price, PriceDate}) => {
            const dateString = String(PriceDate);
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const dateMoment = moment(`${year}-${Number(month) + 1}`, "YYYY-MM");
            return [dateMoment.valueOf(), Price];
          }),
          yAxis: 0,
        };
      });
    } else {
      return Object.entries(priceSeriesData).map(([basketId, seriesData]) => {
        const basketObject = allBaskets.find(b => String(b.ID) === basketId) ?? {};
        return {
          name: `${basketObject?.Name ?? basketId} AVG Price`,
          data: seriesData.map(({date, price}) => {
            const dateString = String(date);
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const dateMoment = moment(`${year}-${Number(month) + 1}`, "YYYY-MM");
            const point = [dateMoment.valueOf(), price];
            if (basketMetaData?.[basketId]?.MaxPrice === price) {
              return {
                x: point[0],
                y: point[1],
                id: 'max',
              }
            }
            if (basketMetaData?.[basketId]?.MinPrice === price) {
              return {
                x: point[0],
                y: point[1],
                id: 'min',
              }
            }
            return point;
          }),
          yAxis: 0,
        };
      });
    }
  }, [allBaskets, priceSeriesData, basketMetaData, displayBasketBreakout]);
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
      legend: {
        enabled: true
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
      annotations: [
        {
          labels: [
            {
              point: 'max',
              text: 'Max'
            },
            {
              point: 'min',
              text: 'Min',
              backgroundColor: 'white'
            }
          ]
        }
      ]
    }
  }, [priceSeries, trendSeries]);

  return (
    <div className={styles.root}>
      <div className={styles.selector}>
        <RegionSelector/>
      </div>
      <HighchartsReact
        containerProps={{className: styles.chart}}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  )
};

export default BasketsChart;