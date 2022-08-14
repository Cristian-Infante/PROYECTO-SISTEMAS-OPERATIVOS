var filas;
var num_frames
var referencias;
var num_pages
var fallos;
var opt;
var fails = 0;

function OPT() {
    var flag1, flag2, flag3, max, position;
    var frames = Array(num_frames).fill("");
    var temp = Array(num_frames),
        inputStream = referencias;
    //console.log(inputStream);}

    for (i = 0; i < num_pages; i++) {
        flag1 = flag2 = 0;

        for (j = 0; j < num_frames; j++) {
            if (frames[j] == inputStream[i]) {
                flag1 = flag2 = 1;
                break;
            }
        }

        if (flag1 == 0) {
            for (j = 0; j < num_frames; j++) {
                if (frames[j] == "") {
                    fails++;
                    fallos[i] = "F";
                    frames[j] = inputStream[i];
                    flag2 = 1;
                    break;
                }
            }
        }

        if (flag2 == 0) {
            flag3 = 0;
            for (j = 0; j < num_frames; j++) {
                temp[j] = "";
                for (k = i + 1; k < num_pages; k++) {
                    if (frames[j] == inputStream[k]) {
                        temp[j] = k;
                        break;
                    }
                }
            }
            for (j = 0; j < num_frames; j++) {
                if (temp[j] == "") {
                    position = j;
                    flag3 = 1;
                    break;
                }
            }
            if (flag3 == 0) {
                max = temp[0];
                position = 0;
                for (j = 1; j < num_frames; j++) {
                    if (temp[j] > max) {
                        max = temp[j];
                        position = j;
                    }
                }
            }
            frames[position] = inputStream[i];
            fallos[i] = "F";
            fails++;
        }
        console.log(frames);
        /*opt[i] = frames;*/
        console.log(i);
        for (j = 0; j < num_frames; j++) {
            opt[i][j] = frames[j];
            console.log("opt: " + opt[i])
        }
        console.log("opt: " + opt[i]);
        console.log("frames: " + frames);
        console.log("OPT0: " + opt[0]);
        console.log("OPT1: " + opt[1]);
        console.log("OPT2: " + opt[2]);
    }
}

function crear() {
    filas = Number($("#frames").val()) + 2;
    num_frames = Number($("#frames").val());
    var col1 = document.getElementById('references').value;
    var col2 = col1.toString();
    referencias = col2.split(' ');
    num_pages = referencias.length;
    opt = Array(num_pages).fill(Array(num_frames).fill(""));
    console.log(opt);
    fallos = Array(num_pages).fill("");
    console.log(fallos);

    console.log("Referencias: " + col1);

    if (filas == 3 || referencias[0] == '') {
        console.log("No se ingresaron datos");
        return 0;
    }
    console.log("filas:" + (num_frames));
    console.log("columnas:" + num_pages);


    var tabla = "<table class=\"table table-bordered table-condensed\">";

    tabla += "<tr><td>Tiempo</td>";
    for (j = 0; j < num_pages; j++) {
        tabla += "<td>" + (j + 1) + "</td>";
    }
    tabla += "</tr>";
    OPT();

    for (i = 0; i < filas; i++) {
        if (i != 0 && i != filas - 1) {
            tabla += "<td>" + "Marco :" + (i) + "</td>";
            for (j = 0; j < num_pages; j++) {
                tabla += "<td>" + opt[j][i - 1] + "</td>";
            }
        }
        if (i == 0) {
            tabla += "<td>" + "Referencias" + "</td>";
            for (j = 0; j < num_pages; j++) {
                tabla += "<td><b>" + referencias[j] + "</b></td>";
            }
        }
        if (i == filas - 1) {
            tabla += "<td>" + "Fallos" + "</td>";
            for (j = 0; j < num_pages; j++) {
                tabla += "<td>" + fallos[j] + "</td>";
            }
        }
        tabla += "</tr>";
    }
    tabla += "</table>";
    document.getElementById("ref").innerHTML = tabla;
}

function crear2() {
    document.getElementById("resultado").innerHTML = "";
}

$('#SIMULARR').click(function () {
    crear();
})
$('#RESET').click(function () {
    crear2();
})