/**
 * Author: Caroline Hoang
 * Inspired by the work of Andrew Jakubowicz
 * Basic platformer functionality with pure javascript that uses SVGs 
 *        for images and "doors" that double as site-navigating links
**/

var screen = document.getElementById("screen");
var player = document.getElementById("player");
var platform = document.getElementsByClassName("platform");

SpaceBar = " ";

xVar = 10;
yVar = 200
// var gameMap= document.getElementById("gameMap");
//   // elChild = document.createElement("<rect class= 'platform' id='5' x='10' y='200'  width='100' height='20' />");
//   var rect = document.createElement('rect');
//   rect.setAttribute( 'x', xVar);
//   rect.setAttribute( 'y', yVar);
//   rect.setAttribute( 'height', '50');
//   rect.setAttribute( 'width', '100');
//   rect.setAttribute( 'fill', 'red');
//   // document.getElementById('svgOne').appendChild(rect);
//   document.getElementById("gameMap").appendChild(rect);
  // gameMap.appendChild(elChild);
// gameMap.appendChild("<rect class= 'platform' id='5' x='10' y='200'  width='100' height='20' />");

{/* <rect class= 'platform' id='5' x='50' y='280'  width='100' height='20' /> */}




// var upRamp = document.querySelector("#myCanvas");
// var URContext = upRamp.getContext("2d");




var platPos = [
                500,310,100,20,
                350,310,100,20,
                250,340,100,20,
                650,350,100,20,
                350,390,100,20,
                50,390,100,20,
                500,430,100,20,
                650,430,100,20,
                5,480,1000,5,
                50,280,100,20 
]//200,470,500,5

var platPositions = [
  [500,310,100,20],
  [350,310,100,20],
  [250,340,100,20],
  [650,350,100,20],
  [350,390,100,20],
  [50,390,100,20],
  [500,430,100,20],
  [650,430,100,20],
  [5,480,1000,5],
  [50,280,100,20] 
]

var height = 500, //determines how many pixels away from the top of the screen is our baseline where the box will lie at rest/ y=0
    width = 1300, //width of screen //"9vw"
    basePlayerHeight =60, //63=60(baseplayer img height)+3(extra px of hight between ground and "feet") //NOTE: I went back to 60 this time!
    playerHeight = basePlayerHeight, //actual box height ["tallness"] is determined in html; here we determine how high the base of the box is to the y=0 hight line
    //height -playerHeight = pixels between the bottom of the box and the green base line
    playerWidth = 40;

var speed = 5;

screen.setAttribute("width", width);
screen.setAttribute("height", height);


// Annoying because y is 0 at the TOP!

// Also the x co-ordinate of the player is on the top left.
// Set up data of the "game"
var worldData = {
  "player": {
    "x" : Math.floor(width / 2) - Math.floor(playerWidth / 2),
    "y" : 8, //height - playerHeight
    "fallingSpeed": 0,
    "currentDir": null,
    "jumpDisplacement": 1,
    "playerFacing":"left"
  },
  // Stores the current held keys. Can be inspected.
  "keysDown": []
}

let update = () => {
  // Bind svg rectangle to worldData
  player.setAttribute("x", worldData.player.x);
  player.setAttribute("y", worldData.player.y);
}
update();

//generate the platforms on the dom dynamically


//the problem with generating all the platforms dynamically is that I'll have to define the avatar dynamically too or it'll sit on top because svg does not support x-index
// xVar ="10";
// yVar ="200";
// var rect = document.createElementNS("http://www.w3.org/2000/svg",'rect');
// rect.setAttribute( 'x', xVar);
// rect.setAttribute( 'y', yVar);
// rect.setAttribute( 'height', '50');
// rect.setAttribute( 'width', '100');
// rect.setAttribute( 'fill', 'red');
// // document.getElementById('svgOne').appendChild(rect);
// document.getElementById("screen").appendChild(rect);








