import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Container,
    //Carousel,
    CardImg,
    Spinner,
    //Alert,
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
  BarElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

function generateLPChartOptions(title)
{
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: title,
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
}

function generateLPChartData(options)
{
  return {
    labels: options.xAxis,
    datasets: [
      {
        type:'line',
        label: options.y2Name,
        data: options.data2,
        borderColor: options.y2Color,
        backgroundColor: options.y2Color,
        yAxisID: 'y2',
      },
      {
        type:'line',
        label: options.y1Name,
        data: options.data1,
        borderColor: 'rgba(0, 155, 0, 0.5)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
        yAxisID: 'y1',
      },
      
    ],
  };
}

function PriceCol(props) {

  var xAxisData = []
  var yAxisData = []
  var limit = 8;
  var chartBorderColor;
  var chartBackgroundColor;
  props.data.data.forEach(element => {
    if (limit > 0)
    {
      if (props.type === 'Jewel')
      {
        xAxisData.push(element.JEWEL_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
        chartBorderColor = 'rgba(0, 155, 0, 0.5)';
        chartBackgroundColor = 'rgba(0, 155, 0, 0.5)';
      }
      if (props.type === 'GaiaTears')
      {
        xAxisData.push(element.GAIA_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
        chartBorderColor = 'rgba(28, 111, 135, 0.5)';
        chartBackgroundColor = 'rgba(28, 111, 135, 0.5)';
      }
      if (props.type === 'ShvasRune')
      {
        xAxisData.push(element.RUNE_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
        chartBorderColor = 'rgba(137, 145, 153, 0.8)';
        chartBackgroundColor = 'rgba(137, 145, 153, 0.8)';
      }
      if (props.type === 'Gold')
      {
        xAxisData.push(element.GOLD_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
        chartBorderColor = 'rgba(205, 140, 0, 0.5)';
        chartBackgroundColor = 'rgba(205, 140, 0, 0.5)';
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
        borderColor: chartBorderColor,
        backgroundColor: chartBackgroundColor,
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
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;

  return (
    <Row>
      <PriceCol type='Jewel' data={fetchData}></PriceCol>
      <PriceCol type='GaiaTears' data={fetchData}></PriceCol>
      <PriceCol type='ShvasRune' data={fetchData}></PriceCol>
      <PriceCol type='Gold' data={fetchData}></PriceCol>
    </Row>
  )
}

function BankPie(props) {

  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  var totalJewelSupply = 500000000;
  const [unlockedJewelSupply, setUnlockedJewelSupply] = useState(64055396);
  const [lockedJewelSupply, setLockedJewelSupply] = useState(268522000);
  const [lpJewelSupply, setLpJewelSupply] = useState(22973000);
  useEffect( () => {

    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0xfd3d27b8"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
      setFetchData(res);
      setUnlockedJewelSupply(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    // lockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0xca5c7b91"
        },
        "latest"
    ],
    "id": 2
    }).then( 
      res => {
      setFetchData(res);
      setLockedJewelSupply(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);
  
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_lp").then( 
      res => {
      setLpJewelSupply(res.data[res.data.length-1].TOTAL_LOCKED_JEWEL);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  

  if (error) return <CardBody>Error Loading</CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;


  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Jewel Distribution',
      },
    },
  };

  var jQuestRewards = 2387129; // rough estimate based on kingdom watch  TODO: pull data from blockchain
  var jDevTeam = 6784755 +  4822886 + 701050; // rough estimate based on kingdom watch  TODO: pull data from blockchain
  var jBank = props.bank;
  var jLP = lpJewelSupply;
  var jLocked = lockedJewelSupply
  var jWallet = unlockedJewelSupply - jDevTeam - jBank - jLP - jQuestRewards
  var jUnallocated = totalJewelSupply - jWallet - jLocked - jDevTeam - jBank - jLP - jQuestRewards
  const pieData = {
    labels: ['DevTeam', 'Bank', 'LP', 'Players', 'QuestRewards', 'Locked', 'Unallocated'],
    datasets: [
      {
        label: '# of Votes',
        data: [jDevTeam, jBank, jLP, jWallet, jQuestRewards, jLocked, jUnallocated],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(155, 155, 155, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(155, 155, 155, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={pieData} options={pieChartOptions}/>
  )
}

function BankPie2(props) {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [unlockedJewelSupply, setUnlockedJewelSupply] = useState(64055396)
  const [lpJewelSupply,setLpJewelSupply] = useState(22973000)
  useEffect( () => {

    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0xfd3d27b8"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
      setFetchData(res);
      setUnlockedJewelSupply(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_lp").then( 
      res => {
      setLpJewelSupply(res.data[res.data.length-1].TOTAL_LOCKED_JEWEL);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error Loading</CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Unlocked Jewel Distribution',
      },
    },
  };

  var jQuestRewards = 2387129; // rough estimate based on kingdom watch  TODO: pull data from blockchain
  var jDevTeam = 6784755 + 4822886 + 701050; // rough estimate based on kingdom watch  TODO: pull data from blockchain
  var jBank = props.bank;
  var jLP = lpJewelSupply;
  var jWallet = unlockedJewelSupply - jDevTeam - jBank - jLP - jQuestRewards

  const pieData = {
    labels: ['DevTeam','Bank', 'LP', 'Players', 'QuestRewards'],
    datasets: [
      {
        label: '# of Votes',
        data: [jDevTeam, jBank, jLP, jWallet, jQuestRewards],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={pieData} options={pieChartOptions}/>
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
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;

  var limit = 8;
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
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartDataRatio = {
    labels: xAxisData,
    datasets: [
      {
        label: "Jewel:xJewel Ratio",
        data: yAxisDataRatio.reverse(),
        borderColor: 'rgb(25, 127, 132)',
        backgroundColor: 'rgba(25, 99, 127, 0.5)',
      }
    ],
  };

/*
// balance = jewels, total supply = xjewels
{"ratio":1.6543417801800981,"balance":15549588.234933916,"timestamp":1641686524792,"totalSupply":9399259.82721728}
*/
  return (
    <Row>
      <Col xs='2'><BankPie bank={yAxisDataBalance.at(-1)}/></Col>
      <Col xs='4'><Line options={chartOptions} data={chartDataTotalJewel} /></Col>
      <Col xs='4'><Line options={chartOptions} data={chartDataRatio} /></Col>
      <Col xs='2'><BankPie2 bank={yAxisDataBalance.at(-1)}/></Col>
    </Row>
  );
}

function PoolWatch() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [fetchData2, setFetchData2] = useState("");
  const [fetchData3, setFetchData3] = useState("");
  const [fetchData4, setFetchData4] = useState("");
  const [fetchData5, setFetchData5] = useState("");
  const [fetchData6, setFetchData6] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_one_lp").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_ust_lp").then( 
      res => {
      setFetchData2(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_wmatic_lp").then( 
      res => {
      setFetchData3(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_bscbnb_lp").then( 
      res => {
      setFetchData4(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_busd_lp").then( 
      res => {
      setFetchData5(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_avax_lp").then( 
      res => {
      setFetchData6(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);


  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData2 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData3 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData4 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData5 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData6 === "") return <CardBody><Spinner /></CardBody>;

  var limit = 8;
  var x1AxisData = []
  var y1AxisData1= []
  var y1AxisData2= []

  var x2AxisData = []
  var y2AxisData1= []
  var y2AxisData2= []

  var x3AxisData = []
  var y3AxisData1= []
  var y3AxisData2= []

  var x4AxisData = []
  var y4AxisData1= []
  var y4AxisData2= []

  var x5AxisData = []
  var y5AxisData1= []
  var y5AxisData2= []

  var x6AxisData = []
  var y6AxisData1= []
  var y6AxisData2= []

  limit = 8;
  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      x1AxisData.push(element.DAY_DATE.substr(0,10))
      y1AxisData1.push(element.JEWEL);
      y1AxisData2.push(element.WONE);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData2.data.forEach( element => {
    if (limit > 0)
    {
      x2AxisData.push(element.DAY_DATE.substr(0,10))
      y2AxisData1.push(element.JEWEL);
      y2AxisData2.push(element.UST);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData3.data.forEach( element => {
    if (limit > 0)
    {
      x3AxisData.push(element.DAY_DATE.substr(0,10))
      y3AxisData1.push(element.JEWEL);
      y3AxisData2.push(element.WMATIC);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData4.data.forEach( element => {
    if (limit > 0)
    {
      x4AxisData.push(element.DAY_DATE.substr(0,10))
      y4AxisData1.push(element.JEWEL);
      y4AxisData2.push(element.BNB);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData5.data.forEach( element => {
    if (limit > 0)
    {
      x5AxisData.push(element.DAY_DATE.substr(0,10))
      y5AxisData1.push(element.JEWEL);
      y5AxisData2.push(element.BUSD);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData6.data.forEach( element => {
    if (limit > 0)
    {
      x6AxisData.push(element.DAY_DATE.substr(0,10))
      y6AxisData1.push(element.JEWEL);
      y6AxisData2.push(element.AVAX);
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

  const chartOptions = generateLPChartOptions("JEWEL-ONE LP")
  const chartOptions2 = generateLPChartOptions("JEWEL-UST LP")
  const chartOptions3 = generateLPChartOptions("JEWEL-MATIC LP")
  const chartOptions4 = generateLPChartOptions("JEWEL-BNB LP")
  const chartOptions5 = generateLPChartOptions("JEWEL-BUSD LP")
  const chartOptions6 = generateLPChartOptions("JEWEL-AVAX LP")

  const chartData = generateLPChartData({xAxis: x1AxisData,  y2Color:"rgba(10, 175, 225, 0.5)", data1: y1AxisData1, data2: y1AxisData2, y1Name: "JEWEL", y2Name:"ONE"})
  const chartData2 = generateLPChartData({xAxis: x2AxisData, y2Color:"rgba(32, 50, 182, 0.5)",  data1: y2AxisData1, data2: y2AxisData2, y1Name: "JEWEL", y2Name:"UST"})
  const chartData3 = generateLPChartData({xAxis: x3AxisData, y2Color:"rgba(130, 71, 240, 0.5)",  data1: y3AxisData1, data2: y3AxisData2, y1Name: "JEWEL", y2Name:"MATIC"})
  const chartData4 = generateLPChartData({xAxis: x4AxisData, y2Color:"rgba(235, 180, 46, 0.5)",  data1: y4AxisData1, data2: y4AxisData2, y1Name: "JEWEL", y2Name:"BNB"})
  const chartData5 = generateLPChartData({xAxis: x5AxisData, y2Color:"rgba(200, 150, 25, 0.5)",  data1: y5AxisData1, data2: y5AxisData2, y1Name: "JEWEL", y2Name:"BUSD"})
  const chartData6 = generateLPChartData({xAxis: x6AxisData, y2Color:"rgba(232, 60, 60, 0.5)",  data1: y6AxisData1, data2: y6AxisData2, y1Name: "JEWEL", y2Name:"AVAX"})

  return (
    <>
    <Row>
        <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
        <Col xs='4'><Line data={chartData2} options={chartOptions2}></Line></Col>
        <Col xs='4'><Line data={chartData3} options={chartOptions3}></Line></Col>
        </Row>
        <Row>
        <Col xs='4'><Line data={chartData4} options={chartOptions4}></Line></Col>
        <Col xs='4'><Line data={chartData5} options={chartOptions5}></Line></Col>
        <Col xs='4'><Line data={chartData6} options={chartOptions6}></Line></Col> 
    </Row>
    </>
  )
}

function PoolWatch2() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [fetchData2, setFetchData2] = useState("");
  const [fetchData3, setFetchData3] = useState("");
  const [fetchData4, setFetchData4] = useState("");
  const [fetchData5, setFetchData5] = useState("");
  const [fetchData6, setFetchData6] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_ftm_lp").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1usdc_lp").then( 
      res => {
      setFetchData2(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1eth_lp").then( 
      res => {
      setFetchData3(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1btc_lp").then( 
      res => {
      setFetchData4(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_luna_lp").then( 
      res => {
      setFetchData5(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_avax_lp").then( 
      res => {
      setFetchData6(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);


  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData2 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData3 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData4 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData5 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData6 === "") return <CardBody><Spinner /></CardBody>;

  var limit = 8;
  var x1AxisData = []
  var y1AxisData1= []
  var y1AxisData2= []

  var x2AxisData = []
  var y2AxisData1= []
  var y2AxisData2= []

  var x3AxisData = []
  var y3AxisData1= []
  var y3AxisData2= []

  var x4AxisData = []
  var y4AxisData1= []
  var y4AxisData2= []

  var x5AxisData = []
  var y5AxisData1= []
  var y5AxisData2= []

  var x6AxisData = []
  var y6AxisData1= []
  var y6AxisData2= []

  limit = 8;
  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      x1AxisData.push(element.DAY_DATE.substr(0,10))
      y1AxisData1.push(element.JEWEL);
      y1AxisData2.push(element.FTM);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData2.data.forEach( element => {
    if (limit > 0)
    {
      x2AxisData.push(element.DAY_DATE.substr(0,10))
      y2AxisData1.push(element.JEWEL);
      y2AxisData2.push(element.USDC);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData3.data.forEach( element => {
    if (limit > 0)
    {
      x3AxisData.push(element.DAY_DATE.substr(0,10))
      y3AxisData1.push(element.JEWEL);
      y3AxisData2.push(element.ETH);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData4.data.forEach( element => {
    if (limit > 0)
    {
      x4AxisData.push(element.DAY_DATE.substr(0,10))
      y4AxisData1.push(element.JEWEL);
      y4AxisData2.push(element.BTC);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData5.data.forEach( element => {
    if (limit > 0)
    {
      x5AxisData.push(element.DAY_DATE.substr(0,10))
      y5AxisData1.push(element.JEWEL);
      y5AxisData2.push(element.LUNA);
      limit -= 1;
    }
  })

  limit = 8;
  fetchData6.data.forEach( element => {
    if (limit > 0)
    {
      x6AxisData.push(element.DAY_DATE.substr(0,10))
      y6AxisData1.push(element.JEWEL);
      y6AxisData2.push(element.AVAX);
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

  const chartOptions = generateLPChartOptions("JEWEL-FTM LP")
  const chartOptions2 = generateLPChartOptions("JEWEL-USDC LP")
  const chartOptions3 = generateLPChartOptions("JEWEL-ETH LP")
  const chartOptions4 = generateLPChartOptions("JEWEL-BTC LP")
  const chartOptions5 = generateLPChartOptions("JEWEL-LUNA LP")
  const chartOptions6 = generateLPChartOptions("unused")

  const chartData = generateLPChartData( {xAxis: x1AxisData, y2Color:"rgba(30, 100, 255, 0.5)", data1: y1AxisData1, data2: y1AxisData2, y1Name: "JEWEL", y2Name:"FTM"})
  const chartData2 = generateLPChartData({xAxis: x2AxisData, y2Color:"rgba(40, 120, 200, 0.5)", data1: y2AxisData1, data2: y2AxisData2, y1Name: "JEWEL", y2Name:"USDC"})
  const chartData3 = generateLPChartData({xAxis: x3AxisData, y2Color:"rgba(114, 114, 114, 0.5)", data1: y3AxisData1, data2: y3AxisData2, y1Name: "JEWEL", y2Name:"ETH"})
  const chartData4 = generateLPChartData({xAxis: x4AxisData, y2Color:"rgba(240, 140, 25, 0.5)", data1: y4AxisData1, data2: y4AxisData2, y1Name: "JEWEL", y2Name:"BTC"})
  const chartData5 = generateLPChartData({xAxis: x5AxisData, y2Color:"rgba(250, 210, 6, 0.5)", data1: y5AxisData1, data2: y5AxisData2, y1Name: "JEWEL", y2Name:"LUNA"})
  const chartData6 = generateLPChartData({xAxis: x6AxisData, y2Color:"rgba(0, 155, 0, 0.5)", data1: y6AxisData1, data2: y6AxisData2, y1Name: "JEWEL", y2Name:"unused"})

  // pool2
  return (
    <>
    <Row>
      <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
      <Col xs='4'><Line data={chartData2} options={chartOptions2}></Line></Col>
      <Col xs='4'><Line data={chartData3} options={chartOptions3}></Line></Col>
      </Row>
      <Row>
      
      <Col xs='4'><Line data={chartData4} options={chartOptions4}></Line></Col>
      <Col xs='4'><Line data={chartData5} options={chartOptions5}></Line></Col>
      {/* <Col xs='4'><Line data={chartData6} options={chartOptions6}></Line></Col> */}
    </Row>
    </>
  )
}

function HeroWatch() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [fetchData2, setFetchData2] = useState("");
  const [fetchData3, setFetchData3] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_hero_sales").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_hero_levels").then( 
      res => {
      setFetchData2(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_potions_crafted").then( 
      res => {
      setFetchData3(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData2 === "") return <CardBody><Spinner /></CardBody>;
  if (fetchData3 === "") return <CardBody><Spinner /></CardBody>;

  var limit = 8;
  var xAxisData = []
  var yAxisData = []
  var yAxisData2 = []

  var x2AxisData = []
  var y2AxisData = []
  var y2AxisData2 = []

  var x3AxisData = []
  var y3AxisData = []
  var y3AxisData2 = []

  limit = 8
  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(element.DAY_DATE.substr(0,10))
      yAxisData.push(element.HERO_SALES);
      yAxisData2.push(element.HERO_SALES_JEWEL);
      limit -= 1;
    }
  })
  
  limit = 8
  fetchData2.data.forEach( element => {
    if (limit > 0)
    {
      x2AxisData.push(element.DAY_DATE.substr(0,10))
      y2AxisData.push(element.HERO_LEVEL);
      y2AxisData2.push(element.HERO_LEVEL_JEWEL);
      limit -= 1;
    }
  })

  limit = 8
  fetchData3.data.forEach( element => {
    if (limit > 0)
    {
      x3AxisData.push(element.DAY_DATE.substr(0,10))
      y3AxisData.push(element.POTION_CRAFT_COUNT);
      y3AxisData2.push(element.GOLD_USED);
      limit -= 1;
    }
  })
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
        label: "Daily Hero Sales (Jewels Spent)",
        data: yAxisData2,
        borderColor: 'rgb(0, 155, 0)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
        yAxisID: 'y2',
      },
      {
        type: 'bar',
        label: "Daily Hero Sales",
        data: yAxisData,
        borderColor: 'rgb(115, 23, 54)',
        backgroundColor: 'rgba(115, 23, 54, 0.9)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartData2 = {
    labels: x2AxisData,
    datasets: [
      {
        type: 'line',
        label: "Daily Hero Level-ups (Jewels Spent)",
        data: y2AxisData2,
        borderColor: 'rgb(0, 155, 0)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
        yAxisID: 'y2',
      },
      {
        type: 'bar',
        label: "Daily Hero Level-ups",
        data: y2AxisData,
        borderColor: 'rgb(115, 132, 110)',
        backgroundColor: 'rgba(115, 132, 110, 0.9)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartData3 = {
    labels: x3AxisData,
    datasets: [
      {
        type: 'line',
        label: "Daily Potions Crafted (Gold Spent)",
        data: y3AxisData2,
        borderColor: 'rgba(205, 140, 0, 1)',
        backgroundColor: 'rgba(205, 140, 0, 0.5)',
        yAxisID: 'y2',
      },
      {
        type: 'bar',
        label: "Daily Potions Crafted",
        data: y3AxisData,
        borderColor: 'rgb(115, 32, 10)',
        backgroundColor: 'rgba(115, 32, 10, 0.9)',
        yAxisID: 'y1',
      },
    ],
  };
  
  return (
    <Row>
      <Col xs='4'><Bar data={chartData} options={chartOptions}></Bar></Col>
      <Col xs='4'><Bar data={chartData2} options={chartOptions}></Bar></Col>
      <Col xs='4'><Bar data={chartData3} options={chartOptions}></Bar></Col>
    </Row>
  )
}

function ItemGraph(props) {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  
  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=token_total_supply&token_address="+props.token_address).then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[props.token_address]);

  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;

  var limit = 8;
  var xAxisData = []
  var yAxisData= []

  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(element.DAY_DATE.substr(0,10))
      yAxisData.push(element.SUPPLY);
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
        text: 'Daily New Profiles',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: props.token_name,
        data: yAxisData,
        borderColor: props.token_color,
        backgroundColor: props.token_color,
      }
    ],
  };

  return (
    <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
  )

}

function ItemWatch() {
 
  return (
    <>
    <Row>
        <ItemGraph token_address='0x043f9bd9bb17dfc90de3d416422695dd8fa44486' token_color='rgba(50,50,150,0.8)' token_name="Ragweed" />
        <ItemGraph token_address='0x094243dfabfbb3e6f71814618ace53f07362a84c' token_color='rgba(50,50,150,0.8)' token_name="Redleaf" />
        <ItemGraph token_address='0x1771dec8d9a29f30d82443de0a69e7b6824e2f53' token_color='rgba(50,50,150,0.8)' token_name="Anti-Blind Potion" />
        </Row>
    <Row>
        <ItemGraph token_address='0x19b020001ab0c12ffa93e1fdef90c7c37c8c71ef' token_color='rgba(50,50,150,0.8)' token_name="Mana" />
        
        <ItemGraph token_address='0x19b9f05cde7a61ab7aae5b0ed91aa62ff51cf881' token_color='rgba(50,50,150,0.8)' token_name="Spiderfruit" />
        <ItemGraph token_address='0x2493cfdacc0f9c07240b5b1c4be08c62b8eeff69' token_color='rgba(50,50,150,0.8)' token_name="Silverfin" />
        </Row>
    <Row>
        <ItemGraph token_address='0x24ea0d436d3c2602fbfefbe6a16bbc304c963d04' token_color='rgba(50,50,150,0.8)' token_name="Gaia's Tears" />
        <ItemGraph token_address='0x2789f04d22a845dc854145d3c289240517f2bcf0' token_color='rgba(50,50,150,0.8)' token_name="Health" />
        <ItemGraph token_address='0x372caf681353758f985597a35266f7b330a2a44d' token_color='rgba(50,50,150,0.8)' token_name="ShimmerSkin" />
        </Row>
    <Row>
        <ItemGraph token_address='0x3a4edcf3312f44ef027acfd8c21382a5259936e7' token_color='rgba(50,50,150,0.8)' token_name="Gold" />
        <ItemGraph token_address='0x3db1fd0ad479a46216919758144fd15a21c3e93c' token_color='rgba(50,50,150,0.8)' token_name="Yellow Egg" />
        <ItemGraph token_address='0x600541ad6ce0a8b5dae68f086d46361534d20e80' token_color='rgba(50,50,150,0.8)' token_name="Goldvein" />
        </Row>
    <Row>
        <ItemGraph token_address='0x68ea4640c5ce6cc0c9a1f17b7b882cb1cbeaccd7' token_color='rgba(50,50,150,0.8)' token_name="Darkweed" />
        <ItemGraph token_address='0x6b10ad6e3b99090de20bf9f95f960addc35ef3e2' token_color='rgba(50,50,150,0.8)' token_name="Rockroot" />
        <ItemGraph token_address='0x6d605303e9ac53c59a3da1ece36c9660c7a71da5' token_color='rgba(50,50,150,0.8)' token_name="Green Egg" />
        </Row>
    <Row>
        <ItemGraph token_address='0x6e1bc01cc52d165b357c42042cf608159a2b81c1' token_color='rgba(50,50,150,0.8)' token_name="Ambertaffy" />
        <ItemGraph token_address='0x78aed65a2cc40c7d8b0df1554da60b38ad351432' token_color='rgba(50,50,150,0.8)' token_name="Bloater" />
        <ItemGraph token_address='0x7e120334d9affc0982719a4eacc045f78bf41c68' token_color='rgba(50,50,150,0.8)' token_name="Magic Resistance Potion" />
        </Row>
    <Row>
        <ItemGraph token_address='0x872dd1595544ce22ad1e0174449c7ece6f0bb01b' token_color='rgba(50,50,150,0.8)' token_name="Swiftness Potion" />
        <ItemGraph token_address='0x87361363a75c9a6303ce813d0b2656c34b68ff52' token_color='rgba(50,50,150,0.8)' token_name="Full Health" />
        <ItemGraph token_address='0x8bf4a0888451c6b5412bcad3d9da3dcf5c6ca7be' token_color='rgba(50,50,150,0.8)' token_name="Lantern-Eye" />
        </Row>
    <Row>
        <ItemGraph token_address='0x959ba19508827d1ed2333b1b503bd5ab006c710e' token_color='rgba(50,50,150,0.8)' token_name="Stamina Potion" />
        <ItemGraph token_address='0x95d02c1dc58f05a015275eb49e107137d9ee81dc' token_color='rgba(50,50,150,0.8)' token_name="Grey Egg" />
        <ItemGraph token_address='0x9678518e04fe02fb30b55e2d0e554e26306d0892' token_color='rgba(50,50,150,0.8)' token_name="Blue Egg" />
        </Row>
    <Row>
        <ItemGraph token_address='0xa1f8b0e88c51a45e152934686270ddf4e3356278' token_color='rgba(50,50,150,0.8)' token_name="Anti-Poison Potion" />
        <ItemGraph token_address='0xac5c49ff7e813de1947dc74bbb1720c353079ac9' token_color='rgba(50,50,150,0.8)' token_name="Bluestem" />
        <ItemGraph token_address='0xb80a07e13240c31ec6dc0b5d72af79d461da3a70' token_color='rgba(50,50,150,0.8)' token_name="Sailfish" />
        </Row>
    <Row>
        <ItemGraph token_address='0xc0214b37fcd01511e6283af5423cf24c96bb9808' token_color='rgba(50,50,150,0.8)' token_name="Milkweed" />
        <ItemGraph token_address='0xc5891912718ccffcc9732d1942ccd98d5934c2e1' token_color='rgba(50,50,150,0.8)' token_name="Redgill" />
        <ItemGraph token_address='0xcdffe898e687e941b124dfb7d24983266492ef1d' token_color='rgba(50,50,150,0.8)' token_name="Swift-Thistle" />
      </Row>
      <Row>
        <ItemGraph token_address='0xdc2c698af26ff935cd1c50eef3a4a933c62af18d' token_color='rgba(50,50,150,0.8)' token_name="Full Mana" />
        <ItemGraph token_address='0xe4cfee5bf05cef3418da74cfb89727d8e4fee9fa' token_color='rgba(50,50,150,0.8)' token_name="Ironscale" />
        <ItemGraph token_address='0xfb03c364969a0bb572ce62b8cd616a7ddeb4c09a' token_color='rgba(50,50,150,0.8)' token_name="Toughness Potion" />
        </Row>
        <Row>
        <ItemGraph token_address='0x27dc6aaad95580edf25f8b9676f1b984e09e413d' token_color='rgba(50,50,150,0.8)' token_name="Atonement Crystal" />
        <ItemGraph token_address='0x1f3f655079b70190cb79ce5bc5ae5f19daf2a6cf' token_color='rgba(50,50,150,0.8)' token_name="Lesser Atonement Crystal" />
        {/* <ItemGraph token_address='0xfb03c364969a0bb572ce62b8cd616a7ddeb4c09a' token_color='rgba(50,50,150,0.8)' token_name="Toughness Potion" /> */}
        </Row>
      </>
  )
}

function GameWatch() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [fetchDataHero, setFetchDataHero] = useState("");
  const [fetchDataQuest, setFetchDataQuest] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_new_profiles").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_hero_summons").then( 
      res => {
        setFetchDataHero(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_quest_completed").then( 
      res => {
        setFetchDataQuest(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);
  

  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;
  if (fetchDataHero === "") return <CardBody><Spinner /></CardBody>;
  if (fetchDataQuest === "") return <CardBody><Spinner /></CardBody>;
  
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

  var limit = 8;
  var xAxisData = []
  var yAxisData= []

  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(element.DAY_DATE.substr(0,10))
      yAxisData.push(element.DAILY_NEW_PROFILES);
      limit -= 1;
    }
  })

  var xAxisData2 = []
  var yAxisData2= []
  limit = 8
  fetchDataHero.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData2.push(element.DAY_DATE.substr(0,10))
      yAxisData2.push(element.HERO_SUMMONS);
      limit -= 1;
    }
  })

  var xAxisData3 = []
  var yAxisData3= []
  limit = 8
  fetchDataQuest.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData3.push(element.DAY_DATE.substr(0,10))
      yAxisData3.push(element.QUEST_COMPLETED);
      limit -= 1;
    }
  })
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily New Profiles',
      },
    },
  };

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        label: "Daily New Profiles",
        data: yAxisData,
        borderColor: 'rgb(223, 113, 38)',
        backgroundColor: 'rgba(223, 113, 38, 0.8)',
      }
    ],
  };

  const chartOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Hero Summon Count',
      },
    },
  };

  const chartData2 = {
    labels: xAxisData2,
    datasets: [
      {
        label: "Daily Hero Summon Count",
        data: yAxisData2,
        borderColor: 'rgb(44, 128, 52)',
        backgroundColor: 'rgba(44, 128, 52, 0.8)',
      }
    ],
  };

  const chartOptions3 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Quests Completed',
      },
    },
  };

  const chartData3 = {
    labels: xAxisData3,
    datasets: [
      {
        label: "Daily Quests Completed",
        data: yAxisData3,
        borderColor: 'rgb(25, 132, 168)',
        backgroundColor: 'rgba(25, 132, 168, 0.8)',
      }
    ],
  };

  
  return (
    <Row>
      <Col xs='4'><Bar data={chartData} options={chartOptions}></Bar></Col>
      <Col xs='4'><Bar data={chartData2} options={chartOptions2}></Bar></Col>
      <Col xs='4'><Bar data={chartData3} options={chartOptions3}></Bar></Col>
    </Row>
  )
}


function DefiKingdoms() {
  return (
    <>
    <br></br>
    <Container>
      
      {/* <Alert color="danger">
        Data ingestion has some issues... so the "Game Stats" aren't accurate.. (26-28 Jan 2022)
      </Alert> */}
      <Card>
        <CardImg src="https://aws1.discourse-cdn.com/business7/uploads/harmony1/original/2X/6/68ef6c77e396b64cbf1c4ad9f458e373df9528d2.gif" />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Currency Prices</CardHeader>
        <PriceWatch></PriceWatch> 
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Jewels</CardHeader>
        <BankWatch></BankWatch>
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Liquidity Pools</CardHeader>
        <PoolWatch></PoolWatch>
        <PoolWatch2></PoolWatch2>
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Game Stats</CardHeader>
        <GameWatch></GameWatch>
        <HeroWatch></HeroWatch>
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Circulating Items Inventory</CardHeader>
        <ItemWatch></ItemWatch>
      </Card>
    </Container>
    </>
  );
}

export default DefiKingdoms;

