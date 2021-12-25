// hotkey
// aperte s para mostrar ou n os poligonos
// setas <- e -> trocam os pontos
// backspace deleta o ponto corrente
// m troca o modo pra adicionar pontos para mover os pontos, ao clicar com o mouse

function setup() {
    createCanvas(800, 800);
    curve1 = new Curve ([],20)
  }
  let curve1;
  let state=1 // 1 -> adicionar pontos, -1 -> mover pontos
  let showPoly =false;
  function draw() {
    background(220);
    strokeWeight(10)
    curve1.showControlPoints()
    if(mouseIsPressed&&state==-1){
      curve1.movePoint();
    }
    if (showPoly){
      curve1.showPolygon();
    }
    if(curve1.controlPoints.length > 1){
      curve1.calculatePoints();
    curve1.showCurve();
    }
    curve1.avlcs = [];
  }
  
  class Curve {
    constructor (controlPoints,nDeAvlcs){
      this.controlPoints=controlPoints
      this.avlcs=[];
      this.nDeAvlcs=nDeAvlcs;
      this.index=0;
    }
    showControlPoints(){
      for(let i=0;i<this.controlPoints.length;i++){
        if(i==this.index){
           stroke('red');
        }
         point(this.controlPoints[i].x,this.controlPoints[i].y)
         stroke('black');
              }}
    
    addIndex(){
      if(this.index<this.controlPoints.length-1){
        this.index++;
      }
    }
    decIndex(){
      if(this.index>0){
        this.index--;
      }
    }
    movePoint (){
      this.controlPoints[this.index].set(mouseX,mouseY);
    }
    calculatePoints(){ 
      let x = 1/this.nDeAvlcs;
      for (let t=0;t<=1;t+=x){
        let auxPoints=this.controlPoints.slice();
        let auxPoints2=[];
        while(auxPoints.length>1){
          
          for(let i=0;i<auxPoints.length-1;i++){
             let v = createVector(auxPoints[i].x,auxPoints[i].y);
          v.mult(1-t)
           let v2 = createVector(auxPoints[i+1].x,auxPoints[i+1].y);
          v2.mult(t);
          v.add(v2.x,v2.y);
          auxPoints2.push(v);
              }   
          
       auxPoints=[];   
          auxPoints=auxPoints2.slice();
          auxPoints2=[];
                                }
        this.avlcs.push(auxPoints[0]);
                                        }
      
     let auxPoints=this.controlPoints.slice();
        let auxPoints2=[];
        while(auxPoints.length>1){
          
          for(let i=0;i<auxPoints.length-1;i++){
             let v = createVector(auxPoints[i].x,auxPoints[i].y);
          v.mult(0)
           let v2 = createVector(auxPoints[i+1].x,auxPoints[i+1].y);
          v2.mult(1);
          v.add(v2.x,v2.y);
          auxPoints2.push(v);
              }   
          
       auxPoints=[];   
          auxPoints=auxPoints2.slice();
          auxPoints2=[];
                                }
        this.avlcs.push(auxPoints[0]);
                    }
    showCurve (){
      for(let i=0;i<this.avlcs.length-1;i++){
        stroke('blue');
        strokeWeight(2)
        line(this.avlcs[i].x,this.avlcs[i].y,this.avlcs[i+1].x,this.avlcs[i+1].y)
      }
    }
    
    showPolygon(){
     
      strokeWeight(2)
      
      for (let i=0;i<this.controlPoints.length-1;i++){
        line(this.controlPoints[i].x,this.controlPoints[i].y,
            this.controlPoints[i+1].x,this.controlPoints[i+1].y);
  }
      
  }

  
  }
  
  function keyPressed (){
    if (keyCode === LEFT_ARROW) {
     curve1.decIndex();
    } else if (keyCode === RIGHT_ARROW) {
     curve1.addIndex();
    } else if(keyCode == BACKSPACE){
      if(curve1.controlPoints.length>0){
        curve1.controlPoints.splice(curve1.index,1)
        if(curve1.controlPoints.length==curve1.index){
       curve1.decIndex();
             
     } 
        
      }
     
    }
  }
  function keyTyped() {
    if (key === 'm') { 
     state=state*(-1);
    } if (key=='s'){
      showPoly=!showPoly;
    }
     
  }
  function mouseClicked() {
    if(state==1){
      curve1.controlPoints.push(createVector(mouseX,mouseY));
  } else if (state==-1){
    
  }
  }