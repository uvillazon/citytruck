DROP PROCEDURE CITYTRUCK.P_AUX_CONSTRUCTOR_SP_GRABAR;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_AUX_CONSTRUCTOR_SP_GRABAR(p_tabla varchar2, p_parte number) 
 /*
 Finalidad: Construccion de un SP base, para a partir de ella se termine la definicion de un SP de ALTA  o MODIFICACION (GRABAR)
 Recibe:  p_tabla  -> Tabla para la que se construira el SP de
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros 
 */
IS
 v_cnt NUMBER:=0;
 v_i NUMBER:=0;
 v_CampoID VARCHAR2(30); -- Nombre del campo ID de una tabla
 v_cad VARCHAR2(255);
 v_cNul VARCHAR2(3000):='';
 v_cIns VARCHAR2(3000):='';
 v_cVal VARCHAR2(3000):='';
 v_sep VARCHAR2(2):='';
 v_fin VARCHAR2(2):='';
BEGIN
IF p_parte = 0 OR p_parte = 1 THEN
    --select count(1) into v_cnt from user_tables;
  v_cad := 'CREATE OR REPLACE PROCEDURE P_' || SUBSTR(p_tabla,1,2) || '_GRABAR_' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || '(' ;
  dbms_output.put_line(v_cad);
  -- Parametros de entrada
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_cad := ' p_' || lower(x.column_name) || '  IN ' || p_tabla || '.' || x.column_name || '%TYPE,';
    dbms_output.put_line(v_cad);
    -- Construimos la validacion de nulos
    IF x.nullable = 'N' THEN
        v_cNul := v_cNul || 'p_' || lower(x.column_name) || ' IS NULL OR ';
    END IF;
    -- Construimos la cadena INSERT ... El VALUE sera generado mas abajo
    v_cIns := v_cIns || lower(x.column_name) || ', ';
  END LOOP;
  dbms_output.put_line(' p_login_usr   VARCHAR2,  -- Login del usuario que realiza la operacion');
  dbms_output.put_line(' p_res OUT  VARCHAR2');
  dbms_output.put_line(')');
  v_cNul := substr(v_cNul,1,length(v_cNul)-3);
  v_cIns := substr(v_cIns,1,length(v_cIns)-2);
  v_cVal := substr(v_cVal,1,length(v_cVal)-2);
   -- Segmento de Descripcion general del SP
   dbms_output.put_line('/*');
  dbms_output.put_line(' Finalidad: Procedimiento para grabar el alta o modificacion de ' || SUBSTR(p_tabla,4,LENGTH(p_tabla)));
  dbms_output.put_line(' Recibe:  __ , __ , etc -> Parametros ');
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_cad := '         p_' || lower(x.column_name) || '  -> ';
    dbms_output.put_line(v_cad);
  END LOOP;
  dbms_output.put_line(' Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error');
  dbms_output.put_line(' Fecha Creacion: ' || trunc(sysdate) );
  dbms_output.put_line(' Autor: [nombre] [apellido]'); 
  dbms_output.put_line(' Rev:');
  dbms_output.put_line(' */');
  dbms_output.put_line('IS');
  -- Variables locales
  dbms_output.put_line(' v_cnt NUMBER:=0;');
  dbms_output.put_line(' v_res VARCHAR2(100):=''0''; ');
  dbms_output.put_line(' v_sql VARCHAR2(2000);'); 
  dbms_output.put_line(' v_sql1 VARCHAR2(200);'); 
  dbms_output.put_line(' v_tipo_oper VARCHAR2(10);');
  dbms_output.put_line(' v_rg    ' || p_tabla || '%ROWTYPE;');
  dbms_output.put_line(' v_errC   MN_AUX_LOG_ERRORES.cod_error%type;');
  dbms_output.put_line(' v_errD   MN_AUX_LOG_ERRORES.desc_error%type;');
  dbms_output.put_line(' v_id_log MN_AUX_LOG_ERRORES.id_log%type;');
  dbms_output.put_line(' v_id       NUMBER := 0;');
  dbms_output.put_line('BEGIN');
  -- Segmento de validacion de nulos
  dbms_output.put_line('  -- Validamos nulos');
  dbms_output.put_line('  IF ' || v_cNul || ' THEN');
  dbms_output.put_line('    v_res := ''Faltan parametros.'';');
  dbms_output.put_line('  END IF;');
  -- Segmento validacion de existencia de registro (ojo: para este control, el campo ID de la tabla debe ser el primero)
  SELECT lower(column_name) INTO v_CampoID FROM  user_tab_columns WHERE table_name = p_tabla AND column_id = 1;
  dbms_output.put_line('  -- Para el caso de ALTA, validamos que el registro NO exista');
  dbms_output.put_line('  IF v_res = ''0'' AND (p_' || v_CampoID || ' = 0 OR p_' || v_CampoID || ' IS NULL ) THEN');
  --dbms_output.put_line('      SELECT COUNT (1) INTO v_cnt FROM ' || p_tabla || ' WHERE XxxxX = p_XxxxX; -- !!!! Cambiar el campo XxxxX por el que corresponda validar duplicados !!!!');
  dbms_output.put_line('      IF F_MN_EXISTE_REG(''' || p_tabla || ''',''XxxxX='' || p_XxxxX)=TRUE THEN -- !!!! Cambiar el campo XxxxX por el que corresponda validar duplicados !!!!');
  --dbms_output.put_line('      IF v_cnt > 0 THEN');
  dbms_output.put_line('         v_res := ''El elemento '' || p_XxxxX || '' ya existe.'';');
  dbms_output.put_line('      END IF;');
  dbms_output.put_line('  END IF;');
  dbms_output.put_line('  -- Para el caso de MODIFICACION, validamos que el registro exista');
  dbms_output.put_line('  IF v_res = ''0'' AND p_' || v_CampoID || ' > 0 THEN');
  --dbms_output.put_line('      SELECT COUNT (1) INTO v_cnt FROM ' || p_tabla || ' WHERE ' || v_CampoID || ' = p_' || v_CampoID || ';');
  dbms_output.put_line('      IF F_MN_EXISTE_REG(''' || p_tabla || ''',''' || v_CampoID || '='' || p_' || v_CampoID || ')=FALSE THEN');
  dbms_output.put_line('         v_res := ''NO existe el elemento que pretende modificar.'';');
  dbms_output.put_line('      ELSE');
  dbms_output.put_line('         SELECT * INTO v_rg FROM ' || p_tabla || ' WHERE ' || v_CampoID || ' = p_' || v_CampoID || ';');
  dbms_output.put_line('      END IF;');
  dbms_output.put_line('  END IF;');
  
  dbms_output.put_line('  IF v_res=''0'' THEN');
  dbms_output.put_line('    -- Si se trata de una INSERCION ...');
  dbms_output.put_line('    IF p_' || v_CampoID || ' = 0 OR p_' || v_CampoID || ' IS NULL THEN');
  -- Segmento de INSERT
  dbms_output.put_line('        -- Obtenemos el correlativo');
  dbms_output.put_line('        SELECT q_' || p_tabla || '.nextval INTO v_id FROM dual;');
  dbms_output.put_line('        -- Creamos el registro');
  dbms_output.put_line('        v_sql:=''INSERT INTO ' || p_tabla || '(' || v_cIns || ') '' ||');
  dbms_output.put_line('               ''VALUES('' || v_id || '', '';');
  SELECT COUNT(1) INTO v_cnt FROM  user_tab_columns WHERE table_name = p_tabla;  -- Cantidad de columnas que tiene la tabla (Para definir el caracter final de la instruccion INSERT-coma o parentesis)
  v_i := 0;
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_i := v_i + 1;
    IF v_i = v_cnt THEN
        v_fin := ')';
    ELSE
        v_fin := ', ';
    END IF;
    IF x.data_precision IS NULL THEN
        v_sep := '''''';
    ELSE
        v_sep := '';
    END IF;
    IF substr(x.column_name,1,2)='ID' AND x.column_id = 1 THEN
        v_cad:= ''; -- Indica que es el campo clave ... ya esta definido su valor lineas arriba
    ELSE
      IF x.column_name = 'FECHA_REG' THEN
        dbms_output.put_line('        v_sql:=v_sql || ''SYSDATE' || v_fin || ''';');
      ELSE
        IF x.nullable = 'N' THEN
          dbms_output.put_line('        v_sql:=v_sql || ''' || v_sep || ''' || ' || 'p_' || lower(x.column_name) || '|| ''' || v_sep || '' || v_fin || '''; ');
        ELSE
          IF x.data_precision IS NULL THEN
            dbms_output.put_line('        IF p_' || lower(x.column_name) || ' IS NULL THEN');
          ELSE
            dbms_output.put_line('        IF p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || '=0 THEN');
          END IF;
          dbms_output.put_line('          v_sql:=v_sql || ''NULL' || v_fin || ''';');
          dbms_output.put_line('        ELSE');
          dbms_output.put_line('          v_sql:=v_sql || ''' || v_sep || ''' || ' || 'p_' || lower(x.column_name) || '|| ''' || v_sep || '' || v_fin || '''; ');
          dbms_output.put_line('        END IF; ');
        END IF;
      END IF;
    END IF;
  END LOOP;
  dbms_output.put_line('        EXECUTE IMMEDIATE v_sql;');
  dbms_output.put_line('        -- Historico de estado');
  dbms_output.put_line('        v_sql:=''INSERT INTO MN_HIST_TRAN_ESTADOS(id_hist, id_tabla, tabla, operacion, est_orig, est_dest, observ, nom_autoriza, fecha_reg, login_usr) '' ||');
  dbms_output.put_line('               ''VALUES(q_mn_hist_tran_estados.nextval,'' || v_id || '',''''' || p_tabla || ''''',''''xxxOPERACIONxxx'''',''''xxxEST_ORIGxxx'''','''''' || p_estado|| '''''',''''xxxOBSERVACIONxxx'''',''''-'''', SYSDATE,'''''' || p_login_usr || '''''')''; -- !!!! Cambiar valores xxxAAAxxx por los que correspondan !!!!');
  dbms_output.put_line('        EXECUTE IMMEDIATE v_sql;');
  dbms_output.put_line('        v_tipo_oper := ''ALTA'';');
  dbms_output.put_line('    ELSE');

END IF;
IF p_parte = 0 OR p_parte = 2 THEN  

  -- Construimos el segmento para el UPDATE
  dbms_output.put_line('        v_id := p_' || v_CampoID || ';');
  dbms_output.put_line('        -- Construimos la consulta de actualizacion');
  dbms_output.put_line('        v_sql := '''';');
  FOR x IN (SELECT * FROM user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    IF x.data_precision IS NULL THEN
        v_sep := '''''';
    ELSE
        v_sep := '';
    END IF;
    IF x.nullable = 'N' THEN
      v_cad := '        IF p_' || lower(x.column_name) || ' IS NOT NULL AND (p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR v_rg.' || lower(x.column_name) || ' IS NULL) THEN';
      dbms_output.put_line(v_cad);
        dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('        END IF;');
    ELSE
      IF x.data_precision IS NULL THEN
        dbms_output.put_line('        IF p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR (p_' || lower(x.column_name) || ' IS NULL AND v_rg.' || lower(x.column_name) || ' IS NOT NULL) OR (p_' || lower(x.column_name) || ' IS NOT NULL AND v_rg.' || lower(x.column_name) || ' IS NULL) THEN');
        dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('        END IF;');
      ELSE
        dbms_output.put_line('        IF p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR ((p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || ' = 0) AND v_rg.' || lower(x.column_name) || ' IS NOT NULL) OR (p_' || lower(x.column_name) || ' IS NOT NULL AND v_rg.' || lower(x.column_name) || ' IS NULL) THEN ');
        dbms_output.put_line('            IF p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || ' = 0 THEN');
        dbms_output.put_line('              v_sql := v_sql || '' ' || lower(x.column_name) || '=NULL,'';'); 
        dbms_output.put_line('            ELSE');
        dbms_output.put_line('              v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('            END IF;');
        dbms_output.put_line('        END IF;');
      END IF;
    END IF;
--    dbms_output.put_line(v_cad);
--    dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
            --v_sql := v_sql || ' cod_af=''' || p_cod_af || ' '' ,';
--    dbms_output.put_line('        END IF;');
  END LOOP;
  dbms_output.put_line('        -- Comprobamos si existe algun dato a modificar. ');
  dbms_output.put_line('        IF v_sql = '''' OR v_sql IS NULL THEN         -- Oracle trata actualemente a las cadenas vacias como NULL');
  dbms_output.put_line('            v_res := ''No existe ningun dato diferente a ser modificado.'';');
  dbms_output.put_line('        END IF;');
  dbms_output.put_line('        IF v_res = ''0'' THEN');
  dbms_output.put_line('            v_sql := ''UPDATE ' || p_tabla || ' SET '' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || '' WHERE ' || v_CampoID || ' = '' || p_' || v_CampoID || ';');
      --v_sql := 'UPDATE ttt SET ' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || ' WHERE id_rele = ' || p_id_rele;
  dbms_output.put_line('            EXECUTE IMMEDIATE (v_sql);');
  dbms_output.put_line('            v_tipo_oper := ''EDICION'';');
  dbms_output.put_line('        END IF;');
  dbms_output.put_line('    END IF;');

  --Segmento para grabar el historico de Alta o ??? Modificacion ???
  dbms_output.put_line('    IF v_res = ''0'' THEN');
  dbms_output.put_line('        -- Grabamos historicos (un registro por cada campo no nulo)');
  FOR x IN (SELECT * FROM user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
     IF (substr(x.column_name,1,2)='ID' AND x.column_id = 1) OR  x.column_name = 'FECHA_REG' OR  x.column_name = 'ID_USR'  THEN
        v_cad:= ''; -- No se crean historicos para estos campos
    ELSE
       dbms_output.put_line('        P_MN_GRABAR_HIST_EDICION_DATOS(v_id, ''' || p_tabla || ''', ''' || lower(x.column_name) || ''', v_rg.' || lower(x.column_name) || ', p_' || lower(x.column_name) || ', v_tipo_oper, p_login_usr, v_res);');
    END IF;
  END LOOP;
  dbms_output.put_line('        COMMIT;');
  dbms_output.put_line('        v_res := ''1'';');
  dbms_output.put_line('    END IF;');
  dbms_output.put_line('  END IF;');
  
  dbms_output.put_line('  p_res := v_res;');
  -- Bloque Excepcion
  dbms_output.put_line('EXCEPTION');
  dbms_output.put_line('  WHEN OTHERS THEN');
  dbms_output.put_line('    ROLLBACK;');
  dbms_output.put_line('    v_errC:=substr(sqlcode,1,20);');
  dbms_output.put_line('    v_errD:=substr(sqlerrm,1,200);');
  dbms_output.put_line('    p_mn_grabar_error_bd(v_errC, v_errD, ''ADM. ' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || ''', ''P_MN_GRABAR_' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || ''', v_sql, p_login_usr, v_id_log);');
  dbms_output.put_line('    p_res :=''ERROR. Avise a TI. LOG generado #'' || v_id_log;');

  dbms_output.put_line('END;');
END IF;
    
END;
/

DROP PROCEDURE CITYTRUCK.P_GRABAR_ERROR_BD;

CREATE OR REPLACE PROCEDURE CITYTRUCK.p_grabar_error_bd( 
 p_errC      CityTruck.sg_aux_log_errores.cod_error%type,
 p_errD      CityTruck.sg_aux_log_errores.desc_error%type,
 p_modulo    CityTruck.sg_aux_log_errores.modulo%type,
 p_nombre_sp CityTruck.sg_aux_log_errores.nombre_sp%TYPE,
 p_cad_sql   CityTruck.sg_aux_log_errores.cad_sql%type,
 p_login_usr   VARCHAR2,   -- Login del usuario que realiza la operacion
 p_id_log OUT NUMBER  -- Mensaje de OK ("1") o Descripcion del error
)
/*
 Finalidad: Procedimiento que graba un error ocurrido al realizar una operacion en la BD (En el SisMan)
 Recibe: parametros del error y usr que estaba ejecutando el proceso
 Retorna: --
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros
 */
IS
  v_id_log  CityTruck.sg_aux_log_errores.id_log%type;

  PRAGMA AUTONOMOUS_TRANSACTION; -- Para que solo haga el COMMIT de las operaciones de este SP
BEGIN
  SELECT CityTruck.q_sg_aux_log_errores.nextval INTO v_id_log FROM dual;
  
  INSERT INTO CityTruck.sg_aux_log_errores(id_log, login_usr, fecha, modulo, nombre_sp, cod_error, desc_error, cad_sql) 
  VALUES(v_id_log, p_login_usr, SYSDATE, p_modulo, p_nombre_sp, p_errC, p_errD, substr(p_cad_sql,1,1000));
  COMMIT;
  
  p_id_log := v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_ACT_KARDEX_CLIENTE;

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
                    and FECHA  < TO_DATE(p_fecha, 'DD/MM/YYYY HH24:MI:SS');
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
                    
                    COMMIT;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
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

DROP PROCEDURE CITYTRUCK.P_SG_ACT_KARDEX_EFECTIVO;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ACT_KARDEX_EFECTIVO(
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

DROP PROCEDURE CITYTRUCK.P_SG_ALTA_LISTA;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_ALTA_LISTA(
 p_lista       IN SG_LISTAS.LISTA%TYPE,
 p_descripcion IN SG_LISTAS.DESCRIPCION%TYPE,
 p_tam_limite  IN SG_LISTAS.TAM_LIMITE%TYPE,
 p_tipo_valor  IN SG_LISTAS.TIPO_VALOR%TYPE,
 p_mayus_minus IN SG_LISTAS.MAYUS_MINUS%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para registrar el alta la LISTA
 Recibe:  p_lista  .. p_num_proy -> Parametros del elemento
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_lista IS NULL OR p_descripcion IS NULL OR p_tam_limite IS NULL OR p_tipo_valor IS NULL OR p_mayus_minus IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SG_listas WHERE lista = TRIM(p_lista);
    IF v_cnt > 0 THEN
      v_res := 'Ya existe la lista con dicho nombre.';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      INSERT INTO SG_listas(id_lista, lista, descripcion, tam_limite, tipo_valor, mayus_minus,estado)
      VALUES(q_SG_listas.nextval, p_lista, p_descripcion, p_tam_limite, p_tipo_valor, p_mayus_minus, 'A');

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Alta Lista','P_SG_ALTA_LISTA','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GENERAR_VENTAS_DIARIAS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GENERAR_VENTAS_DIARIAS(
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
         SELECT COUNT(*) INTO v_cnt FROM SG_VENTAS_DIARIAS WHERE TURNO = p_TURNO AND FECHA = p_FECHA;
         IF v_cnt > 0 THEN
                    UPDATE SG_VENTAS_DIARIAS SET TOTAL = v_total WHERE TURNO = p_TURNO AND FECHA = p_FECHA;
                    v_res := '0';
         ELSE
                    SELECT Q_SG_VENTAS_DIARIAS.nextval INTO v_id_venta FROM DUAL;
                    INSERT INTO SG_VENTAS_DIARIAS  (ID_VENTA ,TURNO, RESPONSABLE ,FECHA ,TOTAL ) VALUES
                    (v_id_venta ,p_TURNO, p_RESPONSABLE ,p_FECHA ,v_TOTAL);
                     INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
                     VALUES (Q_SG_KARDEX_EFECTIVO.nextval , 1 , v_id_venta , 'VENTA' ,p_fecha,'VENTA  FECHA : '||TO_CHAR(p_fecha , 'DD/MM/YYYY') ||  '- TURNO :'||p_turno,v_TOTAL*3.72,0,0,p_id_usr,sysdate );
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

DROP PROCEDURE CITYTRUCK.P_SG_GRABAR_HIST_EDICION_DATOS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GRABAR_HIST_EDICION_DATOS(
 p_id_tabla  IN SG_HIST_EDICION_DATOS.ID_TABLA%TYPE,
 p_tabla  IN SG_HIST_EDICION_DATOS.TABLA%TYPE,
 p_campo  IN SG_HIST_EDICION_DATOS.CAMPO%TYPE,
 p_valor_actual  IN SG_HIST_EDICION_DATOS.VALOR_NUEVO%TYPE,
 p_valor_nuevo  IN SG_HIST_EDICION_DATOS.VALOR_NUEVO%TYPE,
 p_motivo  IN SG_HIST_EDICION_DATOS.MOTIVO%TYPE,
 p_login_usr  IN SG_HIST_EDICION_DATOS.LOGIN_USR%TYPE,
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar un registro de HIST_EDICION_DATOS
 Recibe:  p_id_tabla -> ID del registro que se acaba de Insertar y del cual se requiere guardar su historico.
-- Recibe:  p_id_tabla -> ID del registro que se Inserta / Modifica; Si el valor es mayor a 0 (y diferente de nulo), indica que es una modificacion
             p_tabla  ->  Nombre de la tabla para la que se genera historico
             p_campoID  -> Nombre del Campo ID de la tabla para la que se genera historico
             p_id_usr   -> ID del usuario que realiza la operacion
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 30-JUL-13
 Autor: Henry Terceros
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_id_tabla IS NULL OR p_tabla IS NULL OR p_campo IS NULL OR p_login_usr IS NULL THEN
      v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Grabamos historico, siempre y cuando el valor nuevo no sea nulo y sea diferente del valor actual (el que esta en la BD)
    IF p_valor_nuevo IS NOT NULL AND (p_valor_actual IS NULL OR p_valor_actual <> p_valor_nuevo ) THEN
        v_sql := 'INSERT INTO SG_HIST_EDICION_DATOS(id_hist, id_tabla, tabla, campo, valor_nuevo, motivo, fecha_reg, login_usr)  ' ||
                     'VALUES(q_SG_hist_edicion_datos.nextval, ' || p_id_tabla || ', ''' || p_tabla || ''', ''' || p_campo || ''', ''' || substr(p_valor_nuevo,1,250) || ''', ''' || p_motivo || ''',SYSDATE ,''' || p_login_usr || ''') '; 
        EXECUTE IMMEDIATE v_sql;
--        COMMIT; -- El commit debera hacerse en el SP desde donde se lo llama !!!
        v_res := '1';
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'HIST_EDICION_DATOS','P_SG_GRABAR_HIST_EDICION_DATOS',v_sql,1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GRABAR_LISTAS_ITEMS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GRABAR_LISTAS_ITEMS(
 p_id_tabla  IN SG_LISTAS_ITEMS.ID_TABLA%TYPE,
 p_id_padre  IN SG_LISTAS_ITEMS.ID_PADRE%TYPE,
 p_id_lista  IN SG_LISTAS_ITEMS.ID_LISTA%TYPE,
 p_codigo  IN SG_LISTAS_ITEMS.CODIGO%TYPE,
 p_valor  IN SG_LISTAS_ITEMS.VALOR%TYPE,
 p_estado  IN SG_LISTAS_ITEMS.ESTADO%TYPE,
 p_login_usr   VARCHAR2,  -- Login del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar el alta o modificacion de LISTAS_ITEMS
 Recibe: p_id_tabla  -> ID del Item de Lista que se pretende modificar (Si es nuevo, sera 0)
         p_id_padre  -> ID del Item de Lista al que se pretende relacionar el item actual 
         p_id_lista  -> ID de la lista a la que esta asociada este Item
         p_codigo  -> Codigo del Item
         p_valor  -> Valor del Item
         p_estado  -> Estado (A->Activo o I->Inactivo)
         p_login_usr  -> Login del usr que realiza la operacion
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 01-AUG-13
 Autor: [nombre] [apellido]
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_sql1 VARCHAR2(200);
 v_tipo_oper VARCHAR2(10);
 v_rg    SG_LISTAS_ITEMS%ROWTYPE;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
 v_id       NUMBER := 0;
BEGIN
  -- Validamos nulos
  IF p_id_tabla IS NOT NULL AND p_id_padre IS NOT NULL  THEN
    v_res := '0'; -- Quiere decir que es una creacion de relacion entre items de listas.
  ELSE
--    v_res := 'Faltan parametros.';
    IF p_id_lista IS NULL OR p_codigo IS NULL OR p_valor IS NULL OR p_estado IS NULL  THEN
      v_res := 'Faltan parametros.';
    END IF;
  END IF;
  -- Para el caso de ALTA, validamos que el registro NO exista
  IF v_res = '0' AND (p_id_tabla = 0 OR p_id_tabla IS NULL ) THEN
      SELECT COUNT (1) INTO v_cnt FROM SG_LISTAS_ITEMS WHERE id_lista = p_id_lista AND (codigo = p_codigo OR valor = p_valor);
      IF v_cnt > 0 THEN
         v_res := 'El elemento ' || p_codigo || '/' || p_valor || ' ya existe en la lista.';
      END IF;
  END IF;
  -- Para el caso de MODIFICACION, validamos que el registro exista
  IF v_res = '0' AND p_id_tabla > 0 THEN
      SELECT COUNT (1) INTO v_cnt FROM SG_LISTAS_ITEMS WHERE id_tabla = p_id_tabla;
      IF v_cnt = 0 THEN
         v_res := 'NO existe el elemento que pretende modificar.';
      ELSE
         SELECT * INTO v_rg FROM SG_LISTAS_ITEMS WHERE id_tabla = p_id_tabla;
      END IF;
  END IF;
  IF v_res='0' THEN
    -- Si se trata de una INSERCION ...
    IF p_id_tabla = 0 OR p_id_tabla IS NULL THEN
        -- Obtenemos el correlativo
        SELECT q_SG_LISTAS_ITEMS.nextval INTO v_id FROM dual;
        -- Creamos el registro
        v_sql:='INSERT INTO SG_LISTAS_ITEMS(id_tabla, id_padre, id_lista, codigo, valor, estado) ' ||
               'VALUES(' || v_id || ', ';
        IF p_id_padre IS NULL THEN
          v_sql:=v_sql || 'NULL, ';
        ELSE
          v_sql:=v_sql || '' || p_id_padre|| ', '; 
        END IF; 
        v_sql:=v_sql || '' || p_id_lista|| ', '; 
        IF p_codigo IS NULL THEN
          v_sql:=v_sql || 'NULL, ';
        ELSE
          v_sql:=v_sql || '''' || p_codigo|| ''', '; 
        END IF; 
        v_sql:=v_sql || '''' || p_valor|| ''', '; 
        v_sql:=v_sql || '''' || p_estado|| ''')'; 
        EXECUTE IMMEDIATE v_sql;
        v_tipo_oper := 'ALTA';
    ELSE
        -- Construimos la consulta de actualizacion
        v_sql := '';
        IF p_id_tabla IS NOT NULL AND (p_id_tabla <> v_rg.id_tabla OR v_rg.id_tabla IS NULL) THEN
            v_sql := v_sql || ' id_tabla=' || p_id_tabla || ',';
        END IF;
        IF p_id_padre <> v_rg.id_padre OR (p_id_padre IS NULL AND v_rg.id_padre IS NOT NULL) OR (p_id_padre IS NOT NULL AND v_rg.id_padre IS NULL) THEN
            v_sql := v_sql || ' id_padre=' || p_id_padre || ',';
        END IF;
        IF p_id_lista IS NOT NULL AND (p_id_lista <> v_rg.id_lista OR v_rg.id_lista IS NULL) THEN
            v_sql := v_sql || ' id_lista=' || p_id_lista || ',';
        END IF;
        IF p_codigo <> v_rg.codigo OR (p_codigo IS NULL AND v_rg.codigo IS NOT NULL) OR (p_codigo IS NOT NULL AND v_rg.codigo IS NULL) THEN
            v_sql := v_sql || ' codigo=''' || p_codigo || ''',';
        END IF;
        IF p_valor IS NOT NULL AND (p_valor <> v_rg.valor OR v_rg.valor IS NULL) THEN
            v_sql := v_sql || ' valor=''' || p_valor || ''',';
        END IF;
        IF p_estado IS NOT NULL AND (p_estado <> v_rg.estado OR v_rg.estado IS NULL) THEN
            v_sql := v_sql || ' estado=''' || p_estado || ''',';
        END IF;
        -- Comprobamos si existe algun dato a modificar. 
        IF v_sql = '' OR v_sql IS NULL THEN         -- Oracle trata actualemente a las cadenas vacias como NULL
            v_res := 'No existe ningun dato diferente a ser modificado.';
        END IF;
        IF v_res = '0' THEN
            v_sql := 'UPDATE SG_LISTAS_ITEMS SET ' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || ' WHERE id_tabla = ' || p_id_tabla;
            EXECUTE IMMEDIATE (v_sql);
            v_tipo_oper := 'EDICION';
        END IF;
    END IF;
    IF v_res = '0' THEN
        -- Grabamos historicos (un registro por cada campo no nulo)
        P_SG_GRABAR_HIST_EDICION_DATOS(v_id, 'SG_LISTAS_ITEMS', 'id_padre', v_rg.id_padre, p_id_padre, v_tipo_oper, p_login_usr, v_res);
        P_SG_GRABAR_HIST_EDICION_DATOS(v_id, 'SG_LISTAS_ITEMS', 'id_lista', v_rg.id_lista, p_id_lista, v_tipo_oper, p_login_usr, v_res);
        P_SG_GRABAR_HIST_EDICION_DATOS(v_id, 'SG_LISTAS_ITEMS', 'codigo', v_rg.codigo, p_codigo, v_tipo_oper, p_login_usr, v_res);
        P_SG_GRABAR_HIST_EDICION_DATOS(v_id, 'SG_LISTAS_ITEMS', 'valor', v_rg.valor, p_valor, v_tipo_oper, p_login_usr, v_res);
        P_SG_GRABAR_HIST_EDICION_DATOS(v_id, 'SG_LISTAS_ITEMS', 'estado', v_rg.estado, p_estado, v_tipo_oper, p_login_usr, v_res);

        COMMIT;
        v_res := '1';
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC, v_errD, 'ADM. LISTAS_ITEMS', 'P_SG_GRABAR_LISTAS_ITEMS', v_sql, p_login_usr, v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_AMORTIZACION;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_AMORTIZACION(
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
        p_importe,p_importe ,p_id_usr, v_fecha);
        
        v_res := '0';
         IF v_res = '0' THEN
             
            INSERT INTO SG_KARDEX_CLIENTE ( ID_KARDEX, ID_CLIENTE, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, CONSUMO , AMORTIZACION  ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_CLIENTE.nextval , p_id_cliente , p_id_a , 'AMORTIZACION' ,v_fecha ,'AMORTIZACION',0, p_importe,0,p_id_usr,sysdate );
          
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
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

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_CAJAS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_CAJAS(
p_id_caja SG_CAJAS.ID_CAJA %type,
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
OR p_saldo IS NULL OR  p_id_usr IS NULL 
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
        INSERT INTO SG_CAJAS  VALUES  (v_id_caja, v_nro + 1 , p_nombre, p_nro_cuenta,
        p_moneda ,p_descripcion ,p_saldo ,p_id_usr, v_fecha );
        
        v_res := '0';
         IF v_res = '0' THEN
             
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , v_id_caja , v_id_caja , 'CAJA' ,v_fecha ,'CREACION CUENTA:'||p_nombre,p_saldo,0,0,p_id_usr,sysdate );
          
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
     COMMIT;
      P_SG_ACT_KARDEX_EFECTIVO(v_id_caja, v_fecha ,p_id_usr,v_res);

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

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_COMPRAS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_COMPRAS(
p_id_compra SG_COMPRAS.ID_COMPRA%type,
p_fecha SG_COMPRAS.FECHA%type,
p_id_combustible SG_COMPRAS.ID_COMBUSTIBLE%type,  
p_id_caja SG_COMPRAS.ID_CAJA%type,
p_cantidad SG_COMPRAS.CANTIDAD%type,
p_nro_factura SG_COMPRAS.NRO_FACTURA %type,
p_tipo SG_COMPRAS.TIPO%type,
p_precio SG_COMPRAS.PRECIO%type,
p_importe SG_COMPRAS.IMPORTE%type,
p_formulario SG_COMPRAS.FORMULARIO%type,
p_total SG_COMPRAS.TOTAL%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_compra  SG_COMPRAS.ID_COMPRA%type;
 v_conbustible  SG_COMBUSTIBLES.NOMBRE%type;
 v_nro  SG_COMPRAS.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_fecha IS NULL OR p_id_combustible IS NULL OR p_id_caja IS NULL OR p_cantidad IS NULL 
    OR p_nro_factura IS NULL OR p_tipo IS NULL OR p_precio IS NULL OR p_importe IS NULL
    OR p_formulario IS NULL OR p_total IS NULL OR p_id_usr IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_compra = 0 THEN
         --creacion
        v_id_compra := Q_SG_COMPRAS.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_COMPRAS;
        
        IF v_nro IS NULL THEN
            v_nro:= 0;
        END IF;
        
        INSERT INTO SG_COMPRAS VALUES  (v_id_compra, v_nro + 1 , p_fecha, p_id_combustible,
         p_id_caja ,p_cantidad, p_nro_factura, p_tipo, p_precio, p_importe, p_formulario,
         p_total, p_id_usr, sysdate );
        
        v_res := '0';
        IF v_res = '0' THEN
             SELECT NOMBRE into v_conbustible FROM SG_COMBUSTIBLES WHERE ID_COMBUSTIBLE = p_id_combustible ;
            --vamos a insertar kardex efectivo
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_compra , 'COMPRA' ,p_fecha,'COMPRA  NRO: '||v_nro ||  'DE '||v_conbustible,0,p_total,0,p_id_usr,sysdate );
          
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
     COMMIT;
        P_SG_ACT_KARDEX_EFECTIVO(p_id_caja,p_fecha,p_id_usr,v_res);
    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Compras','P_SG_GUARDAR_COMPRAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_EGRESOS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_EGRESOS(
p_id_egreso SG_EGRESOS.ID_EGRESO%type,
p_fecha SG_EGRESOS.FECHA%type,
p_concepto  SG_EGRESOS.CONCEPTO%type,
p_id_caja SG_EGRESOS.ID_CAJA%type,
p_importe SG_EGRESOS.IMPORTE%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_egreso  SG_EGRESOS.ID_EGRESO%type;
 v_nro  SG_EGRESOS.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_fecha IS NULL OR p_concepto IS NULL OR p_id_caja IS NULL OR p_importe IS NULL OR p_id_usr IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_egreso = 0 THEN
         --creacion
        v_id_egreso := Q_SG_EGRESOS.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_EGRESOS ;
       
        if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_EGRESOS VALUES  (v_id_egreso, v_nro + 1 , p_fecha, 'OTROS EGRESOS',p_concepto ,p_id_caja ,p_importe ,p_id_usr, sysdate );
        
        v_res := '0';
         IF v_res = '0' THEN
           
            --vamos a insertar kardex efectivo
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_egreso , 'EGRESO' ,p_fecha,'EGRESO  NRO: '||v_nro ||  '- '||p_concepto,0,p_importe,0,p_id_usr,sysdate );
          
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
     COMMIT;
      P_SG_ACT_KARDEX_EFECTIVO(p_id_caja,p_fecha,p_id_usr,v_res);

    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Egresos','P_SG_GUARDAR_EGRESOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_INGRESOS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GUARDAR_INGRESOS(
p_id_ingreso SG_INGRESOS.ID_INGRESO%type,
p_fecha SG_INGRESOS.FECHA%type,
p_concepto  SG_INGRESOS.CONCEPTO%type,
p_id_caja SG_INGRESOS.ID_CAJA%type,
p_importe SG_INGRESOS.IMPORTE%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_ingreso  SG_INGRESOS.ID_INGRESO%type;
 v_nro  SG_INGRESOS.NRO_COMP%type;
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_fecha IS NULL OR p_concepto IS NULL OR p_id_caja IS NULL OR p_importe IS NULL OR p_id_usr IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_ingreso = 0 THEN
         --creacion
        v_id_ingreso := Q_SG_INGRESOS.nextval;
        select MAx(NRO_COMP) INTO v_nro FROM SG_INGRESOS ;
       if v_nro is null then
            v_nro:= 0;
        end if;
        INSERT INTO SG_INGRESOS VALUES  (v_id_ingreso, v_nro, p_fecha, 'OTROS INGRESOS',p_concepto ,p_id_caja ,p_importe ,p_id_usr, sysdate );
        
        v_res := '0';
         IF v_res = '0' THEN
            INSERT INTO SG_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SG_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_ingreso , 'INGRESO' ,p_fecha,'INGRESO  NRO: '||v_nro ||  '- '||p_concepto,p_importe,0,0,p_id_usr,sysdate );
        END IF;
    --ELSE
        --editar
    END IF;
END IF;
    if v_res = 0 THEN
        v_res := '1';
         P_SG_ACT_KARDEX_EFECTIVO(p_id_caja,p_fecha,p_id_usr,v_res);
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
p_grabar_error_bd(v_errC,v_errD,'Modulo de Ingresos','P_SG_GUARDAR_INGRESOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GUARDAR_POS_TURNO;

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

DROP PROCEDURE CITYTRUCK.P_SG_OBTENER_ULTIMO_LITTER;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_OBTENER_ULTIMO_LITTER(
 p_id_pos       IN SG_POS_TURNOS.ID_POS%TYPE,
 p_fecha       IN SG_POS_TURNOS.FECHA%TYPE,
 p_turno IN SG_POS_TURNOS.TURNO%TYPE,
 p_ent_litter OUT  NUMBER,
 p_res OUT VARCHAR
)
 /*
 Finalidad: Procedimiento para obtener la entrada de litter apàrtir de un pos  y turno y fecha
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_cnt2 NUMBER :=0;
 v_ent_litter_ini NUMBER:=0;
 v_res VARCHAR2(100):='0';
 --v_ent_litter_ini VARCHAR2(100):='0';
 v_errC SG_AUX_LOG_ERRORES.cod_error%type;
 v_errD SG_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SG_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_id_pos IS NULL OR p_fecha IS NULL OR p_turno IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
        SELECT COUNT(*) INTO v_cnt2 FROM SG_POS;
        SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS ;--WHERE FECHA <>p_FECHA AND TURNO <>p_TURNO  ;
        IF v_cnt < v_cnt2 THEN
            SELECT ENT_LITTER_INI into v_ent_litter_ini   FROM  SG_POS WHERE ID_POS  = p_id_pos ;
            p_ent_litter := v_ent_litter_ini;
            v_res := '0';
        ELSE
             IF p_turno = 'DIA' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'NOCHE' AND FECHA =p_fecha -1 AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                      v_res := 'No Existe Registros en el Turno NOCHE por favor Registre Primero Turno NOCHE fecha :'|| TO_DATE(p_fecha -1, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'NOCHE' AND FECHA = p_fecha -1 AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
                    END IF;
            ELSIF p_turno = 'TARDE' THEN
                 SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'DIA' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                       v_res := 'No Existe Registros en el Turno DIA por favor Registre Primero Turno DIA fecha :'|| TO_DATE(p_fecha, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'DIA' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
                    END IF;
            ELSE
                SELECT COUNT(*) INTO v_cnt FROM SG_POS_TURNOS  WHERE TURNO  = 'TARDE' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                    IF v_cnt = 0 THEN
                       v_res := 'No Existe Registros en el Turno TARDE por favor Registre Primero Turno TARDE fecha :'|| TO_DATE(p_fecha, 'DD/MM/YYYY') ;
                    ELSE
                         SELECT SAL_LITTER  INTO v_ent_litter_ini FROM SG_POS_TURNOS  WHERE TURNO  = 'TARDE' AND FECHA = p_fecha AND ID_POS = p_id_pos;
                         p_ent_litter := v_ent_litter_ini;
                         v_res := '0';
                    END IF;
          END IF;
        
        END IF;
      
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Generar POS_TURNOS','P_SG_OBTENER_ULTIMO_LITTER','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

DROP PROCEDURE CITYTRUCK.P_AUX_REINICIAR_SECUENCIA;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_AUX_REINICIAR_SECUENCIA(
 p_nom_sec VARCHAR2, -- Nombre de la secuencia (debe incluir el ESQUEMA)
 p_res OUT VARCHAR2)
 IS
  v_errc sg_aux_log_errores.cod_error%type;
  v_errD sg_aux_log_errores.desc_error%type;
  v_id_log sg_aux_log_errores.id_log%type;
  v_sec NUMBER:=1;
  v_sql VARCHAR(100):='';
 BEGIN
   -- Obtenemos el siguiente valor de la secuencia (porque currval lo requiere)
   v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Obtenemos el valor de secuencia actual
   v_sql := 'SELECT ' || trim(p_nom_sec) || '.CURRVAL FROM dual';
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Actualizamos el Incremento con el valor actual, pero Negativo
   v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY -' || v_sec || ' MINVALUE 0'; 
   EXECUTE IMMEDIATE (v_sql);
   -- Obtenemos el Siguiente valor con incremento negativo, O sea, reiniciamos a 0 
   v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Reponemos el Incremento a UNO
   v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY 1 MINVALUE 0';
   EXECUTE IMMEDIATE (v_sql);
    
   p_res := '1';

 EXCEPTION 
   WHEN OTHERS THEN
      ROLLBACK;   
      v_errC:=substr(sqlcode,1,20);
      v_errD:=substr(sqlerrm,1,200);
      p_grabar_error_bd(v_errC,v_errD,'Procedimiento generico','P_REINICIAR_SECUENCIA','-'||p_nom_sec,0,v_id_log);
      p_res := 'Reset Secuencias  ->ERROR. LOG generado #' || v_id_log;
 END;
/

DROP PROCEDURE CITYTRUCK.P_SG_GENERAR_POS_TURNOS;

CREATE OR REPLACE PROCEDURE CITYTRUCK.P_SG_GENERAR_POS_TURNOS(
 p_fecha       IN SG_POS_TURNOS.FECHA%TYPE,
 p_turno IN SG_POS_TURNOS.TURNO%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para generar pos_turnos
 Recibe:  p_fecha  .. p_turno -> Parametros del cuadro pos turno
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Ubaldo Villazon 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
  v_ent_litter_ini NUMBER:=0;
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
    IF v_cnt > 0 THEN
      v_res := 'Ya existe registros en la tabla POS_TURNOs';
    END IF;
  END IF;
   IF v_cnt = 0 THEN
            FOR y IN (SELECT * FROM  SG_POS   ) LOOP
                    EXIT WHEN v_res <> '0';
                    P_SG_OBTENER_ULTIMO_LITTER(y.ID_POS,p_fecha,p_turno,v_ent_litter_ini,v_res);
                    if v_res = '0' THEN
                        INSERT INTO SG_POS_TURNOS (ID_POS_TURNO  ,ID_POS   ,TURNO  ,FECHA  ,ENT_LITTER  ,SAL_LITTER  ,TOTAL ,ID_USUARIO ,FECHA_REG    ) 
                            VALUES(Q_SG_POS_TURNOS.nextval, y.ID_POS , p_turno , p_fecha , v_ent_litter_ini  , v_ent_litter_ini , 0 ,p_id_usr , sysdate );
                            
                    END IF;
            END LOOP;
            IF v_res = '0' THEN
                  COMMIT;
                  v_res := '1';
              ELSE
                ROLLBACK;
                END IF;
    ELSE      
            v_res := '0';        
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
