curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getBlockByNumber",
    "params":[
        "0x16D662B",
        true
    ],
    "id":74
}' -H 'Content-Type:application/json' -X POST 'https://api.harmony.one'