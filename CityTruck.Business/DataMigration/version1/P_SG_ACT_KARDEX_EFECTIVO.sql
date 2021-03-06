﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ACT_KARDEX_EFECTIVO(
p_id_caja SG_KARDEX_EFECTIVO.ID_CAJA %type,
p_fecha SG_KARDEX_EFECTIVO.FECHA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SG_KARDEX_EFECTIVO.SALDO%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SG_KARDEX_EFECTIVO 
                    where ID_CAJA   = p_id_caja
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SG_KARDEX_EFECTIVO  
                        where ID_CAJA   = p_id_caja
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SG_KARDEX_EFECTIVO  
                        WHERE ID_CAJA   = p_ID_CAJA  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.INGRESO    - x.EGRESO   ;
                        update SG_KARDEX_EFECTIVO  set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SG_CAJAS     SET SALDO   =v_saldo  WHERE ID_CAJA     =  p_ID_CAJA   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SG_ACT_KARDEX_EFECTIVO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
