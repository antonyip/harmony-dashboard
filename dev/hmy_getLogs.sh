curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getLogs",
    "params":[
        {
            "fromBlock": "0x15F1D1D",
            "toBlock": "0x15F1D1D"
        }
    ],
    "id":74
}' -H 'Content-Type:application/json' -X POST 'https://api.harmony.one'