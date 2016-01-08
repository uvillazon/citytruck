CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_CLIENTE_CONSUMO(
p_id_cliente SG_CLIENTES_CONSUMO.ID_CLIENTE%type,
p_codigo SG_CLIENTES_CONSUMO.CODIGO%type,
p_nombre SG_CLIENTES_CONSUMO.NOMBRE%type,
p_responsable SG_CLIENTES_CONSUMO.RESPONSABLE%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_cliente SG_CLIENTES_CONSUMO.ID_CLIENTE%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_cliente IS NULL OR p_codigo IS NULL OR p_nombre IS NULL OR p_responsable IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   
   if p_id_cliente = 0 THEN
         --creacion
        v_id_cliente := Q_SG_CLIENTES_CONSUMO .nextval;
       
        INSERT INTO SG_CLIENTES_CONSUMO  ( ID_CLIENTE ,CODIGO ,NOMBRE ,RESPONSABLE ,CONSUMO ,CONSUMO_BS ,ID_USUARIO, FECHA_REG ) 
        VALUES  (v_id_cliente, p_codigo , p_nombre, p_responsable,   0, 0 , p_id_usr, sysdate);
        
        v_res := '0';
        
    ELSE
        UPDATE   SG_CLIENTES_CONSUMO SET CODIGO =  p_CODIGO , NOMBRE = p_NOMBRE , RESPONSABLE = p_RESPONSABLE  WHERE ID_CLIENTE =  p_ID_CLIENTE ;
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
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
p_grabar_error_bd(v_errC,v_errD,'Modulo de Consumo','P_SG_GUARDAR_CLIENTE_CONSUMO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
