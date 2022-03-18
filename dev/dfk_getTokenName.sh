#!/bin/bash
echo "token_name"
## LOWER CASE ADDRESES ONLY OR IT DONT WORK
curl -H 'Content-Type:application/json' -X POST "https://api.harmony.one" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x5da2effe9857dcecb786e13566ff37b92e1e6862",
            "data": "0x06fdde03"
        },
        "latest"
    ],
    "id": 1
}'
