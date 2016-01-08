﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_CAJAS(
p_id_caja SG_CAJAS.ID_CAJA %type,
p_codigo SG_CAJAS.CODIGO%type,
p_nombre  SG_CAJAS.NOMBRE  %type,
p_nro_cuenta SG_CAJAS.NRO_CUENTA  %type,
p_moneda SG_CAJAS.MONEDA  %type,
p_descripcion SG_CAJAS.DESCRIPCION   %type,
p_saldo SG_CAJAS.SALDO   %type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fecha SG_KARDEX_EFECTIVO.FECHA%type; 
 v_id_caja  SG_CAJAS.ID_CAJA%type;
 v_nro  SG_CAJAS.CODIGO %type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_caja IS NULL OR p_nombre IS NULL OR p_nro_cuenta IS NULL OR p_moneda IS NULL OR p_descripcion IS NULL
OR p_saldo IS NULL OR  p_id_usr IS NULL  OR p_codigo IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_caja = 0 THEN
         --creacion
         select TO_DATE(TO_CHAR(sysdate, 'MM/DD/YYYY') , 'MM/DD/YYYY')  into v_fecha from dual;
        v_id_caja := Q_SG_CAJAS.nextval;
        select MAx(CODIGO) INTO v_nro FROM SG_CAJAS;
       
        if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_CAJAS  VALUES  (v_id_caja,p_codigo , p_nombre, p_nro_cuenta,
        p_moneda ,p_descripcion ,p_saldo ,p_id_usr, v_fecha );
        
        v_res := '0';
         IF v_res = '0' THEN
             
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , v_id_caja , v_id_caja , 'CAJA' ,v_fecha ,'CREACION CUENTA:'||p_nombre,p_saldo,0,0,p_id_usr,sysdate );
          
        END IF;

    ELSE
       SELECT COUNT(*) INTO v_cnt FROM SG_KARDEX_EFECTIVO 
       WHERE ID_CAJA = p_id_caja AND ID_OPERACION <> p_id_caja AND OPERACION <> 'CAJA' ;
      IF v_cnt > 0 THEN
        v_res := 'Existen transacciones asociadas a esta caja.';
      ELSE
         select TO_DATE(TO_CHAR(sysdate, 'MM/DD/YYYY') , 'MM/DD/YYYY')  into v_fecha from dual;
        DELETE FROM SG_KARDEX_EFECTIVO WHERE ID_CAJA = p_id_caja AND ID_OPERACION = p_id_caja AND OPERACION = 'CAJA';
        UPDATE SG_CAJAS SET CODIGO = p_CODIGO ,NOMBRE =p_NOMBRE , NRO_CUENTA = p_NRO_CUENTA , MONEDA = p_MONEDA , DESCRIPCION = p_DESCRIPCION ,SALDO = p_SALDO  
        WHERE ID_CAJA  =  p_ID_CAJA; 
         INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
         VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_ID_CAJA , p_ID_CAJA , 'CAJA' ,v_fecha ,'CREACION CUENTA:'||p_nombre,p_saldo,0,0,p_id_usr,sysdate );
         v_id_caja := p_id_caja;
      END IF;
        --editar
    END IF;
END IF;
    if v_res = '0' THEN
       
     COMMIT;
      P_SG_ACT_KARDEX_EFECTIVO(v_id_caja, v_fecha ,p_id_usr,v_res);
        v_res := TO_CHAR(v_id_caja);
    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SG_GUARDAR_CAJAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/