#!/bin/bash
curl -H 'Content-Type:application/json' -X POST "https://api.harmony.one" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x9678518e04fe02fb30b55e2d0e554e26306d0892",
            "data": "0x18160ddd"
        },
        "latest"
    ],
    "id": 1
}'
