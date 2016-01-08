CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_VERIFICAR_EDICION(
 p_fecha       IN SG_POS_TURNOS.FECHA%TYPE,
 p_turno IN SG_POS_TURNOS.TURNO%TYPE,
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para verificar si se puiede editar
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje ("0")  No existe Modificacion y  "1"  Existe Modificacion
  Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
  v_ent_litter_ini NUMBER:=0;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_fecha IS NULL OR p_turno IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos Si Existe algun registro no exista 
    SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
    IF v_cnt > 0 THEN
      FOR   x in (SELECT * FROM  SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha) LOOP
        EXIT WHEN v_res = '1';
        IF x.ENT_LITTER  <> x.SAL_LITTER  THEN
            v_res :='1';
        END IF;
      
      END LOOP;
    ELSE
        v_res := '0';
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Generar POS_TURNOS','P_SG_VERIFICAR_EDICION','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
