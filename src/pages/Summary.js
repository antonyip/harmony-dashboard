import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Container,
    Spinner,
    //Collapse,
    //Alert,
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    //Button,
} from "reactstrap";
import axios from "axios"
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line , Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DailyTransactions() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_transactions").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.METRIC_DATE.substr(0,10))
    yAxisData.push(item.TXS_COUNT)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Transactions',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily Transactions',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <CardBody>
      <Bar options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function DailyAddresses() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_active_addresses").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(item.ACTIVE_ADDRESSES)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Blocks',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily Active Addresses',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <CardBody>
      <Bar options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function DailyNewAddresses() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_new_addresses").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  var y2AxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(item.DAILY_NEW_ADDRESS)
    y2AxisData.push(item.CUMMULATIVE_COUNT)
  });

  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Hero Sales',
      },
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        type: 'line',
        label: 'Cumulative New Addresses',
        data: y2AxisData,
        borderColor: 'rgba(60, 145, 250, 0.8)',
        backgroundColor: 'rgba(60, 145, 250, 0.8)',
        yAxisID: 'y2',
      },
      {
        type: 'bar',
        label: 'Daily New Addresses',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
        yAxisID: 'y1',
      },
    ],
  };
  
  return (
    <CardBody>
      <Line options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function DailyBlocks() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_blocks").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.METRIC_DATE.substr(0,10))
    yAxisData.push(item.DAILY_BLOCKS)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Blocks',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily Blocks',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <CardBody>
      <Bar options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function DailyGas() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_gas").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.METRIC_DATE.substr(0,10))
    yAxisData.push(item.GAS_TOTAL / 10**9)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Gas Usage (ONE)',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily Gas Usage (ONE)',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <CardBody>
      <Bar options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function DailyHRC20() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_hrc20_transfers").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.METRIC_DATE.substr(0,10))
    yAxisData.push(item.TRANSFERS_COUNT)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily HRC20 Transfers',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <CardBody>
      <Bar options={chartOptions} data={chartData} />
    </CardBody>
  );
}

function StakingPage() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_staked_data").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  var y2AxisData = []
  var y3AxisData = []
  var y4AxisData = []
  var y5AxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(item.EPOCH_LAST_BLOCK)
    y2AxisData.push(parseFloat(item.MEDIAN_RAW_STAKE) / 10**18)
    y3AxisData.push(parseFloat(item.TOTAL_STAKING) / 10**18)
    y4AxisData.push(parseInt(item.CIRCULATING_SUPPLY))
    y5AxisData.push(parseInt(item.TOTAL_SUPPLY))
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Median Staked Value (ONE)',
        data: y2AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  const chartData2 = {
    labels: xAxisData,
    datasets: [
      {
        type: 'bar',
        label: 'Total Staked Value (ONE)',
        data: y3AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  const chartData3 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Circulating Supply (ONE)',
        data: y4AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  const chartData4 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Total Supply (ONE)',
        data: y5AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };


  return (
    <>
      <Card>
        <CardHeader>Harmony Staking Statictics</CardHeader>
        <CardBody>
      <Row>
        <Col md={6}><Bar options={chartOptions} data={chartData} /></Col>
        <Col md={6}><Bar options={chartOptions} data={chartData2} /></Col>
      </Row>
      </CardBody>
      </Card>
      <br />
      <Card>
        <CardHeader>Harmony Supply Statictics</CardHeader>
        <CardBody>
      <Row>
        <Col md={6}><Bar options={chartOptions} data={chartData3} /></Col>
        <Col md={6}><Bar options={chartOptions} data={chartData4} /></Col>
      </Row>
      </CardBody>
      </Card>
    </>
  );
}

function StakingPage2() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_staking_stats").then(
    res => {
      setFetchData(res);
    }).catch( err => {
      setError(true);
      console.log(err)
    })
  }, []);

  if (error) return <div>Something went wrong...</div>;
  if (fetchData === "") return <div><Spinner /></div>;

  /*
  [{"DAY_DATE":"2022-02-01 00:00:00.000","DELEGATIONS_COUNT":56028,"SUM_TOTAL_DELEGATION":4.88326240500678e+27,
  "SUM_ACTIVE_VALIDATORS":264,"SUM_TOTAL_VALIDATORS":698}]
  */
  //console.log(data.data);
  
  var xAxisData = []
  var yAxisData = []
  //var y2AxisData = []
  var y4AxisData = []
  var y5AxisData = []
  fetchData.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(item.DELEGATIONS_COUNT)
    //y2AxisData.push(parseFloat(item.SUM_TOTAL_DELEGATION) / 10**18)
    y4AxisData.push(parseInt(item.SUM_ACTIVE_VALIDATORS))
    y5AxisData.push(parseInt(item.SUM_TOTAL_VALIDATORS))
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Number of On-Chain Active Delgators',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  const chartData3 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Number of On-Chain Active Validators',
        data: y4AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  const chartData4 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Total Number of Registered Validators',
        data: y5AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };


  return (
    <Card>
      <CardHeader>Harmony Validator Statictics</CardHeader>
      <CardBody>
        <Row>
          <Col md={4}><Bar options={chartOptions} data={chartData} /></Col>
          <Col md={4}><Bar options={chartOptions} data={chartData3} /></Col>
          <Col md={4}><Bar options={chartOptions} data={chartData4} /></Col>
        </Row>
    </CardBody>
    </Card>
  );
}

