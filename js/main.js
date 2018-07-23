let GameState = {
    CHAT: 2,
    PEOPLE: 0,
    DETAIL: 1,
    PAPERS: 3
}

let GameImage = function(x, y, width, height, img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = width;
    this.height = height;
}

GameImage.prototype.draw = function(){
    if (this.img != null) {
        image(this.img, this.x, this.y, this.width, this.height);
    }
}

let GameText = function(x, y, alignH, alignV, text, textSize){
    this.x = x;
    this.y = y;
    this.alignH = alignH;
    this.alignV = alignV;
    this.text = text;
    this.textSize = textSize;
}

GameText.prototype.draw = function(){
    textAlign(this.alignH, this.alignV);
    textSize(this.textSize);
    fill(255, 255, 255);
    text(this.text, this.x, this.y);
}

let TextButton = function(x, y, width, height, text, moved, click){
    this.x = x;
    this.y = y;
    this.text = text;
    this.sndImg = null;
    this.width = width;
    this.height = height;
    this.mouseMoved = moved;
    this.mouseClick = click;
    this.mouseInRegion = false;
}

TextButton.prototype.mouseMovedUpdate = function () {
    this.mouseInRegion = true;
    if (mouseX < this.x || mouseY < this.y || mouseX > this.x + this.width || mouseY > this.y + this.height) {
        this.mouseInRegion = false;
    }
    if (this.mouseMoved != null) {
        this.mouseMoved();
    }
}

TextButton.prototype.mouseClickUpdate = function () {
    this.mouseInRegion = true;
    if (mouseX < this.x || mouseY < this.y || mouseX > this.x + this.width || mouseY > this.y + this.height) {
        this.mouseInRegion = false;
    }
    if (this.mouseClick != null) {
        this.mouseClick();
    }
}

TextButton.prototype.draw = function () {
    fill(0, 0, 0, 125);
    rect(this.x, this.y, this.width, this.height, 0);
    textSize(12);
    fill(255, 255, 255);
    textAlign(LEFT, CENTER);
    text(this.text, this.x + 10, this.y + this.height / 2, this.width - 20);
    if (this.sndImg != null) {
        image(this.sndImg, this.x, this.y, this.width, this.height);
    }
}

let GameButton = function(x, y, width, height, img, transparency, moved, click){
    this.x = x;
    this.y = y;
    this.img = img;
    this.sndImg = null;
    this.width = width;
    this.height = height;
    this.transparency = transparency;
    this.mouseMoved = moved;
    this.mouseClick = click;
    this.mouseInRegion = false;
}

GameButton.prototype.mouseMovedUpdate = function(){
    this.mouseInRegion = true;
    if(mouseX < this.x || mouseY < this.y || mouseX > this.x + this.width || mouseY > this.y + this.height){
        this.mouseInRegion = false;
    }
    if(this.mouseMoved != null){
        this.mouseMoved();
    }
}

GameButton.prototype.mouseClickUpdate = function(){
    this.mouseInRegion = true;
    if (mouseX < this.x || mouseY < this.y || mouseX > this.x + this.width || mouseY > this.y + this.height) {
        this.mouseInRegion = false;
    }
    if (this.mouseClick != null){
        this.mouseClick();
    }
}

GameButton.prototype.draw = function(){
    fill(0, 0, 0, this.transparency);
    rect(this.x, this.y, this.width, this.height, 0);
    let cx = this.x;
    let cy = this.y;
    let cw = this.width;
    let ch = this.height;
    if(this.transparency > 0){
        cx += this.width / 6;
        cy += this.height / 6;
        cw -= this.width / 3;
        ch -= this.height / 3;
    }
    image(this.img, cx, cy, cw, ch);
    if(this.sndImg != null){
        image(this.sndImg, this.x, this.y, this.width, this.height);
    }
}

function peopleHover(){
    if (this.mouseInRegion) {
        this.sndImg = graphics.highlightPicture;
    }
    else {
        this.sndImg = graphics.normalPicture;
    }
}

function peopleClick(){
    if (this.mouseInRegion) {
        selectedIndex = this.index;
        gameState = GameState.DETAIL;
    }
}

function buttonHover(){
    if (this.mouseInRegion) {
        this.sndImg = graphics.highlightPicture;
    }
    else {
        this.sndImg = null;
    }
}

function backClick(){
    if (this.mouseInRegion) {
        gameState = GameState.PEOPLE;
    }
}

function detailBackClick() {
    if (this.mouseInRegion) {
        gameState = GameState.DETAIL;
    }
}

function loveClick(){
    if(!this.mouseInRegion){
        return;
    }
    data.people[selectedIndex].loved = !data.people[selectedIndex].loved;
}

function chatClick(){
    if (this.mouseInRegion) {
        gameState = GameState.CHAT;
        data.people[selectedIndex].newMessages = 0;
    }
}

