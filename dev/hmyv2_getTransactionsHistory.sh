curl -d '{
    "jsonrpc": "2.0",
    "method": "hmyv2_getTransactionsHistory",
    "params": [{
        "address": "0x0Ba43bAe4613E03492e4C17Af3B014B6c3202B9d",
        "pageIndex": 0,
        "pageSize": 10,
        "fullTx": true,
        "txType": "ALL",
        "order": "DESC"
    }],
    "id": 1
}' -H 'Content-Type:application/json' -X POST 'https://api.harmony.one'