function MultiChainPage(props)
{
  if (props.data === "") return <div><Spinner /></div>;

  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  
  var xAxisData = []
  var yAxisData = []
  props.data.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(item.DAILY_TVL)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Multichain Bridge TVL',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <Card>
      <CardHeader>Multichain Bridge TVL</CardHeader>
      <CardBody>
        <Bar options={chartOptions} data={chartData} />
      </CardBody>
    </Card>
    
  );
}

function StakedOneTVLPage(props)
{
  if(props.data === "") return (<div><Spinner/></div>);
  if (props.onePrice === "") return (<div><Spinner/></div>);

  var xAxisData = [];
  var yAxisData = [];

  var limit = 7;
  var priceData = [];
  props.onePrice.data.forEach(item => {
    if (limit > 0)
    {
      priceData.push(item.PRICE);
    }
  })

  priceData.reverse();

  props.data.data.forEach( (item, index) => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(parseFloat(item.TOTAL_STAKING) / 10**18 * priceData[index])
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        type: 'bar',
        label: 'Total Staked ONE ($)',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  return (
    <Card md={6}><CardHeader>Staked ONE TVL</CardHeader>
    <CardBody>
      <Line data={chartData} options={chartOptions} />
    </CardBody>
    </Card>
  )
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

function TVLPageInner(props)
{
  if(props.data[0] === "") return (<div><Spinner/></div>);
  if(props.data[1] === "") return (<div><Spinner/></div>);
  if(props.data[2] === "") return (<div><Spinner/></div>);
  if(props.data[3] === "") return (<div><Spinner/></div>);
  if(props.data[4] === "") return (<div><Spinner/></div>);
  if(props.data[5] === "") return (<div><Spinner/></div>);
  if(props.data[6] === "") return (<div><Spinner/></div>);

  const TVLONE = props.data[0].data[props.data[0].data.length - 1].TOTAL_STAKING / 10**18 * props.data[6].data[0].PRICE;
  const TVLDFK = props.data[1].data[props.data[1].data.length - 1].TOTAL_VALUE_LOCKED
                  + props.data[2].data[0].balance * props.data[5].data[0].PRICE
  const TVLTranq = props.data[3].data[props.data[3].data.length - 1].TRANQ_TVL;
  const TVLMultiBridge = props.data[4].data[props.data[4].data.length - 1].DAILY_TVL;
  
  const TVL = TVLONE+TVLDFK+TVLMultiBridge+TVLTranq;

  return (
    <Card>
      <CardHeader>Total Value Locked</CardHeader>
      <CardBody tag='h1'>{formatter.format(TVL)}</CardBody>
    </Card>)
}

function TranquilFinancePage(props)
{
  if(props.data === "") return (<div><Spinner/></div>);

  var xAxisData = [];
  var yAxisData = [];

  props.data.data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(parseFloat(item.TRANQ_TVL))
  });



  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        type: 'bar',
        label: 'Total Value Locked Tranquil ($)',
        data: yAxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };

  return (
    <Card><CardHeader>Tranquil Finance TVL</CardHeader>
    <CardBody>
      <Line data={chartData} options={chartOptions} />
    </CardBody>
    </Card>
  )

}

