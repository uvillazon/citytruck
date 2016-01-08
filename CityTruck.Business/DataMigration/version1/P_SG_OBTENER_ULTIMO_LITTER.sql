CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_OBTENER_ULTIMO_LITTER(
 p_id_pos       IN SG_POS_TURNOS.ID_POS%TYPE,
 p_fecha       IN SG_POS_TURNOS.FECHA%TYPE,
 p_turno IN SG_POS_TURNOS.TURNO%TYPE,
 p_ent_litter OUT  NUMBER,
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
 --v_ent_litter_ini VARCHAR2(100):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_id_pos IS NULL OR p_fecha IS NULL OR p_turno IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
        SELECT COUNT(*) INTO v_cnt2 FROM SG_POS;
        SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS ;--WHERE FECHA <>p_FECHA AND TURNO <>p_TURNO  ;
        IF v_cnt < v_cnt2 THEN
            SELECT ENT_LITTER_INI into v_ent_litter_ini   FROM  SG_POS WHERE ID_POS  = p_id_pos ;
            p_ent_litter := v_ent_litter_ini;
            v_res := '0';
        ELSE
             IF p_turno = 'DIA' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'NOCHE' AND FECHA =p_fecha -1 AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                      v_res := 'No Existe Registros en el Turno NOCHE por favor Registre Primero Turno NOCHE fecha :'|| TO_DATE(p_fecha -1, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'NOCHE' AND FECHA = p_fecha -1 AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
                    END IF;
            ELSIF p_turno = 'TARDE' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'DIA' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                       v_res := 'No Existe Registros en el Turno DIA por favor Registre Primero Turno DIA fecha :'|| TO_DATE(p_fecha, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'DIA' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
                    END IF;
            ELSE
                SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'TARDE' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                       v_res := 'No Existe Registros en el Turno TARDE por favor Registre Primero Turno TARDE fecha :'|| TO_DATE(p_fecha, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'TARDE' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
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
    p_grabar_error_bd(v_errC,v_errD,'Generar POS_TURNOS','P_SG_OBTENER_ULTIMO_LITTER','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
