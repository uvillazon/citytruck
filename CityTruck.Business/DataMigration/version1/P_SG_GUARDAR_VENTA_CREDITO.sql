CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_VENTA_CREDITO(
p_id_venta SG_VENTAS_CREDITO.ID_VENTA%type,
p_id_cliente SG_VENTAS_CREDITO.ID_CLIENTE%type,
p_id_combustible SG_VENTAS_CREDITO.ID_COMBUSTIBLE%type,
p_fecha SG_VENTAS_CREDITO.FECHA%type,
p_turno  SG_VENTAS_CREDITO.TURNO%type,
p_responsable SG_VENTAS_CREDITO.RESPONSABLE%type,
p_precio SG_VENTAS_CREDITO.PRECIO%type,
p_importe_bs SG_VENTAS_CREDITO.IMPORTE_BS%type,
p_importe_lts SG_VENTAS_CREDITO.IMPORTE_LTS%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_combustible VARCHAR2(1000):='0';
 
 v_id_venta  SG_VENTAS_CREDITO.ID_VENTA%type;
  v_id_cliente  SG_VENTAS_CREDITO.ID_CLIENTE %type;
 v_nro  SG_VENTAS_CREDITO.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
SELECT NOMBRE into v_combustible FROM SG_COMBUSTIBLES WHERE ID_COMBUSTIBLE  = p_ID_COMBUSTIBLE ;
IF p_id_venta = 0 THEN
    IF p_fecha IS NULL OR p_id_cliente IS NULL OR p_id_combustible IS NULL OR p_turno IS NULL OR p_responsable IS NULL  
    THEN
        v_res := 'Faltan parametros.';
    END IF;
    IF v_res='0' THEN
    --vamos a crear nuestra secuencia
     
       if p_id_venta = 0 THEN
             --creacion
            v_id_venta := Q_SG_VENTAS_CREDITO .nextval;
            select MAx(NRO_COMP) INTO v_nro FROM SG_VENTAS_CREDITO  ;
           if v_nro is null then
                v_nro:= 0;
            end if;
                INSERT INTO SG_VENTAS_CREDITO (ID_VENTA, ID_COMBUSTIBLE ,ID_CLIENTE ,NRO_COMP,FECHA ,TURNO ,PRECIO ,IMPORTE_BS, IMPORTE_LTS ,RESPONSABLE, ID_USUARIO ,FECHA_REG )
                VALUES  (v_id_venta,  p_ID_COMBUSTIBLE , p_ID_CLIENTE , v_nro + 1, p_FECHA ,  p_TURNO ,  p_precio  , p_importe_lts *     p_precio ,p_importe_lts ,p_responsable, p_id_usr ,sysdate );
                    
            v_res := '0';
             IF v_res = '0' THEN
              
                INSERT INTO SG_KARDEX_CLIENTE  ( ID_KARDEX, ID_CLIENTE , ID_OPERACION ,OPERACION ,FECHA ,DETALLE, CONSUMO , AMORTIZACION  ,SALDO, ID_USUARIO ,FECHA_REG )
                 VALUES (Q_SG_KARDEX_CLIENTE.nextval , p_ID_CLIENTE , v_id_venta , 'VENTA CREDITO' ,p_fecha,'CONSUMO : '||v_combustible ||  '- '||p_turno, p_importe_lts *     p_precio,0,0,p_id_usr,sysdate );
            END IF;
        --ELSE
            --editar
        END IF;
    END IF;
ELSE 
    IF p_importe_lts IS NULL  
    THEN
        v_res := 'Faltan parametros.';
    END IF;
    IF v_res='0' THEN
       
        UPDATE SG_VENTAS_CREDITO SET IMPORTE_LTS = p_IMPORTE_LTS , IMPORTE_BS = p_IMPORTE_BS WHERE ID_VENTA =p_ID_VENTA ;
        UPDATE SG_KARDEX_CLIENTE SET CONSUMO = p_IMPORTE_BS WHERE ID_OPERACION = p_ID_VENTA AND OPERACION  = 'VENTA CREDITO';
--        DELETE FROM SG_KARDEX_CLIENTE WHERE ID_OPERACION = p_ID_VENTA AND OPERACION  = 'VENTA CREDITO';
--        INSERT INTO SG_KARDEX_CLIENTE  ( ID_KARDEX, ID_CLIENTE , ID_OPERACION ,OPERACION ,FECHA ,DETALLE, CONSUMO , AMORTIZACION  ,SALDO, ID_USUARIO ,FECHA_REG )
--                 VALUES (Q_SG_KARDEX_CLIENTE.nextval , p_id_cliente , p_ID_VENTA , 'VENTA CREDITO' ,p_fecha,'CONSUMO : '||v_combustible ||  '- '||p_turno,p_IMPORTE_BS,0,0,p_id_usr,sysdate );
     END IF;
END IF;
    if v_res = '0' THEN
        v_res := '1';
         P_SG_ACT_KARDEX_CLIENTE(p_ID_CLIENTE,p_fecha,p_id_usr,v_res);
     COMMIT;

    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Creditos','P_SG_GUARDAR_VENTA_CREDITO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
