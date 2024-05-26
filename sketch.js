//Created by Marcus Lee May 25th 2024

let font;
let fire = [];
let buttonX = 95;
let dragging = false;
let data;
let sliderYear = 0;
let smoke = [];
let smokeDensity;
let thermometer,
  thermHeight = 877,
  thermIn = 1.7;
let islandLand,
  islandBorder,
  islandOcean,
  oceanHeight = 955,
  oceanIn = 1.4;
let cloud,
  cloudStorm,
  rainDrop,
  rain = [],
  rainVar = 1;
let bus,
  busBorder,
  roadBack,
  roadFore,
  roadForeX = 254,
  roadBackX = 254,
  roadAnimF = 1.3;
roadAnimB = 0.2;
let binBottom,
  binLid,
  binLogo,
  logoRot = 2,
  logoAnim = 1,
  binVar = 0;
let plant = [],
  plant1,
  plant2,
  plant3,
  plantAnim = 0,
  plantImage = 0,
  plantWater = [],
  water4Plant;

function preload() {
  font = loadFont("font/MerriweatherSans-Regular.ttf");
  factory = loadImage("assets/factory.png");
  data = loadJSON("GHG.json");
  thermometer = loadImage("assets/thermometer_empty.png");
  islandLand = loadImage("assets/island_land.png");
  islandBorder = loadImage("assets/island_border.png");
  islandOcean = loadImage("assets/island_ocean.png");
  cloud = loadImage("assets/weather_cloud.png");
  cloudStorm = loadImage("assets/weather_storm.png");
  rainDrop = loadImage("assets/weather_rain_drop.png");
  bus = loadImage("assets/bus.png");
  busBorder = loadImage("assets/bus_mask.png");
  roadFore = loadImage("assets/road_foreground.png");
  roadBack = loadImage("assets/road_background.png");
  binBottom = loadImage("assets/recycle_bin_bottom.png");
  binLid = loadImage("assets/recycle_bin_lid.png");
  binLogo = loadImage("assets/recycling.png");
  plant1 = loadImage("assets/plant1.png");
  plant2 = loadImage("assets/plant2.png");
  plant3 = loadImage("assets/plant3.png");
  water4Plant = loadImage("assets/water4plant.png");
}

function setup() {
  createCanvas(800, 1500);
  colorMode(HSB);
  rectMode(CENTER);
  textFont(font);
  imageMode(CENTER);
  angleMode(DEGREES);

  // Strength of fire
  setInterval(createFire, 25);

  // Start of smoke
  setInterval(createSmoke, 25);

  //Start of rain
  setInterval(createRain, 25);

  //create plant array
  plant = [plant1, plant2, plant3];
}

function draw() {
  background(211, 100, 45);

  // Global Warming Sign
  GWSign(265, 187, 80);

  // Creating Fire
  for (let i = fire.length - 1; i >= 0; i--) {
    fire[i].show();
    fire[i].update();

    // Deleting fire
    if (fire[i].y < 55) {
      fire.splice(i, 1);
    }
  }

  // Description
  mainCauseDes();

  // Factory
  image(factory, 160, 521, 250, 250);

  // Creating smoke
  for (let i = smoke.length - 1; i >= 0; i--) {
    smoke[i].show();
    smoke[i].update();

    // Deleting smoke
    if (smoke[i].y < 360) {
      smoke.splice(i, 1);
    }
  }

  // Years texts
  customTexts("Year", 18, 28, 630, 0, 0, 100, LEFT);

  // Slider
  slider();

  // AGGI Indicator
  AGGIIn();

  //Effects

  //Thermometer
  therm(122, 870);

  //island
  island(389, 955);

  //cloud
  storm(667, 840);

  //creating rain
  for (let i = rain.length - 1; i >= 0; i--) {
    rain[i].show();
    rain[i].update();

    // Deleting rain
    if (rain[i].y > 984) {
      rain.splice(i, 1);
    }
  }

  //create cloud storm
  if (mouseX > 568 && mouseX < 752 && mouseY > 755 && mouseY < 988) {
    if (random(1, map(rainVar, 1, 5, 470, 50)) < 10) {
      image(cloudStorm, 667, 840, 220, 220);
    }
  } else if (random(1, map(rainVar, 1, 5, 470, 50)) < 10) {
    image(cloudStorm, 667, 840, 220, 220);
  }

  //Solutions

  //bus
  vehicle(460, 1276);

  //recycling bin
  recycle(650, 1277);

  //plant tree
  tree(150, 1250);

  //creating plant water
  for (let i = plantWater.length - 1; i >= 0; i--) {
    plantWater[i].show();
    plantWater[i].update();

    // Deleting plant water
    if (
      plantWater[i].y > 1320 ||
      plantWater[i].x < 60 ||
      plantWater[i].x > 225
    ) {
      plantWater.splice(i, 1);
    }
  }

  banners();

  // Global Warming texts
  customTexts("Global Warming", 40, width / 2, 183, 0, 0, 0, CENTER);

  customTexts("Main Cause", 35, width / 2, 286, 54, 100, 100, CENTER);

  // Greenhouse Effect texts
  customTexts("Greenhouse Effect", 26, 20, 342, 0, 0, 100, LEFT);

  //Effects texts
  customTexts("Effects", 35, width / 2, 680, 54, 100, 100, CENTER);

  //Solution texts
  customTexts("Solution", 35, width / 2, 1075, 54, 100, 100, CENTER);

  // Coordinate Indicator
  // coIn();
}

