curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getAllValidatorAddresses",
    "params":[],
    "id":1
}' -H 'Content-Type:application/json' -X POST 'https://api.fuzz.fi'