import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Row
} from "reactstrap";
import axios from "axios"
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
  if (fetchData === "") return <div>Loading...</div>;

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
  if (fetchData === "") return <div>Loading...</div>;

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
  if (fetchData === "") return <div>Loading...</div>;

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
  if (fetchData === "") return <div>Loading...</div>;

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
  if (fetchData === "") return <div>Loading...</div>;

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
    xAxisData.push(item.DAY_DATE)
    yAxisData.push(item.EPOCH_LAST_BLOCK)
    y2AxisData.push(parseFloat(item.MEDIAN_RAW_STAKE) / 10**18)
    y3AxisData.push(parseFloat(item.TOTAL_STAKING) / 10**18)
    y4AxisData.push(parseInt(item.CIRCULATING_SUPPLY))
    y5AxisData.push(parseInt(item.TOTAL_SUPPLY))
  });

  console.log(y2AxisData);

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
        label: 'MEDIAN_STAKED',
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
        label: 'TOTAL_STAKED',
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
        label: 'CIRCULATING_SUPPLY',
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
        label: 'TOTAL_SUPPLY',
        data: y5AxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
    <Row>
      <Col xs='3'><Line options={chartOptions} data={chartData} /></Col>
      <Col xs='3'><Line options={chartOptions} data={chartData2} /></Col>
      <Col xs='3'><Line options={chartOptions} data={chartData3} /></Col>
      <Col xs='3'><Line options={chartOptions} data={chartData4} /></Col>
    </Row>
  );
}

function Summary() {
  return (
    <Card>
      <CardHeader>Summary Page</CardHeader>
      <Row>
        <Col xs='3'><DailyBlocks /></Col>
        <Col xs='3'><DailyGas /></Col>
        <Col xs='3'><DailyTransactions /></Col>
        <Col xs='3'><DailyHRC20 /></Col>
      </Row>
      <StakingPage></StakingPage>
    </Card>
  );
}

export default Summary;
