const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasure = document.getElementById('treasure');

let currentLocation = 1;

inventory = [];

let locations = [];
locations[0] = "kantine";
locations[1] = "trap";
locations[2] = "eind";
locations[3] = "docentenkamer";
locations[4] = "gang";
locations[5] = "medialab";
locations[6] = "toiletten";
locations[7] = "klaslokaal";
locations[8] = "examenlokaal";

treasures = [];
treasures[6] = "green dagger"
treasures[5] = "key"


treasureImages = [];
treasureImages[6] = "media/green_dagger.png"
treasureImages[5] = "media/key_treasure.png"


images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];


descriptions = [];
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
descriptions[2] = "u heeft gewonnen";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen";
descriptions[6] = "u staat bij de toiletten";
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";

myInput.addEventListener('keydown', getInput, false);


function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocationInformatie();
      checkForTreasure();
      myInput.value = "";
    }

    if (inputArray[0] == "pak") {
      console.log('ga wat pakken');
      myInput.value = "";
      if (treasures[currentLocation] != null && treasures[currentLocation] != undefined) {
        console.log('schat gepakt');
        pakTreasure(currentLocation);
        giveLocationInformatie();
      }
    }
  }
}
giveLocationInformatie();
function giveLocationInformatie() {
  divLocation.innerHTML = locations[currentLocation] + " => grid: " + currentLocation;
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
    let myDirections = "mogelijke richtingen zijn: ";
    for (let i = 0; i < directions[currentLocation].length; i++) {
      myDirections += "<li>" + directions[currentLocation][i] + "</li>";
    }
    myPossibilities.innerHTML = myDirections;
    myInventory.innerHTML = "uw inventory is leeg";
    showInventory();
}

function showInventory(){
  let items = "";
  if(inventory.length <= 0){
    myInventory.innerHTML = "leeg";
    return;
  }
  for(let i = 0; i < inventory.length; i++){
    items += "<li>" + inventory[i] + "</li>";
  }
  myInventory.innerHTML = items;
}


function removeFeedback() {
  feedback.innerHTML = "";
}

checkForTreasure();

function checkForTreasure() {
  console.log(treasures[currentLocation]);
  if (treasures[currentLocation] != null && treasures[currentLocation] != undefined) {
    treasure.src = treasureImages[currentLocation];
    return;
  }
  treasure.src = "";
  }


  function pakTreasure(currentLocation) {
    inventory.push(treasures[currentLocation])
    treasures[currentLocation] = "";
      treasureImages  [currentLocation] = "";
    giveLocationInformatie();
    checkForTreasure();
  }