function publicationsClick(){
    if (this.mouseInRegion) {
        gameState = GameState.PAPERS;
    }
}

let gameState = GameState.PEOPLE;
let stateEntities = {};
for(let state in GameState){
    stateEntities[GameState[state]] = [];
}
let graphics = {};
let data = {};
let accuracyShift = 0;
let selectedIndex = 0;

function preload(){
    graphics.logo = loadImage("assets/logo.png");
    graphics.highlightPicture = loadImage("assets/highlightPictureBlend.png");
    graphics.normalPicture = loadImage("assets/normalPictureBlend.png");
    graphics.publications = loadImage("assets/publications.png");
    graphics.chat = loadImage("assets/chat.png");
    graphics.back = loadImage("assets/back.png");
    graphics.love = loadImage("assets/love.png");
    graphics.loveClick = loadImage("assets/loveFull.png");
    data.people = [{
        id: "DRcyg5kAAAAJ",
        name: "Ahmed Khalifa",
        detail: "PhD Student, New York University",
        papers: [
            { name:"General video game level generation", year:2016, citations:30},
            { name: "Matching games and algorithms for general video game playing", year: 2016, citations: 25 },
            { name: "Modifying MCTS for Human-Like General Video Game Playing", year: 2016, citations: 20 },
            { name: "DeepTingle", year: 2017, citations: 9 },
            { name: "General video game rule generation", year: 2017, citations: 7 }
        ],
        citations: 112,
        hindex: 3,
        i10index: 6, 
        image: loadImage("https://pbs.twimg.com/profile_images/728103741736427520/XNSQkGgo_400x400.jpg")
    }];
    for(let i=0; i<14; i++){
        let person = {
            id: "lr4I9BwAAAAJ",
            name: "Julian Togelius",
            detail: "Associate Professor of Computer Science and Engineering, New York University",
            papers: [
                { name:"Search-based procedural content generation: A taxonomy and survey", year:2011, citations:431},
                { name: "Experience-driven procedural content generation", year: 2011, citations: 319 },
                { name: "Towards automatic personalised content creation for racing games", year: 2007, citations: 272 },
                { name: "An experiment in automatic game design", year: 2008, citations: 219 },
                { name: "Modeling player experience for content creation", year: 2010, citations: 185 }
            ],
            citations: 7778,
            hindex: 45,
            i10index: 150,
            image: loadImage("https://pbs.twimg.com/profile_images/594197085496483842/YA3G3hat_400x400.jpg"),
            loved: false,
            blocked: false,
            date: false,
            messages: [],
            newMessages: 0,
            responseSpeed: 10,
            respondTimer: 10,
            invokeYou: true,
            invokeYouTimer: 10
        }
        data.people.push(person);
    }
}

function setup(){
    let c = createCanvas(400, 500);
    c.parent(document.getElementById("game"));
    background(0, 0, 0);
    accuracyShift = 4 + Math.floor(Math.random() * 5);

    for (let i = 0; i < data.people.length; i++) {
        let xPos = (i % 4) * 100;
        let yPos = Math.floor(i / 4) * 100 + 70;
        stateEntities[GameState.PEOPLE].push(new GameButton(xPos + 1, yPos + 1, 98, 98, data.people[i].image, 0, peopleHover, peopleClick));
        stateEntities[GameState.PEOPLE][i].sndImg = graphics.normalPicture;
        stateEntities[GameState.PEOPLE][i].index = i;
    }

    stateEntities[GameState.DETAIL].push(new GameButton(10, 80, 60, 60, graphics.back, 125, buttonHover, backClick));
    stateEntities[GameState.DETAIL].push(new GameButton(width - 70, 80, 60, 60, graphics.publications, 125, buttonHover, publicationsClick));
    stateEntities[GameState.DETAIL].push(new GameButton(width - 70, 80 + 60 + 10, 60, 60, graphics.chat, 125, buttonHover, chatClick));
    stateEntities[GameState.DETAIL].push(new GameButton(width - 70, 80 + 120 + 20, 60, 60, graphics.love, 125, buttonHover, loveClick));
    stateEntities[GameState.DETAIL][stateEntities[GameState.DETAIL].length - 1].clicked = false;

    stateEntities[GameState.PAPERS].push(new GameButton(10, 80, 60, 60, graphics.back, 125, buttonHover, detailBackClick));

    stateEntities[GameState.CHAT].push(new GameButton(10, 80, 60, 60, graphics.back, 125, buttonHover, detailBackClick));
    stateEntities[GameState.CHAT].push(new TextButton(10, height - 130, width - 20, 40, "You: Blah, Blah, Blah", buttonHover, null));
    stateEntities[GameState.CHAT].push(new TextButton(10, height - 80, width - 20, 40, "You: Blah, Blah, Blah", buttonHover, null));
}

