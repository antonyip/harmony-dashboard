# doesn't work

curl -d '{
    "jsonrpc":"2.0",
    "method":"hmy_getValidators",
    "params":[22282236],
    "id":1
}' -H 'Content-Type:application/json' -X POST 'https://api.harmony.one'