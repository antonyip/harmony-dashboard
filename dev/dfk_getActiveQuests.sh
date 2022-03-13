#!/bin/bash
curl -H 'Content-Type:application/json' -X POST "https://api.harmony.one" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0x72cb10c6bfa5624dd07ef608027e366bd690048f",
            "data": "0xfd3d27b8"
        },
        "latest"
    ],
    "id": 1
}'
