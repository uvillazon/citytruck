﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ELIMINAR_VENTA_CREDITO(
 p_id_venta CITYTRUCK.SG_VENTAS_CREDITO.ID_VENTA%type,
 p_id_usr   NUMBER,
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_nro  SG_VENTAS_CREDITO.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
 
 v_id_cliente  SG_VENTAS_CREDITO.ID_CLIENTE%type;
 v_fecha SG_VENTAS_CREDITO.FECHA%type;
BEGIN

  -- Validamos nulos
  IF p_id_venta IS NULL THEN
    v_res := 'Faltan parámetros.';
  END IF;
  -- Verificamos que el Código de NIVEL DE TENSION DE SUBESTACION no exista 
  
  IF v_res='0' THEN
      SELECT  ID_CLIENTE , FECHA INTO v_id_cliente , v_fecha FROM SG_VENTAS_CREDITO WHERE ID_VENTA  = p_ID_VENTA ;
      DELETE FROM  SG_VENTAS_CREDITO   where ID_VENTA  = p_ID_VENTA ;
      DELETE FROM SG_KARDEX_CLIENTE WHERE ID_OPERACION = p_ID_VENTA AND OPERACION  = 'VENTA CREDITO';
      -- Creamos el nodo en el arbol
      
      
      v_res := '0';
  END IF;
     if v_res = '0' THEN
        v_res := '1';
         P_SG_ACT_KARDEX_CLIENTE(v_id_cliente,v_fecha -1,p_id_usr,v_res);
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
    p_grabar_error_bd(v_errC,v_errD,'Modulo Venta Credito','P_SG_ELIMINAR_VENTA_CREDITO','-','-',v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
