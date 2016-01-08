CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ELIMINAR_COMPRA(
 p_id CITYTRUCK.SG_COMPRAS.ID_COMPRA%type,
 p_id_usr   NUMBER,
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fecha SG_INGRESOS.FECHA%type;
 v_id_caja SG_INGRESOS.ID_CAJA%type;  
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id IS NULL THEN
    v_res := 'Faltan parámetros.';
  END IF;
  
  IF v_res='0' THEN
      
      SELECT FECHA, ID_CAJA INTO v_fecha,v_id_caja FROM SG_INGRESOS WHERE ID_INGRESO = p_id;
      DELETE FROM  SG_INGRESOS  where ID_INGRESO = p_id;
      DELETE FROM SG_KARDEX_EFECTIVO WHERE ID_OPERACION = p_id AND OPERACION = 'INGRESO';      
      v_res := '1';
      
  END IF;
   IF v_res = '1' THEN
     P_SG_ACT_KARDEX_EFECTIVO(v_id_caja,v_fecha,p_id_usr,v_res);
     COMMIT;
   END IF;  
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Modulo Ingresos','P_SG_ELIMINAR_COMPRA','-','-',v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
