CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ACT_CONSUMO(
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 v_consumo NUMBER:=0;
 v_consumo_bs NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

  IF v_res='0' THEN
      DELETE FROM SG_CLIENTE_CONSUMO_COMBUSTIBLE;
      COMMIT;
      FOR   x IN (SELECT *  FROM SG_CLIENTES_CONSUMO ) LOOP
                FOR y IN (SELECT * FROM SG_COMBUSTIBLES ) LOOP
                      SELECT SUM(IMPORTE_BS)  into v_consumo_bs FROM SG_CONSUMOS WHERE ID_CLIENTE = x.ID_CLIENTE AND ID_COMBUSTIBLE = y.ID_COMBUSTIBLE;
                       SELECT SUM(IMPORTE_LTS )  into v_consumo FROM SG_CONSUMOS WHERE ID_CLIENTE = x.ID_CLIENTE AND ID_COMBUSTIBLE = y.ID_COMBUSTIBLE;
                       INSERT INTO SG_CLIENTE_CONSUMO_COMBUSTIBLE (ID_TABLA ,ID_CLIENTE, ID_COMBUSTIBLE ,CLIENTE  ,COMBUSTIBLE ,CONSUMO ,CONSUMO_BS )
                       VALUES (Q_SG_TABLA_TMP.nextval ,x.ID_CLIENTE , y.ID_COMBUSTIBLE,x.NOMBRE ,y.NOMBRE, v_consumo , v_consumo_bs );
                END LOOP;
        
      END LOOP;
      
      v_res := '1';
      commit;
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Modulo Consumos','P_SG_ACT_CONSUMO','-','-',v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