function TVLPage()
{
  const [error, setError] = useState(false);
  const [multichainData, setMultichainData] = useState("");
  const [tranquilData, setTranquilData] = useState("");
  const [dailyStakedData, setdailyStakedData] = useState("");
  const [dailydfktvlData, setdailydfktvlData] = useState("");
  const [xJewelData, setxJewelData] = useState("");
  const [jewelPriceData , setJewelPriceData] = useState("");
  const [onePriceData , setOnePriceData] = useState("");

  // onload
  useEffect( () => {

    axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_staked_data").then(
      res => {
        setdailyStakedData(res);
      }).catch( err => {
        setError(true);
        console.log(err)
      })

    axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_tvl_dfk_lp").then(
      res => {
        setdailydfktvlData(res);
      }).catch( err => {
        setError(true);
        console.log(err)
      })

    axios.get("https://us-east1-dfkwatch-328521.cloudfunctions.net/xJewelRatioHistory").then(
      res => {
        setxJewelData(res);
      }).catch( err => {
        setError(true);
        console.log(err)
      })
    
    axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_multichain_bridge").then(
      res => {
        setMultichainData(res);
      }).catch( err => {
        setError(true);
        console.log(err)
      })

    axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_tranquil_tvl").then(
      res => {
        setTranquilData(res);
      }).catch( err => {
        setError(true);
        console.log(err)
      })

    axios.get("https://dfkreport.antonyip.com/token-price-one").then(
        res => {
          setOnePriceData(res);
        }).catch( err => {
          setError(true);
          console.log(err)
        })

    axios.get("https://dfkreport.antonyip.com/token-price-jewel").then(
          res => {
            setJewelPriceData(res);
          }).catch( err => {
            setError(true);
            console.log(err)
          })
  },[])

  if (error) return <div>Error occured!</div>;

  return (
        <>
          <TVLPageInner data={[dailyStakedData, dailydfktvlData, xJewelData, tranquilData, multichainData, jewelPriceData, onePriceData]} />
          <br />
          <Row>
          <Col md={6}><StakedOneTVLPage data={dailyStakedData} onePrice={onePriceData} /></Col>
          <br />
          <Col md={6}><DfkTvlPage data={dailydfktvlData} jewelData={xJewelData} jewelPrice={jewelPriceData} /></Col>
          </Row>
          <br />
          <Row>
          <Col md={6}><TranquilFinancePage data={tranquilData} /></Col>
          <br />
          {/* <Card>
            <CardHeader>TVL Others [WIP]</CardHeader>
            <Collapse isOpen={false}>
            <CardBody>
              <Card>
              <CardBody>
              <Row>SushiSwap (SUSHI)</Row>
              <Row>ViperSwap (VIPER)</Row>
              <Row>Hundred Finance (HND)</Row>
              <Row>Curve (CRV)</Row>
              <Row>Synapse (SYN)</Row>
              <Row>FarmersOnly (FOX)</Row>
              <Row>Euphoria (WAGMI)</Row>
              <Row>StakeDAO (SDT)</Row>
              <Row>LootSwap (LOOT)</Row>
              <Row>WagmiDAO (GMI)</Row>
              <Row>Fuzz Finance (FUZZ)</Row>
              <Row>Beefy Finance (BIFI)</Row>
              <Row>OpenSwap (OPENX)</Row>
              </CardBody>
              </Card>
            </CardBody>
            </Collapse>
          </Card> 
          <br /> */}
          <Col md={6}><BridgesPage multichainData={multichainData}/></Col>
          </Row>
        </>
      );
}

function BridgesPage(props)
{
  return <MultiChainPage data={props.multichainData}/>;
  /*
    return (
    <Card>
    <CardHeader>Bridges</CardHeader>
    <CardBody>
      <MultiChainPage></MultiChainPage>
      <br />
      <Card><CardHeader>BTC Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
      <br />
      <Card><CardHeader>ETH Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
      <br />
      <Card><CardHeader>ONE Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
    </CardBody>
    </Card>
    );
  */
}

