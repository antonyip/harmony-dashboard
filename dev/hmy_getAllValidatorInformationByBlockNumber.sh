curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getAllValidatorInformationByBlockNumber",
    "params":[1,"latest"],
    "id":1
}' -H 'Content-Type:application/json' -X POST 'https://api.fuzz.fi'