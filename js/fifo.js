

/*Funcion que genera la tabla*/
function generarTablaFIFO() {
    let container = document.querySelector(".main-container");
    let container1 = document.createElement("div");
    container1.setAttribute("id", "Div2");
    container.appendChild(container1);
    numeroMarcos = Number($("#frames").val());
    var col1 = document.getElementById('references').value;
    var col2 = col1.toString();
    let referencias = col2.split(' ');
    var referenciasObjs = [referencias.length];
    for(i=0; i<referencias.length; i++){
        if(referencias[i] != undefined){
            referenciasObjs[i] = {numeroReferencia: referencias[i], referencias: 0}
        }
    }
    let numeroFallos=0;
    let tableContainer = document.createElement("table");
    tableContainer.setAttribute("id", "Div1");
    tableContainer.className = "table table-bordered table-condensed"
    let headTable = document.createElement("thead");
    let bodyTable = document.createElement("tbody");

    let primerTr = document.createElement("tr");
    let primerTh = document.createElement("th");
    primerTh.textContent = "Marcos";
    primerTr.appendChild(primerTh);

    /*Llenar referencias*/
    for (let i = 0; i < referenciasObjs.length; i++) {
        let thReferencias = document.createElement("th");
        thReferencias.textContent = `${referenciasObjs[i].numeroReferencia}`;
        primerTr.appendChild(thReferencias);
    }
    /*Llenar toda la tabla*/
    for (let i = 0; i < numeroMarcos + 1; i++) {
        let filas = document.createElement("tr");
        for (let j = 0; j < referenciasObjs.length + 1; j++) {
            let celda = document.createElement("td");
            celda.classList.add(`celda-${i}-${j}`);
            celda.textContent = " ";
            filas.appendChild(celda);
        }
        bodyTable.appendChild(filas);
    }

    headTable.appendChild(primerTr);
    tableContainer.appendChild(headTable);
    tableContainer.appendChild(bodyTable);
    container1.appendChild(tableContainer);

    /*Poner etiquetas de Marco 1, Marco 2,...Marco n y Fallos */
    for (let i = 0; i < numeroMarcos; i++) {
        let m1 = document.querySelector(`.celda-${i}-0`);
        m1.textContent = `Marco ${i + 1}`;
    }
    let celFallos = document.querySelector(`.celda-${numeroMarcos}-0`);
    celFallos.textContent = "Fallos ";

    /***************************FIFO*****************************************/

    let paginasActuales = [];
    for (let i = 0; i < referenciasObjs.length; i++) {
        for (let j = 0; j < numeroMarcos; j++) {
            let pagina = referenciasObjs[i].numeroReferencia;


            if (paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(pagina) < 0) {
                /*FALLO PERO QUEDAN MARCOS*/
                if (paginasActuales.length < numeroMarcos) {
                    paginasActuales.push(referenciasObjs[i]);
                    for (let x = 0; x < paginasActuales.length; x++) {
                        let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                        let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                        celdaFallos.textContent="F"
                        celda.textContent = paginasActuales[x].numeroReferencia;
                        
                    }
                    paginasActuales.forEach(element => {
                        element.referencias++;
                    });
                    numeroFallos++;
                    break;
                } else {
                    /*NO HAY MARCOS DISPONIBLES */
                    /*ALGORITMO FIFO*/
                    let copiaPaginasAct=[];
                    
                         copiaPaginasAct = paginasActuales.slice();
                        copiaPaginasAct.sort((a,b)=>{
                            return b.referencias-a.referencias;
                        });
                        let paginaSeleccionada = copiaPaginasAct[0].numeroReferencia;
                        let indicePaginasActuales = paginasActuales.map(function (e) { return e.numeroReferencia; }).indexOf(paginaSeleccionada);
                        paginasActuales[indicePaginasActuales].numeroReferencia = pagina;
                        paginasActuales[indicePaginasActuales].referencias=0;
                        for (let x = 0; x < paginasActuales.length; x++) {
                            let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                            celda.textContent = paginasActuales[x].numeroReferencia;
                            let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                            celdaFallos.textContent="F"
                            
                        }
                        paginasActuales.forEach(element => {
                            element.referencias++;
                        });
                        numeroFallos++;
                        break;

                    
                }
            } else {
                /**NO HAY FALLO */
                for (let x = 0; x < paginasActuales.length; x++) {
                    let celda = document.querySelector(`.celda-${x}-${i + 1}`);
                    celda.textContent = paginasActuales[x].numeroReferencia;
                    let celdaFallos = document.querySelector(`.celda-${numeroMarcos}-${i + 1}`);
                    celdaFallos.textContent=""
                }
                paginasActuales.forEach(element => {
                    element.referencias++;
                });
                break;
            }
        }

        /*************************************************************************/
    }
    let numeroFallosP = document.createElement("p");
    let indicador1 = document.createElement("p");
    let rendimiento = document.createElement("p");
    numeroFallosP.textContent=`Numero de fallos ${numeroFallos}`;
    indicador1.textContent=`Indicador 1: #fallos/referencias ${parseFloat(numeroFallos/referenciasObjs.length).toPrecision(4)}`;
    rendimiento.textContent=`Rendimiento: ${parseFloat((1-(numeroFallos/referenciasObjs.length))*100).toPrecision(4)}%`
    //rendimiento.textContent= parseFloat(averageWait3.toPrecision(4));
    container1.appendChild(numeroFallosP);
    container1.appendChild(indicador1);
    container1.appendChild(rendimiento);
}
$('#SIMULARR').click(function () {
    var tbl = document.getElementById('Div2'); 
   if(tbl) tbl.parentNode.removeChild(tbl);
    generarTablaFIFO();
})
