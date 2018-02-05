var Xcnt = 0, Ycnt =0
var timer = 1/30
var n = 1.5+(timer/2), l = n - (timer/2)
var stick = n-l
var tn = 1.5, tl = tn - (time/60)
var w = 640, h = 340
var c = doc('animations')
var ctx = c.getContext("2d") 
var inProgress = false
var center = w/2

var time = 0

function init(c){
    document.getElementById('animations').width = w
    document.getElementById('animations').height = h
    c.fillRect(0,0,w,h);
    //grid(ctx)
    xy(ctx)
    c.strokeStyle= 'white'
}

function go(c){
    
    displayTime()
    
    c.fillRect(0,0,w,h);
    //grid(ctx)
    xy(ctx)
    c.strokeStyle= 'white'
    
    for(var i=0; center > i;i++){
        buildSections(ctx)
        clockHand(ctx,i)
        
    }
    
    n = n + timer
    l = l + timer
    
    setTimeout(function(){
        go(c)
    }, 1000);
}

function displayTime(){
    document.getElementById('s').innerHTML = time - (Math.floor(time/60)*60)
    document.getElementById('m').innerHTML = Math.floor(time/60)
    document.getElementById('h').innerHTML = Math.floor(time/60/60)
    time++
}

function clockHand(c,i){
    c.beginPath();
    c.arc(w/2, h/2, ((w/2)-i)/2, (l*Math.PI)+stick, (n*Math.PI)-stick)
    c.stroke()
}

function buildSections(c){
    var s = 60
    var n = 2/s
    for(var i = 0; i < s ;i++){
        if(Math.floor(s/8) < s){
            c.beginPath();
            c.arc(w/2, h/2, (w/2)/2, (n*Math.PI), (n*Math.PI))
            c.stroke()
            n = n+n
        }
    }
}

function lineMove(){
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
    var gw = (w/h)*10
    var gh = w/h*10
    
    
    ctx.strokeStyle= 'grey'
    
    var hn = 0
    for(var i = 0; i < (h/(h/gh));i++){
        ctx.moveTo(0,hn);
        c.lineTo(w,hn);
        hn=hn+(h/gh)
    }
    var wn = 0
    for(var i = 0; i < (w/(w/gw));i++){
        ctx.moveTo(wn,0);
        c.lineTo(wn,h);
        wn=wn+(w/gw)
    }
    c.stroke()
}



function doc(id){
      return document.getElementById(id) 
}
