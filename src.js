var Xcnt = 0, Ycnt =0
var timer = (2/(60))
var sl = (1.5)-(timer/2), sn = (sl + (timer))
var ml = (1.5)-(timer/2), mn = (ml + (timer))
var w = 440, h = 340
var c = document.getElementById('animations')
var ctx = c.getContext("2d") 
var center = h/2
var tick = 0

function init(c){
    document.getElementById('animations').width = w
    document.getElementById('animations').height = h
    c.fillRect(0,0,w,h);
    grid(ctx)
    xy(ctx)
}

function go(c){
    var timeStart = Date.now()
     setInterval(function(){
        build(c,tick)
        displayTick(c)
    }, 1000-(Date.now()-timeStart));
}

function build(c,t){
    c.fillStyle = 'black'
    c.fillRect(0,0,w,h);
    
    for(var i=0; center > i;i++){
        var r = 0, g = 0, b = 0
        
        c.strokeStyle= 'rgb('+r+','+g+i+','+b+(i/10)+')'
        
        c.beginPath()
        c.arc(w/2, h/2, ((h/2)-i)/2, (sl*Math.PI-(sn-sl)) , (sn*Math.PI+(sn-sl)))
        c.stroke()
    }
    
    
    sn = sn + timer
    sl = sl + timer
    
    grid(c)
    xy(c)
}

function hour(){
    return Math.floor(tick/60/60)
    }
    
function minute(){  
    return Math.floor(tick/60) - (hour()*60)
    }
    
function second(){  
    return tick - (minute()*60) - (hour()*60*60)
    }

function displayTick(c){
    var time = leadZero(hour()) + ':' + leadZero(minute()) + ':' + leadZero(second())

    c.beginPath()
    c.fillStyle = "white"
    c.font = "28px Arial";
    c.fillText(time,10,50);
    c.stroke()
    
    tick++
}

function leadZero(n){if(n < 10){return "0" + n} else {return n}}

//X and Y 0 Coords
function xy(c){
    c.strokeStyle= 'white'
    
    c.beginPath();
    c.moveTo(w/2,0);
    c.lineTo(w/2,h);
    c.stroke()
    c.moveTo(0,h/2);
    c.lineTo(w,h/2);
    c.stroke()
}

function grid(c){
    var gh = h/((h)/20)
    var gw = w/((w)/20)
    
    c.strokeStyle= 'grey'
    
    //horizontal lines
    var hn = 0
    for(var i = 0; i < (h/(h/gh));i++){
        ctx.moveTo(0,hn);
        c.lineTo(w,hn);
        hn=hn+(h/gh)
    }
    
    //vertical lines
    var wn = 0
    for(var i = 0; i < ((w/gw));i++){
        ctx.moveTo(wn,0);
        c.lineTo(wn,h);
        wn=wn+(gw)
    }
    
    //draw
    c.stroke()
}


//old functions
function lineMove(){
    c.beginPath();
    c.moveTo(w/2,h/2);
    c.lineTo(w/2 + Xcnt,h/4 + Ycnt);
    c.stroke()
    
    
    if(h/4 + Ycnt > h/2){
        Xcnt--;
    }else{
        Xcnt++;
    }
    
    if(w/2 + Xcnt < w/2){
        Ycnt--;
    }else{
        Ycnt++;
    }
}