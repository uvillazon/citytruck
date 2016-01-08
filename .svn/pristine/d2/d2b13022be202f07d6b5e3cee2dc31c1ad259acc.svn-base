CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ACTUALIZAR_VENTAS_DIARIAS(
 p_fecha       IN SG_VENTAS_DIARIAS.FECHA%TYPE,
 p_turno IN SG_VENTAS_DIARIAS.TURNO%TYPE,
 p_responsable IN SG_VENTAS_DIARIAS.RESPONSABLE%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para generar venta diaria
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
  v_total NUMBER:=0;
  v_total_venta NUMBER:=0;
  v_id_kardex  NUMBER:=0;
  v_ent_litter NUMBER:=0;
  v_id_venta  SG_VENTAS_DIARIAS.ID_VENTA%type;
  v_precio_venta  NUMBER := 0;
 v_precio_compra  NUMBER := 0;
 v_id_combustible SG_POS.ID_COMBUSTIBLE%type; 
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_fecha IS NULL OR p_turno IS NULL OR p_id_usr IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos Si Existe algun registro no exista 
    SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
    IF v_cnt = 0 THEN
      v_res := 'No Existe Registros POS_TURNOS Revise por favor';
    ELSE
          IF p_turno = 'DIA' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'TARDE' AND FECHA =p_fecha ;
                    IF v_cnt = 0 THEN
                      v_res := '1';
                    ELSE
                         FOR x IN (SELECT * FROM SG_POS_TURNOS WHERE  TURNO  = 'TARDE' AND FECHA =p_fecha) LOOP
                                SELECT ID_COMBUSTIBLE INTO v_id_combustible FROM SG_POS WHERE ID_POS = x.id_pos ;
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('VENTA',v_id_combustible,v_precio_venta,v_res);
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('COMPRA',v_id_combustible,v_precio_compra,v_res);
                                SELECT SAL_LITTER INTO v_ent_litter FROM SG_POS_TURNOS  WHERE  TURNO  = p_turno AND FECHA =p_fecha AND ID_POS = x.ID_POS   ; 
                                UPDATE SG_POS_TURNOS SET  ENT_LITTER  = v_ent_litter , TOTAL = SAL_LITTER   - v_ent_litter  , ID_USUARIO = p_id_usr , TOTAL_VENTA =  (SAL_LITTER  - v_ent_litter) * v_precio_venta ,TOTAL_COSTO =  (SAL_LITTER  - v_ent_litter) * v_precio_compra WHERE ID_POS_TURNO = x.ID_POS_TURNO ;
                         END LOOP;
                        P_SG_ACT_VENTAS_UPD(p_fecha,'TARDE',p_responsable,p_id_usr,v_res);
                         v_res := '1';
                    END IF;
            ELSIF p_turno = 'TARDE' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'NOCHE' AND FECHA =p_fecha ;
                    IF v_cnt = 0 THEN
                      v_res := '1';
                    ELSE
                         FOR x IN (SELECT * FROM SG_POS_TURNOS WHERE  TURNO  = 'NOCHE' AND FECHA =p_fecha) LOOP
                                SELECT ID_COMBUSTIBLE INTO v_id_combustible FROM SG_POS WHERE ID_POS = x.id_pos ;
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('VENTA',v_id_combustible,v_precio_venta,v_res);
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('COMPRA',v_id_combustible,v_precio_compra,v_res);
                                SELECT SAL_LITTER INTO v_ent_litter FROM SG_POS_TURNOS  WHERE  TURNO  = p_turno AND FECHA =p_fecha AND ID_POS = x.ID_POS   ; 
                                UPDATE SG_POS_TURNOS SET  ENT_LITTER  = v_ent_litter , TOTAL = SAL_LITTER   - v_ent_litter  , ID_USUARIO = p_id_usr , TOTAL_VENTA =  (SAL_LITTER  - v_ent_litter) * v_precio_venta ,TOTAL_COSTO =  (SAL_LITTER  - v_ent_litter) * v_precio_compra WHERE ID_POS_TURNO = x.ID_POS_TURNO ;
                         END LOOP;
                        P_SG_ACT_VENTAS_UPD(p_fecha,'NOCHE',p_responsable,p_id_usr,v_res);
                         v_res := '1';
                    END IF;
            ELSE
               SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'DIA' AND FECHA =p_fecha + 1;
                    IF v_cnt = 0 THEN
                      v_res := '1';
                    ELSE
                         FOR x IN (SELECT * FROM SG_POS_TURNOS WHERE  TURNO  = 'DIA' AND FECHA =p_fecha + 1) LOOP
                                SELECT ID_COMBUSTIBLE INTO v_id_combustible FROM SG_POS WHERE ID_POS = x.id_pos ;
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('VENTA',v_id_combustible,v_precio_venta,v_res);
                                CITYTRUCK.P_SG_OBTENER_PRECIO_ACT('COMPRA',v_id_combustible,v_precio_compra,v_res);
                                SELECT SAL_LITTER INTO v_ent_litter FROM SG_POS_TURNOS  WHERE  TURNO  = p_turno AND FECHA =p_fecha AND ID_POS = x.ID_POS   ; 
                                UPDATE SG_POS_TURNOS SET  ENT_LITTER  = v_ent_litter , TOTAL = SAL_LITTER   - v_ent_litter  , ID_USUARIO = p_id_usr , TOTAL_VENTA =  (SAL_LITTER  - v_ent_litter) * v_precio_venta ,TOTAL_COSTO =  (SAL_LITTER  - v_ent_litter) * v_precio_compra WHERE ID_POS_TURNO = x.ID_POS_TURNO ;
                         END LOOP;
                        P_SG_ACT_VENTAS_UPD(p_fecha + 1,'DIA',p_responsable,p_id_usr,v_res);
                         v_res := '1';
                    END IF;
          END IF;
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Ventas Diarias','P_SG_ACTUALIZAR_VENTAS_DIARIAS','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
