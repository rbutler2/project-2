// const allstar = "/api/v1.0/all_star"
const wins = "/api/v1.0/wins"
// const wswins = "/api/v1.0/ws_wins"

let win_year = []
let win_teams = []
let win_total = []
let win_salary = []


fetch(wins)
.then(response => {
    return response.json();
})
.then(wins => {
    wins.forEach(function(data) {
        win_year.push(data[0])
        win_teams.push(data[1])
        win_total.push(data[2])
        win_salary.push(data[3])
    })
});

function buildwinsPlot() {
    d3.json(wins).then(function(data) {

        var trace1 = {
          type: "scatter",
          mode: "markers",
          marker: { size: win_salary, sizeref: 250000, sizemode: "area" },
          transforms: [{ type: "groupby", groups: win_teams }],
          name: "Total Wins",
          // text: 
          x: win_teams,
          y: win_total,
        };
        var data = [trace1];

        var layout = {
          title: "Total Wins Compared to Salary ",
          xaxis: {range: win_teams },
          yaxis: {range: [40, 140]},
          autosize: false,
          width: 2000,
          height: 900,
        };
    
        Plotly.newPlot("wins_plot", data, layout);
    })
}
buildwinsPlot();



