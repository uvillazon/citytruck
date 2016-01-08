CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ELIMINAR_CLIENTE_CONSUMO(
 p_id_cliente CITYTRUCK.SG_CLIENTES_CONSUMO.ID_CLIENTE%type,
 p_id_usr   NUMBER,
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_cliente IS NULL THEN
    v_res := 'Faltan parámetros.';
  END IF;
  -- Verificamos  si tiene algun registro en Consumo
  IF v_res  = '0' THEN
        SELECT COUNT(*) INTO v_cnt FROM SG_CONSUMOS WHERE ID_CLIENTE = p_ID_CLIENTE ;
        IF v_cnt > 0 THEN
            v_res := 'No puede Eliminar al Cliente Consumo tiene Registros de Consumo...';
        END IF;
  END IF;
  IF v_res='0' THEN
      
      DELETE FROM  SG_CLIENTES_CONSUMO     where ID_CLIENTE    = p_id_cliente  ;
    
      -- Creamos el nodo en el arbol
      
      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Modulo Consumos','P_SG_ELIMINAR_CONSUMO','-','-',v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
