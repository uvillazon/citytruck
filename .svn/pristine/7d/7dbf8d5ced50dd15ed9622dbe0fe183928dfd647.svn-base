CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_DETALLE_COMPRA(
p_id_detalle SG_DETALLES_COMPRAS.ID_DETALLE%type,
p_id_compra SG_DETALLES_COMPRAS.ID_COMPRA %type,
p_detalle SG_DETALLES_COMPRAS.DETALLE%type,
p_importe SG_DETALLES_COMPRAS.IMPORTE%type,
p_id_usr   NUMBER,
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_id_detalle  NUMBER := 0;
 v_precio_venta  NUMBER := 0;
 v_precio_compra  NUMBER := 0;
 v_id_combustible SG_POS.ID_COMBUSTIBLE%type; 
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
IF p_id_compra IS NULL OR p_detalle IS NULL OR p_importe IS NULL OR p_id_usr IS NULL 
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
       if p_id_detalle = 0 THEN
         --creacion
        v_id_detalle := Q_SG_DETALLES_COMPRAS .nextval;
        
        INSERT INTO SG_DETALLES_COMPRAS ( ID_DETALLE ,ID_COMPRA ,DETALLE ,PRECIO ,IMPORTE ,ID_USUARIO ,FECHA_REG )  
        VALUES  (v_id_detalle,p_id_compra,p_detalle,p_importe,p_importe,p_id_usr,sysdate);
        
    ELSE
        --editar
          UPDATE SG_DETALLES_COMPRAS   SET DETALLE =  p_DETALLE , IMPORTE = p_IMPORTE ,  PRECIO  = p_IMPORTE WHERE ID_DETALLE = p_id_detalle ;
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
p_grabar_error_bd(v_errC,v_errD,'Modulo Compras','P_SG_GUARDAR_DETALLE_COMPRA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
