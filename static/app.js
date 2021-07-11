const allstar = "/api/v1.0/all_star"
const wins = "/api/v1.0/wins"
const wswins = "/api/v1.0/ws_wins"


fetch('/api/v1.0/all_star')
  .then(response => {
      return response.json();
  })
  .then(allstar => {
      allstar.forEach(function(data){
        var playerID = data[0];
        console.log(playerID);
        var firstName = data[1];
        console.log(firstName);
        var lastName = data[2];
        console.log(lastName);
        var salary = data[3];
        salary = +salary
        console.log(salary);
      }
      )});


    

