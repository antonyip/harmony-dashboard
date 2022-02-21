#!/bin/bash
curl -H 'Content-Type:application/json' -X POST "https://api.harmony.one" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x89885b7b603492c76fd48c9db676537504e3ead0",
            "data": "0x745cc33a"
        },
        "latest"
    ],
    "id": 1
}'
