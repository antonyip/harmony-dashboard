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
  BarElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

function PriceCol(props) {

  var xAxisData = []
  var yAxisData = []
  var limit = 7;
  props.data.data.forEach(element => {
    if (limit > 0)
    {
      if (props.type === 'Jewel')
      {
        xAxisData.push(element.JEWEL_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'GaiaTear')
      {
        xAxisData.push(element.GAIA_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'ShvaRune')
      {
        xAxisData.push(element.RUNE_PRICE)
        yAxisData.push(element.MDDATE.substr(0,10))
      }
      if (props.type === 'Gold')
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
      <PriceCol type='Jewel' data={fetchData}></PriceCol>
      <PriceCol type='GaiaTear' data={fetchData}></PriceCol>
      <PriceCol type='ShvaRune' data={fetchData}></PriceCol>
      <PriceCol type='Gold' data={fetchData}></PriceCol>
    </Row>
  )
}

function BankPie() {

  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");
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
  var jBank = 16851601;
  var jLP = lpJewelSupply;
  var jLocked = lockedJewelSupply
  var jWallet = unlockedJewelSupply - jDevTeam - jBank - jLP - jQuestRewards
  const pieData = {
    labels: ['DevTeam', 'Bank', 'LP', 'Players', 'QuestRewards', 'Locked'],
    datasets: [
      {
        label: '# of Votes',
        data: [jDevTeam, jBank, jLP, jWallet, jQuestRewards, jLocked],
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

  return (
    <Pie data={pieData} options={pieChartOptions}/>
  )
}

function BankPie2() {
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
  var jBank = 16851601;
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

/*
// balance = jewels, total supply = xjewels
{"ratio":1.6543417801800981,"balance":15549588.234933916,"timestamp":1641686524792,"totalSupply":9399259.82721728}
*/
  return (
    <Row>
      <Col xs='2'><BankPie/></Col>
      <Col xs='4'><Line options={chartOptions} data={chartDataTotalJewel} /></Col>
      <Col xs='4'><Line options={chartOptions} data={chartDataRatio} /></Col>
      <Col xs='2'><BankPie2/></Col>
    </Row>
  );
}

function PoolWatch() {
  const [error, setError] = useState(false);
  const [fetchData, setFetchData] = useState("");

  useEffect( () => {
    axios.get("https://dfkreport.antonyip.com/dfk-backend/?q=daily_jewel_one_lp").then( 
      res => {
      setFetchData(res);
    }).catch( err => {
      console.log(err)
      setError(true);
    })
  } ,[]);

  if (error) return <CardBody>Error Loading...</CardBody>;
  if (fetchData === "") return <CardBody>Loading...</CardBody>;

  var limit = 7;
  var xAxisData = []
  var yAxisData1= []
  var yAxisData2= []

  fetchData.data.forEach( element => {
    if (limit > 0)
    {
      xAxisData.push(element.DAY_DATE.substr(0,10))
      yAxisData1.push(element.JEWEL);
      yAxisData2.push(element.WONE);
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
        text: 'JEWEL-ONE LP',
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
          display: true,
          position: 'right',
          grid: {
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
        label: "Jewel",
        data: yAxisData1,
        borderColor: 'rgb(0, 99, 0)',
        backgroundColor: 'rgba(0, 99, 0, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: "One",
        data: yAxisData2,
        borderColor: 'rgb(0, 0, 132)',
        backgroundColor: 'rgba(0, 0, 132, 0.5)',
        yAxisID: 'y2',
      }
    ],
  };

  const chartData2 = {
    labels: xAxisData,
    datasets: [
      {
        label: "Jewel-tmp",
        data: yAxisData1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "One-tmp",
        data: yAxisData2,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  
  return (
    <Row>
      <Col xs='4'><Line data={chartData} options={chartOptions}></Line></Col>
      <Col xs='4'><Line data={chartData2} options={chartOptions}></Line></Col>
      <Col xs='4'><Line data={chartData2} options={chartOptions}></Line></Col>
    </Row>
  )
}

function HeroWatch() {
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

  var limit = 7;
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

  var limit = 7;
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

  var limit = 7;
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
  limit = 7
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
  limit = 7
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        <GameWatch></GameWatch>
        <QuestWatch></QuestWatch>
        <HeroWatch></HeroWatch>
      </Card>
    </div>
  );
}

export default DefiKingdoms;