function banners() {
  fill(211, 100, 100);
  rect(width / 2, 25, width, 50);
  rect(width / 2, 290, width, 50);
  rect(width / 2, 685, width, 50);
  rect(width / 2, 1080, width, 50);
  rect(width / 2, 1475, width, 50);
}

function GWSign(x, y, size) {
  noStroke();
  fill(31, 100, 100);
  for (let i = 0; i < 28; i++) {
    circle(x + i * 10, y, size + 35);
  }

  fill(51, 100, 100);
  for (let i = 0; i < 28; i++) {
    circle(x + i * 10, y, size);
  }
}

function customTexts(word, size, x, y, h, s, b, a) {
  push();
  textAlign(a, CENTER);
  noStroke();
  fill(h, s, b);
  textSize(size);
  text(word, x, y);
  pop();
}

function coIn() {
  push();
  fill("black");
  text(round(mouseX) + "," + round(mouseY), 50, 1084);
  pop();
}

class Fire {
  constructor(x, y, size, rotation, h) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.size = size;
    this.rotation = rotation;
    this.h = h;
  }

  show() {
    push();
    noStroke();
    fill(this.h, 100, 100);
    translate(this.x, this.y);
    rotate((this.angle * PI) / 180);
    triangle(0, -this.size, this.size * 1.8, 0, 0, this.size);
    pop();
  }

  update() {
    this.y -= 1.5;
    this.angle += this.rotation;
    if (this.size > 0) {
      this.size -= 0.27;
    } else {
      this.size = 0;
    }
  }
}

function createFire() {
  for (let i = 0; i < 4; i++) {
    let f = new Fire(
      random(225, 560),
      128,
      random(5, 20),
      random(-300, 300),
      random(23, 51)
    );
    fire.push(f);
  }
}

function mainCauseDes() {
  customTexts(
    " Greenhouse  gases  are  emitted  by  burning",
    14,
    490,
    343,
    0,
    0,
    100,
    LEFT
  );

  customTexts(" fossil fuels", 14, 490, 367, 0, 0, 100, LEFT);

  customTexts(
    " Greenhouse  gases  trap  heat  in  the",
    14,
    490,
    405,
    0,
    0,
    100,
    LEFT
  );

  customTexts(" atmosphere", 14, 490, 429, 0, 0, 100, LEFT);

  customTexts(
    " The  NOAA  Annual  Greenhouse  Gas ",
    14,
    490,
    467,
    0,
    0,
    100,
    LEFT
  );

  customTexts(
    "Index  (AGGI)  tracks  the  increasing",
    14,
    492,
    491,
    0,
    0,
    100,
    LEFT
  );

  customTexts(
    "amount  of  heat  being  added  to  the",
    14,
    492,
    515,
    0,
    0,
    100,
    LEFT
  );

  customTexts("atmosphere  by  human-related", 14, 492, 539, 0, 0, 100, LEFT);

  customTexts(
    "greenhouse  gas  (GHG)  emissions",
    14,
    492,
    563,
    0,
    0,
    100,
    LEFT
  );

  customTexts(
    "The  AGGI  is  increasing  throughout  the",
    14,
    492,
    601,
    0,
    0,
    100,
    LEFT
  );

  customTexts("years", 14, 492, 625, 0, 0, 100, LEFT);

  push();
  fill("white");
  circle(480, 346, 5);
  circle(480, 408, 5);
  circle(480, 470, 5);
  circle(480, 604, 5);
}

