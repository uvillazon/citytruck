CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ELIMINAR_CONSUMO(
 p_id_consumo CITYTRUCK.SG_CONSUMOS.ID_CONSUMO%type,
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
  IF p_id_consumo IS NULL THEN
    v_res := 'Faltan parámetros.';
  END IF;
  -- Verificamos que el Código de NIVEL DE TENSION DE SUBESTACION no exista 
  
  IF v_res='0' THEN
      
      DELETE FROM  SG_CONSUMOS    where ID_CONSUMO   = p_ID_CONSUMO  ;
    
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
