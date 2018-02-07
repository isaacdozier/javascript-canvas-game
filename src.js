var Xcnt = 0, Ycnt =0
var timer = (2/(60))
var l = (1.5)-(timer/2), n = (l + (timer))
var w = 640, h = 340
var c = document.getElementById('animations')
var ctx = c.getContext("2d") 
var center = h/2
var tick = 0
var running = false
var cnt

function init(c){
    document.getElementById('animations').width = w
    document.getElementById('animations').height = h
    c.fillRect(0,0,w,h);
    grid(ctx)
    xy(ctx)
    c.strokeStyle= 'white'
}

function go(c){
        cnt++
         setInterval(function(){
            build(ctx)
        }, 1000);
    
}

function build(c){
    displayTick()
    
    c.fillRect(0,0,w,h);
    
    
    for(var i=0; center > i;i++){
         clockHand(ctx,i)
    }
    
    grid(ctx)
    xy(ctx)
    
    n = n + timer
    l = l + timer
}

function displayTick(){
    document.getElementById('tick').innerHTML = tick
    tick++
}

function clockHand(c,i){
    var lTmp = (l*Math.PI)-((n-l)) 
    var nTmp = (n*Math.PI)+((n-l)) 
    var r = 0, g = 0, b = 0
    
    ctx.strokeStyle= 'rgb('+r+','+g+i+','+b+(i/10)+')'
    
    c.beginPath();
    c.arc(w/2, h/2, ((h/2)-i)/2, lTmp, nTmp)
    c.stroke()
}

//X and Y 0 Coords
function xy(c){
    ctx.beginPath();
    ctx.strokeStyle= 'white'
    
    ctx.moveTo(w/2,0);
    c.lineTo(w/2,h);
    c.stroke()
    ctx.moveTo(0,h/2);
    c.lineTo(w,h/2);
    c.stroke()
}

function grid(c){
    var gh = h/((h)/20)
    var gw = w/((w)/20)
    
    ctx.strokeStyle= 'grey'
    
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