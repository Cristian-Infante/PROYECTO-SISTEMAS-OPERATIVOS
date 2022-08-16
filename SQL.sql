CREATE TABLE historial (
    cod_simulacion SERIAL NOT NULL,
    fecha DATE DEFAULT CURRENT_DATE NOT NULL,
    n_procesos VARCHAR(2) NOT NULL,
    b_pp VARCHAR(32) NOT NULL,
    n_marcos VARCHAR(2) NOT NULL,
    alg_rp VARCHAR(6) NOT NULL,
    PRIMARY KEY (cod_simulacion)
);