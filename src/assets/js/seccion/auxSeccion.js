import { fabric } from 'fabric';

let canvas;
const valores = {
    N:  null,
    My: null,
    Mz: null,
    h:  null,
    b:  null,
    A:  null,
    Iy: null,
    Iz: null
};
let coordenadas;

/**
 * Almacena los valores introducidos para los cálculos sobre la figura.
 * @param {Object} nCanvas Canvas HTML
 */
export function recibirValores(N, My, Mz, h, b, A, Iy, Iz){
    valores.N = Number(N);
    valores.My = Number(My);
    valores.Mz = Number(Mz);
    valores.h = Number(h);
    valores.b = Number(b);
    valores.A = Number(A);
    valores.Iy = Number(Iy);
    valores.Iz = Number(Iz);
    //console.log(valores);
    //console.log(Object.values(valores).every(o => (o !== null && o !== 0)));
    let test = null;
    if(Object.values(valores).every(o => (o !== null && o !== 0))){
       test = fibraNeutra();
    }
    return test;
}

/**
 * Función que crea el canvas de fabric y actualiza la variable canvas
 * @param {Object} nCanvas Canvas HTML
 */
export function vinculaCanvas(nCanvas){
    // Creo el canvas de fabric
    canvas = new fabric.Canvas('seccion', {
        width: nCanvas.$el.clientWidth-30,
        height: nCanvas.$el.clientWidth-30,
        selection: false
    });
    //canvas = new fabric.Canvas("seccion");
    dibujando();
    
    canvas.renderAll();
}

/**
 * Función que escala el canvas a partir del tamaño de la ventana
 * @param {Object} nCanvas Canvas HTML
 */
export function resizeCanvas(nCanvas) {
    if(nCanvas == undefined) return;
    canvas.setDimensions({width: nCanvas.$el.clientWidth-30, height: nCanvas.$el.clientWidth-30});
    canvas.remove(...canvas.getObjects());
    dibujando2();

    canvas.renderAll();
}

function dibujando2(){
    let imgElement = document.getElementById('tipo-a');
    //console.log(imgElement);
    let imgInstance = new fabric.Image(imgElement, {
        top: canvas.height/2, 
        left: canvas.width/2,
        selectable : false,
        //height: canvas.height/2,
        //width: canvas.width/2,
    });
    //imgInstance.scaleToHeight(canvas.height*0.9);
    imgInstance.scaleToWidth(canvas.width*0.4);
    coordenadas = imgInstance.getBoundingRect()
    canvas.add(imgInstance);
    ejes();
    fuerzaY();
    fuerzaZ();
    
}

function dibujando(){
    document.getElementById('tipo-a').onload = function(){
        let imgInstance = new fabric.Image(this, {
            top: canvas.height/2, 
            left: canvas.width/2,
            selectable : false,
            //height: canvas.height/2,
            //width: canvas.width/2,
        });
        //console.log(imgInstance.getBoundingRect());
        //imgInstance.scaleToHeight(canvas.height*0.9);
        imgInstance.scaleToWidth(canvas.width*0.4);
        //console.log(imgInstance.getBoundingRect());
        coordenadas = imgInstance.getBoundingRect()
        canvas.add(imgInstance);
        ejes();
        fuerzaY();
        fuerzaZ();
    }
}
function ejes(){
    if(canvas){
        // Eje Y
        canvas.add( new fabric.Line([ canvas.width/2, 0, canvas.width/2, canvas.height ], {
            stroke: 'rgba(115,175,115,0.7)',
            strokeWidth: 1,
            selectable : false,
            evented: false
        }));

        // Eje X
        canvas.add( new fabric.Line([ 0, canvas.height/2, canvas.width, canvas.height/2 ], {
            stroke: 'rgba(115,175,115,0.7)',
            strokeWidth: 1,
            selectable : false,
            evented: false
        }));
    }
}

function fuerzaY(){
    if(canvas){

        // Eje X
        canvas.add( new fabric.Line([ canvas.width/2, canvas.height/2, 50, canvas.height/2 ], {
            stroke: 'rgba(175,0,0,1)',
            strokeWidth: 2,
            selectable : false,
            evented: false
        }));

        canvas.add(new fabric.Triangle({
            top: canvas.width/2-1,
            left: 50,
            width: 10, 
            height: 7,
            fill: '#EA3434', 
            stroke: '#EA3434', 
            strokeWidth: 3,
            selectable : false,
            angle: 30
        }));

        canvas.add(new fabric.Text( 'Y', {
            fontSize: 14,
            left: 50,
            top: canvas.width/2+20,
            fill: 'rgba(175,0,0,3)',
            selectable : false,
            evented: false
        }));
    }
}

