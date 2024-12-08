function outcolor(){
    var outtemp = document.getElementById('outdoor_temp');
    outtemp = parseFloat(outtemp.innerText);

    ratioo = outtemp / 40;

    var redo = Math.min(255, Math.max(0, Math.round(ratioo * 255)));
    var blueo = Math.min(255, Math.max(0, Math.round((1 - ratioo) * 255)));

    document.getElementById('outdoor_th').style.backgroundColor = `rgba(${redo}, 0, ${blueo}, 0.8)`;
}
function roundTo(num, precision) {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor
}

function changeTemp(uservar){
    var output = document.getElementById('target_t');
    output = parseFloat(output.innerText);
    
    if(uservar=='up'){
            if(output<27){
                output = output+0.1;
                output = output.toFixed(1);
            }else{
                output = output.toFixed(1);
            }
        } else if(uservar == 'down'){
            if(output>18){
                output = output-0.1;
                output = output.toFixed(1);
            }else{
                output = output.toFixed(1);
            }
        }
        
    document.getElementById('target_t').innerText= String(output);
}

function realTemp(){
    const minTemp = 18;
    const maxTemp = 27;

    var output = document.getElementById('target_t');
    output = parseFloat(output.innerText);

    var temp = document.getElementById('main_temp');
    temp = parseFloat(temp.innerText);

    var lrtemp = document.getElementById('living_room');
    lrtemp = parseFloat(lrtemp.innerText);

    var mbtemp = document.getElementById('main_bedroom');
    mbtemp = parseFloat(mbtemp.innerText);

    var b1temp = document.getElementById('bedroom1');
    b1temp = parseFloat(b1temp.innerText);

    var b2temp = document.getElementById('bedroom2');
    b2temp = parseFloat(b2temp.innerText);

    function myLoop() {      
        setTimeout(function() {
            setTimeout(function() {
                setTimeout(function() {
                    setTimeout(function() {   
                        if(b2temp<output){
                            b2temp = b2temp+0.1;
                            b2temp = roundTo(b2temp, 2);
                            document.getElementById('bedroom2').innerText = String(b2temp);
                        }else if(b2temp>output){
                            b2temp = b2temp-0.1;
                            b2temp = roundTo(b2temp, 2);
                            document.getElementById('bedroom2').innerText = String(b2temp);
                        }                 
                    }, 2000)    
                    if(b1temp<output){
                        b1temp = b1temp+0.1;
                        b1temp = roundTo(b1temp, 2);
                        document.getElementById('bedroom1').innerText = String(b1temp);
                    }else if(b1temp>output){
                        b1temp = b1temp-0.1;
                        b1temp = roundTo(b1temp, 2);
                        document.getElementById('bedroom1').innerText = String(b1temp);
                    }                 
                }, 1750)    
                if(mbtemp<output){
                    mbtemp = mbtemp+0.1;
                    mbtemp = roundTo(mbtemp, 2);
                    document.getElementById('main_bedroom').innerText = String(mbtemp);
                }else if(mbtemp>output){
                    mbtemp = mbtemp-0.1;
                    mbtemp = roundTo(mbtemp, 2);
                    document.getElementById('main_bedroom').innerText = String(mbtemp);
                }                  
            }, 1500)   
            if(lrtemp<output){
                lrtemp = lrtemp+0.1;
                lrtemp = roundTo(lrtemp, 2);
                document.getElementById('living_room').innerText = String(lrtemp);
            }else if(lrtemp>output){
                lrtemp = lrtemp-0.1;
                lrtemp = roundTo(lrtemp, 2);
                document.getElementById('living_room').innerText = String(lrtemp);
            }
            temp = roundTo((lrtemp + mbtemp + b1temp + b2temp)/4, 1);
            document.getElementById('main_temp').innerText = String(temp);

            ratio = (temp - minTemp) / (maxTemp - minTemp);

            var red = Math.min(255, Math.max(0, Math.round(ratio * 255)));
            var blue = Math.min(255, Math.max(0, Math.round((1 - ratio) * 255)));

            document.getElementById('main_th').style.backgroundColor = `rgba(${red}, 0, ${blue}, 0.8)`;
            document.getElementById('diff_th').style.backgroundColor = `rgba(${red}, 0, ${blue}, 0.8)`;
            if (temp!=output) {
                myLoop();
            }                    
        }, 1000)
    }
    myLoop();  
}