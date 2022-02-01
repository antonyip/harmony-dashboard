curl -d '{
    "jsonrpc":"2.0",
    "method":"eth_getStorageAt",
    "params":["0x72cb10c6bfa5624dd07ef608027e366bd690048f","0x0a","latest"],
    "id":"mdao-3459823509347503985730457345"
}' -H 'Content-Type:application/json' -X POST 'https://api.fuzz.fi'