function fuerzaZ(){
    if(canvas){

        canvas.add( new fabric.Line([ canvas.width/2, canvas.height/2, canvas.height/2, canvas.height-30 ], {
            stroke: 'rgba(175,0,0,1)',
            strokeWidth: 2,
            selectable : false,
            evented: false
        }));

        canvas.add(new fabric.Triangle({
            top: canvas.height-30,
            left: canvas.width/2-2,
            width: 10, 
            height: 7,
            fill: '#EA3434', 
            stroke: '#EA3434', 
            strokeWidth: 3,
            selectable : false,
            angle: -64
        }));

        canvas.add(new fabric.Text( 'Z', {
            fontSize: 14,
            left: canvas.width/2-20,
            top: canvas.height-30,
            fill: 'rgba(175,0,0,3)',
            selectable : false,
            evented: false
        }));
    }
}

function calcularTension(zi, yi){
    return ((valores.N*10)/valores.A)+((valores.My*100)/valores.Iy)*(zi)-((valores.Mz*100)/valores.Iz)*(yi);
}

function posMax(tensions){
    let max = 0;
    for(let i = 1; i<tensions.length; i++){
        if(tensions[i]>tensions[max]){
            max = i;
        }
    }
    return max;
}

function posMin(tensions){
    let min = 0;
    for(let i = 1; i<tensions.length; i++){
        if(tensions[i]<tensions[min]){
            min = i;
        }
    }
    return min;
}

function fibraNeutra(){
    const resultados = {};

    //Teniendo en cuenta que los esfuerzos se introducen en kN y m y las propiedades de la sección en cm2 y cm4
    
    resultados["corteEjeY"] = (valores.N * valores.Iz) / (valores.A * valores.Mz * 10);

    resultados["corteEjeZ"] = -(valores.N * valores.Iy) / (valores.A * valores.My * 10)

    
    let puntoAy = -1.1*valores.b/2;
    let puntoAz = (-(valores.Iy/valores.My))*((valores.N/(valores.A*10))-((valores.Mz*valores.b)/(valores.Iz*2)*1.1));
    let puntoBy = 1.1*valores.b/2;
    let puntoBz = (-(valores.Iy/valores.My))*(valores.N/(valores.A*10)+(valores.Mz*valores.b)/(valores.Iz*2)*1.1);

    let factorAjuste = coordenadas.height/valores.h;

    let coordAz = canvas.width*0.5+puntoAz*factorAjuste;
    let coordAy = canvas.height*0.5+puntoAy*factorAjuste;
    let coordBz = canvas.width*0.5+puntoBz*factorAjuste;
    let coordBy = canvas.height*0.5+puntoBy*factorAjuste;
    
    console.log(valores);
    console.log(puntoAy,puntoAz);
    console.log(puntoBy,puntoBz);
    console.log(factorAjuste);
    console.log(coordAz,coordAy);
    console.log(coordBz,coordBy);

    const tensiones = [];

    tensiones.push(calcularTension((-valores.h*0.5), (valores.b*0.5)));
    tensiones.push(calcularTension((-valores.h*0.5), (-valores.b*0.5)));
    tensiones.push(calcularTension((valores.h*0.5), (valores.b*0.5)));
    tensiones.push(calcularTension((valores.h*0.5), (-valores.b*0.5)));

    console.log(tensiones);

    //console.log(tensiones);
    let tensionMin = posMin(tensiones);
    let tensionMax = posMax(tensiones);
    //tensionMaxima = tensiones[tensionMax].toFixed(4);
    resultados["tensionMaxima"] = tensiones[tensionMax].toFixed(4);
    resultados["tensionMinima"] = tensiones[tensionMin].toFixed(4);

    canvas.remove(...canvas.getObjects());
    dibujando2();
    dibujarPunto(tensionMin);
    dibujarPunto(tensionMax);
    //dibujandoSentidoN(true);

    canvas.add( new fabric.Line([ coordAy, coordAz, coordBy, coordBz ], {
        stroke: 'rgba(0,0,175,1)',
        strokeWidth: 2,
        selectable : false,
        evented: false,
        strokeDashArray: [5, 5],
    }));

    dibujarDobleTrianguloZ();
    dibujarDobleTrianguloY();
    dibujandoSentidoN();

    canvas.renderAll();
    //console.log(resultados);
    return resultados;
}

