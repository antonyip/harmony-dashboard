curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getAllValidatorInformation",
    "params":[1],
    "id":1
}' -H 'Content-Type:application/json' -X POST 'https://api.fuzz.fi'