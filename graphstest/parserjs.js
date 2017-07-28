

var data_raw = document.getElementById("data").innerHTML;
var data_t_raw = document.getElementById("Tdata").innerHTML;
var data_num_headers = 6;
var data_headers = ["DateTime", "TimeOffset", "DateTimeUTC", "Value", "CensorCode"];

var data_arr = data_raw.split(", ");
var data_t_arr = data_t_raw.split(", ")

var full_data = []
var running = true;
var runspeed = 100;

var result = {
     DateTime: null,
     TimeOffset: null,
    DateTimeUTC: null,
    Value: null,
    CensorCode: null
};
var c = 0
for (var  n=0; n<data_arr.length; n=n+(data_num_headers-1)){
    var result = {
        DateTime: data_arr[n],
        TimeOffset: data_arr[n+1],
        DateTimeUTC: data_arr[n+2],
        Value_o: data_arr[n+3], //value of disolved oxygen
        CensorCode: data_arr[n+4]
    };
    if(data_arr[n]==data_t_arr[n]){
        result.Value_t = data_t_arr[n+3]
    }
    full_data.push(result);
}

var r = 0; //current location
var skip = 10;
var display = 30;

function regraph(){

    var graphlabels=[]
    var graphdata=[]
    var graphdata_t = []
    display = document.getElementById("number_show").value;
    skip = document.getElementById("number_skip").value;
    display = parseInt(display, 10);
    skip = parseInt(skip, 10);
    for(var i=0; i<display; i++){
        graphlabels.push(full_data[r+i].DateTime);
        graphdata.push(full_data[r+i].Value_o);
        graphdata_t.push(full_data[r+i].Value_t);
    }
    var lineChartData = {
        labels:  graphlabels,
        datasets: [{
            label: "Dissolved Oxygen",
            data: graphdata,
            yAxisID: "y-oxygen",
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

        var chartEl = document.getElementById("chart1");
        window.myLine = new Chart(chartEl, {
        type: 'line',
        data: lineChartData,
        options: {
            title:{
            display:true,
            text:'Dissolved Oxygen - LR_waterLab_AA',

            },
            animation: false,
            tooltips: {
            enabled: true,
            },
            scales: {
                yAxes: [{
                    ticks:{
                        max: 12.75, 
                        min: 8.75,
                        stepSize: .25,
                    },
                        position: "left",
                        id: "y-oxygen",
                    scalelabel:{
                        display: true,
                        labelString: "Dissolved Oxygen",                        
                    }
                    }, {
                        ticks:{
                            max: 6,
                            min: 0,
                            stepSize: .25,
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

function scroll_forward(){
    skip = document.getElementById("number_skip").value;
    skip = parseInt(skip, 10);
    if((r+skip) < full_data.length+display){
        r = r + skip;
    }
    regraph();
}

function scroll_back(){
    skip = document.getElementById("number_skip").value;
    skip = parseInt(skip, 10);
    if((r-skip) < full_data.length-display){
        r = r - skip;
    }
    regraph();
}

function pause_run(){
    if(running){
        running = false;
        document.getElementById("pause").value = "Play";
    }
    else{
        running = true;
        document.getElementById("pause").value = "Pause";
    }
}

function reset(){
    r = 0;
    regraph();
}

function update_speed(){
    console.log("speed update");
    runspeed = document.getElementById("animation_speed").value;
}

setInterval(function(){
    if(running){
        if(full_data.length > r+1){
        r = r +1;
        regraph();
        }
        else{
            reset();
        }
    }
}, runspeed)

regraph();



