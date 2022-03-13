echo "token_decimal"
curl -H 'Content-Type:application/json' -X POST "https://api.harmony.one" --data '{
    "jsonrpc": "2.0",
    "method": "hmy_call",
    "params": [
        {
            "to": "0xdc54046c0451f9269fee1840aec808d36015697d",
            "data": "0x313ce567"
        },
        "latest"
    ],
    "id": 1
}'