function slider() {
  // Slider
  push();
  noStroke();
  fill(211, 48, 100);
  for (let i = 0; i < 105; i++) {
    circle(80 + i * 2, 633, 6);
  }
  pop();

  // Button
  push();
  noStroke();
  for (let i = 0; i < 2; i++) {
    fill(211, i + i * 100, 100);
    circle(buttonX, 633, 20 - i * 10);
  }
  pop();

  if (dragging) {
    buttonX = constrain(mouseX, 95, 272);
    sliderYear = round(map(buttonX, 95, 272, 0, 43));
  }

  // Year on top of button
  customTexts(data.GHG[sliderYear].Year, 18, buttonX, 604, 0, 0, 100, CENTER);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, buttonX, 633);
  if (d < 10) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false;
}

function AGGIIn() {
  push();
  noStroke();
  // Blue backdrop
  fill(211, 48, 100);
  square(382, 490, 120);

  // AGGI text
  customTexts("AGGI", 18, 359, 450, 5, 100, 40, LEFT);

  // AGGI Variable
  customTexts(data.GHG[sliderYear].AGGI, 40, 384, 495, 0, 100, 0, CENTER);
  pop();
}

class Smoke {
  constructor(x, y, size, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.b = b;
  }

  show() {
    push();
    noStroke();
    fill(0, 0, this.b);
    circle(this.x, this.y, this.size);
    pop();
  }

  update() {
    this.y -= 1;
    this.x = this.x + 0.5;
    if (this.size > 0) {
      this.size = this.size - 0.2;
    } else {
      this.size = 0;
    }
  }
}

function createSmoke() {
  // Generate more smoke particles based on sliderYear value
  smokeDensity = map(sliderYear, 0, 43, 2, 15);
  for (let i = 0; i < smokeDensity; i++) {
    let s = new Smoke(random(81, 228), 445, random(5, 20), random(10, 60));
    smoke.push(s);
  }
}

function therm(x, y) {
  //Thermometer
  push();
  //light blue background
  fill(211, 26, 100);
  rect(x, y, 200, 200);

  fill(1, 87, 100);
  rectMode(CORNERS);
  rect(x - 70, y + 100, 200, thermHeight);

  //thermometer animation
  if (mouseX > 100 && mouseX < 146 && mouseY > 766 && mouseY < 971) {
    thermHeight = max(thermHeight - thermIn, 766);
  } else {
    thermHeight = min(thermHeight + thermIn, 874);
  }

  //thermometer image
  image(thermometer, x, y, 220, 220);

  //Higher temperature
  customTexts("Higher temperature", 19, x + 3, y + 155, 0, 0, 100, CENTER);
  pop();
}

function island(x, y) {
  push();

  //land
  image(islandLand, x, y, 278, 494);

  //ocean
  image(islandOcean, x, oceanHeight, 278, 494);

  if (mouseX > 266 && mouseX < 513 && mouseY > 742 && mouseY < 986) {
    oceanHeight = max(oceanHeight - oceanIn, 760);
  } else {
    oceanHeight = min(oceanHeight + oceanIn, 955);
  }

  //border
  image(islandBorder, x, y, 278, 494);
  pop();

  //Rising water level
  customTexts("Rising Water Level", 19, x + 3, y + 70, 0, 0, 100, CENTER);
}

