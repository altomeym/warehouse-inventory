import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const TopSellingProductChart = (props) => {
    const {frontSetting, yearTopProduct} = props
    const currency = frontSetting ? frontSetting.value && frontSetting.value.currency_symbol : ' $';
    const allQuantity = yearTopProduct ? yearTopProduct.total_quantity : [];
    const allName = yearTopProduct ? yearTopProduct.name : [];
    const [allData, setAllData] = useState([])
    

  useEffect(() => {
    if (allQuantity && allName) {
      countDatas()
    }
  }, [yearTopProduct])


  const countDatas = () => {
    if (allData.length === 0) {
      allQuantity.map((value, i) => {
        setAllData((oldValue) => [...oldValue, {
          value: allQuantity[i],
          name: allName[i]
        }]);
      })
    } else if (allData.length >= 1) {
      setAllData([])
      allQuantity.map((value, i) => {
        setAllData((oldValue) => [...oldValue, {
          value: allQuantity[i],
          name: allName[i]
        }]);
      })
    }
  }


    const option = {
      color: ['#ff4f00', '#2b2358', '#1fa95b', '#7a3ff3', '#4b83f9', '#00c6ff', '#ffb821', '#ff0000', '#ea7ccc'],
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: allData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
      return (
        <>
          <ReactECharts
            option={option}
            style={{ height: 400 }}
          />
        </>
      );
      
    };
    
    export default TopSellingProductChart;
