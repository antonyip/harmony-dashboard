#!/bin/bash
curl -H 'Content-Type:application/json' -X POST "https://a.api.s0.t.hmny.io" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x5f753dcdf9b1ad9aabc1346614d1f4746fd6ce5c",
            "data": "0x21d801110000000000000000000000000000000000000000000000000000000000077012"
        },
        "24255329"
    ],
    "id": 1
}'