function DfkTvlPage(props)
{
  //const [fetchData, setFetchData] = useState("");
  //const [fetchData2, setFetchData2] = useState("");

  if(props.data === "") return (<div><Spinner/></div>);
  if(props.jewelData === "") return (<div><Spinner/></div>);

  const fetchData = props.data;
  const fetchData2 = props.jewelData;
  const fetchData3 = props.jewelPrice;

  if (fetchData === "") return <div><Spinner /></div>;
  if (fetchData2 === "") return <div><Spinner /></div>;
  if (fetchData3 === "") return <div><Spinner /></div>;

  const latestJewelPrice = fetchData3.data[0].PRICE
  /*
  METRIC_DATE: "2022-01-27 00:00:00.000"
  METRIC_PERIOD: "daily"
  TXS_COUNT: 1258
  */
  //console.log(data.data);
  
  var limit = 8
  var xAxisData = []
  var yAxisData = []

  fetchData.data.forEach( item => {
    if (limit > 0)
    {
      xAxisData.push(item.DAY_DATE.substr(0,10))
      yAxisData.push(item.TOTAL_VALUE_LOCKED)
      limit-=1;
    }
  });

  var y2AxisData = []
  var y3AxisData = []
  limit = 8;
  //console.log(fetchData2);
  fetchData2.data.forEach( item => {
    if (limit > 0)
    {
      y2AxisData.push(item.balance * latestJewelPrice)
      y3AxisData.push(item.balance * latestJewelPrice + yAxisData[8-limit])
      limit-=1;
    }
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily HRC20 Transfers',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        type:'bar',
        label: 'DFK LP TVL',
        data: yAxisData,
        borderColor: 'rgba(60, 145, 250, 0.8)',
        backgroundColor: 'rgba(60, 145, 250, 0.8)',
      },
      {
        type:'bar',
        label: 'DFK Staked TVL',
        data: y2AxisData,
        borderColor: 'rgb(0, 155, 0)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
      },
      {
        type:'line',
        label: 'DFK Total TVL',
        data: y3AxisData,
        borderColor: 'rgba(62, 200, 250, 0.8)',
        backgroundColor: 'rgba(62, 200, 250, 0.8)',
      }
    ],
  };
  
  return (
    <Card>
      <CardHeader>Defi-Kingdoms</CardHeader>
      <CardBody>
        <Line options={chartOptions} data={chartData} />
      </CardBody>
    </Card>
    
  );
}

function Summary() {

  const [activeTab, setActiveTab] = useState('1');

  return (
    <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={'a'}
              onClick={() => { setActiveTab('1'); }}
            >
              Block Stats
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={'b'}
              onClick={() => { setActiveTab('2'); }}
            >
              Address Stats
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={'b'}
              onClick={() => { setActiveTab('3'); }}
            >
              Staking Stats
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={'b'}
              onClick={() => { setActiveTab('4'); }}
            >
              Validator Stats
            </NavLink>
          </NavItem>
          <NavItem>
              <NavLink
                className={'b'}
                onClick={() => { setActiveTab('5'); }}
              >
                Total Value Locked
              </NavLink>
          </NavItem>
        </Nav>
        <br />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card rerender={activeTab}>
          <CardHeader>Harmony Blockchain Statictics</CardHeader>
          <Row>
            <Col md={6}><DailyBlocks /></Col>
            <Col md={6}><DailyGas /></Col>
          </Row>
          <Row>
            <Col md={6}><DailyTransactions /></Col>
            <Col md={6}><DailyHRC20 /></Col>
          </Row>
          </Card>
        </TabPane>
      <TabPane tabId="2">
        <Card rerender={activeTab}>
        <CardHeader>Harmony Address Statictics</CardHeader>
        <Row>
          <Col md={6}><DailyAddresses /></Col>
          <Col md={6}><DailyNewAddresses /></Col>
        </Row>
        </Card>
      </TabPane>
      <TabPane tabId="3">
        <StakingPage rerender={activeTab}/>
      </TabPane>
      <TabPane tabId="4">
        <StakingPage2 rerender={activeTab}/>
      </TabPane>
      <TabPane tabId="5">
        <TVLPage rerender={activeTab}/>
      </TabPane>
      </TabContent>
    </Container>
  );
}

export default Summary;
