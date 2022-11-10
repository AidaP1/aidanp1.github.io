const collateral_limit = 1000000000
const volume_limit = 60000
const base_price = 35000000

function httpGet(get_url) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", get_url, false); 
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
  }

function generateQuote() {
    let evepraisal_url = document.getElementById("evepraisal_link").value;
    let get_url = evepraisal_url + '.json'

    let r = JSON.parse(httpGet(get_url))

    let volume = r.totals.volume
    let market = r.market_name
    let sell_price = r.totals.sell

    let collateral = sell_price * 1.05
    let reward  = base_price * Math.max(volume/volume_limit, collateral/collateral_limit)

    if (volume > volume_limit) {
        document.getElementById("volume").innerHTML = "Invalid: Volume too large";
        return
    }
    if (collateral > collateral_limit) {
        document.getElementById("volume").innerHTML = "Invalid: Collateral too large";
        return
    }
    if (market !== "jita") {
        document.getElementById("volume").innerHTML = "Invalid: Evepraisal quote must be set to Jita";
        return
    }

    document.getElementById("instructions").innerHTML = `
    <h2>To create your contract:</h2>
    <ul>
       <li> 1. Open the contract creation window and select 'courier'</li>
       <li> 2. Set the availablility to 'My Corporation'</li>
       <li> 3. Set the reward, collateral, and description as shown above</li>
       <li> 4. Set time to expiry: 1 week, time to completion: 3 days</li>
       <li> 5. Desitnation MUST be either Amarr or Jita</li>
    </ul>
    `
    document.getElementById("volume").innerHTML = `Volume: ${volume}`;
    document.getElementById("collateral").innerHTML = `Collateral: ${collateral}`;
    document.getElementById("reward").innerHTML = `Reward: ${reward}`;
    document.getElementById("description").innerHTML = `description: ${evepraisal_url}`;
}
