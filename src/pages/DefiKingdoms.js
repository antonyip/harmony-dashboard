import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col
} from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

function PriceCol(props) {

  var xAxisData = []
  var yAxisData = []
  var limit = 7;
  props.data.data.forEach(element => {
    if (limit > 0)
    {
      if (props.type === 'jewel')
      {
        xAxisData.push(element.JEWEL_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'tear')
      {
        xAxisData.push(element.GAIA_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'shva')
      {
        xAxisData.push(element.RUNE_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'gold')
      {
        xAxisData.push(element.GOLD_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      limit -= 1;
    }
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
    labels: yAxisData.reverse(),
    datasets: [
      {
        label: props.type,
        data: xAxisData.reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <Col xs='3'>
      <Line options={chartOptions} data={chartData} />
    </Col>
  );
}

function PriceWatch() {

  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/token-price-all").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error Loading</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

  return (
    <Row>
      <PriceCol type='jewel' data={fetchData}></PriceCol>
      <PriceCol type='tear' data={fetchData}></PriceCol>
      <PriceCol type='shva' data={fetchData}></PriceCol>
      <PriceCol type='gold' data={fetchData}></PriceCol>
    </Row>
  )
}

function BankWatch() {

  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
    axios.get("https://us-east1-dfkwatch-328521.cloudfunctions.net/xJewelRatioHistory").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error Loading</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

  var limit = 7;
  var xAxisData = []
  var yAxisDataBalance = []
  var yAxisDataRatio = []
  var yAxisDataSupply = []

  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(new Date(element.timestamp).toISOString().substring(0,10))
      yAxisDataBalance.push(element.balance);
      yAxisDataRatio.push(element.ratio);
      yAxisDataSupply.push(element.totalSupply);
      limit -= 1;
    }
  })
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

  const chartDataTotalJewel = {
    labels: xAxisData.reverse(),
    datasets: [
      {
        label: "Total Jewel Staked",
        data: yAxisDataBalance.reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartDataRatio = {
    labels: xAxisData.reverse(),
    datasets: [
      {
        label: "Jewel:xJewel Ratio",
        data: yAxisDataRatio.reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const chartDataJewel = {
    labels: xAxisData.reverse(),
    datasets: [
      {
        label: "Total Jewel Staked",
        data: yAxisDataBalance.reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jewel Distribution',
      },
    },
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'xJewel Distribution',
      },
    },
  };

  const pieData2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

/*
// balance = jewels, total supply = xjewels
{"ratio":1.6543417801800981,"balance":15549588.234933916,"timestamp":1641686524792,"totalSupply":9399259.82721728}
*/
  return (
    <Row>
      <Col xs='4'><Line options={chartOptions} data={chartDataTotalJewel} /></Col>
      <Col xs='4'><Line options={chartOptions} data={chartDataRatio} /></Col>
      <Col xs='2'><Pie options={pieChartOptions} data={pieData} /></Col>
      <Col xs='2'><Pie options={pieChartOptions2} data={pieData2} /></Col>
    </Row>
  );
}

function PoolWatch() {
  return <Col>pool watch..</Col>
}

function QuestWatch() {
  return <Col>quest watch..</Col>
}

function HeroWatch() {
  return <Col>hero watch..</Col>
}


function DefiKingdoms() {
  return (
    <div>
      <Card>
        <CardHeader>DefiKingdoms - Currency Prices</CardHeader>
        <PriceWatch></PriceWatch> 
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Staked Jewel</CardHeader>
        <BankWatch></BankWatch>
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Liquidity Pools</CardHeader>
        <PoolWatch></PoolWatch>
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Game Stats</CardHeader>
        <QuestWatch></QuestWatch>
        <HeroWatch></HeroWatch>
      </Card>
    </div>
  );
}

export default DefiKingdoms;
