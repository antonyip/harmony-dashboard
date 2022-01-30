import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Alert,
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
    responsive: false,
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
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          type: 'linear',
          display: false,
          position: 'right',
          grid: {
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
        label: options.y1Name,
        data: options.data1,
        borderColor: 'rgba(0, 155, 0, 0.5)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: options.y2Name,
        data: options.data2,
        borderColor: options.y2Color,
        backgroundColor: options.y2Color,
        yAxisID: 'y2',
      }
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
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

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
  const [unlockedJewelSupply, setUnlockedJewelSupply] = useState(100);
  const [lockedJewelSupply, setLockedJewelSupply] = useState(100);
  const [lpJewelSupply, setLpJewelSupply] = useState(100);
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
  if (fetchData === "") return <CardBody>Loading...</CardBody>;


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

  var jQuestRewards = 2387129;
  var jDevTeam = 6784755 +  4822886;
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
  const [unlockedJewelSupply, setUnlockedJewelSupply] = useState(100)
  const [lpJewelSupply,setLpJewelSupply] = useState(100)
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
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

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

  var jQuestRewards = 2387129;
  var jDevTeam = 6784755 + 4822886;
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
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

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


  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;
  if (fetchData2 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData3 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData4 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData5 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData6 === "") return <CardBody>Loading...</CardBody>;

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
    <Row>
        <Col xs='2'><Line data={chartData} options={chartOptions}></Line></Col>
        <Col xs='2'><Line data={chartData2} options={chartOptions2}></Line></Col>
        <Col xs='2'><Line data={chartData3} options={chartOptions3}></Line></Col>
        <Col xs='2'><Line data={chartData4} options={chartOptions4}></Line></Col>
        <Col xs='2'><Line data={chartData5} options={chartOptions5}></Line></Col>
        <Col xs='2'><Line data={chartData6} options={chartOptions6}></Line></Col> 
    </Row>
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


  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;
  if (fetchData2 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData3 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData4 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData5 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData6 === "") return <CardBody>Loading...</CardBody>;

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
    <Row>
      <Col xs='1'></Col>
      <Col xs='2'><Line data={chartData} options={chartOptions}></Line></Col>
      <Col xs='2'><Line data={chartData2} options={chartOptions2}></Line></Col>
      <Col xs='2'><Line data={chartData3} options={chartOptions3}></Line></Col>
      <Col xs='2'><Line data={chartData4} options={chartOptions4}></Line></Col>
      <Col xs='2'><Line data={chartData5} options={chartOptions5}></Line></Col>
      {/* <Col xs='2'><Line data={chartData6} options={chartOptions6}></Line></Col> */}
    </Row>
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

  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;
  if (fetchData2 === "") return <CardBody>Loading...</CardBody>;
  if (fetchData3 === "") return <CardBody>Loading...</CardBody>;

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
      //y3AxisData2.push(element.HERO_LEVEL_JEWEL);
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
      // {
      //   type: 'line',
      //   label: "Daily Hero Level-ups (Jewels Spent)",
      //   data: y2AxisData2,
      //   borderColor: 'rgb(0, 155, 0)',
      //   backgroundColor: 'rgba(0, 155, 0, 0.5)',
      //   yAxisID: 'y2',
      // },
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

function QuestWatch() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_new_profiles").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

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
        label: "Daily New Profiles",
        data: yAxisData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  
  return (
    <Row>
      <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
      <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
      <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
    </Row>
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
  

  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;
  if (fetchDataHero === "") return <CardBody>Loading...</CardBody>;
  if (fetchDataQuest === "") return <CardBody>Loading...</CardBody>;
  
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
    <div>
      <Alert color="danger">
        Data ingestion has some issues... so the "Game Stats" aren't accurate.. (26-28 Jan 2022)
      </Alert>
      <Card>
        <CardHeader>DefiKingdoms - Currency Prices</CardHeader>
        <PriceWatch></PriceWatch> 
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Jewels</CardHeader>
        <BankWatch></BankWatch>
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Liquidity Pools</CardHeader>
        <PoolWatch></PoolWatch>
        <PoolWatch2></PoolWatch2>
      </Card>
      <Card>
        <CardHeader>DefiKingdoms - Game Stats</CardHeader>
        <GameWatch></GameWatch>
        {/* <QuestWatch></QuestWatch> */}
        <HeroWatch></HeroWatch>
      </Card>
    </div>
  );
}

export default DefiKingdoms;

