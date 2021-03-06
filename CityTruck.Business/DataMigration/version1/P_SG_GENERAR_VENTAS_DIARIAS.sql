﻿CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GENERAR_VENTAS_DIARIAS(
 p_fecha       IN SG_VENTAS_DIARIAS.FECHA%TYPE,
 p_turno IN SG_VENTAS_DIARIAS.TURNO%TYPE,
 p_responsable IN SG_VENTAS_DIARIAS.RESPONSABLE%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para generar venta diaria
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
  v_total NUMBER:=0;
  v_total_venta NUMBER:=0;
  v_id_kardex  NUMBER:=0;
  v_id_venta  SG_VENTAS_DIARIAS.ID_VENTA%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_fecha IS NULL OR p_turno IS NULL OR p_id_usr IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos Si Existe algun registro no exista 
    SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
    IF v_cnt = 0 THEN
      v_res := 'No Existe Registros POS_TURNOS Revise por favor';
    ELSE
         SELECT SUM(TOTAL ) INTO v_total FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
         SELECT SUM(TOTAL_VENTA) INTO v_total_venta FROM SG_POS_TURNOS  WHERE TURNO  = p_turno AND FECHA = p_fecha;
         SELECT COUNT(*) INTO v_cnt FROM SG_VENTAS_DIARIAS WHERE TURNO = p_TURNO AND FECHA = p_FECHA;
         IF v_cnt > 0 THEN
                    SELECT ID_VENTA into v_id_venta FROM SG_VENTAS_DIARIAS WHERE TURNO = p_TURNO AND FECHA = p_FECHA;
                    UPDATE SG_VENTAS_DIARIAS SET TOTAL = v_total WHERE TURNO = p_TURNO AND FECHA = p_FECHA;
                    UPDATE SG_KARDEX_EFECTIVO SET ID_CAJA =  1,
                                      FECHA = p_fecha,
                                      INGRESO = v_total_venta
                    WHERE ID_OPERACION = v_id_venta AND OPERACION = 'VENTA';
                    P_SG_ACTUALIZAR_VENTAS_DIARIAS(p_fecha,p_turno,p_responsable,p_id_usr,v_res);
                    v_res := '0';
         ELSE
                    SELECT Q_SG_VENTAS_DIARIAS.nextval INTO v_id_venta FROM DUAL;
                    INSERT INTO SG_VENTAS_DIARIAS  (ID_VENTA ,TURNO, RESPONSABLE ,FECHA ,TOTAL ) VALUES
                    (v_id_venta ,p_TURNO, p_RESPONSABLE ,p_FECHA ,v_TOTAL);
                     INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
                     VALUES (Q_SG_KARDEX_EFECTIVO.nextval , 1 , v_id_venta , 'VENTA' ,p_fecha,'VENTA  FECHA : '||TO_CHAR(p_fecha , 'DD/MM/YYYY') ||  '- TURNO :'||p_turno,v_total_venta,0,0,p_id_usr,sysdate );
                     v_res := '0';
         END IF; 
            IF v_res = '0' THEN
                  COMMIT;
                    P_SG_ACT_KARDEX_EFECTIVO(1,p_fecha,p_id_usr,v_res);
                  v_res := '1';
              ELSE
                ROLLBACK;
                END IF;
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Generar POS_TURNOS','P_SG_GENERAR_POS_TURNOS','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
