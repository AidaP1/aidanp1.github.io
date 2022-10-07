import requests

# values for handling
collateral_limit = 1000000000
volume_limit = 62500
base_price = 35000000

# test value, will need to get from the impout form
evepraisal_url = 'https://evepraisal.com/a/15411k'
get_url = evepraisal_url + '.json'

# retrieve values
data = requests.get(get_url).json()

volume = data["totals"]["volume"]
market = data["market_name"]
sell_price = data["totals"]["sell"]

# calculate
collateral = sell_price * 1.05
reward  = base_price * max(volume/volume_limit, collateral/collateral_limit)

# output
quote = {
    "volume": volume,
    "collateral": collateral,
    "reward": reward,
    "description": evepraisal_url
}
