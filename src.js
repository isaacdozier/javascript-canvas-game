var Xcnt = 0, Ycnt =0
var timer = (2/(60))
var sl = (1.5)-(timer/2), sn = (sl + (timer))
var ml = (1.5)-(timer/2), mn = (ml + (timer))
var w = 300, h = w, grid = w/100, scale = grid/3
var c = document.getElementById('graphic')
var ctx = c.getContext("2d") 
var center = h/2

const frame_rate = 80
var tick = 0

var last_fire_tick
var this_fire_tick

var Y_center = h/2, 
    X_center = w/2
    
var Y_now, X_now
var Y_start = Y_center + (Y_center - grid*2)
var X_start = X_center
var Y_trunk = 0

    X_now = X_start - grid*2
    Y_now = Y_start

var pitch      = 12
var degree     = Math.atan2(pitch,12)* 180 / Math.PI
var radian     = degree * Math.PI / 180

var len = 10
var swing = radian

function init(c){
    document.getElementById('graphic').width = w
    document.getElementById('graphic').height = h
    c.fillRect(0,0,w,h);
    go(c)
}
var timeStart
function go(c){
    thing(c)
    timeStart = Date.now()
     setInterval(function(){
        build(c)
        displayScore(c)
        displayTick(c)
    }, frame_rate-(Date.now()-timeStart));
}

var hero_trigger_pressed = false
var thing_trigger_pressed = false

function build(c){
    var tmp
    c.fillStyle = 'black'
    c.fillRect(0,0,w,h);
    sn = sn + timer
    sl = sl + timer
    
    hero(c)
    
    
    if(hero_trigger_pressed){
        new missile(c,tracking.missile.length,X_now,Y_now)
        hero_trigger_pressed = false
    }
    
    if(thing_trigger_pressed){
        tmp = tracking.thing[0].split('|')
        console.log(tmp)
        new missile(c,tracking.missile.length,tmp[0],tmp[1]+40)
        thing_trigger_pressed = false
    }
}

document.getElementsByTagName("BODY")[0].addEventListener("keyup", function(event) {
  event.preventDefault()
  //missile
  this_fire_tick = tick
  if(event.keyCode === 32){
    hero_trigger_pressed = true 
    last_fire_tick = tick
  }
})

document.getElementsByTagName("BODY")[0].addEventListener("keydown", function(event) {
  event.preventDefault()
         //up
  if (event.keyCode === 38) {
    if((Y_now - (grid*2)) > h/2)
        Y_now = Y_now - (grid*2)
  } else //down
  if(event.keyCode === 40){
    if((Y_now + (grid*2)) < h-grid*2)
        Y_now = Y_now + (grid*2)
  } else //left
  if(event.keyCode === 37){
    if((X_now - (grid*2)) > 0+grid*2)
        X_now = X_now - (grid*2) 
  } else //right
  if(event.keyCode === 39){
    if((X_now + (grid*2)) < w-grid*2)
        X_now = X_now + (grid*2)  
  }
})

var tracking = {missile:[],thing:[],score:0}

function collision(t){
    var thing_coords = [w/2, grid*4.5]
    if(tracking.thing[0])
        thing_coords = tracking.thing[0].split('|')
    
    if(tracking.missile[t]){
        var missile_coords = tracking.missile[t].split('|')
            
        var Y_col = Number(missile_coords[1]) - Number(thing_coords[1]) < 20 && Number(missile_coords[1]) - Number(thing_coords[1]) > (-20)
        var X_col = Number(missile_coords[0]) - Number(thing_coords[0]) < 20 && Number(missile_coords[0]) - Number(thing_coords[0]) > (-20)

        return Y_col && X_col
    }
}

function update_missile_tracking(t_num,x,y){
    tracking.missile.splice(t_num,1, x + '|' + y)
}

function add(a,b){
    return a + b
}

function subtract(a,b){
    return a - b
}

