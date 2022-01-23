//read data from https://TestBlueAlliance.ianmct.repl.co
//display to web page

//use https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
var allianceData;
getText();

function getText() {
  // read text from URL location
  var request = new XMLHttpRequest();
  request.open('GET', 'https://TestBlueAlliance.ianmct.repl.co', true);
  request.send(null);
  request.onreadystatechange = function () {
    //alert("state changed: " + request.readyState + " status: " + request.status);
    if (request.readyState === 4 && request.status === 200) {
      //alert("in if");
      //alert(request.getAllResponseHeaders());
      var type = request.getResponseHeader('Content-Type');
      if (type.indexOf("text") !== 1) {
        allianceData = request.responseText;
        console.log("Checkpoint 1");
        //console.log(allianceData);
        createDropDown();
        return request.responseText;
      }
    }
  }
}
var increment = 0;
var output = "";
var output2 = "";
function createDropDown() {
  console.log("Checkpoint 2");
  var dropDown = '<label for = "match">Select Match </label><select name="match" id="match" onchange="teams()">';
  for (increment = increment; increment <= 69; increment++) {
    dropDown += '<option value="' + increment + '">Match ' + (increment + 1) + "</option>";
  }
  document.getElementById("dropDown").innerHTML = dropDown;
  teams();
}

function teams() {
  console.log("Checkpoint 3");
  //alert(allianceData);
  var match = parseInt(document.getElementById("match").value);
  /*
  alert(match);
  alert((allianceData)[match]);
  */

  console.log("mct test");
  //var testData = JSON.stringify(allianceData);
  //console.log(allianceData.length);

  //the script error occured because the PHP was returning the word true at the end.  PHP curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); fixes that problem.
  let jsonAlliance = JSON.parse(JSON.parse(allianceData));
  //loop through each match
  for (var i = 0; i < jsonAlliance.length; i++) {
    console.log("Match: " + jsonAlliance[i].match_number)
    //The key indicates the match.  2019onnob_qm1 is the qualifier match 1.  2019onnob_qf1m1 is quarter finals match 1
    console.log("Key: " + jsonAlliance[i].key)
    console.log("Blue Alliance: " + jsonAlliance[i].alliances.blue.team_keys);
    console.log("Red Alliance " + jsonAlliance[i].alliances.red.team_keys);
    console.log()
  }

  //console.log("Length: " +jsonAlliance.length);
  //console.log(jsonAlliance[0]);
  //console.log("result of parse: " + jsonAlliance);
  //let allianceParsed = JSON.parse(jsonAlliance);
  //console.log(allianceParsed);

  return;

  console.log((allianceData)[2]);
  if (typeof (allianceData)[match].alliances.blue.team_keys !== 'undefined' ||
    typeof (allianceData)[match].alliances.red.team_keys !== 'undefined'
  ) {
    var outputBlue = ((allianceData)[match].alliances.blue.team_keys);
    var outputRed = ((allianceData)[match].alliances.red.team_keys);
    outputBlue = outputBlue.join();
    outputBlue = outputBlue.split(",");
    var blue1 = outputBlue[0];
    var blue2 = outputBlue[1];
    var blue3 = outputBlue[2];
    outputRed = outputRed.join();
    outputRed = outputRed.split(",");
    var red1 = outputRed[0];
    var red2 = outputRed[1];
    var red3 = outputRed[2];
    output = "<p>" + blue1 + "</p>" + "<p>" + blue2 + "</p>" + "<p>" + blue3 + "</p>";
    document.getElementById("outputBlue").innerHTML = output;
    output2 = "<p>" + red1 + "</p>" + "<p>" + red2 + "</p>" + "<p>" + red3 + "</p>";
    document.getElementById("outputRed").innerHTML = output2;
  }//end if
}