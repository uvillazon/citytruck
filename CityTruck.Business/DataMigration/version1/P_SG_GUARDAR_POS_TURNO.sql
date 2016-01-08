CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_POS_TURNO(
p_id_pos_turno SG_POS_TURNOS.ID_POS_TURNO%type,
p_id_pos SG_POS_TURNOS.ID_POS %type,
p_turno SG_POS_TURNOS.TURNO %type,
p_fecha SG_POS_TURNOS.FECHA %type,
p_ent_litter SG_POS_TURNOS.ENT_LITTER %type,
p_sal_litter SG_POS_TURNOS.SAL_LITTER %type,
p_total SG_POS_TURNOS.TOTAL %type,
p_id_usr   NUMBER,
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
IF p_id_pos_turno IS NULL OR p_id_pos IS NULL OR p_turno IS NULL OR p_fecha IS NULL OR p_ent_litter IS NULL OR p_sal_litter IS NULL OR p_total IS NULL OR p_id_usr IS NULL 
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
    SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE ID_POS_TURNO  = p_id_pos_turno;
    IF v_cnt = 0 THEN
         v_res := 'No existe ese Registro Informar a Administrador de Sistemas';
    ELSE
        UPDATE SG_POS_TURNOS SET SAL_LITTER = p_sal_litter , TOTAL = ENT_LITTER - p_sal_litter  , ID_USUARIO = p_id_usr , FECHA_REG = sysdate WHERE ID_POS_TURNO = p_ID_POS_TURNO ;
    END IF;
    IF v_res = '0' THEN
          COMMIT;
          v_res := '1';
      ELSE
        ROLLBACK;
        END IF;
END IF;
p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Guardar pos Turno','P_ESG_GUARDAR_POS_TURNO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
