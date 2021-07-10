const allstar = "/api/v1.0/all_star"
const wins = "/api/v1.0/wins"
const wswins = "/api/v1.0/ws_wins"


fetch('')
    .then(response => {
        return response.json();
    })
    .then(allStar => {
        console.log(allStar)
    });