function storm(x, y) {
  //cloud
  push();

  image(cloud, x, y, 220, 220);

  if (mouseX > 568 && mouseX < 752 && mouseY > 755 && mouseY < 988) {
    rainVar = min(rainVar + 0.03, 5);
  } else {
    rainVar = max(rainVar - 0.05, 1);
  }

  pop();

  //Rising water level
  customTexts("Extreme Weather", 19, x + 3, y + 185, 0, 0, 100, CENTER);
}

class Rain {
  constructor(x, y, size, rotation) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = rotation;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    image(rainDrop, 0, 0, this.size, this.size);
    pop();
  }

  update() {
    this.y += 3;
    this.x = this.x - 0.4;
  }
}

function createRain() {
  for (let i = 0; i < rainVar; i++) {
    let r = new Rain(random(576, 760), 850, 18, 10);
    rain.push(r);
  }
}

function vehicle(x, y) {
  push();
  image(roadFore, roadForeX, 1276, 400, 200);
  image(roadBack, roadBackX, 1276, 400, 200);
  image(bus, x - 65, 1276, 200, 200);
  image(busBorder, x, y, 475.1852, 207.4074);

  //bus animation
  roadForeX = roadForeX - roadAnimF;
  roadBackX = roadBackX - roadAnimB;

  //bus acceleration/deceleration
  if (mouseX > 293 && mouseX < 493 && mouseY > 1177 && mouseY < 1375) {
    roadAnimF = min(roadAnimF + 0.026, 6.5);
    roadAnimB = min(roadAnimB + 0.01, 1.7);
  } else {
    roadAnimF = max(roadAnimF - 0.039, 1.3);
    roadAnimB = max(roadAnimB - 0.008, 0.2);
  }

  //road loop
  if (roadForeX < 294) {
    roadForeX = 494;
  }

  if (roadBackX < 294) {
    roadBackX = 494;
  }

  //Use Public Transport texts
  customTexts("Use Public Transport", 19, x - 67, y + 135, 0, 0, 100, CENTER);
  fill(211, 100, 45);
  rect(150, 1276, 150, 205);

  pop();
}

function recycle(x, y) {
  push();
  translate(x + 5, y);
  image(binBottom, 0, 0, 250, 250);
  image(binLid, 0, 0 - binVar, 250, 250);

  logoRot = logoRot + logoAnim;
  rotate(logoRot);

  //logo acceleration/deceleration
  if (mouseX > 579 && mouseX < 713 && mouseY > 1176 && mouseY < 1364) {
    logoAnim = min(logoAnim + 0.05, 10);
    binVar = 30;
  } else {
    logoAnim = max(logoAnim - 0.1, 1);
    binVar = 0;
  }

  //logo loop
  if (logoRot > 360) {
    logoRot = 0;
  }

  image(binLogo, 0, 0, 250, 250);
  pop();

  //Recycling texts
  customTexts("Recycling", 19, x, y + 135, 0, 0, 100, CENTER);
}

function tree(x, y) {
  push();
  image(plant[plantImage], x, y, 250, 250);

  //plant animation count
  if (mouseX > 61 && mouseX < 229 && mouseY > 1105 && mouseY < 1316) {
    plantAnim = min(plantAnim + 1, 300);
    createPlantWater();
  } else {
    plantAnim = max(plantAnim - 1, 0);
  }

  //plant animation
  if (plantAnim >= 0 && plantAnim < 100) {
    plantImage = 0;
  } else if (plantAnim >= 101 && plantAnim < 200) {
    plantImage = 1;
  } else if (plantAnim >= 201 && plantAnim <= 300) {
    plantImage = 2;
  }

  pop();

  //Planting texts
  customTexts("Planting", 19, x - 8, y + 162, 0, 0, 100, CENTER);
}

class PlantWater {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    image(water4Plant, 0, 0, this.size, this.size);
    pop();
  }

  update() {
    this.y += 3;
  }
}

function createPlantWater() {
  for (let i = 0; i < 1; i++) {
    let w = new PlantWater(
      random(
        map(mouseX, 61, 229, 109, 174) - 50,
        map(mouseX, 61, 229, 109, 174) + 50
      ),
      mouseY,
      40
    );
    plantWater.push(w);
  }
}
