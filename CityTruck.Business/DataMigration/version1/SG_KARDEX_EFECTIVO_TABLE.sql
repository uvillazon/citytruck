﻿ALTER TABLE CITYTRUCK.SG_KARDEX_EFECTIVO
 DROP PRIMARY KEY CASCADE;

DROP TABLE CITYTRUCK.SG_KARDEX_EFECTIVO CASCADE CONSTRAINTS;

CREATE TABLE CITYTRUCK.SG_KARDEX_EFECTIVO
(
  ID_KARDEX     NUMBER(7)                       NOT NULL,
  ID_CAJA       NUMBER(7)                       NOT NULL,
  ID_OPERACION  NUMBER(7)                       NOT NULL,
  OPERACION     VARCHAR2(250 BYTE)              NOT NULL,
  FECHA         DATE                            NOT NULL,
  DETALLE       VARCHAR2(250 BYTE)              NOT NULL,
  INGRESO       NUMBER(15,5)                    NOT NULL,
  EGRESO        NUMBER(15,5)                    NOT NULL,
  SALDO         NUMBER(15,5)                    NOT NULL,
  ID_USUARIO    NUMBER(5)                       NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
RESULT_CACHE (MODE DEFAULT)
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MAXSIZE          UNLIMITED
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
            FLASH_CACHE      DEFAULT
            CELL_FLASH_CACHE DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


CREATE UNIQUE INDEX CITYTRUCK.SG_KARDEX_EFECTIVO_PK ON CITYTRUCK.SG_KARDEX_EFECTIVO
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MAXSIZE          UNLIMITED
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
            FLASH_CACHE      DEFAULT
            CELL_FLASH_CACHE DEFAULT
           )
NOPARALLEL;


ALTER TABLE CITYTRUCK.SG_KARDEX_EFECTIVO ADD (
  CONSTRAINT SG_KARDEX_EFECTIVO_PK
  PRIMARY KEY
  (ID_KARDEX)
  USING INDEX CITYTRUCK.SG_KARDEX_EFECTIVO_PK
  ENABLE VALIDATE);

ALTER TABLE CITYTRUCK.SG_KARDEX_EFECTIVO ADD (
  CONSTRAINT SG_KARDEX_EFECTIVO_R01 
  FOREIGN KEY (ID_CAJA) 
  REFERENCES CITYTRUCK.SG_CAJAS (ID_CAJA)
  ENABLE VALIDATE);
