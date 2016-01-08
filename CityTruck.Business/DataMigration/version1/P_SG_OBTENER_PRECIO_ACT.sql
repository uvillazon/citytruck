CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_OBTENER_PRECIO_ACT(
 p_tipo      IN SG_AJUSTE_PRECIO.TIPO %TYPE,
 p_id_combustible       IN SG_AJUSTE_PRECIO.ID_COMBUSTIBLE%TYPE,
 p_precio OUT NUMBER,
 p_res OUT VARCHAR
)
 /*
 Finalidad: Procedimiento para obtener la entrada de litter apàrtir de un pos  y turno y fecha
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_cnt2 NUMBER :=0;
 v_ent_litter_ini NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_precio NUMBER := 0;
 --v_ent_litter_ini VARCHAR2(100):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_tipo IS NULL OR p_id_combustible IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
      SELECT COUNT(*) into v_cnt FROM SG_AJUSTE_PRECIO WHERE ID_COMBUSTIBLE = p_ID_COMBUSTIBLE AND ESTADO = 'A' AND TIPO = p_TIPO ;
      if v_cnt = 0 THEN
        v_res := 'No Existe Precio en Estado Actual';
      ELSE 
            SELECT PRECIO into v_precio FROM SG_AJUSTE_PRECIO WHERE ID_COMBUSTIBLE = p_ID_COMBUSTIBLE AND ESTADO = 'A' AND TIPO = p_TIPO ;
            p_precio := v_precio;
            v_res := '1';
      END IF;
      
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Obtener Precios Actual','P_SG_OBTENER_PRECIO_ACT','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