function missile(c,num,x,y){
    var timeStart = Date.now()
    var Y,X
        
    Y = subtract(y, grid*8)
        
    var tracking_number
    if(!tracking_number){
        tracking_number = tracking.missile.length + 0
        update_missile_tracking(tracking_number,x,y) 
    }
    launch
    
    var launch = setInterval(function(){
            
        X = x
         if(collision(tracking_number)){
            tracking.score++
            tracking.missile.splice(tracking_number,1,1)
            new missile_explode(c,tracking_number,X,Y)
            clearInterval(launch)
         }  else 
         if(Y < 10){
            tracking.missile.splice(tracking_number,1,0)
            new missile_explode(c,tracking_number,X,Y)
            clearInterval(launch)
         }  else{
            c.moveTo(X,Y)
            Y = Y - grid*4
            c.lineTo(X,Y)
            c.stroke()
            y = y - grid*4 
            
            update_missile_tracking(tracking_number,X,Y) 
         }
        
    }, frame_rate-(Date.now()-timeStart));
    
}

function missile_explode(c,t,x,y){
    var explosion = setInterval(function(){
        
        var i = 0
        c.strokeStyle= 'rgb('+(i*7)+','+(i)+','+(i)+')'
        
        c.moveTo(x,y)
        c.lineTo(x + grid*4,y + grid*4)
        
        c.moveTo(x,y)
        c.lineTo(x - grid*4,y + grid*4)
        
        c.stroke()
        
        //console.log('[signal lost - '+x+'|'+y+']')
        
        if(i > 10){
            i = i + 1 
        } else {
           clearInterval(explosion)
        }
        
    }, frame_rate-(Date.now()-timeStart));
    explosion
}

function hero(c){
    var X = X_now
    var Y = Y_now
    const stride = 2
    c.strokeStyle = 'white'
    c.moveTo(X_now, Y_now)
    c.lineTo(X + grid*stride,Y + grid*stride)
    c.moveTo(X_now, Y_now)
    c.lineTo(X - grid*stride,Y - grid*stride)
    c.moveTo(X_now, Y_now)
    c.lineTo(X + grid*stride,Y - grid*stride)
    c.moveTo(X_now, Y_now)
    c.lineTo(X - grid*stride,Y + grid*stride)
    
    c.moveTo(X_now, Y_now)
    c.lineTo(X,Y - grid*3.5)
    c.stroke()
}


