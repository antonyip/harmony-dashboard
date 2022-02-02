import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Container,
    Spinner,
    Collapse
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
import { Line, Bar } from 'react-chartjs-2';

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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Line options={chartOptions} data={chartData} />
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Line options={chartOptions} data={chartData} />
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
      scales: {
        y1: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y2: {
          type: 'linear',
          display: false,
          position: 'right',
          grid: {
            display: false,
            drawOnChartArea: false,
          },
        },
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        type:'bar',
        label: 'Daily New Addresses',
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y2',
      },
      {
        type:'line',
        label: 'Cumulative New Addresses',
        data: y2AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      }
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Line options={chartOptions} data={chartData} />
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Line options={chartOptions} data={chartData} />
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Line options={chartOptions} data={chartData} />
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
  if (fetchData === "") return <Row><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col></Row>;

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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
      <Col xs='6'><Line options={chartOptions} data={chartData} /></Col>
      <Col xs='6'><Line options={chartOptions} data={chartData2} /></Col>
    </Row>
    <Row>
      <Col xs='6'><Line options={chartOptions} data={chartData3} /></Col>
      <Col xs='6'><Line options={chartOptions} data={chartData4} /></Col>
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
  if (fetchData === "") return <Row><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col><Col xs='3'><Spinner /></Col></Row>;

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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

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
        label: 'Number of Registered Validators',
        data: y5AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
    <>
    <Row>
      <Col xs='12'><Line options={chartOptions} data={chartData} /></Col>
    </Row>
    <Row>
      <Col xs='6'><Line options={chartOptions} data={chartData3} /></Col>
      <Col xs='6'><Line options={chartOptions} data={chartData4} /></Col>
    </Row>
    </>
  );
}


function Summary() {
  return (
    <Container>
      <br></br>
    <Card>
      <CardHeader>Harmony Blockchain Statictics</CardHeader>
      <Row>
        <Col xs='6'><DailyAddresses /></Col>
        <Col xs='6'><DailyNewAddresses /></Col>
      </Row>
      <Row>
        <Col xs='6'><DailyBlocks /></Col>
        <Col xs='6'><DailyGas /></Col>
      </Row>
      <Row>
        <Col xs='6'><DailyTransactions /></Col>
        <Col xs='6'><DailyHRC20 /></Col>
      </Row>
      <StakingPage></StakingPage>
      <StakingPage2></StakingPage2>
      <Card>
        <CardHeader>TVL</CardHeader>
        <CardBody>
          <Card><CardHeader>TVL Harmony</CardHeader></Card>
          <Card><CardHeader>TVL DFK</CardHeader></Card>
          <Card>
            <CardHeader>TVL Others [WIP]</CardHeader>
            <Collapse isOpen={false}>
            <CardBody>
              <Card>
              <CardBody>
              <Row>Tranquil Finance (TRANQ)</Row>
              <Row>SushiSwap (SUSHI)</Row>
              <Row>Multichain (MULTI)</Row>
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
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>Bridges</CardHeader>
        <CardBody>
          <Card><CardHeader>Anyswap / Multichain Bridge</CardHeader></Card>  
          <Card><CardHeader>ETH Bridge [WIP]</CardHeader></Card>
          <Card><CardHeader>ONE Bridge [WIP]</CardHeader></Card>
        </CardBody>
      </Card>
      
    </Card>
    </Container>
  );
}

export default Summary;
