const collateral_limit = 1000000000
const volume_limit = 62500
const base_price = 35000000

/// test value, will need to get from the impout form
const evepraisal_url = 'https://evepraisal.com/a/15411k'
const get_url = evepraisal_url + '.json'

function httpGetAsync(get_url, callback) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function () {
      if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200)
        callback(xmlHttpReq.responseText);
    }
    xmlHttpReq.open("GET", get_url, true); // true for asynchronous 
    xmlHttpReq.send(null);
  }
httpGetAsync(get_url, function(result){
    console.log(result);
});

