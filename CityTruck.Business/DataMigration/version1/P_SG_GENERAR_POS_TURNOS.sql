﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GENERAR_POS_TURNOS(
 p_fecha       IN SG_POS_TURNOS.FECHA%TYPE,
 p_turno IN SG_POS_TURNOS.TURNO%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para generar pos_turnos
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
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
  IF p_fecha IS NULL OR p_turno IS NULL OR p_id_usr IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos Si Existe algun registro no exista 
    SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
    IF v_cnt > 0 THEN
      v_res := 'Ya existe registros en la tabla POS_TURNOs';
    END IF;
  END IF;
   IF v_cnt = 0 THEN
            FOR y IN (SELECT * FROM  SG_POS   ) LOOP
                    EXIT WHEN v_res <> '0';
                    P_SG_OBTENER_ULTIMO_LITTER(y.ID_POS,p_fecha,p_turno,v_ent_litter_ini,v_res);
                    if v_res = '0' THEN
                        INSERT INTO SG_POS_TURNOS (ID_POS_TURNO  ,ID_POS   ,TURNO  ,FECHA  ,ENT_LITTER  ,SAL_LITTER  ,TOTAL ,TOTAL_VENTA ,TOTAL_COSTO ,ID_USUARIO ,FECHA_REG    ) 
                            VALUES(Q_SG_POS_TURNOS.nextval, y.ID_POS , p_turno , p_fecha , v_ent_litter_ini  , v_ent_litter_ini , 0 ,0,0,p_id_usr , sysdate );
                            
                    END IF;
            END LOOP;
            IF v_res = '0' THEN
                  COMMIT;
                  v_res := '1';
              ELSE
                ROLLBACK;
                END IF;
    ELSE      
            v_res := '0';        
   END IF;  
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Generar POS_TURNOS','P_SG_GENERAR_POS_TURNOS','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
