import { fabric } from 'fabric';
import * as datos from '@/assets/js/mohr/calculos.js';
import { maxX, minX, actualizaValores,
         addMarcaX, addMarcaY, addTooltip,
         addPunto, escribir, addCaja, addCajaFlotante,
        } from '@/assets/js/mohr/funAux.js';

// Configuracion de fabric
fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

// Variables locales
let canvas, planoA, eq1, eq2, cj1, cj2, centro, ratio, punto1, punto2, punto3;

/**
 * Función que crea el canvas de fabric y actualiza la variable canvas
 * @param {Object} nCanvas Canvas HTML
 * @param {Object} datosIniciales Datos iniciales del problema
 */
export function vinculaCanvas(nCanvas, datosIniciales){
    // Creo el canvas de fabric
    canvas = new fabric.Canvas('circulo', {
        width: nCanvas.$el.clientWidth-30,
        height: nCanvas.$el.clientWidth-30,
        selection: false
    });
    dibujarEjes(datosIniciales);
}

/**
 * Función que escala el canvas a partir del tamaño de la ventana
 * @param {Object} nCanvas Canvas HTML
 */
 export function resizeCanvas(nCanvas, datosIniciales) {
    if(nCanvas == undefined) return;
    canvas.setDimensions({width: nCanvas.$el.clientWidth-30, height: nCanvas.$el.clientWidth-30});
    canvas.remove(...canvas.getObjects());
    dibujarEjes(datosIniciales);
}

/**
 * Función para dibujar los ejes cartesianos y el círculo de Mohr
 * @param {Object} datosIniciales Datos iniciales del problema
 */
export function dibujarEjes(datosIniciales){
    if(canvas == undefined) return; // Cancelo la función
    canvas.remove(...canvas.getObjects());
    actualizaValores(datos.s1, datos.s2, datos.radio);
    let incPuntosX = 0, puntosX, punto, x;

    //  Calculo las marcas en el eje X
    do{
        incPuntosX += 10;
        puntosX = Math.abs( maxX - minX)/incPuntosX;
    }while(puntosX > 10);
    
    let incrementoX = canvas.width*0.8 / puntosX;

    // Calculo el centro de los ejes
    if(minX < 0 && maxX > 0)
        centro = canvas.width*0.10+(Math.abs(minX) / incPuntosX)*incrementoX;
    else
        centro = canvas.width*0.10;

    // Dibujo las marcas en el eje X
    punto = minX, x = canvas.width*0.10;
    for(let i = 0; i <= puntosX ; i++){
        if(punto !== 0)
            addMarcaX( canvas, x, canvas.height/2, punto.toString());
        punto += incPuntosX;
        x += incrementoX;
    }

    // Dibujo las marcas en el eje Y
    incrementoX = canvas.width*0.8 / (puntosX);
    punto = incPuntosX, x = canvas.width/2 - incrementoX;
    for(let i = 0; i < puntosX / 2 -1; i++){
        addMarcaY( canvas, centro, x, punto.toString());
        punto += incPuntosX;
        x -= incrementoX;
    }

    punto = -incPuntosX, x = canvas.width/2 + incrementoX;
    for(let i = 0; i < puntosX / 2 -1; i++){
        addMarcaY( canvas, centro, x, punto.toString());
        punto -= incPuntosX;
        x += incrementoX;
    }

    // Eje Y
    if(minX < 0 && maxX > 0)
        canvas.add(new fabric.Line([centro, 0, centro, canvas.height], {
            stroke: '#7d8085',
            selectable : false,
            evented: false
        }));

    // Eje X
    canvas.add(new fabric.Line([0, canvas.height/2, canvas.width, canvas.height/2], {
        stroke: '#7d8085',
        selectable : false,
        evented: false
    }));
    
    // Especifico las unidades del eje X e Y
    escribir(canvas, canvas.width < 500 ? centro+20 : centro+30, canvas.height*0.08, 'τ(MPa)', '#5d6066');
    escribir(canvas, canvas.width < 500 ? canvas.width-20 : canvas.width-30, canvas.width < 500 ? canvas.height/2-12 : canvas.height/2-15, 'σ(MPa)', '#5d6066');

    dibujaEsfera(incrementoX, incPuntosX, centro, datosIniciales);
}

/**
 * Función auxiliar que dibuja el circul de Mohr
 * @param {Number} incrementoX Relacion entre pixel-coordenada
 * @param {Number} incPuntoX Incrementos de X en el eje
 * @param {Number} centro Centro del círculo
 * @param {Object} datosIniciales Datos iniciales del problema
 */
