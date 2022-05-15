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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
}

function generateLPChartData(options)
{
  return {
    labels: options.xAxis,
    datasets: [
      {
        type:'line',
        label: options.y1Name,
        data: options.data1,
        borderColor: 'rgba(0, 155, 0, 0.5)',
        backgroundColor: 'rgba(0, 155, 0, 0.5)',
        yAxisID: 'y1',
      },
      {
        type:'line',
        label: options.y2Name,
        data: options.data2,
        borderColor: options.y2Color,
        backgroundColor: options.y2Color,
        yAxisID: 'y2',
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
    <Col md={3}>
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
  if (fetchData === "") return (
    <Row>
      <Col md={3}><Spinner/></Col>
      <Col md={3}><Spinner/></Col>
      <Col md={3}><Spinner/></Col>
      <Col md={3}><Spinner/></Col>
    </Row>
    );

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

  // dfk specific

  const [questWallet,setQuestWallet] = useState(2500000)
  useEffect( () => {
    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0x70a082310000000000000000000000005ca5bcd91929c7152ca577e8c001c9b5a185f568"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
      setQuestWallet(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);
  
  // dev fund
  const [devWallet,setDevWallet] = useState(7000000)
  useEffect( () => {
    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0x70a08231000000000000000000000000a4b9a93013a5590db92062cf58d4b0ab4f35dbfb"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
        setDevWallet(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);
  
  
  
  // marketing fund
  const [marketWallet,setMarketWallet] = useState(5000000)
  useEffect( () => {
    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0x70a082310000000000000000000000003875e5398766a29c1b28cc2068a0396cba36ef99"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
        setMarketWallet(parseInt(res.data.result,16)/10**18)
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);
  
  
  
  //team payment
  const [teamWallet,setTeamWallet] = useState(500000)
  useEffect( () => {
    // unlockedSupply
    axios.post("https://api.harmony.one",{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0x70a082310000000000000000000000002b12d9a2480d6dd9f71dabaa366c87134195b679"
        },
        "latest"
    ],
    "id": 1
    }).then( 
      res => {
        setTeamWallet(parseInt(res.data.result,16)/10**18)
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

  
  var jQuestRewards = questWallet;
  var jDevTeam = devWallet +  marketWallet + teamWallet;
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

    // dfk specific

    const [questWallet,setQuestWallet] = useState(2500000)
    useEffect( () => {
      // unlockedSupply
      axios.post("https://api.harmony.one",{
      "jsonrpc": "2.0",
      "method": "hmy_call",
      "params": [
          {
              "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
              "data": "0x70a082310000000000000000000000005ca5bcd91929c7152ca577e8c001c9b5a185f568"
          },
          "latest"
      ],
      "id": 1
      }).then( 
        res => {
        setQuestWallet(parseInt(res.data.result,16)/10**18)
      }).catch( err => {
        console.log(err)
        setError(true);
      })
    } ,[]);
    
    // dev fund
    const [devWallet,setDevWallet] = useState(7000000)
    useEffect( () => {
      // unlockedSupply
      axios.post("https://api.harmony.one",{
      "jsonrpc": "2.0",
      "method": "hmy_call",
      "params": [
          {
              "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
              "data": "0x70a08231000000000000000000000000a4b9a93013a5590db92062cf58d4b0ab4f35dbfb"
          },
          "latest"
      ],
      "id": 1
      }).then( 
        res => {
          setDevWallet(parseInt(res.data.result,16)/10**18)
      }).catch( err => {
        console.log(err)
        setError(true);
      })
    } ,[]);
    
    
    
    // marketing fund
    const [marketWallet,setMarketWallet] = useState(5000000)
    useEffect( () => {
      // unlockedSupply
      axios.post("https://api.harmony.one",{
      "jsonrpc": "2.0",
      "method": "hmy_call",
      "params": [
          {
              "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
              "data": "0x70a082310000000000000000000000003875e5398766a29c1b28cc2068a0396cba36ef99"
          },
          "latest"
      ],
      "id": 1
      }).then( 
        res => {
          setMarketWallet(parseInt(res.data.result,16)/10**18)
      }).catch( err => {
        console.log(err)
        setError(true);
      })
    } ,[]);
    
    
    
    //team payment
    const [teamWallet,setTeamWallet] = useState(500000)
    useEffect( () => {
      // unlockedSupply
      axios.post("https://api.harmony.one",{
      "jsonrpc": "2.0",
      "method": "hmy_call",
      "params": [
          {
              "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
              "data": "0x70a082310000000000000000000000002b12d9a2480d6dd9f71dabaa366c87134195b679"
          },
          "latest"
      ],
      "id": 1
      }).then( 
        res => {
          setTeamWallet(parseInt(res.data.result,16)/10**18)
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

  var jQuestRewards = questWallet; // rough estimate based on kingdom watch  TODO: pull data from blockchain
  var jDevTeam = devWallet + marketWallet + teamWallet; // rough estimate based on kingdom watch  TODO: pull data from blockchain
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
      <Col md={2}><BankPie bank={yAxisDataBalance[yAxisDataBalance.length - 1]}/></Col>
      <Col md={4}><Line options={chartOptions} data={chartDataTotalJewel} /></Col>
      <Col md={4}><Line options={chartOptions} data={chartDataRatio} /></Col>
      <Col md={2}><BankPie2 bank={yAxisDataBalance[yAxisDataBalance.length - 1]}/></Col>
    </Row>
  );
}

function LPPool(props)
{
  const dataElementName = props.dataElementName;
  const backendAPI = props.backendAPI;
  const chartElementName = props.chartElementName;
  const chartElementColor = props.chartElementColor;

  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
  useEffect( () => {
    axios.get(backendAPI).then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[backendAPI]);

  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;

  var xAxisData = []
  var yAxisData1= []
  var yAxisData2= []

  var limit = 8;
  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(element.DAY_DATE.substr(0,10))
      yAxisData1.push(element.JEWEL);
      yAxisData2.push(element[dataElementName]);
      limit -= 1;
    }
  })

  const chartOptions = generateLPChartOptions("JEWEL-" + chartElementName + " LP")
  const chartData = generateLPChartData({
    xAxis: xAxisData,
    y2Color: chartElementColor,
    data1: yAxisData1,
    data2: yAxisData2,
    y1Name: "JEWEL",
    y2Name: chartElementName})

  return (
    <Line data={chartData} options={chartOptions}></Line>
  )
}

function PoolWatch() {
  
  return (
    <>
    <Row>
      <Col md={4}>
        <LPPool dataElementName="WONE"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_one_lp'
                chartElementName = "ONE"
                chartElementColor = "rgba(10, 175, 225, 0.5)"
        />
      </Col>
      <Col md={4}>
        <LPPool dataElementName="WMATIC"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_wmatic_lp'
                chartElementName = "MATIC"
                chartElementColor = "rgba(130, 71, 240, 0.5)"
        />
      </Col>
    </Row>
    <Row>
      <Col md={4}>
        <LPPool dataElementName="BNB"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_bscbnb_lp'
                chartElementName = "BNB"
                chartElementColor = "rgba(235, 180, 46, 0.5)"
        />
      </Col>
      <Col md={4}>
        <LPPool dataElementName="BUSD"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_busd_lp'
                chartElementName = "BUSD"
                chartElementColor = "rgba(200, 150, 25, 0.5)"
        />
      </Col>
      <Col md={4}>
        <LPPool dataElementName="AVAX"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_avax_lp'
                chartElementName = "AVAX"
                chartElementColor = "rgba(232, 60, 60, 0.5)"
        />
      </Col>
    </Row>
    <Row>
      <Col md={4}>
        <LPPool dataElementName="FTM"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_ftm_lp'
                chartElementName = "FTM"
                chartElementColor = "rgba(30, 100, 255, 0.5)"
        />
      </Col>
      <Col md={4}>
        <LPPool dataElementName="USDC"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1usdc_lp'
                chartElementName = "USDC"
                chartElementColor = "rgba(40, 120, 200, 0.5)"
        />
      </Col>
      <Col md={4}>
        <LPPool dataElementName="ETH"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1eth_lp'
                chartElementName = "ETH"
                chartElementColor = "rgba(114, 114, 114, 0.5)"
        />
      </Col>
      </Row>
      <Row>
      <Col md={4}>
        <LPPool dataElementName="BTC"
                backendAPI = 'https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_1btc_lp'
                chartElementName = "BTC"
                chartElementColor = "rgba(240, 140, 25, 0.5)"
        />
      </Col>
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
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_hero_levels").then( 
      res => {
      setFetchData2(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
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
      <Col md={4}><Bar data={chartData} options={chartOptions}></Bar></Col>
      <Col md={4}><Bar data={chartData2} options={chartOptions}></Bar></Col>
      <Col md={4}><Bar data={chartData3} options={chartOptions}></Bar></Col>
    </Row>
  )
}

function ItemGraph(props) {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  const token_decimals = props.token_decimals ? props.token_decimals : 0;
  
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
      yAxisData.push(element.SUPPLY / 10**token_decimals);
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
        label: props.token_name,
        data: yAxisData,
        borderColor: props.token_color,
        backgroundColor: props.token_color,
      }
    ],
  };

  return (
    <Col md={6} lg={4}><Line data={chartData} options={chartOptions}></Line></Col>
  )

}

function ItemWatch() {
 
  return (
    <Row>
      {
         [
          ['0x043f9bd9bb17dfc90de3d416422695dd8fa44486',0,'rgba(50,50,150,0.8)',"Ragweed"],
          ['0x094243dfabfbb3e6f71814618ace53f07362a84c',0,'rgba(50,50,150,0.8)',"Redleaf"],
          ['0x1771dec8d9a29f30d82443de0a69e7b6824e2f53',0,'rgba(50,50,150,0.8)',"Anti-Blind Potion"],
          ['0x19b020001ab0c12ffa93e1fdef90c7c37c8c71ef',0,'rgba(50,50,150,0.8)',"Mana"],
          ['0x19b9f05cde7a61ab7aae5b0ed91aa62ff51cf881',0,'rgba(50,50,150,0.8)',"Spiderfruit"],
          ['0x2493cfdacc0f9c07240b5b1c4be08c62b8eeff69',0,'rgba(50,50,150,0.8)',"Silverfin"],
          ['0x24ea0d436d3c2602fbfefbe6a16bbc304c963d04',0,'rgba(50,50,150,0.8)',"Gaia's Tears"],
          ['0x2789f04d22a845dc854145d3c289240517f2bcf0',0,'rgba(50,50,150,0.8)',"Health"],
          ['0x372caf681353758f985597a35266f7b330a2a44d',0,'rgba(50,50,150,0.8)',"ShimmerSkin"],
          ['0x3a4edcf3312f44ef027acfd8c21382a5259936e7',3,'rgba(50,50,150,0.8)',"Gold"],
          ['0x3db1fd0ad479a46216919758144fd15a21c3e93c',0,'rgba(50,50,150,0.8)',"Yellow Egg"],
          ['0x600541ad6ce0a8b5dae68f086d46361534d20e80',0,'rgba(50,50,150,0.8)',"Goldvein"],
          ['0x68ea4640c5ce6cc0c9a1f17b7b882cb1cbeaccd7',0,'rgba(50,50,150,0.8)',"Darkweed"],
          ['0x6b10ad6e3b99090de20bf9f95f960addc35ef3e2',0,'rgba(50,50,150,0.8)',"Rockroot"],
          ['0x6d605303e9ac53c59a3da1ece36c9660c7a71da5',0,'rgba(50,50,150,0.8)',"Green Egg"],
          ['0x6e1bc01cc52d165b357c42042cf608159a2b81c1',0,'rgba(50,50,150,0.8)',"Ambertaffy"],
          ['0x78aed65a2cc40c7d8b0df1554da60b38ad351432',0,'rgba(50,50,150,0.8)',"Bloater"],
          ['0x7e120334d9affc0982719a4eacc045f78bf41c68',0,'rgba(50,50,150,0.8)',"Magic Resistance Potion"],
          ['0x872dd1595544ce22ad1e0174449c7ece6f0bb01b',0,'rgba(50,50,150,0.8)',"Swiftness Potion"],
          ['0x87361363a75c9a6303ce813d0b2656c34b68ff52',0,'rgba(50,50,150,0.8)',"Full Health"],
          ['0x8bf4a0888451c6b5412bcad3d9da3dcf5c6ca7be',0,'rgba(50,50,150,0.8)',"Lantern-Eye"],
          ['0x959ba19508827d1ed2333b1b503bd5ab006c710e',0,'rgba(50,50,150,0.8)',"Stamina Potion"],
          ['0x95d02c1dc58f05a015275eb49e107137d9ee81dc',0,'rgba(50,50,150,0.8)',"Grey Egg"],
          ['0x9678518e04fe02fb30b55e2d0e554e26306d0892',0,'rgba(50,50,150,0.8)',"Blue Egg"],
          ['0xa1f8b0e88c51a45e152934686270ddf4e3356278',0,'rgba(50,50,150,0.8)',"Anti-Poison Potion"],
          ['0xac5c49ff7e813de1947dc74bbb1720c353079ac9',0,'rgba(50,50,150,0.8)',"Bluestem"],
          ['0xb80a07e13240c31ec6dc0b5d72af79d461da3a70',0,'rgba(50,50,150,0.8)',"Sailfish"],
          ['0xc0214b37fcd01511e6283af5423cf24c96bb9808',0,'rgba(50,50,150,0.8)',"Milkweed"],
          ['0xc5891912718ccffcc9732d1942ccd98d5934c2e1',0,'rgba(50,50,150,0.8)',"Redgill"],
          ['0xcdffe898e687e941b124dfb7d24983266492ef1d',0,'rgba(50,50,150,0.8)',"Swift-Thistle"],
          ['0xdc2c698af26ff935cd1c50eef3a4a933c62af18d',0,'rgba(50,50,150,0.8)',"Full Mana"],
          ['0xe4cfee5bf05cef3418da74cfb89727d8e4fee9fa',0,'rgba(50,50,150,0.8)',"Ironscale"],
          ['0xfb03c364969a0bb572ce62b8cd616a7ddeb4c09a',0,'rgba(50,50,150,0.8)',"Toughness Potion"],
          ['0x27dc6aaad95580edf25f8b9676f1b984e09e413d',0,'rgba(50,50,150,0.8)',"Atonement Crystal"],
          ['0x1f3f655079b70190cb79ce5bc5ae5f19daf2a6cf',0,'rgba(50,50,150,0.8)',"Lesser Atonement Crystal"],
          ['0x9edb3da18be4b03857f3d39f83e5c6aad67bc148',0,'rgba(50,50,150,0.8)',"Golden Egg"],
          ['0x6d4f4bc32df561a35c05866051cbe9c92759da29',0,'rgba(50,50,150,0.8)',"Lesser Chaos Stone"],
          ['0x17f3b5240c4a71a3bbf379710f6fa66b9b51f224',0,'rgba(50,50,150,0.8)',"Greater Atonement Crystal"],
          ['0x8f655142104478724bbc72664042ea09ebbf7b38',0,'rgba(50,50,150,0.8)',"Moksha Rune"],
          ['0xab464901afbc61bac440a97fa568ac42885da58b',0,'rgba(50,50,150,0.8)',"Lesser Might Crystal"],
          ['0xb368f69be6eda74700763672aeb2ae63f3d20ae6',0,'rgba(50,50,150,0.8)',"Might Crystal"],
          ['0x39927a2cee5580d63a163bc402946c7600300373',0,'rgba(50,50,150,0.8)',"Lesser Finesse Crystal"],
          ['0xc6a58efc320a7afdb1cd662eaf6de10ee17103f2',0,'rgba(50,50,150,0.8)',"Finesse Crystal"],
          ['0xf5c26f2f34e9245c3a9ea0b0e7ea7b33e6404da0',0,'rgba(50,50,150,0.8)',"Lesser Swiftness Crystal"],
          ['0x5d7f20e3b0f1406bf038175218ea7e9b4838908c',0,'rgba(50,50,150,0.8)',"Swiftness Crystal"],
          ['0x0d8403e47445db9e316e36f476dacd5827220bdd',0,'rgba(50,50,150,0.8)',"Lesser Vigor Crystal"],
          ['0xbba50bd111dc586fd1f2b1476b6ec505800a3fd0',0,'rgba(50,50,150,0.8)',"Vigor Crystal"],
          ['0x3017609b9a59b77b708d783835b6ff94a3d9e337',0,'rgba(50,50,150,0.8)',"Lesser Fortitude Crystal"],
          ['0x603919aeb55eb13f9cde94274fc54ab2bd2dece7',0,'rgba(50,50,150,0.8)',"Fortitude Crystal"],
          ['0x17ff2016c9eccfbf4fc4da6ef95fe646d2c9104f',0,'rgba(50,50,150,0.8)',"Lesser Wit Crystal"],
          ['0x3619fc2386fbbc19ddc39d29a72457e758cfad69',0,'rgba(50,50,150,0.8)',"Wit Crystal"],
          ['0xc63b76f710e9973b8989678eb16234cfadc8d9db',0,'rgba(50,50,150,0.8)',"Lesser Insight Crystal"],
          ['0x117e60775584cdfa4f414e22b075f31cc9c3207c',0,'rgba(50,50,150,0.8)',"Insight Crystal"],
          ['0x13af184aea970fe79e3bb7a1b0b156b195fb1f40',0,'rgba(50,50,150,0.8)',"Lesser Fortune Crystal"],
          ['0x6d777c64f0320d8a5b31be0fdeb694007fc3ed45',0,'rgba(50,50,150,0.8)',"Fortune Crystal"],
          ['0xe4e7c0c693d8a7fc159776a993495378705464a7',0,'rgba(50,50,150,0.8)',"Lesser Might Stone"],
          ['0xe7f6ea1ce7bbebc9f2cf080010dd938d2d8d8b1b',0,'rgba(50,50,150,0.8)',"Might Stone"],
          ['0xbb5614d466b77d50dded994892dfe6f0aca4eebb',0,'rgba(50,50,150,0.8)',"Lesser Finesse Stone"],
          ['0xd0b689cb5de0c15792aa456c89d64038c1f2eedc',0,'rgba(50,50,150,0.8)',"Finesse Stone"],
          ['0xd9a8abc0ce1adc23f1c1813986c9a9c21c9e7510',0,'rgba(50,50,150,0.8)',"Lesser Swiftness Stone"],
          ['0x08f362517ad4119d93bbcd20825c2e4119abb495',0,'rgba(50,50,150,0.8)',"Swiftness Stone"],
          ['0xb00cbf5cd5e7b321436c2d3d8078773522d2f073',0,'rgba(50,50,150,0.8)',"Lesser Vigor Stone"],
          ['0x9df75917ac9747b4a70fa033e4b0182d85b62857',0,'rgba(50,50,150,0.8)',"Vigor Stone"],
          ['0x1f57eb682377f5ad6276b9315412920bdf9530f6',0,'rgba(50,50,150,0.8)',"Lesser Fortitude Stone"],
          ['0x17fa96ba9d9c29e4b96d29a7e89a4e7b240e3343',0,'rgba(50,50,150,0.8)',"Fortitude Stone"],
          ['0x4ff7a020ec1100d36d5c81f3d4815f2e9c704b59',0,'rgba(50,50,150,0.8)',"Lesser Wit Stone"],
          ['0x939ea05c81aac48f7c10bdb08615082b82c80c63',0,'rgba(50,50,150,0.8)',"Wit Stone"],
          ['0x762b98b3758d0a5eb95b3e4a1e2914ce0a80d99c',0,'rgba(50,50,150,0.8)',"Lesser Insight Stone"],
          ['0x9d71bb9c781fc2ebdd3d6cb709438e3c71200149',0,'rgba(50,50,150,0.8)',"Insight Stone"],
          ['0x6d6ea1d2dc1df6eaa2153f212d25cf92d13be628',0,'rgba(50,50,150,0.8)',"Lesser Fortune Stone"],
          ['0x5da2effe9857dcecb786e13566ff37b92e1e6862',0,'rgba(50,50,150,0.8)',"Fortune Stone"],
          ['0x45b53e55b5c0a10fdd4fe2079a562d5702f3a033',0,'rgba(50,50,150,0.8)',"Chaos Crystal"],
          ['0xa509c34306adf6168268a213cc47d336630bf101',0,'rgba(50,50,150,0.8)',"Lesser Chaos Crystal"],
          ['0x3633f956410163a98d58d2d928b38c64a488654e',0,'rgba(50,50,150,0.8)',"Chaos Stone"],
        ].sort((a,b) => { return a[3]<b[3] ? -1 : 1; }).map( n => {
            return (
                <ItemGraph token_address={n[0]} token_decimals={n[1]} token_color={n[2]} token_name={n[3]}/>
            );
        })
        }
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
  

  if (error) return <CardBody>Error <Spinner /></CardBody>;
  if (fetchData === "") return <CardBody><Spinner /></CardBody>;
  if (fetchDataHero === "") return <CardBody><Spinner /></CardBody>;
  if (fetchDataQuest === "") return <CardBody><Spinner /></CardBody>;

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
      <Col md={4}><Bar data={chartData} options={chartOptions}></Bar></Col>
      <Col md={4}><Bar data={chartData2} options={chartOptions2}></Bar></Col>
      <Col md={4}><Bar data={chartData3} options={chartOptions3}></Bar></Col>
    </Row>
  )
}


function DefiKingdoms() {
  return (
    <Container>
      <Card>
        <CardImg src="https://aws1.discourse-cdn.com/business7/uploads/harmony1/original/2X/6/68ef6c77e396b64cbf1c4ad9f458e373df9528d2.gif" />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Currency Prices</CardHeader>
        <PriceWatch />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Jewels</CardHeader>
        <BankWatch />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Liquidity Pools</CardHeader>
        <PoolWatch />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Game Stats</CardHeader>
        <GameWatch />
        <HeroWatch />
      </Card>
      <br></br>
      <Card>
        <CardHeader>DefiKingdoms - Circulating Items Inventory</CardHeader>
        <ItemWatch />
      </Card>
    </Container>
  );
}

export default DefiKingdoms;

