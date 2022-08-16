<?php

  include_once("conexion_bd.php");
  if($_GET['alg_rp']){
    $_1 = $_GET['n_procesos'];
    $_2 = $_GET['b_pp'];
    $_3 = $_GET['n_marcos'];
    $_4 = $_GET['alg_rp'];
    $query = "INSERT INTO historial(n_procesos, b_pp, n_marcos, alg_rp) VALUES ('$_1', '$_2', '$_3', '$_4');";
    pg_query($query);
    header('location: index.php');
  }

?>


<!DOCTYPE html>
<html>

<head lang="es">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" type="text/css" href="css/bootstrap-simplex.css">
  <link rel="stylesheet" type="text/css" href="css/cpu-scheduler.css">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="js/jquery.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/bootstrap-slider.js"></script>
  <script type="text/javascript" src="js/MathJaxSetup.js"></script>

  <title>FINAL</title>
</head>

<body>


  <div class="container">
    <div class="collapsible-container14">
      <div class="btn-group algorithm_dropdown" style="margin-left:5px;">
        <a href="history.php">
          <button type="button" class="btn btn-info dropdown-toggle">
            <span>VER HISTORIAL DE SIMULACIONES</span>
          </button>
        </a>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="well">
      <div class="col-md-6">
        <span>
          Dar clic en "GENERAR SIMULACIÓN" para usar el modo automatizado o escribir los datos deseados en la tabla, máximo se pueden 10 procesos para los algoritmos de planificación de procesos. Para los algoritmos de reemplazo de página se pueden máximo 15 referencias y 10 marcos. La selección del algoritmo más optimo en planificación de procesos se hace mediante el uso del tiempo promedio de espera.
        </span>
      </div>
    </div>
  </div>

  <div class="container">

    <div class="well2" style="margin-top:20px;">

      <div class="row">

        <div class="col-md-5">

          <div class="btn-group algorithm_dropdown" style="margin-left:5px;">
            <button id="SIMULAR" type="button" class="btn btn-info dropdown-toggle">
              <span>GENERAR SIMULACIÓN</span>
            </button>
          </div>

        </div><!-- /column -->
        <div class="col-md-4">
          <div>
            <div>
              <label>Número de procesos:</label>
            </div>
            <div class="input-group">
              <span class="input-group-btn">
                <button id='remove_row' type="button" class="btn btn-default btn-number" data-type="minus">
                  <span class="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input id="proccess_num" disabled="disabled" class="form-control input-number" value="3" maxlength="2">
              <span class="input-group-btn">
                <button id='add_row' type="button" class="btn btn-default btn-number" data-type="plus">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div id="solver_group">
            <div>
              <label>Tiempo de Quantum:</label>
            </div>
            <div class="input-group">
              <span class="input-group-btn">
                <button id="subtract_quantum" type="button" class="btn btn-default btn-number" data-type="minus"
                  data-field="quant[1]">
                  <span class="glyphicon glyphicon-minus"></span>
                </button>
              </span>
              <input id="enter_quantum" disabled="disabled" type="number" name="quant[1]"
                class="form-control input-number" value="2" maxlength="2">
              <span class="input-group-btn">
                <button id="add_quantum" type="button" class="btn btn-default btn-number" data-type="plus"
                  data-field="quant[1]">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </span>
            </div>
          </div>
        </div><!-- /column -->
        <div class="col-md-4">
          <div>
            <div id="explanation-equation">
            </div>
          </div>
        </div><!-- /column -->
      </div><!-- /row -->

    </div><!-- /well -->

    <table class="table table-bordered table-condensed">
      <thead>
        <tr>
          <th>Proceso:</th>
          <th>Tiempo de llegada (ms):</th>
          <th>Tiempo de CPU (ms):</th>
          <th class="priority collapse">Prioridad:</th>
        </tr>
      </thead>
      <tbody id="processTable">
        <tr id="row_1" class="collapse in">
          <th> P1</th>
          <td><input id="arrive_1" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input type="number" id="burst_1" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_1" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_2" class="collapse in">
          <th> P2 </th>
          <td><input id="arrive_2" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input type="number" id="burst_2" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_2" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_3" class="collapse in">
          <th> P3 </th>
          <td><input id="arrive_3" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_3" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_3" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_4" class="collapse ">
          <th> P4 </th>
          <td><input id="arrive_4" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_4" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_4" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_5" class="collapse">
          <th> P5 </th>
          <td><input id="arrive_5" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_5" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_5" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_6" class="collapse">
          <th> P6 </th>
          <td><input id="arrive_6" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_6" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_6" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_7" class="collapse">
          <th> P7 </th>
          <td><input id="arrive_7" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_7" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_7" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_8" class="collapse">
          <th> P8 </th>
          <td><input id="arrive_8" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_8" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_8" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_9" class="collapse">
          <th> P9 </th>
          <td><input id="arrive_9" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_9" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_9" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
        <tr id="row_10" class="collapse">
          <th> P10 </th>
          <td><input id="arrive_10" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td><input id="burst_10" type="number" class="form-control" placeholder="0" maxlength="2" /></td>
          <td class="priority collapse"><input id="priority_10" type="number" class="form-control" placeholder="0" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="main1" class="container">

    <div class="well">
      <div class="col-md-5">
        <table>
          <tbody>
            <tr>
              <td id="optimo"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="class well">
        <div class="col-md-5">
          FCFS
        </div>
        <div class="col-md-5">
          <div>
            <table>
              <tbody>
                <tr class="col-md-6">
                  <td id="explanation-equation1"></td>
                </tr>
                <tr class="col-md-6">
                  <td id="explanation-equation1_1"></td>
                  <td id="explanation-equation1_2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation1_3">
            </div>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation1_4">
            </div>
          </div>
        </div><!-- /column -->
      </div>
      <div class="progress progress1" style="height:25px;margin-bottom:0px;"></div>
      <ul class="tick-marks ruler1" id="rule1" data-items="10"></ul>
      <br>
      <div class="class well">
        <div class="col-md-5">
          SJF
        </div>
        <div class="col-md-5">
          <div>
            <table>
              <tbody>
                <tr class="col-md-6">
                  <td id="explanation-equation2"></td>
                </tr>
                <tr class="col-md-6">
                  <td id="explanation-equation2_1"></td>
                  <td id="explanation-equation2_2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation2_3">
            </div>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation2_4">
            </div>
          </div>
        </div><!-- /column -->
      </div>
      <div class="progress progress2" style="height:25px;margin-bottom:0px;"></div>
      <ul class="tick-marks ruler2" id="rule2" data-items="10"></ul>
      <br>
      <div class="class well">
        <div class="col-md-5">
          PRIORIDAD
        </div>
        <div class="col-md-5">
          <div>
            <table>
              <tbody>
                <tr class="col-md-6">
                  <td id="explanation-equation3"></td>
                </tr>
                <tr class="col-md-6">
                  <td id="explanation-equation3_1"></td>
                  <td id="explanation-equation3_2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation3_3">
            </div>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation3_4">
            </div>
          </div>
        </div><!-- /column -->
      </div>
      <div class="progress progress3" style="height:25px;margin-bottom:0px;"></div>
      <ul class="tick-marks ruler3" id="rule3" data-items="10"></ul>
      <br>
      <div class="class well">
        <div class="col-md-5">
          ROUND ROBIN
        </div>
        <div class="col-md-5">
          <div>
            <table>
              <tbody>
                <tr class="col-md-6">
                  <td id="explanation-equation4"></td>
                </tr>
                <tr class="col-md-6">
                  <td id="explanation-equation4_1"></td>
                  <td id="explanation-equation4_2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation4_3">
            </div>
          </div>
          <div>
            <div class="col-md-6" id="explanation-equation4_4">
            </div>
          </div>
        </div><!-- /column -->
      </div>
      <div class="progress progress4" style="height:25px;margin-bottom:0px;"></div>
      <ul class="tick-marks ruler4" id="rule4" data-items="10"></ul>
      <br>

    </div>
  </div>


  <div class="main-panels">

    <div class="collapsible-window">
      <div class="collapsible-window1">
        <div class="panels panels-option animate__animated  animate__fadeInUp">
          <div class="input_set">
            <div id="option">
              <p>Marcos</p>
            </div>
            <input min="1" max="10" type="number" value="3" id="input-frames" />
          </div>
          <div class="input_set">
            <div id="option">
              <p>Referencias</p>
            </div>
            <input placeholder="Maximo 15 referencias" id="input-input" maxlength="29" />
          </div>
          <p class="error animate__animated  animate__fadeInDown hide-display" id="Error">Minimo 5 procesos</p>
          <div class="input_set">
            <div id="option">
              <p>Algoritmo</p>
            </div>
            <select id="input-algorithm">
              <option value="lru">LRU</option>
              <option value="fifo">FIFO</option>
              <option value="optimo">OPTIMO</option>
            </select>
          </div>

          <div class="space"></div>

          <div class="button" id="input-start">Empezar</div>
        </div>
      </div>
    </div>



    <div id="main" class="class well">
      <div class="main">
          <div class="parent_frame">
            <div class="parent-frame-container">
              <div class="frame-input">
                <input disabled id="name">
                <div class="frame-input-belt" id="output-input">
                  <!--
                                  <p>1</p>
                                  <p>2</p>
                                  <p>3</p>
                                  -->
                </div>
              </div>
              <div class="frame-history">
                <div class="history-list" id="output-history">
                  <!--
                              <div class="history-entry animate__animated  animate__fadeInUp">
                                  <small>1</small>
                                  <p>1</p>
                                  <div class="data">
                                      <p>^ 5</p>
                                      <p>Hit: O</p>
                                      <p>Flt: X</p>
                                  </div>
                              </div>
                          -->
                </div>
                <p>Fallos de pagina : <span id="results-faults">0</span></p>
                <p>Exitos : <span id="results-hits">0</span></p>
                <p>Referencias : <span id="results-references">0</span></p>
                <p>Tasa de fallos de pagina : <span id="results-faultrate">0</span></p>
                <p>Tasa de exitos : <span id="results-hitrate">0</span></p>
              </div>
            </div>
          </div>
      </div>

    </div><!-- /container -->




    <div id="main3" class="class well">
      <div class="collapsible-window1">
        <div class="collapsible-resum1">
          <span class="collapsible-text">RESUMEN</span>
          <form action="index.php" method="" class="collapsible-form1" >
            <div class="collapsible-container1">
              <div class="collapsible-container11">
                <div class="collapsible-window11">
                  <div class="collapsible-text01">
                    <span class="collapsible-text02">Número de procesos</span>
                  </div>
                  <input type="text" name="n_procesos" value="" readonly class="collapsible-textinput input" />
                </div>
              </div>
              <div class="collapsible-container12">
                <div class="collapsible-window12">
                  <div class="collapsible-text03">
                    <span class="collapsible-text04">
                      <span>Mejor/es algoritmo de planificación</span>
                      <br />
                      <span> de procesos</span>
                      <br />
                    </span>
                  </div>
                  <input type="text" name="b_pp" value="" readonly class="collapsible-textinput1 input" />
                </div>
              </div>
            </div>
            <div class="collapsible-container1">
              <div class="collapsible-container2">
                <div class="collapsible-window13">
                  <div class="collapsible-text09">
                    <span class="collapsible-text10">Número de marcos</span>
                  </div>
                  <input name="n_marcos" type="text" value="" readonly class="collapsible-textinput2 input" />
                </div>
              </div>
              <div class="collapsible-container13">
                <div class="collapsible-window14">
                  <div class="collapsible-text11">
                    <span class="collapsible-text12">
                      Algoritmo de reemplazo de página
                    </span>
                  </div>
                  <input name="alg_rp" type="text" value="" readonly class="collapsible-textinput3 input" />
                </div>
              </div>
            </div>
            <div class="collapsible-container14">
              <div class="btn-group algorithm_dropdown" style="margin-left:5px;">
                <button   class="btn btn-info dropdown-toggle">
                  <span>RESETEAR PAGINA</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>


    <script src="js/cpu-scheduler2.js"> </script>
    <script src="js/cpu-scheduler3.js"> </script>
    <script src="js/cpu-scheduler4.js"> </script>
    <script src="js/cpu-scheduler5.js"> </script>
    <script src="js/script.js"> </script>
    <!-- script src="/js/page-replacement.js"> </script> -->

    <script>
      Preview.Init();
      Preview.Update();
    </script>

</body>

</html>
