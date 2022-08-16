<?php
    include_once("conexion_bd.php");

    $query = "SELECT * FROM historial cod_simulacion DESC";
    $consulta = pg_query($conexion, $query);
    $cantidad = pg_numrows($consulta);    
?>

<!DOCTYPE html>

<html lang="en">
  <head>
    <title>Historial</title>
    <meta property="og:title" content="Those Tremendous Ostrich" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      data-tag="font"
    />
    <link rel="stylesheet" href="css/style1.css" />
    <link rel="stylesheet" href="css/collapsible.css" />
  </head>
  <body>
    <div>
      <div class="collapsible-container">
        <div class="collapsible-container1">
          <a href="index.php">
          <button class="collapsible-button1 button">
            <span class="collapsible-text">
              <span>Volver a la simulación</span>
              <br />
            </span>
          </button>
          </a>
        </div>
        <div class="collapsible-window1">
          <div class="collapsible-resum1">
            <span class="collapsible-text03">HISTORIAL</span>
            <?php
              if($cantidad > 0){
                while($query = pg_fetch_object($consulta)){
            ?>
            <div class="collapsible-container11">
              <div class="collapsible-date">
                <div class="collapsible-text04">
                  <span class="collapsible-text05">
                    <span>Fecha</span>
                    <br />
                  </span>
                </div>
                <input
                  type="text"
                  value="<?php echo $query->fecha ?>"
                  disabled
                  class="collapsible-textinput input"
                />
              </div>
              <div class="collapsible-container12">
                <div class="collapsible-container13">
                  <div class="collapsible-window11">
                    <div class="collapsible-text08">
                      <span class="collapsible-text09">Número de procesos</span>
                    </div>
                    <input
                      type="text"
                      value="<?php echo $query->n_procesos ?>"
                      disabled
                      class="collapsible-textinput1 input"
                    />
                  </div>
                </div>
                <div class="collapsible-container14">
                  <div class="collapsible-window12">
                    <div class="collapsible-text10">
                      <span class="collapsible-text11">
                        <span>Mejor algoritmo de planificación</span>
                        <br />
                        <span>de procesos</span>
                        <br />
                      </span>
                    </div>
                    <input
                      type="text"
                      value="<?php echo $query->b_pp ?>"
                      disabled
                      class="collapsible-textinput2 input"
                    />
                  </div>
                </div>
              </div>
              <div class="collapsible-container1">
                <div class="collapsible-container2">
                  <div class="collapsible-window13">
                    <div class="collapsible-text16">
                      <span class="collapsible-text17">Número de marcos</span>
                    </div>
                    <input
                      type="text"
                      value="<?php echo $query->n_marcos ?>"
                      class="collapsible-textinput3 input"
                    />
                  </div>
                </div>
                <div class="collapsible-container15">
                  <div class="collapsible-window14">
                    <div class="collapsible-text18">
                      <span class="collapsible-text19">
                        Algoritmo de reemplazo de página
                      </span>
                    </div>
                    <input
                      type="text"
                      value="<?php echo $query->alg_rp ?>"
                      disabled
                      class="collapsible-textinput4 input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <?php
                }
              }
            ?>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
