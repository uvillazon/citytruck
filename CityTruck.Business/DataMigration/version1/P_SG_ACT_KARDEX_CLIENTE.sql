CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ACT_KARDEX_CLIENTE(
p_id_cliente SG_KARDEX_CLIENTE.ID_CLIENTE%type,
p_fecha SG_KARDEX_CLIENTE.FECHA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SG_KARDEX_CLIENTE.SALDO%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SG_KARDEX_CLIENTE 
                    where ID_CLIENTE  = p_id_cliente
                    and FECHA  < p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SG_KARDEX_CLIENTE  
                        where ID_CLIENTE  = p_ID_CLIENTE 
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SG_KARDEX_CLIENTE  
                        WHERE ID_CLIENTE   = p_ID_CLIENTE  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.CONSUMO   - x.AMORTIZACION  ;
                        update SG_KARDEX_CLIENTE  set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                    END LOOP;
                    UPDATE SG_CLIENTES set SALDO = v_saldo WHERE ID_CLIENTE = p_ID_CLIENTE;
                    COMMIT;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    v_res:= '1';
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Cuentas por Cobrar','P_SG_GUARDAR_CUENTA_PC','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/