var thing_count = 0
function thing(c){
    var timeStart = Date.now()
    var X = getRandomArbitrary(20, (w)-20), 
        Y = getRandomArbitrary(20, h/2)
        
        thing_count++
    
    var gm
    var tracking_number 
    if(!tracking_number){
        tracking_number = tracking.thing.length + 0
        update_thing_tracking(tracking_number,X,Y)
    }
    
    var thing_coords = tracking.thing[tracking_number].split('|')
    
    var m_min_x,m_max_x,m_min_y,m_max_y
    var moving, step_X, step_Y
    
    var area_X = w/2
    var area_Y = h/4
    
    basic_mob
    basic_mob_AI
    
    var basic_mob_attack = setInterval(function(){
        
    }, frame_rate-(Date.now()-timeStart));
    var basic_mob_AI = setInterval(function(){
        //console.log('thingy ' + thing_coords)
        var random_negative = Math.round(getRandomArbitrary(-1,1))
        
        if(moving > 1){
            moving = moving - Math.ceil(moving/8)
            //tracking.thing.splice(tracking_number,1, x + '|' + y)
        }else{
            m_min_x = (thing_coords[0] - X_now)*2.4
            m_max_x = (X_now - thing_coords[0])*2.4
            
            
            m_min_x = m_min_x * random_negative
            m_max_x = m_max_x
            
            moving = getRandomArbitrary(m_min_x,m_max_x)
        }
        
        
        if(X_now < thing_coords[0]){
            step_X = Number(thing_coords[0]) + Number(moving/4)
            step_Y = Number(thing_coords[1]) - Number(2*random_negative)
            thing_coords[0] = step_X
            thing_coords[1] = step_Y
        } else 
        if(X_now > thing_coords[0]){
            step_X = Number(thing_coords[0]) + Number(moving/4)
            step_Y = Number(thing_coords[1]) - Number(2*random_negative)
            thing_coords[0] = step_X
            thing_coords[1] = step_Y
            
        } else 
        if(area_Y  > thing_coords[1]){
            step_X = Number(thing_coords[0]) + Number(moving/4)
            step_Y = Number(thing_coords[1]) + Number(4*random_negative)
            thing_coords[0] = step_X
            thing_coords[1] = step_Y
        } else 
        if(area_Y < thing_coords[1]){
            step_X = Number(thing_coords[0]) + Number(moving/4)
            step_Y = Number(thing_coords[1]) - Number(4*random_negative)
            thing_coords[0] = step_X
            thing_coords[1] = step_Y
            
        } else 
        if(thing_coords[1] < 20){
            step_X = Number(thing_coords[0]) + Number(moving/4)
            step_Y = Number(thing_coords[1]) + Number(16*random_negative)
            thing_coords[0] = step_X
            thing_coords[1] = step_Y
            
        } else{
            step_X = Number(thing_coords[0]) - Number(moving/2*random_negative)
            step_Y = Number(thing_coords[1]) + Number(4*random_negative)
            thing_coords[0] = step_X
        }
        
        if(tracking.score && 
           tracking.score === thing_count){
            clearInterval(basic_mob)
            clearInterval(basic_mob_AI)
            thing_explode(c,thing_coords[0],thing_coords[1])
            tracking.thing = []
            new thing(c)
        }
        
        X = Number(thing_coords[0])
        Y = Number(thing_coords[1])
        
        update_thing_tracking(tracking_number,thing_coords[0],thing_coords[1])
    }, frame_rate-(Date.now()-timeStart));
    
    var basic_mob = setInterval(function(){
        
        gm = grid*2
        c.strokeStyle = 'white'
        c.moveTo(X, Y)
        c.lineTo(X + gm,Y + gm)
        c.moveTo(X, Y)
        c.lineTo(X - gm,Y - gm)
        c.moveTo(X, Y)
        c.lineTo(X + gm,Y - gm)
        c.moveTo(X, Y)
        c.lineTo(X - gm,Y + gm)
        
        c.moveTo(X, Y)
        c.lineTo(X - grid*3.5,Y)
        c.moveTo(X, Y)
        c.lineTo(X + grid*3.5,Y)
        c.stroke()
    }, frame_rate-(Date.now()-timeStart));
}

function thing_explode(c,x,y){
    
    var timeStart = Date.now()
    var explosion = setInterval(function(){
        
        var i = 0
        c.strokeStyle= 'red'
        console.log('test')
        c.moveTo(x,y)
        c.lineTo(x + grid*i/2,y + grid*i/2)
        
        c.moveTo(x,y)
        c.lineTo(x - grid*i/2,y + grid*i/2)
        
        c.moveTo(x,y)
        c.lineTo(x + grid*i/2,y - grid*i/2)
        
        c.moveTo(x,y)
        c.lineTo(x - grid*i/2,y - grid*i/2)
        
        c.stroke()
        
        
        c.moveTo(x,y)
        c.lineTo(x + grid*i/2,y)
        
        c.moveTo(x,y)
        c.lineTo(x - grid*i/2,y)
        
        c.moveTo(x,y)
        c.lineTo(x,y + grid*i/2)
        
        c.moveTo(x,y)
        c.lineTo(x,y - grid*i/2)
        
        c.stroke()
        
        //console.log('[signal lost - '+x+'|'+y+']')
        
        if(i > 10){
            i = i + 1 
        } else {
           clearInterval(explosion)
        }
        
    }, frame_rate-(Date.now()-timeStart));
    explosion
}

function update_thing_tracking(t_num,x,y){
    tracking.thing.splice(t_num,1, x + '|' + y)
    //console.log(tracking.thing)
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function displayTick(c){

    c.beginPath()
    c.fillStyle = "white"
    c.font = "12px Arial";
    c.fillText('Frames: ' + tick,10,20);
    c.stroke()
    
    tick++
}

function displayScore(c){

    c.beginPath()
    c.fillStyle = "white"
    c.font = "12px Arial";
    c.fillText('Score: ' + Math.floor(thing_count-1),10,h-20);
    c.stroke()
}

function leadZero(n){if(n < 10){return "0" + n} else {return n}}