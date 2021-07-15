// const allstar = "/api/v1.0/all_star"
// const wins = "/api/v1.0/wins"
const wswins = "/api/v1.0/ws_wins"

///////////////////////////////////////
// Braxton

var ws_years = new Array()
var ws_team = new Array()
var ws_wintitle = new Array()
var ws_salary = new Array()

// fetch Data and build arrays

fetch(wswins)
.then(response => {
    return response.json();
})
.then(wswins => {
    
    wswins.forEach(function(data) {
        if (data[2] == "Y") {
        ws_years.push(data[0])
        ws_team.push(data[1])
        ws_wintitle.push(data[2])
        ws_salary.push(data[3])
    }})
});

function build_ws_Plot() {
    d3.json(wswins).then(function(data) {

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

        var data = [trace1,trace2];

        var layout = {
            title: "World Series Winners by Year and Salary",
            xaxis: {range: [ws_years[0], ws_years[-1]],type: "date"},
            yaxis: {autorange: true, type: "linear"},
            autosize: false,
            width: 1200,
            height: 700,
        };
        
        Plotly.newPlot("ws_plot", data, layout);
    })};

build_ws_Plot();