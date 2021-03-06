﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_AMORTIZACION(
p_id_a SG_AMORTIZACIONES.ID_AMORTIZACION%type,
p_id_cliente  SG_AMORTIZACIONES.ID_CLIENTE%type,
p_id_caja SG_AMORTIZACIONES.ID_CAJA%type,
p_fecha SG_AMORTIZACIONES.FECHA%type,
p_concepto SG_AMORTIZACIONES.CONCEPTO%type,
p_importe SG_AMORTIZACIONES.IMPORTE_BS%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fecha SG_KARDEX_CLIENTE.FECHA%type;
 v_id_a SG_AMORTIZACIONES.ID_AMORTIZACION%type;   
 v_nro  SG_AMORTIZACIONES.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_a IS NULL OR p_id_cliente IS NULL OR p_id_caja IS NULL OR p_fecha IS NULL OR p_concepto IS NULL
OR p_importe IS NULL OR  p_id_usr IS NULL 
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_a = 0 THEN
         --creacion
         select TO_DATE(TO_CHAR(sysdate, 'MM/DD/YYYY') , 'MM/DD/YYYY')  into v_fecha from dual;
        v_id_a := Q_SG_AMORTIZACIONES.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_AMORTIZACIONES;
       
        if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_AMORTIZACIONES  VALUES  (v_id_a, p_id_cliente, p_id_caja, v_nro + 1 , p_fecha, p_concepto,
        p_importe ,p_id_usr, sysdate);
        
        v_res := '0';
         IF v_res = '0' THEN
             
            INSERT INTO SG_KARDEX_CLIENTE ( ID_KARDEX, ID_CLIENTE, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, CONSUMO , AMORTIZACION  ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_CLIENTE.nextval , p_id_cliente , v_id_a , 'AMORTIZACION' ,v_fecha ,'AMORTIZACION',0, p_importe,0,p_id_usr,sysdate );
            P_SG_GUARDAR_INGRESOS(0, v_fecha, p_concepto, p_id_caja, p_importe, p_id_usr, v_res);
 
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = '1' THEN
     COMMIT;
      P_SG_ACT_KARDEX_CLIENTE(p_id_cliente, v_fecha ,p_id_usr,v_res);
    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Cuentas Por Cobrar','P_SG_GUARDAR_AMORTIZACION','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/