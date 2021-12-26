// aperte s para mostrar ou n os poligonos
// setas <- e -> trocam os pontos
// backspace deleta o ponto corrente
// m troca o modo pra adicionar pontos para mover os pontos, ao clicar com o mouse

function setup() {
  createCanvas(wid, heig);
  curves = [];
  addCurve = new Curve([],100);
}
wid=800;
heig=800;
let state=1 // 1 -> adicionar pontos, -1 -> mer pontos
let createState=true;//1 -> adicionar novas curvas, -1 -> mexer com as curvas existentes
let curves =[];
let curvesIndex=0;
let addCurve;
let n;
function draw() {
  background(220);
  n = document.getElementById("avaliacoes").value;
  for(let i=0;i<curves.length;i++){
    strokeWeight(10)
    if(curves[i].showPoints){
      curves[i].showControlPoints(curvesIndex==i,createState)
    }
     
 
  if (curves[i].showPoly){
    curves[i].showPolygon(curvesIndex==i,createState);
  }
  if(curves[i].controlPoints.length > 1&&curves[i].showCurv){
    curves[i].calculatePoints();
  curves[i].showCurve(curvesIndex==i,createState);
  }
  curves[i].avlcs = [];
  }
  
  if(mouseIsPressed&&state==-1&&mouseY>0&&!createState){
    curves[curvesIndex].movePoint();
  }
  
  if(createState){
      strokeWeight(10)
    addCurve.showControlPoints(true,false);
    if(addCurve.controlPoints.length>1){
       addCurve.showPolygon(true,false);
    addCurve.calculatePoints();
    addCurve.showCurve(false,true);
    }
    addCurve.nDeAvlcs=document.getElementById("avaliacoes").value
     addCurve.avlcs=[];  
  }
  
  if(curves.length>0&&!createState){
    curves[curvesIndex].nDeAvlcs=n;
  }
}

class Curve {
  constructor (controlPoints,nDeAvlcs){
    this.controlPoints=controlPoints
    this.avlcs=[];
    this.nDeAvlcs=nDeAvlcs;
    this.index=0;
    this.showPoly=true;
    this.showPoints=true;
    this.showCurv = true;
    
  }
  showControlPoints(curvaAtual,isCreating){
    for(let i=0;i<this.controlPoints.length;i++){
      
      if(curvaAtual&&!isCreating){
        if(i==this.index){
         stroke('red');
      } else {
        stroke('black');
      }
      } else if(!isCreating) {
        stroke('green');
      } else {
        stroke('grey')
      }
      
       point(this.controlPoints[i].x,this.controlPoints[i].y)
       
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
  showCurve (curvaAtual,isCreating){
    for(let i=0;i<this.avlcs.length-1;i++){
      if(curvaAtual&&!isCreating){
         stroke('blue');
      } else if (!isCreating) {
        stroke('green');
      } else {
        stroke('grey');
      }
     
      strokeWeight(2)
      line(this.avlcs[i].x,this.avlcs[i].y,this.avlcs[i+1].x,this.avlcs[i+1].y)
    }
  }
  
  showPolygon(curvaAtual,isCreating){
    if( curvaAtual&&!isCreating){
      stroke('black');
    } else if(!isCreating) {
      stroke('green');
    } else {
      stroke('grey')
    }
    strokeWeight(2)
    for (let i=0;i<this.controlPoints.length-1;i++){
      line(this.controlPoints[i].x,this.controlPoints[i].y,
          this.controlPoints[i+1].x,this.controlPoints[i+1].y);
}   
}
}

function keyPressed (){
  
  if(!createState){

  if (keyCode === LEFT_ARROW) {
   curves[curvesIndex].decIndex()
  } else if (keyCode === RIGHT_ARROW) {
   curves[curvesIndex].addIndex();
  } else if(keyCode == BACKSPACE){
    if(curves[curvesIndex].controlPoints.length>1){
      curves[curvesIndex].controlPoints.splice(curves[curvesIndex].index,1)
      if(curves[curvesIndex].controlPoints.length==curves[curvesIndex].index){
     curves[curvesIndex].decIndex();
           } }  } }
  if(keyCode == ENTER){
    createState=false;
    
    if(addCurve.controlPoints.length>1){
      curves.push(new Curve(addCurve.controlPoints.slice(),n));
      addCurve = new Curve([],10);
      document.getElementById("avaliacoes").value=curves[curvesIndex].nDeAvlcs;
    } else {
      addCurve = new Curve([],10)
    }
  }
}


function mudarEstado(){
  state=state*-1;
  if(document.getElementById("myButton1").value=="Adicionar Ponto"){
    document.getElementById("myButton1").value="Mover Ponto";
  } else {
     document.getElementById("myButton1").value="Adicionar Ponto";
  }
}


function mouseClicked() {
  if(state==1&&mouseY>0&&!createState&&curves.length>0){
    curves[curvesIndex].controlPoints.push(createVector(mouseX,mouseY));
}else  if(mouseY>0&&createState) {
  addCurve.controlPoints.push(createVector(mouseX,mouseY))
}
}

function create (){
  createState=true;
  document.getElementById("avaliacoes").value=10;
}

function proxCurv (){
  if(curves.length-1>curvesIndex){
    curvesIndex++;
    document.getElementById("avaliacoes").value=curves[curvesIndex].nDeAvlcs
  }
}
function remCurv (){
  if(curves.length>0){
    curves.splice(curvesIndex,1)
    if(curves.length==curvesIndex&&curves.length>0){
      curvesIndex--;
     
    } 
    
    if(curves.length>0){document.getElementById("avaliacoes").value=curves[curvesIndex].nDeAvlcs}
  } 
  console.log(curvesIndex)
}
function antCurv () {
  if(curvesIndex>0){
    curvesIndex--;
     document.getElementById("avaliacoes").value=curves[curvesIndex].nDeAvlcs
  }
}

function allowPolygons (){
  if(curves.length>0)
  curves[curvesIndex].showPoly=!curves[curvesIndex].showPoly
}
function allowPoints (){
  if(curves.length>0)
  curves[curvesIndex].showPoints=!curves[curvesIndex].showPoints
}

function allowCurve (){
  if(curves.length>0)
  curves[curvesIndex].showCurv=!curves[curvesIndex].showCurv
}
