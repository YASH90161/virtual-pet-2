var dog,happyDog,database,foodS,foodStock,lastFed,fedTime,foodObj

function preload()
{
 dogImg=loadImage("images/dogImg.png");
 happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed=createButton('Feed The Dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(800,95)
  addFood.mousePressed(addFood);

  foodObj=new Food();
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function (data){
    lastFed=data.val();
  })


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 +"PM",350,30);
  }else if(lastFed==0){
    text("Last Fed: 12 AM ",350,30);
  }else {
    text("Last Fed: "+lastFed+"AM",350,30);

  }

  drawSprites();

  textSize(25);
  fill("green");
  stroke("blue");

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    food:x

  });

}
function addFood(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


