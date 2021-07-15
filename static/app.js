// Establish paths and buil arrays
const allstar = "/api/v1.0/all_star"
const wins = "/api/v1.0/wins"
const wswins = "/api/v1.0/ws_wins"

///////////////////////////////////////
// Braxton

var ws_years = new Array()
var ws_team = new Array()
var ws_wintitle = new Array()
var ws_salary = new Array()
let win_year = []
let win_teams = []
let win_total = []
let win_salary = []
var as_appearances = []
var as_salary = []
var as_fullname =[]


// fetch Data and build arrays

Promise.all([
	fetch(wswins),
	fetch(wins),
    fetch(allstar)
])

.then(wswins => {
    
    wswins.forEach(function(wsdata) {
        if (wsdata[2] == "Y") {
        ws_years.push(wsdata[0])
        ws_team.push(wsdata[1])
        ws_wintitle.push(wsdata[2])
        ws_salary.push(wsdata[3])
    }})  
})

// .then(wins => {

//     wins.forEach(function(wdata) {
//         win_year.push(wdata[0])
//         win_teams.push(wdata[1])
//         win_total.push(wdata[2])
//         win_salary.push(wdata[3])
//     })
// })

.then(allstar => {
    allstar.forEach(function(adata) {
        as_appearances.push(adata[3]);
        as_salary.push(adata[4]);
        as_fullname.push(adata[1] + ' ' + adata[2]);
    })
});

function build_ws_Plot() {
    d3.json(wswins).then(function(wsdata) {

        var ws_avg_sal = [65355444,67469251,70942071,69022198,72957113,77382421,82556300,89495289,88824233,
            90711996,92816843,97758040,101150855,106410587,117138086]

        var trace1 = {
            type: "scatter",
            mode: "markers",
            marker: { size: 20 },
            name: "WS Winner",
            text: ws_team,
            x: ws_years,
            y: ws_salary,
            line: {color: "#17BECF"}
        };

        var trace2 = {
            type: "scatter",
            mode: "lines",
            marker: { size: 10 },
            name: "League avg",
            x: ws_years,
            y: ws_avg_sal,
            line: {color: "orange"}
        };

        var wsdata = [trace1,trace2];

        var layout = {
            title: "World Series Winners by Year and Salary",
            xaxis: {range: [ws_years[0], ws_years[-1]],type: "date"},
            yaxis: {autorange: true, type: "linear"},
            autosize: false,
            width: 1200,
            height: 700,
        };
        
        Plotly.newPlot("ws_plot", wsdata, layout);
    })};

build_ws_Plot();

///////////////////////////////////////
// Jared
// let win_year = []
// let win_teams = []
// let win_total = []
// let win_salary = []
// fetch(wins)
// .then(response => {
//     return response.json();
// })
// .then(wins => {
//     wins.forEach(function(data) {
//         win_year.push(data[0])
//         win_teams.push(data[1])
//         win_total.push(data[2])
//         win_salary.push(data[3])
//     })
// });
function buildwinsPlot() {
    d3.json(wins).then(function(wdata) {
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
        var wdata = [trace1];
        var layout = {
          title: "Total Wins Compared to Salary ",
          xaxis: {range: win_teams },
          yaxis: {range: [40, 140]},
          autosize: false,
          width: 2000,
          height: 900,
        };
        Plotly.newPlot("wins_plot", wdata, layout);
    })
}
buildwinsPlot();

///////////////////////////////////////
// Sean

// fetch(allstar)
// .then(response => {
//     return response.json();
// });
// // d3.json(allstar).then(function(data) {
// //     console.log(data);
// //   });
function buildASPlot() {
    d3.json(allstar).then(function(adata) {
    //     var as_appearances = []
    //     var as_salary = [];
    //     var as_fullname =[];
    //     data.forEach(function(data) {
    //         as_appearances.push(data[3]);
    //         as_salary.push(data[4]);
    //         as_fullname.push(data[1] + ' ' + data[2]);
    //     });
        var trace1 = {
            type: "scatter",
            mode: "markers",
            marker: { size: 20 },
            name: "All Star",
            text: as_fullname,
            x: as_salary,
            y: as_appearances,
            hovertemplate:
            "<b>%{text}</b><br><br>" +
            "Salary: %{x}<br>" +
            "Appearances: %{y}<br>" +
            "<extra></extra>"
        }
        var adata = [trace1];
        var layout = {
            title: "Salary vs. All Star Appearance", 
            xaxis: {
                title: {text: "MLB Salary ($)"},
                tickprefix: '$',
                dtick: 2500000
           },   
           yaxis: {
               title: {text: "All-Star Game Appearances"}
           },
           hovermode: 'closest'
        };
    Plotly.newPlot("as_plot", adata, layout);
    })
};
buildASPlot();