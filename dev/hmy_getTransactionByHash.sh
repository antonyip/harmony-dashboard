curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getTransactionByHash",
    "params":[
        "0x454679b09374b2ead77787b8fcd6ad048e5e25d38dd03675ba0c70a50e30a21a"
    ],
    "id":74456546
}' -H 'Content-Type:application/json' -X POST 'https://api.harmony.one'