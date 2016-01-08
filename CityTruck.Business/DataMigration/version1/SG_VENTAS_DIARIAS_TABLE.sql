﻿ALTER TABLE CITYTRUCK.SG_VENTAS_DIARIAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE CITYTRUCK.SG_VENTAS_DIARIAS CASCADE CONSTRAINTS;

CREATE TABLE CITYTRUCK.SG_VENTAS_DIARIAS
(
  ID_VENTA  NUMBER(5)                           NOT NULL,
  TURNO     VARCHAR2(50 BYTE)                   NOT NULL,
  RESPONSABLE     VARCHAR2(250 BYTE)                  ,
  FECHA     DATE                                NOT NULL,
  TOTAL     NUMBER(15,5)                        NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


CREATE UNIQUE INDEX CITYTRUCK.SG_VENTAS_DIARIAS_PK ON CITYTRUCK.SG_VENTAS_DIARIAS
(ID_VENTA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


ALTER TABLE CITYTRUCK.SG_VENTAS_DIARIAS ADD (
  CONSTRAINT SG_VENTAS_DIARIAS_PK
 PRIMARY KEY
 (ID_VENTA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));
SET DEFINE OFF;
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (9, 'DIA', TO_DATE('01/01/2014 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 2000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (10, 'TARDE', TO_DATE('01/01/2014 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 50000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (11, 'NOCHE', TO_DATE('01/01/2014 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 542144);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (12, 'DIA', TO_DATE('01/02/2014 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 2000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (13, 'DIA', TO_DATE('01/03/2014 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 25045);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (1, 'DIA', TO_DATE('12/01/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 10000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (2, 'TARDE', TO_DATE('12/08/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 5000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (3, 'NOCHE', TO_DATE('12/26/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 15000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (4, 'DIA', TO_DATE('10/01/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 1000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (5, 'TARDE', TO_DATE('10/01/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 2000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (6, 'NOCHE', TO_DATE('10/01/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 2000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (7, 'DIA', TO_DATE('10/02/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 5000);
Insert into CITYTRUCK.SG_VENTAS_DIARIAS
   (ID_VENTA, TURNO, FECHA, TOTAL)
 Values
   (8, 'TARDE', TO_DATE('10/02/2013 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), 8000);
COMMIT;
