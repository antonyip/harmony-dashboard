#!/bin/bash
curl -H 'Content-Type:application/json' -X POST "https://a.api.s0.t.hmny.io/" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0x70a082310000000000000000000000005ca5bcd91929c7152ca577e8c001c9b5a185f568"
        },
        "latest"
    ],
    "id": 1
}'