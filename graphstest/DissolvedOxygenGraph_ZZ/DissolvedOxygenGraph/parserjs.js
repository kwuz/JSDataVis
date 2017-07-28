

var data_raw = document.getElementById("data").innerHTML;
var data_t_raw = document.getElementById("Tdata").innerHTML;
var data_num_headers = 6;
var data_headers = ["DateTime", "TimeOffset", "DateTimeUTC", "Value", "CensorCode"];
var data_arr = [];
var data_t_arr = [];
var full_data = [];
var pertick = 3;

function loadData(){
    data_arr = data_raw.split(", ");
    data_t_arr = data_t_raw.split(", ");
    full_data = [];
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
}

var running = true;
var runspeed = document.getElementById("animation_speed").value;

var flag = false;

var oMin = 11;
var oMax = 14;
var tMin = 1.5;
var tMax = 4.5;
var chartEl = document.getElementById("chart1");

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

        if(flag == false){
            flag = true;
        }
        else{
            myLine.destroy();
        }
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
                        max: oMax, 
                        min: oMin,
                    },
                        position: "left",
                        id: "y-oxygen",
                    scalelabel:{
                        display: true,
                        labelString: "Dissolved Oxygen",                        
                    },
                    }, {
                        ticks:{
                            max: tMax,
                            min: tMin,
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
    if(r<= skip){
        r==0;
    }
    else if((r-skip) < full_data.length-display){
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
    context.clearRect(0,0,canvas.width, canvas.height);
    window.myLine.destroy();
    regraph();
}

function update_speed(){
    console.log("speed update");
    runspeed = document.getElementById("animation_speed").value;
    if(runspeed == 80){
        pertick = 5;
    }
}

function display_check(){
    display = document.getElementById(number_show);
    if(display => full_data.length){
        display = full_data.length;
        document.getElementById.number_show.value = full_data.length;
    }
}


function change_dataset(id){
    var set = document.getElementById("data_set").value;
    if(set == "Jan"){
        data_raw = document.getElementById("data").innerHTML;
        data_t_raw = document.getElementById("Tdata").innerHTML;
        oMin = 11;
        oMax = 14;
        tMin = 1.5;
        tMax = 4.5;
    }
    else if(set == "April"){
        data_raw = document.getElementById("apr_data").innerHTML;
        data_t_raw = document.getElementById("apr_t_data").innerHTML;
        oMin = 9.5;
        oMax = 11.2;
        tMin = 4.5;
        tMax = 10;
    }
    else if(set == "July"){
        data_raw = document.getElementById("jul_data").innerHTML;
        data_t_raw = document.getElementById("jul_t_data").innerHTML;
        oMin = 8.3;
        oMax = 10;
        tMin = 9.5;
        tMax = 15.5;
    }
    else{
        data_raw = document.getElementById("nov_data").innerHTML;
        data_t_raw = document.getElementById("nov_t_data").innerHTML;
        oMin = 9.5;
        oMax = 12.8;
        tMin = 0;
        tMax = 10;
    }
    loadData();
    reset();
}

var counter = 0
function animationLoop(Ntime){
    var elapsed = Ntime - Ltime;
    Ltime = Ntime;
    counter = counter + elapsed;
    if(running){
        if(counter>=runspeed){
            r = r + pertick;
            counter = 0;
            if(r+display >= full_data.length){
                reset();
            }
            regraph();
            
        }
    }
    requestAnimationFrame(animationLoop);
}

var Ltime = performance.now();
loadData();
regraph();
requestAnimationFrame(animationLoop);