function mouseMoved(){
    for (let b of stateEntities[gameState]) {
        if(b.mouseMovedUpdate != null){
            b.mouseMovedUpdate();
        }
    }
}

function mousePressed() {
    for(let b of stateEntities[gameState]){
        if(b.mouseClickUpdate != null){
            b.mouseClickUpdate();
        }
    }
}

function drawPeople(){
    for(let b of stateEntities[gameState]){
        b.draw();
    }
    for(let i=0; i<data.people.length; i++){
        let p = data.people[i]
        let b = stateEntities[gameState][i];
        if(p.newMessages > 0){
            fill(255, 255, 255, 255);
            ellipse(b.x + 15, b.y + 15, 16, 16);
            fill(0, 0, 0, 255);
            textAlign(CENTER, CENTER);
            textSize(12);
            text(p.newMessages, b.x + 15, b.y + 15);
        }
    }
}

function drawDetail(){
    let person = data.people[selectedIndex];
    image(person.image, 1, 71, 398, 398);
    noStroke();
    fill(0, 0, 0, 125);
    let xPos = 10;
    let yPos = height - 40 - 150
    rect(xPos, yPos, width - 20, 150, 0);
    if (person.loved) {
        stateEntities[gameState][stateEntities[gameState].length - 1].img = graphics.loveClick;
    }
    else {
        stateEntities[gameState][stateEntities[gameState].length - 1].img = graphics.love;
    }
    for(let i=0; i<stateEntities[gameState].length; i++){
        if(selectedIndex != 0 || i < stateEntities[gameState].length - 2){
            stateEntities[gameState][i].draw();
        }
    }
    if (data.people[selectedIndex].newMessages > 0) {
        let b = stateEntities[gameState][2];
        fill(255, 255, 255, 255);
        ellipse(b.x + 15, b.y + 15, 16, 16);
        fill(0, 0, 0, 255);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(data.people[selectedIndex].newMessages, b.x + 15, b.y + 15);
    }
    textAlign(LEFT, TOP);
    textSize(24);
    fill(255, 255, 255);
    text(person.name, xPos + 5, yPos + 5);
    textSize(12);
    text(person.detail, xPos + 5, yPos + 40, width - 30);
    textSize(12);
    textAlign(CENTER, TOP);
    text("Citations: " + person.citations, width / 2, yPos + 80);
    text("h-index: " + person.hindex, width / 2, yPos + 100);
    text("i10-index: " + person.i10index, width / 2, yPos + 120);

}

function drawPapers(){
    let person = data.people[selectedIndex];
    image(person.image, 1, 71, 398, 398);
    noStroke();
    fill(0, 0, 0, 125);
    let xPos = 10;
    let yPos = 150
    rect(xPos, yPos, width - 20, height - 190, 0);
    for (let b of stateEntities[gameState]) {
        b.draw();
    }
    for(let i=0; i<person.papers.length; i++){
        let p = person.papers[i];
        textAlign(LEFT, CENTER);
        textSize(12);
        fill(255, 255, 255);
        text(p.name, 20, yPos + 30 + 60*i, width - 200);
        textAlign(RIGHT, CENTER);
        text(p.year, width - 20, yPos + 30 + 60*i);
        textAlign(CENTER, CENTER);
        text(p.citations, width - 120, yPos + 30 + 60 * i);
    }
}

function drawChat(){
    let person = data.people[selectedIndex];
    image(person.image, 1, 71, 398, 398);
    noStroke();
    fill(0, 0, 0, 125);
    let xPos = 10;
    let yPos = 150
    rect(xPos, yPos, width - 20, height - 190 - 100, 0);
    for (let b of stateEntities[gameState]) {
        b.draw();
    }
}

function draw(){
    clear();
    background(0, 0, 0);
    fill(103, 0, 157);
    noStroke();
    rect(0, 0, width, 70);
    rect(0, height - 30, width, 30);
    image(graphics.logo, width / 2 - 0.15 * graphics.logo.width, 10,
        0.3 * graphics.logo.width, 0.3 * graphics.logo.height);
    textAlign(RIGHT, CENTER);
    textSize(24);
    fill(255, 255, 255);
    text("Scholar", width / 2 - 0.15 * graphics.logo.width - 10, 35);
    textAlign(LEFT, CENTER);
    text("Dating", width / 2 + 0.15 * graphics.logo.width + 10, 35);
    switch(gameState){
        case GameState.PEOPLE:
            drawPeople();
        break;
        case GameState.DETAIL:
            drawDetail();
        break;
        case GameState.CHAT:
            drawChat();
        break;
        case GameState.PAPERS:
            drawPapers();
        break;
    }
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(255, 255, 255);
    text('citations accuracy: ' + accuracyShift, width / 2, height - 15);
}