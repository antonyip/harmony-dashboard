import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Spinner,
    Row,
    Col,
} from "reactstrap";

import axios from 'axios'
import { Line } from "react-chartjs-2";

function GenerateChartData(dates, l1, d1, l2, d2, c1,bc1,c2,bc2)
{
  return {
    labels: dates,
    datasets: [
      {
        label: l1,
        data: d1,
        borderColor: c1,
        backgroundColor: bc1,
      },
      {
        label: l2,
        data: d2,
        borderColor: c2,
        backgroundColor: bc2,
      }
    ],
  };
}

function DailyBorrow()
{
  const [data, setData] = useState("")
  useEffect(() => {
    axios.get("https://dfkreport.antonyip.com/tranq-backend/?q=daily_supply_borrow").then(res =>{
      setData(res);
    }).catch(err => {
      console.log(err);
    })
  },[])

  if (data === "") return <div><Spinner /></div>

  var db = {}
  var uniqueDates = {}

  data.data.forEach(element => {
    if ( db[element.TOKEN_SYMBOL] === undefined )
    {
      db[element.TOKEN_SYMBOL] = {}
    }

    db[element.TOKEN_SYMBOL]['p' + element.BLOCK_DATE] = element.PRICE;
    db[element.TOKEN_SYMBOL]['bt' + element.BLOCK_DATE] = element.RUNNING_TOTAL_BORROWED_TOKEN;
    db[element.TOKEN_SYMBOL]['st' + element.BLOCK_DATE] = element.RUNNING_TOTAL_SUPPLIED_TOKEN;
    db[element.TOKEN_SYMBOL]['btu' + element.BLOCK_DATE] = element.RUNNING_TOTAL_BORROWED_USD;
    db[element.TOKEN_SYMBOL]['stu' + element.BLOCK_DATE] = element.RUNNING_TOTAL_SUPPLIED_USD;

    uniqueDates[element.BLOCK_DATE] = 1;
  });

  var dates = []
  var oneBorrowedToken = []
  var oneSuppliedToken = []

  var stoneBorrowedToken = []
  var stoneSuppliedToken = []

  var ethBorrowedToken = []
  var ethSuppliedToken = []

  var btcBorrowedToken = []
  var btcSuppliedToken = []

  var wbtcBorrowedToken = []
  var wbtcSuppliedToken = []

  var usdcBorrowedToken = []
  var usdcSuppliedToken = []

  var usdtBorrowedToken = []
  var usdtSuppliedToken = []

  var daiBorrowedToken = []
  var daiSuppliedToken = []

  for ( var date in uniqueDates )
  {
    dates.push(date.substr(0,10));
    oneBorrowedToken.push(db['ONE']['bt' + date])
    oneSuppliedToken.push(db['ONE']['st' + date])

    stoneBorrowedToken.push(db['stONE']['bt' + date])
    stoneSuppliedToken.push(db['stONE']['st' + date])

    ethBorrowedToken.push(db['1ETH']['bt' + date])
    ethSuppliedToken.push(db['1ETH']['st' + date])

    btcBorrowedToken.push(db['1BTC']['bt' + date])
    btcSuppliedToken.push(db['1BTC']['st' + date])

    wbtcBorrowedToken.push(db['1WBTC']['bt' + date])
    wbtcSuppliedToken.push(db['1WBTC']['st' + date])

    usdcBorrowedToken.push(db['1USDC']['bt' + date])
    usdcSuppliedToken.push(db['1USDC']['st' + date])

    usdtBorrowedToken.push(db['1USDT']['bt' + date])
    usdtSuppliedToken.push(db['1USDT']['st' + date])

    daiBorrowedToken.push(db['1DAI']['bt' + date])
    daiSuppliedToken.push(db['1DAI']['st' + date])
  }


  const chartData1 = GenerateChartData(dates,"Borrow", oneBorrowedToken, "Supply",oneSuppliedToken,       "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData2 = GenerateChartData(dates,"Borrow", stoneBorrowedToken, "Supply",stoneSuppliedToken, "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData3 = GenerateChartData(dates,"Borrow", ethBorrowedToken, "Supply",ethSuppliedToken,       "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData4 = GenerateChartData(dates,"Borrow", btcBorrowedToken, "Supply",btcSuppliedToken,       "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData5 = GenerateChartData(dates,"Borrow", wbtcBorrowedToken, "Supply",wbtcSuppliedToken,   "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData6 = GenerateChartData(dates,"Borrow", usdcBorrowedToken, "Supply",usdcSuppliedToken,   "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData7 = GenerateChartData(dates,"Borrow", usdtBorrowedToken, "Supply",usdtSuppliedToken,   "#3645A8","#7F8FF5","#A89247","#FFE89E",)
  const chartData8 = GenerateChartData(dates,"Borrow", daiBorrowedToken, "Supply",daiSuppliedToken,       "#3645A8","#7F8FF5","#A89247","#FFE89E",)


  return (
  <Container>
    <Row xs='12'>
      <Col xs='6'>ONE<Line data={chartData1} /></Col>
      <Col xs='6'>stONE<Line data={chartData2} /></Col>
    </Row>
    <br/>
    <Row xs='12'>
      <Col xs='4'>1ETH<Line data={chartData3} /></Col>
      <Col xs='4'>1BTC<Line data={chartData4} /></Col>
      <Col xs='4'>1WBTC<Line data={chartData5} /></Col>
    </Row>
    <br/>
    <Row xs='12'>
      <Col xs='4'>1USDC<Line data={chartData6} /></Col>
      <Col xs='4'>1USDT<Line data={chartData7} /></Col>
      <Col xs='4'>1DAI<Line data={chartData8} /></Col>
    </Row>
  </Container>
    );
}

function Tranquil() {
  return (
    <Container>
      <Card>
        <CardHeader>Tranquil Finance</CardHeader>
        <CardBody>
          Total Value Locked ?
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardHeader>Supply / Borrow</CardHeader>
        <CardBody>
          <DailyBorrow />
        </CardBody>
      </Card>
    </Container>
  );
}

export default Tranquil;