// We are now in the amazing position that we can
// update the data and call `update()` to simply
// draw the next frame.
// Set up a simple frameRate interval.
var interval = setInterval((callback)=>{
 



    // Stuff that happens in here happens every frame.

    var platWidth = document.getElementById("8");
    var rectWidth = platWidth.getBoundingClientRect(); // get the bounding rectangle

    // console.log( rect.width );
    // console.log( rect.height)
    console.log("the width of element is: "+ rectWidth.width);
    // console.log("the width of element is: "+ platWidth.width)
    // document.getElementById(id).style.backgroundColor = "red"
    // document.getElementById("door").style.backgroundColor = "red";
    // console.log("player x: "+ worldData.player.x )
    console.log("player x: "+ worldData.player.x + "  door x: "   + document.getElementById("door1").getAttribute("x") + "    width: " +(parseInt(document.getElementById("door1").getAttribute("width"))+parseInt(document.getElementById("door1").getAttribute("x"))));
    if ((worldData.player.x <= (parseInt(document.getElementById("door1").getAttribute("width"))+parseInt(document.getElementById("door1").getAttribute("x"))))  && worldData.player.x >= (parseInt(document.getElementById("door1").getAttribute("x"))-playerWidth)   ){
        document.getElementById("door1").style.fill='yellow'
        if(isKeyDown(SpaceBar)){
            window.location.href = "http://www.w3schools.com";
        }
    }
    else{
        document.getElementById("door1").style.fill='purple'
    }

  
    if(isKeyDown(SpaceBar)){
        document.getElementById("door1").style.fill='red'
    }
  



    if (worldData.player.x <=0 ){
        worldData.player.x =0 ;
    } 
    if (worldData.player.x >= width - playerWidth ){
        worldData.player.x = width -playerWidth ;
    }


    checkForPlatform (worldData.player.x , worldData.player.y);

    
    
    // Lets move player if arrow key is down. 
    if (isKeyDown("ArrowLeft")){
        worldData.player.x -= speed;
        worldData.player.currentDir = "left"; //registers that you moved left last time
        worldData.player.playerFacing="left";
        document.getElementById("playerAvatar").classList="";
        document.getElementById("playerAvatar").classList.add("walkLeft");
    }
    else{
        worldData.player.currentDir = null;
        // document.getElementById("playerAvatar").classList="";
        // document.getElementById("playerAvatar").classList.remove("walkLeft");
        // document.getElementById("playerAvatar").classList.add("pauseLeft");

    }
    if (isKeyDown("ArrowRight")){
        worldData.player.x += speed;
        worldData.player.currentDir = "right"; //registers that you moved right last time
        // document.getElementById("player").classList.add("player-walking");
        // document.getElementById("playerAvatar").classList.remove("walkingLeft").add("walkingRight");
        worldData.player.playerFacing="right";
        document.getElementById("playerAvatar").classList="";
        document.getElementById("playerAvatar").classList.add("walkRight");
    }
    else{
        worldData.player.currentDir = null;
        // document.getElementById("playerAvatar").classList="";
        // document.getElementById("playerAvatar").classList.remove("walkRight");
        // document.getElementById("playerAvatar").classList.add("pauseRight");
        // document.getElementById("playerAvatar").classList.add("pauseRight");
    }
    
    if (isKeyDown("ArrowUp" ) && !(isKeyDown("ArrowRight")) && !(isKeyDown("ArrowLeft")) ){
        worldData.player.currentDir = null;
        //registers that you jumped STRAIGHT UP
        //playerHeight=playerHeight+5;
    }


    
    // Adding gravity
    if (height - worldData.player.y <= playerHeight && worldData.player.fallingSpeed >= 0){
        worldData.player.y = height - playerHeight;
        worldData.player.fallingSpeed = 0;
    } 


  
    else {
        // The player is falling
        worldData.player.y += worldData.player.fallingSpeed;
        worldData.player.fallingSpeed += .5;
        // worldData.player.y += 1;
      
        if (worldData.player.currentDir === "left") {
            worldData.player.x -= worldData.player.jumpDisplacement;          //if you were heading left midair, keep heading left
            //worldData.player.x -= speed *.5;
            //worldData.player.currentDir = null;
        }
        if (worldData.player.currentDir === "right") {
          worldData.player.x += worldData.player.jumpDisplacement;
            //if you were heading right midair, keep heading right
            //worldData.player.x += speed *.5;
        }  
    }
  
    
    if (isKeyDown("ArrowUp") && worldData.player.fallingSpeed === 0 && height - worldData.player.y === playerHeight){
        worldData.player.fallingSpeed = -8;
        document.getElementById("player").classList.add("player-walking");
    }

    if (!isKeyDown("ArrowLeft") && !isKeyDown("ArrowRight") && !isKeyDown("ArrowUp" )) {
        console.log ("WE SHOULD BE STANDING!!")
        if (worldData.player.playerFacing == "left"){
          document.getElementById("playerAvatar").classList="";
          document.getElementById("playerAvatar").classList.add("pauseLeft");
        }
        else if ( worldData.player.playerFacing == "right"){
          document.getElementById("playerAvatar").classList="";
          document.getElementById("playerAvatar").classList.add("pauseRight");
        }
    }
    
    // Every frame we want to update the svg.
    update()

}, 30)


