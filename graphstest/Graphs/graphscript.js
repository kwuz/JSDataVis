var canvas = document.getElementById("jan_chart")
var context = canvas.getContext("2d");

var running = true;
var runspeed = 80;

var jan_chart = document.getElementById("jan_chart")

var jan_data_raw = document.getElementById("jan_data").innerHTML;
var jan_t_data_raw = document.getElementById("jan_t_data").innerHTML;

var jan_data_arr = jan_data_raw.split(", ");
var jan_t_data_arr = jan_t_data_raw.split(", ");

/*loadResults -- given the array of dissolved oxygen data and the array of
//temperature data, this function loads the results into an array of easy
//to use objects.
*/
function loadResults(data, tempdata){
    var full = [];
    for(var n=0; n<data.length; n=n+5){
        var result = {
            DateTime: data[n],
            TimeOffset: data[n+1],
            DateTimeUTC: data[n+2],
            Value_o: data[n+3],
            CensorCode: data[n+4],
        };
        if(data[n]==tempdata[n]){
            result.Value_t = tempdata[n+3];
        }
        full.push(result);
    }
    return full;
}

var jan_full_data = loadResults(jan_data_arr, jan_t_data_arr);
var jan_r = 0;



var num_display = 288;

function regraph(){

var graphlabels = [];
var graphdata= [];
var graphdata_t = [];
    for(var i=0; i<num_display; i++){
        graphlabels.push(jan_full_data[jan_r+i].DateTime);
        graphdata.push(jan_full_data[jan_r+i].Value_o);
        graphdata_t.push(jan_full_data[jan_r+i].Value_t);
    }

    var lineChartData = {
        labels: graphlabels,
        datasets: [{
            label: "Dissolved Oxygen",
            data: graphdata,
            yAxisId: "y-oxygen",
        },
        {
            label: "Temperature",
            data: graphdata_t,
            yAxisID: "y-temp",
        }]
    };

    lineChartData.datasets[0].borderColor = 'rgba(40, 80, 255, .7)';
    lineChartData.datasets[0].backgroundColor = 'rgba(40, 80, 255, 0)';
    lineChartData.datasets[0].pointBorderColor = 'rgba(40, 80, 255, .7)';
    lineChartData.datasets[0].pointBackgroundColor = 'rgba(40, 80, 255, .7)';
    lineChartData.datasets[0].pointBorderWidth = 1;

    lineChartData.datasets[1].borderColor = 'rgba(255, 80, 80, .7)';
    lineChartData.datasets[1].backgroundColor = 'rgba(255, 80, 80, 0)';
    lineChartData.datasets[1].pointBorderColor = 'rgba(255, 80, 80, .7)';
    lineChartData.datasets[1].pointBackgroundColor = 'rgba(255, 80, 80, .7)';
    lineChartData.datasets[1].pointBorderWidth = 1;

    var jan_chart = document.getElementById("jan_chart");
    window.myLine - new Chart(jan_chart, {
        type: 'line',
        data: lineChartData,
        interactivityEnabled: false,
        options:{
            title:{
                display: true,
                text:'Dissolved Oxygen vs Temperature - Jan 2014',
            },
            animation: false,
            tooltips:{
                enabled: false,
            },
                scales: {
                    yAxes: [{
                        ticks:{
                            max: 14, 
                            min: 11,
                        },
                            position: "left",
                            id: "y-oxygen",
                        scalelabel:{
                            display: true,
                            labelString: "Dissolved Oxygen",                        
                        },
                        }, {
                            ticks:{
                                max: 4.5,
                                min: 1.5,
                            },
                            gridLines:{
                                display: false,
                            },
                            position: "right",
                            id: "y-temp",
                        scalelabel:{
                            display: true,
                            labelString: "Temperature",                        
                        }
                    }]
                }
        }
    });
}

// var counter = 0;
// function animationLoop(Ntime){
//     var elapsed = Ntime - Ltime;
//     Ltime = Ntime;
//     counter = counter + elapsed;
//     if(running){
//         if(counter >= runspeed){
//             if(jan_r+num_display >= jan_full_data.length){
//                 jan_full_data = loadResults(jan_data_arr, jan_t_data_arr);
//                 jan_r = 0;
//                 jan_full_data = loadResults(jan_data_arr, jan_t_data_arr);
//                 regraph();
//             }
//             jan_r += 1;
//             counter = 0;
//             regraph();
//         }
//         requestAnimationFrame(animationLoop);
//     }

// }

// var Ltime = performance.now();
// regraph();
// requestAnimationFrame(animationLoop);
var interval = setInterval(Timer, 50);

function Timer(){
    if(jan_r+num_display >= jan_full_data.length){
            jan_full_data = loadResults(jan_data_arr, jan_t_data_arr);
            jan_r = 0;
            jan_full_data = loadResults(jan_data_arr, jan_t_data_arr);
            regraph();
    }
    jan_r += 1;
    counter = 0;
    regraph();
}