function dibujaEsfera(incrementoX, incPuntoX, centro, datosIniciales){
    let nRadio = datos.radio*incrementoX/incPuntoX;
    let coorX = incrementoX/incPuntoX*Math.abs(datos.centro);
    if (minX < 0 && maxX > 0)
        coorX = datos.centro < 0 ? centro - coorX : centro + coorX;
    else
        coorX = Math.abs(Math.abs(minX)-Math.abs(datos.centro))*incrementoX/incPuntoX+canvas.width*0.10;

    canvas.add(new fabric.Circle({ 
        radius: nRadio, 
        fill: 'rgba(0,0,0,0)',
        stroke: 'blue',
        top: canvas.width/2,
        left: coorX,
        selectable: false,
        evented: false 
    }));

    // Marca s1   
    punto1 = addPunto(canvas, '#16961C', canvas.width/2, coorX+nRadio);

    // Marca s2
    punto2 = addPunto(canvas, '#16961C', canvas.width/2, coorX-nRadio);

    // Marca txymax
    punto3 = addPunto(canvas, '#16961C', canvas.width/2-nRadio, coorX);

    // Representacion Eje X e Y
    let ejeX = {x: datosIniciales.sx, y: -datosIniciales.txy};
    let ejeY = {x: datosIniciales.sy, y: datosIniciales.txy};

    // Calculo las coordenadas de la recta
    ratio = incrementoX/incPuntoX;
    if (minX < 0 && maxX > 0)
        ejeX.x = datosIniciales.sx < 0 ? centro - ratio*Math.abs(ejeX.x) : centro + ratio*Math.abs(ejeX.x);
    else
        ejeX.x = Math.abs(Math.abs(minX)-Math.abs(ejeX.x))*ratio+canvas.width*0.10;
    ejeX.y = ratio*Math.abs(ejeX.y);
    ejeX.y = -datosIniciales.txy < 0 ? canvas.height/2 + ejeX.y : canvas.height/2 - ejeX.y;

    if (minX < 0 && maxX > 0)
        ejeY.x = datosIniciales.sy < 0 ? centro - ratio*Math.abs(ejeY.x) : centro + ratio*Math.abs(ejeY.x);
    else
        ejeY.x = Math.abs(Math.abs(minX)-Math.abs(ejeY.x))*ratio+canvas.width*0.10;
    ejeY.y = ratio*Math.abs(ejeY.y);
    ejeY.y = datosIniciales.txy < 0 ? canvas.height/2 + ejeY.y : canvas.height/2 - ejeY.y;

    canvas.add(new fabric.Line([ ejeX.x, ejeX.y, ejeY.x, ejeY.y ], {
        stroke: '#EDB02A',
        strokeWidth: 3,
        selectable: false,
        evented: false,
    }));

    // Marcas del nuevo eje
    canvas.add(new fabric.Circle({ 
        radius: 4, 
        fill: '#EDB02A',
        stroke: 'black',
        top: ejeX.y,
        left: ejeX.x,
        selectable: false,
        evented: false 
    }));

    addCaja(canvas, 'X axis: ('+datosIniciales.sx.toFixed(0)+', '+(-datosIniciales.txy).toFixed(0)+')', '#EDB02A', ejeX.x, ejeX.y);

    canvas.add(new fabric.Circle({ 
        radius: 4, 
        fill: '#EDB02A',
        stroke: 'black',
        top: ejeY.y,
        left: ejeY.x,
        selectable: false,
        evented: false 
    }));

    addCaja(canvas, 'Y axis: ('+datosIniciales.sy.toFixed(0)+', '+datosIniciales.txy.toFixed(0)+')', '#EDB02A', ejeY.x, ejeY.y);
}

/**
 * Función que dibuja el pano en el círculo de Mohr
 */
export function calculaPlano(){
    if(canvas){
        if(planoA)
            canvas.remove(planoA, eq1, eq2, cj1, cj2);
            
        // Representacion Eje X e Y
        let ejeX = {x: datos.sA, y: -datos.tA};
        let ejeY = {x: datos.sAprima, y: datos.tA};

        // Calculo las coordenadas de la recta
        if (minX < 0 && maxX > 0)
            ejeX.x = datos.sA < 0 ? centro - ratio*Math.abs(ejeX.x) : centro + ratio*Math.abs(ejeX.x);
        else
            ejeX.x = Math.abs(Math.abs(minX)-Math.abs(ejeX.x))*ratio+canvas.width*0.10;
        ejeX.y = ratio*Math.abs(ejeX.y);
        ejeX.y = -datos.tA < 0 ? canvas?.height/2 + ejeX.y : canvas?.height/2 - ejeX.y;

        if (minX < 0 && maxX > 0)
            ejeY.x = datos.sAprima < 0 ? centro - ratio*Math.abs(ejeY.x) : centro + ratio*Math.abs(ejeY.x);
        else
            ejeY.x = Math.abs(Math.abs(minX)-Math.abs(ejeY.x))*ratio+canvas.width*0.10;
        ejeY.y = ratio*Math.abs(ejeY.y);
        ejeY.y = datos.tA < 0 ? canvas.height/2 + ejeY.y : canvas.height/2 - ejeY.y;

        planoA = new fabric.Line([ ejeX.x, ejeX.y, ejeY.x, ejeY.y ], {
            stroke: '#C3381D',
            strokeWidth: 3,
            selectable: false,
            evented: false,
        })
        canvas.add(planoA);

        // Marcas del nuevo eje
        eq1 = new fabric.Circle({ 
            radius: 4, 
            fill: '#C3381D',
            stroke: 'black',
            top: ejeX.y,
            left: ejeX.x,
            selectable: false,
            evented: false 
        });
        canvas.add(eq1);

        cj1 = addCajaFlotante(canvas, 'Plane A: ('+datos.sA.toFixed(1)+', '+(-datos.tA).toFixed(1)+')', '#C3381D', ejeX.x, ejeX.y-20);

        eq2 = new fabric.Circle({ 
            radius: 4, 
            fill: '#C3381D',
            stroke: 'black',
            top: ejeY.y,
            left: ejeY.x,
            selectable: false,
            evented: false 
        });
        canvas.add(eq2);

        cj2 = addCajaFlotante(canvas, "Plane A': ("+datos.sAprima.toFixed(1)+', '+datos.tA.toFixed(1)+')', '#C3381D', ejeY.x, ejeY.y-20);

        addTooltips();
    }
}

/**
 * Funcion que añade los Tooltips al dibujo con los datos de los ejes
 */
function addTooltips(){
    addTooltip(canvas, punto1, 'σ1 : '+datos.s1.toFixed(2), 1, 2);
    addTooltip(canvas, punto2, 'σ2 : '+datos.s2.toFixed(2), 1, 2);
    addTooltip(canvas, punto3, 'τxy,max : '+datos.radio.toFixed(2), 1, 7);
}