// Arrow keys.
document.addEventListener('keydown', (e)=>{
    var key = e.key;
    fireKeyAction(key, true)
});
document.addEventListener('keyup', (e)=>{
    var key = e.key;
    fireKeyAction(key, false)
});





function checkForPlatform (xVal, yVal){
    var cred = false;
    var currPlat;
    for (i=0;i<platPositions.length;i+=1){
    // for (i=0;i<platPos.length;i+=4){
      
        console.log("platPosition: " + platPositions[i][1] + "    fallsp: "+ worldData.player.fallingSpeed)
    
        if (yVal<=(platPositions[i][1]-basePlayerHeight) && yVal> (platPositions[i][1] -(1.5*basePlayerHeight)) && (xVal >=(platPositions[i][0]-playerWidth)) && (xVal <=(platPositions[i][0] + platPositions[i][2]))   ) {
            console.log("Yes! " )
            playerHeight = basePlayerHeight + height-platPositions[i][1] ;
            return true;   //chance that the charater will phase through a platform that is directly above another if we remove this
        }
        else if (yVal==(platPositions[i][1]-basePlayerHeight)  && ( (xVal < (platPositions[i][0]-playerWidth)) || (xVal >(platPositions[i][0] + platPositions[i][2])) ) ){
            console.log("left plat " )
            playerHeight =5; //set to ground
            worldData.player.fallingSpeed += .5;
        }

        // console.log("platPos: " + platPos[(i+1)] + "    fallsp: "+ worldData.player.fallingSpeed)
 
        // if (yVal<=(platPos[(i+1)]-basePlayerHeight) && yVal> (platPos[(i+1)]-(1.5*basePlayerHeight)) && (xVal >=(platPos[i]-playerWidth)) && (xVal <=(platPos[i] +platPos[(i+2)]))   ) {
        //   console.log("Yes! " )
        //     playerHeight = basePlayerHeight + height-platPos[(i+1)] ;
        //      return true;   //chance that the charater will phase through a platform that is directly above another if we remove this
    
        //   }
        // else if (yVal==(platPos[(i+1)]-basePlayerHeight)  && ( (xVal < (platPos[i]-playerWidth)) || (xVal >(platPos[i] +platPos[(i+2)])) ) ){
        //   console.log("left plat " )
        //   playerHeight =5; //set to ground
        //   worldData.player.fallingSpeed += .5;
        // }
    } 
    console.log ("x= "+xVal+ "          y="+ yVal);
}






// Filters keys and fires down or up.
// Updates world key array.
function fireKeyAction(key, isDown){
    // Only trigger Arrow keys.
    var keysDown = worldData.keysDown;
    switch(key){
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
        case SpaceBar:
            if (isDown) {
                // Only add the key if it's not already in the list.
                if (keysDown.indexOf(key) === -1) {
                    keysDown.push(key);
                }
            } else {
                keysDown.splice(keysDown.indexOf(key), 1);
            };
    }
}

function isKeyDown(keyName){
    return worldData.keysDown.indexOf(keyName) !== -1
}

/*not implemented*/
function isKeyUp(keyName){
    return worldData.keysup.indexOf(keyName) !== -1
}