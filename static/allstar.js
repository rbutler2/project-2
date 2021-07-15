const allstar = "/api/v1.0/all_star"
// const wins = "/api/v1.0/wins"
// const wswins = "/api/v1.0/ws_wins"


fetch(allstar)
.then(response => {
    return response.json();
});

// d3.json(allstar).then(function(data) {
//     console.log(data);
//   });

function buildASPlot() {
    d3.json(allstar).then(function(data) {
        var as_firstName = []
        var as_lastName = []
        var as_appearances = []
        var as_salary = [];
        var as_fullname =[];

        data.forEach(function(data) {
            as_firstName.push(data[1]);
            as_lastName.push(data[2]);
            as_appearances.push(data[3]);
            as_salary.push(data[4]);
            as_fullname.push(data[1] + ' ' + data[2]);
        });
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
        var data = [trace1];
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
    Plotly.newPlot("as_plot", data, layout);
    })
};
buildASPlot();