function dibujarPunto(posicion){
    //console.log(coordenadas);
    switch(posicion){
        case 0:
            canvas.add(new fabric.Circle({ 
                radius: 5, 
                fill: '#EDB02A',
                stroke: 'blue',
                top: (coordenadas.top+3),
                left: (coordenadas.left+3),
                width: 0,
                height: 0,
                selectable: false,
                evented: false 
            }));
            break;
        case 1:
            canvas.add(new fabric.Circle({ 
                radius: 5, 
                fill: '#EDB02A',
                stroke: 'blue',
                top: (coordenadas.top+3),
                left: (coordenadas.left+coordenadas.width),
                width: 0,
                height: 0,
                selectable: false,
                evented: false 
            }));
            break;
        case 3:
            canvas.add(new fabric.Circle({ 
                radius: 5, 
                fill: '#EDB02A',
                stroke: 'blue',
                top: (coordenadas.top+coordenadas.height),
                left: (coordenadas.left+coordenadas.width),
                width: 0,
                height: 0,
                selectable: false,
                evented: false 
            }));
            break;
        case 2:
            canvas.add(new fabric.Circle({ 
                radius: 5, 
                fill: '#EDB02A',
                stroke: 'blue',
                top: (coordenadas.top+coordenadas.height),
                left: (coordenadas.left),
                width: 0,
                height: 0,
                selectable: false,
                evented: false 
            }));
            break;
    }
 
}

function dibujarDobleTrianguloZ(){
    if(valores.Mz<0){
        canvas.add(new fabric.Triangle({
            top: coordenadas.top-30,
            left: canvas.width/2,
            width: 10, 
            height: 10,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)', 
            strokeWidth: 1,
            selectable : false,
        }));
        canvas.add(new fabric.Triangle({
            top: coordenadas.top-40,
            left: canvas.width/2,
            width: 10, 
            height: 10,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)', 
            strokeWidth: 1,
            selectable : false,
        }));
    
        canvas.add( new fabric.Line([ canvas.width/2,  coordenadas.top+5, canvas.width/2, coordenadas.top-25 ], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false,
        }));

    } else {
        canvas.add(new fabric.Triangle({
            top: coordenadas.top+coordenadas.height+15,
            left: canvas.width/2-1,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)', 
            strokeWidth: 1,
            selectable : false,
            angle: -64
        }));
        canvas.add(new fabric.Triangle({
            top: coordenadas.top+coordenadas.height+24,
            left: canvas.width/2-1,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)', 
            strokeWidth: 1,
            selectable : false,
            angle: -64
        }));
        canvas.add( new fabric.Line([ canvas.width/2,  coordenadas.top+coordenadas.height-5, canvas.width/2, coordenadas.top+coordenadas.height+15 ], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false,
        }));
    }
}

function dibujarDobleTrianguloY(){
    if(valores.My>0){
        canvas.add( new fabric.Line([ coordenadas.left, canvas.height/2, coordenadas.left-30, canvas.height/2 ], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false
        }));

        canvas.add(new fabric.Triangle({
            top: canvas.width/2-1,
            left: coordenadas.left-30,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1,
            selectable : false,
            angle: 30
        }));

        canvas.add(new fabric.Triangle({
            top: canvas.width/2-1,
            left: coordenadas.left-39,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1,
            selectable : false,
            angle: 30
        }));
    } else {
        canvas.add( new fabric.Line([ coordenadas.left+coordenadas.width, canvas.height/2, coordenadas.left+coordenadas.width+30, canvas.height/2], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false
        }));
        canvas.add(new fabric.Triangle({
            top: canvas.width/2,
            left: coordenadas.left+coordenadas.width+30,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1,
            selectable : false,
            angle: 210
        }));
        canvas.add(new fabric.Triangle({
            top: canvas.width/2,
            left: coordenadas.left+coordenadas.width+39,
            width: 10, 
            height: 7,
            fill: 'rgba(150,100,150,1)', 
            stroke: 'rgba(0,0,0,1)',
            strokeWidth: 1,
            selectable : false,
            angle: 210
        }));
    }
}

function dibujandoSentidoN(){
    if(valores.N>0){
        canvas.add(new fabric.Circle({ 
            radius: 7,
            fill: null,
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 3,
            top: canvas.height/2,
            left: canvas.width/2,
            height: 0,
            width: 0,
            selectable: false,
        }));
    
        canvas.add(new fabric.Circle({ 
            radius: 3,
            fill: "rgba(150,100,150,1)",
            top: canvas.height/2,
            left: canvas.width/2,
            height: 0,
            width: 0,
            selectable: false,
        }));

    } else {
        canvas.add(new fabric.Circle({ 
            radius: 7,
            fill: null,
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 3,
            top: canvas.height/2,
            left: canvas.width/2,
            height: 0,
            width: 0,
            selectable: false,
        }));
    
        canvas.add( new fabric.Line([ canvas.width/2-7,  canvas.height/2, canvas.width/2+7, canvas.height/2 ], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false,
            angle: 45
        }));
    
        canvas.add( new fabric.Line([ canvas.width/2,  canvas.height/2+7, canvas.width/2, canvas.height/2-7 ], {
            stroke: "rgba(150,100,150,1)",
            strokeWidth: 2,
            selectable : false,
            evented: false,
            angle: 45,
    
        }));
    }
}
