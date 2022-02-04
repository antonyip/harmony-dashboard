import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Container,
    Spinner,
    Collapse,
    Alert,
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y2',
      },
      {
        type: 'bar',
        label: 'Daily New Addresses',
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  
  return (
    <CardBody>
      <Alert color='danger'>Cummulative inaccurate as data only start from block 20217726...</Alert>
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
    yAxisData.push(item.GAS_TOTAL)
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Gas Usage',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Daily Gas Usage',
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartData2 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Total Staked Value (ONE)',
        data: y3AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartData3 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Circulating Supply (ONE)',
        data: y4AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartData4 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Total Supply (ONE)',
        data: y5AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
    <>
    <Row>
      <Col xs='6'><Bar options={chartOptions} data={chartData} /></Col>
      <Col xs='6'><Bar options={chartOptions} data={chartData2} /></Col>
    </Row>
    <Row>
      <Col xs='6'><Bar options={chartOptions} data={chartData3} /></Col>
      <Col xs='6'><Bar options={chartOptions} data={chartData4} /></Col>
    </Row>
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartData3 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Number of On-Chain Active Validators',
        data: y4AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartData4 = {
    labels: xAxisData,
    datasets: [
      {
        label: 'Total Number of Registered Validators',
        data: y5AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
    <>
    <Row>
      <Col xs='4'><Bar options={chartOptions} data={chartData} /></Col>
      <Col xs='4'><Bar options={chartOptions} data={chartData3} /></Col>
      <Col xs='4'><Bar options={chartOptions} data={chartData4} /></Col>
    </Row>
    </>
  );
}

function MultiChainPage()
{
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
  axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_multichain_bridge").then(
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

  var xAxisData = [];
  var yAxisData = [];

  props.data[0].data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    yAxisData.push(parseFloat(item.TOTAL_STAKING) / 10**18 * 0.33)
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
        label: 'Total Staked ONE ($)',
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <Card><CardHeader>Staked ONE TVL</CardHeader>
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
  if(props.data === "") return (<div><Spinner/></div>);

  const TVLONE = props.data[0].data.at(-1).TOTAL_STAKING / 10**18 * 0.33;
  const TVLDFL = 500000000;
  const TVLMultiBridge = 45000000
  const TVLTranq = 167365845.321767
  const TVL = TVLONE+TVLDFL+TVLMultiBridge+TVLTranq;
  return (<Card><CardHeader>Total Value Locked</CardHeader>
  <CardBody tag='h1'>{formatter.format(TVL)}</CardBody>
  </Card>)
}

function TranquilFinancePage(props)
{
  if(props.data === "") return (<div><Spinner/></div>);

  if(props.data === "") return (<div><Spinner/></div>);

  var xAxisData = [];
  var yAxisData = [
    137981827.5585,
    141003257.627989,
    145921995.902802,
    142472184.51456,
    147596425.796277,
    161257580.321767,
    159933766.428641,
    164365845.749821,
    167365845.321767
  ];

  props.data[0].data.forEach( item => {
    xAxisData.push(item.DAY_DATE.substr(0,10))
    //yAxisData.push(parseFloat(item.TOTAL_STAKING) / 10**18 * 0.33)
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
        label: 'Total Value Locked Tranquil ($)',
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
    axios.all([ axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_staked_data"),
                axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_tvl_dfk_lp"),
                axios.get("https://us-east1-dfkwatch-328521.cloudfunctions.net/xJewelRatioHistory"),
                axios.get("https://dfkreport.antonyip.com/harmony-backend/?q=daily_multichain_bridge"),
                
              ])
        .then(axios.spread((...responses) => {
          setFetchData(responses)
        }))
        .catch( err => {
          setError(true);
          console.log(err)
        })
  },[])

  if (error) return <div>Error occured!</div>;

  return (
      <Card>
        <CardHeader>Total Value Locked</CardHeader>
        <CardBody>
          <TVLPageInner data={fetchData} />
          <StakedOneTVLPage data={fetchData} />
          <DfkTvlPage data={fetchData} />
          <TranquilFinancePage data={fetchData} />
          <Card>
            <CardHeader>TVL Others [WIP]</CardHeader>
            <Collapse isOpen={true}>
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
          <BridgesPage></BridgesPage>
        </CardBody>
      </Card>
      );
}

function BridgesPage()
{
  return (
  <Card>
  <CardHeader>Bridges</CardHeader>
  <CardBody>
    <MultiChainPage></MultiChainPage>
    <Card><CardHeader>BTC Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
    <Card><CardHeader>ETH Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
    <Card><CardHeader>ONE Bridge [WIP]</CardHeader><CardBody></CardBody></Card>
  </CardBody>
  </Card>
  );
}

function DfkTvlPage(props)
{
  //const [fetchData, setFetchData] = useState("");
  //const [fetchData2, setFetchData2] = useState("");

  if(props.data === "") return (<div><Spinner/></div>);

  const fetchData = props.data[1];
  const fetchData2 = props.data[2];

  if (fetchData === "") return <div><Spinner /></div>;
  if (fetchData2 === "") return <div><Spinner /></div>;

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
      y2AxisData.push(item.balance * 7)
      y3AxisData.push(item.balance * 7 + yAxisData[8-limit])
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
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
      {
        type:'bar',
        label: 'DFK Staked TVL',
        data: y2AxisData,
        borderColor: 'rgb(0, 99, 0)',
        backgroundColor: 'rgba(0, 99, 0, 0.5)',
      },
      {
        type:'line',
        label: 'DFK Total TVL',
        data: y3AxisData,
        borderColor: 'rgb(0, 0, 132)',
        backgroundColor: 'rgba(0, 0, 132, 0.5)',
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
  return (
    <Container>
      <br></br>
    <Card>
      <CardHeader>Harmony Blockchain Statictics</CardHeader>
      <Row>
        <Col xs='6'><DailyBlocks /></Col>
        <Col xs='6'><DailyGas /></Col>
      </Row>
      <Row>
        <Col xs='6'><DailyTransactions /></Col>
        <Col xs='6'><DailyHRC20 /></Col>
      </Row>
      <Row>
        <Col xs='6'><DailyAddresses /></Col>
        <Col xs='6'><DailyNewAddresses /></Col>
      </Row>
      <StakingPage></StakingPage>
      <StakingPage2></StakingPage2>
      <TVLPage></TVLPage>
    </Card>
    </Container>
  );
}

export default Summary;
