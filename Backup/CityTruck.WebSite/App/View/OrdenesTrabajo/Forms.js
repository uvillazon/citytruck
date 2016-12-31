Ext.define("App.View.OrdenesTrabajo.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormSolicitud") {
            me.title = "Datos del Solicitud de Mantenimiento";
            me.columns = 3;
            me.CargarFormSolicitud();

        }
        else if (me.opcion == "FormCrearOT") {
            //   me.title = "Datos del Solicitud de Mantenimiento";
            //   me.columns = 3;
            me.CargarFormCrearOT();

        }
        else if (me.opcion == "FormCuerpoOT") {
            me.title = "Datos Generales de la OT";
            me.columns = 2;
            me.CargarFormCuerpoOT();
        }
        else if (me.opcion == "FormCuerpoOTConsulta") {
            me.title = "Datos Generales de la OT";
            me.columns = 2;
            me.CargarFormCuerpoOTConsulta();
        }
        else if (me.opcion == "FormOTTipo1") {
            me.title = "OT tipo Reemplazo o Reparacion";
            me.columns = 1;
            me.CargarFormOTTipo1();
        }
        else if (me.opcion == "FormOTCierre") {
            me.title = "Datos Generales OT";
            me.columns = 3;
            me.CargarFormOTCierre();
        }
        else if (me.opcion == "FormOTAsignar") {
            me.columns = 3;
            me.CargarFormOTAsignar();
        }
        else if (me.opcion == "FormOTReasignar") {
            me.CargarFormOTReasignar();
        }
        else if (me.opcion == "FormCabeceraPlanilla") {
            me.CargarFormCabeceraPlanilla();
        }
        else if (me.opcion == "CargarFormUCyPoste") {
            me.CargarFormUCyPoste();
        }
        else if (me.opcion == "FormInforme") {
            me.title = "Registro de Informe de Inspeccion";
            me.CargarFormOTInforme();
        }
        else if (me.opcion == "FormConsultaOTSM") {
            me.CargarFormConsultaOTSM();
        }
        else if (me.opcion == 'CargarFormOT') {
            me.columns = 3;
            me.CargarFormOT();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
   
        this.callParent(arguments);
    },
    CargarFormSolicitud: function () {
        var me = this;
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Quien Reporta",
            name: "REPORTA_NOMBRE",
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion",
            name: "UBICACION",
            width: 730,
            colspan: 3
        });

        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA_PROBL",
        });
        me.txt_id_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ALIMENTADOR",
            hidden: true
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            hidden: true
        });
        me.txt_id_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SUBEST",
            hidden: true
        });
        me.txt_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subestacion",
            name: "NOM_SUBEST",
            hidden: true
        });
        me.items = [
            me.txt_estado,
            me.txt_nroSolicitud,
            me.txt_nombre,
            me.dat_fecha,
            me.txt_direccion,
            me.txt_id_alimentador,
            me.txt_alimentador,
            me.txt_id_subestacion,
            me.txt_subestacion
        ];
    },
    CargarFormOT: function () {
        var me = this;
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.cmp_codigoPoste = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_POSTE',
            textComponente: 'Cod. Poste',
            nameComponente: 'COD_POSTE1',
            nameDetalleComponente: 'COD_POSTE',
            btnId: 'btn_CodigoPoste',
            controlador: "Postes",
            accion: "BuscarPoste",
            param: "codPoste",
            hiddenCmp: true,
            mask: me,
            grid: me.gridPostes,
            hiddenBtn: true,
        });
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO1',
            nameDetalleComponente: 'COD_PUESTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            mask: me,
            grid: me.gridPuestos,
            hiddenBtn: true,
        });
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO',
            textComponente: 'Derivacion',
            nameComponente: 'COD_ELEMENTO1',
            nameDetalleComponente: 'COD_ELEMENTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoDerivacion',
            controlador: "ElementosRed",
            accion: "BuscarDerivacion",
            param: "CODIGO",
            mask: me,
            grid: me.gridDerivacion,
            hiddenBtn: true,
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true

        });

        me.txt_ot_ext = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "OT_EXTRA",
            hidden: true

        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT1",
            readOnly: true

        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_OT'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
            displayField: 'VALOR',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_id_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SUBEST",
            hidden: true
        });
        me.txt_subestacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subestacion",
            name: "NOM_SUBEST",
            hidden: true
        });
        me.txt_id_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_ALIMENTADOR",
            hidden: true
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            hidden: true
        });
        me.items = [
              me.txt_nroSolicitud,
            me.txt_nroOT,
            me.cbx_tipo,
            me.cmp_codigoPoste,
            me.cmp_codigoPuesto,
            me.cmp_codigoDerivacion,
            me.txt_id,
            me.txt_ot_ext,
          
            me.txt_estado,
            me.txt_id_subestacion,
            me.txt_subestacion,
            me.txt_id_alimentador,
            me.txt_alimentador,
           /* me.txt_nombre,
            me.txt_direccion*/
        ];
    },
    CargarFormCrearOT: function () {
        var me = this;


        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            // hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });

        me.items = [
            me.txt_estado,
            me.txt_nroSolicitud,

        ];
    },
    CargarFormCuerpoOT: function () {
        var me = this;
        me.CargarGridsCodigos();
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true

        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",
            hidden:true
        });
        me.txt_ot_ext = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "OT_EXTRA",
            hidden: true

        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT1",
            readOnly: true

        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_OT'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
            displayField: 'VALOR',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_tipo.on('select', function (cmb, record, index) {
            if (cmb.getValue() == 'REPARACION_REEMPLAZO') {
                me.cbx_otOrigen.setDisabled(false);
            } else {
                me.cbx_otOrigen.setDisabled(true);
            }
        });

        me.store_ot = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoIntPostes');
        me.cbx_otOrigen = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "OT origen",
            name: "TIPO_OT1",
            displayField: 'ID_OT',
            store: me.store_ot,
            disabled:true,
            colspan:2
        });

        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Asignado a",
            name: "ASIGNADO_A",
            hidden: true
        });
        me.txt_lugartrabajo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Lugar de Trabajo",
            name: "LUGAR_TRABAJO",
            colspan: 2,
            maxLength: 400,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            hidden: true,
            name: "FECHA_PROBL",
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "Codigos",
            accion: "BuscarCodigoMantenimiento",
            //param: {codMan : 0},
            param: "codMan",
            mask: me,
            grid: me.gridCodigoMantenimiento,
            allowBlank: false,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_MAN} - {DESCRIP_MAN}" },
            //scope: this,
        });
        me.cmp_codigoDefecto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_DEF',
            textComponente: 'Cod. Defecto',
            btnId: 'btn_CodigoMantenimiento1',
            nameComponente: 'COD_DEF',
            nameDetalleComponente: 'DESCRIP_DEF',
            controlador: "Codigos",
            accion: "BuscarCodigoDefecto",
            param: "codDef",
            allowBlank: false,
            mask: me,
            grid: me.gridCodigoDefecto,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_DEF} - {DESCRIP_DEF}" },
            //scope: this,
            //handler: me.CargarStore

        });
        me.cmp_codigoSolucion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_SOL',
            textComponente: 'Cod. Solucion',
            nameComponente: 'COD_SOL',
            nameDetalleComponente: 'DESCRIP_SOL',
            controlador: "Codigos",
            accion: "BuscarCodigoSolucion",
            param: "codSolucion",
            mask: me,
            grid: me.gridCodigoSolucion,
            colspan: 3,
            cmpCombo: true,
            textoTpl: function () { return "{COD_SOL} - {DESCRIP_SOL}" },
            //scope: this,
            //handler: me.CargarStore

        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 2,
            width: 480,
            vertical: false,
            allowBlank: false,
            items: [
                { boxLabel: 'P/ Poste', name: 'rb', inputValue: "POSTE" ,items:1},
                { boxLabel: 'P/ Puesto', name: 'rb', inputValue: "PUESTO", items: 2 },
                { boxLabel: 'P/ Derivacion', name: 'rb', inputValue: "DERIVACION", items: 3 },
                { boxLabel: 'P/ Tramo', name: 'rb', inputValue: "TRAMO", items: 4 },
            ]
        });
   
        me.txta_instruccion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Instrucciones",
            name: "INSTRUCCIONES",
            colspan: 2,
            maxLength: 750
        });
        me.CargarObjetos();
        me.items = [
            me.txt_id,
            me.txt_ot_ext,
            me.txt_nroOT,
            me.cbx_tipo,
            me.txt_designado,

            me.date_fecha,
            me.txt_lugartrabajo,
            me.cmp_codigoMantenimiento,
            me.cmp_codigoDefecto,
            me.cmp_codigoSolucion,
            me.cbx_otOrigen,
            me.txt_nroSolicitud,
            {
              xtype: 'fieldset',
              colspan:2,
              title: '<span style="color:red;font-weight:bold" data-qtip="Required">OBJETO SUJETO A INSPECCION<br>Importante: Seleccionar necesariamente Derivacion, Poste o Puesto.</span>',
              layout: {
                      type: 'table',
                      columns: 2,        
            },
            items: [
            me.grpb_grupoBoton,]},
            me.cmp_codigoPoste,
            me.cmp_codigoPuesto,
            me.cmp_codigoDerivacion,
            me.cmp_codigoDerivacionFinal,
            me.txta_instruccion

        ];
    },
    CargarObjetos: function () {
        var me = this;
        
        me.cmp_codigoPoste = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_POSTE',
            textComponente: 'Cod. Poste',
            nameComponente: 'COD_POSTE1',
            nameDetalleComponente: 'COD_POSTE',
            btnId: 'btn_CodigoPoste',
            controlador: "Postes",
            accion: "BuscarPoste",
            param: "codPoste",
            hiddenCmp: true,
            mask: me,
            hiddenBtn: true,
        });
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO1',
            nameDetalleComponente: 'COD_PUESTO',
            hiddenCmp: true,
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            mask: me,
            hiddenBtn: true,
        });
        //me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
        //    nameIdComponente: 'ID_ELEMENTO',
        //    textComponente: 'Derivacion',
        //    nameComponente: 'COD_ELEMENTO1',
        //    nameDetalleComponente: 'COD_ELEMENTO',
        //    hiddenCmp: true,
        //    btnId: 'btn_CodigoDerivacion',
        //    controlador: "ElementosRed",
        //    accion: "BuscarDerivacion",
        //    param: "CODIGO",
        //    mask: me,
        //    hiddenBtn: true,
        //});
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_1',
            textComponente: 'Derivacion Inicial',
            nameComponente: 'COD_ELEMENTO_11',
            nameDetalleComponente: 'COD_ELEMENTO_1',
            hiddenCmp: true,
            hiddenBtn: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,

        });
        me.cmp_codigoDerivacionFinal = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_2',
            textComponente: 'Derivacion final',
            nameComponente: 'COD_ELEMENTO_21',
            nameDetalleComponente: 'COD_ELEMENTO_2',
            hiddenCmp: true,
            hiddenBtn: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,
        });
       
    },
    CargarObjetosEdicion: function (OT) {
        var me = this;
        me.grpb_grupoBoton.setValue({ rb: OT.get('TIPO_OBJ_INTERV') });//CON ESTO HACEMOS CHECKED AL RADIO QUE CORRESPONDE
       // me.cmp_codigoDerivacion.txt_detalleComponente.disabledCls = 'background-color:#FFFFCC;';
        //.setDisabled(true);
        //style: 'background-color: #ddd;',
    },
   /* CargarRadioButton: function (rdb, newValue, oldValue, eOpts) {
        var me = this;
        if (newValue.rb == "POSTE") {
           // me.cmp_codigoDerivacion.reset();
          //  me.cmp_codigoPuesto.reset();

            me.cmp_codigoDerivacion.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(true);
            me.cmp_codigoPoste.btn.setDisabled(false);
            //alert(me.cmp_codigoPoste.txt_componente.getValue()); ESTE SERIA EL VALOR INTRODUCIDO EN EL CAMPO DEL TEXTO NO BLOQUEADO EN EL CASLO NO EXISTE VALOR
            //alert(me.cmp_codigoPoste.txt_detalleComponente.getValue());//muestra el codigo del poste
            //alert(me.cmp_codigoPoste.txt_id.getValue());//muestra el id del poste
           
        } else if (newValue.rb == "PUESTO") {
          //  me.cmp_codigoDerivacion.reset();
          //  me.cmp_codigoPoste.reset();

            me.cmp_codigoDerivacion.btn.setDisabled(true);
            me.cmp_codigoPoste.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(false);
        } else if (newValue.rb == "DERIVACION") {
          //  me.cmp_codigoPuesto.reset();
          //  me.cmp_codigoPoste.reset();

            me.cmp_codigoPoste.btn.setDisabled(true);
            me.cmp_codigoPuesto.btn.setDisabled(true);
            me.cmp_codigoDerivacion.btn.setDisabled(false);
        }
    },*/
    CargarGridsCodigos: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
    },
    CargarFormOTTipo1: function () {
        var me = this;
        me.btn_grupo = Funciones.CrearGrupoBoton("2", "");
        Funciones.CrearMenu('btn_AgregarPosteUC', 'Agregar', Constantes.ICONO_CREAR, me.EventosBoton, me.btn_grupo, this);
        Funciones.CrearMenu('btn_Quitar', 'Quitar', Constantes.ICONO_BAJA, me.EventosBoton, me.btn_grupo, this);
        me.gridReparacion = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'GridOTTipo1',itemId : 'gridPostesIntervenidos', width: 480, height: 300 });
        me.items = [

            me.btn_grupo,
            me.gridReparacion
        ];
    },
    CargarFormCuerpoOTConsulta: function () {
        var me = this;
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT"
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT"
        });

        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Asignado a",
            name: "NOMBRE_ASIGNADO",
        });
        me.txt_lugartrabajo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Lugar de Trabajo",
            name: "LUGAR_TRABAJO",
            colspan: 2,
            width: 480,
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            name: "FECHA_ASIG"
        });
        me.txt_codMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",
        });
        me.txt_codSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",
            colspan : 2,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
        });
        me.txt_objintervenido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Objecto Intervenido",
            name: "TIPO_OBJ_INTERV",
        });
        me.txt_codobjintervenido = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "COD_OBJ_INTERV",
        });
        me.items = [
           me.txt_nroOT,
           me.txt_tipo,
           me.txt_designado,
           me.date_fecha,
           me.txt_lugartrabajo,
           me.txt_codMantenimiento,
           me.txt_codDefecto,
           me.txt_codSolucion,
           me.txt_objintervenido,
           me.txt_codobjintervenido,
           me.txt_estado

        ];
    },
    CargarFormOTCierre: function () {
        var me = this;
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "NOMBRE_AFECTADO",
            readOnly: true

        });

        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            name: "FECHA_ASIG",
            renderer: Ext.util.Format.dateRenderer('Y/m/d'),
        });
        me.txt_codigoMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codigoDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",

        });
        me.txt_codigoSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",

        });
        me.items = [
            me.txt_nroOT,
            me.txt_tipo,
            me.date_fecha,
            me.txt_codigoMantenimiento,
            me.txt_codigoDefecto,
            me.txt_codigoSolucion

        ];
    },
    CargarFormOTAsignar: function () {
        var me = this;
        me.txt_id_asigna = Ext.create('App.Config.Componente.TextFieldBase', {
            name: "ASIGNADO_A",
            hidden: true
        });
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables');
        me.store_responsables.setExtraParam("Opcional", "Movil");
        me.store_responsables.proxy.extraParams['Columna'] = 'INSPECCIONA';
        me.store_responsables.proxy.extraParams['Valor'] = 'T';
        me.cbx_nombreReporta = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Asignado a",
            labelWidth: 75,
            width: 250,
            name: "Nombre",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
            margen: 0
        });
        me.cbx_nombreReporta.on('select', function (cmb, record) {
            me.txt_id_asigna.setValue(record[0].get('ID_RESP'));
        });
        //store para obtener los moviles
        me.store_moviles = Ext.create('App.Store.Moviles.Moviles', { autoLoad: true });
        me.cbx_movilReporta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Movil",
            labelWidth: 40,
            width: 200,
            displayField: 'MOVIL',
            valueField: 'ID_MOVIL',
            name: "MOVIL_ASIG",
            maxLength: 50,
            store: me.store_moviles
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            maximo: 'no',
            opcion: 'no',
            fieldLabel: "Fecha Estimada de Ejecucion",
            labelWidth: 170,
            name: "FECHA_PROB_EJE",
            width: 317,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
           
        });
        me.items = [
            me.txt_id_asigna,
            me.cbx_nombreReporta,
            me.cbx_movilReporta,
            me.date_fecha
           
        ];
    },
    CargarFormOTReasignar: function () {
        var me = this;
        me.CargarFormOTAsignar();
        me.txt_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            maxLength: 500,
            height: 50,
            labelWidth: 75,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
            me.txt_id_asigna,
            me.cbx_nombreReporta,
            me.cbx_movilReporta,
            me.txt_Observacion
        ];
        //me.txt_Observacion = 

    },
    EventosBoton: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_AgregarPosteUC") {
            if (me.winPosteUC == null) {
               // alert(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue());
                me.winPosteUC = Ext.create("App.Config.Abstract.Window");
                me.formPosteUC = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'CargarFormUCyPoste' });
                me.formPosteUC.gridUC.on('celldblclick', me.CargarUCaGrid, this);
                me.winPosteUC.add(me.formPosteUC);
                me.formPosteUC.CargarDatosPostePuesto(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue());
                me.winPosteUC.show();
            }
            else {
           
                me.formPosteUC.CargarDatosPostePuesto(me.formCuerpo.cmp_codigoPuesto.txt_id.getValue());
                me.winPosteUC.show();
            }
        }else if (btn.getItemId() == "btn_Quitar") {
            var me = this;
            var data = me.gridReparacion.getSelectionModel().getSelection()[0];
            if (data != null) {
                me.gridReparacion.getStore().remove(data);
                me.gridReparacion.getView().refresh();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
            }
        }
        else {
            alert("No Existe Ese Boton");
        }

    },
    CargarFormCabeceraPlanilla: function () {
        var me = this;
        me.txt_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "OT",
            name: "ID_OT",
            readOnly: true,
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PLA",
            hidden: true
        });

        me.txt_fuente = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fuente",
            name: "COD_FUENTE",
            readOnly: true,
        });
        me.txt_responsable = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Responsable",
            name: "ASIGNADO_A",
            readOnly: true,
        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Movil",
            name: "NOMBRE_MOVIL",
            readOnly: true,
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Inspeccion",
            name: "FECHA_INSP",
        });
        me.txt_ubicacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ubicacion",
            width: 480,
            colspan: 2,
            maxLength: 100,
            name: "LUGAR_TRABAJO",
            readOnly: true,
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            readOnly: true,
        });
        me.txt_estado_pla = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO_PLA",
            hidden: true,
        });
        me.items = [
            me.txt_id,
            me.txt_ot,
            me.txt_fuente,
            me.txt_responsable,
            me.txt_movil,
            me.date_fecha,
            me.txt_ubicacion,
            me.txt_estado,
            me.txt_estado_pla
        ];
    },
    CargarFormPlanillaConsulta: function () {

    },
    CargarFormUCyPoste: function () {
        var me = this;
        //   alert(me.cmp_codigoPuesto.getValue());
        //alert(me.formCuerpo.cmp_codigoPuesto.getValue());
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "Codigos",
            accion: "BuscarCodigoMantenimiento",
            param: "codMan",
            mask: me,
            allowBlank: false,
            grid: me.gridCodigoMantenimiento,
            cmpCombo: true,
            textoTpl: function () { return "{COD_MAN} - {DESCRIP_MAN}" },

        });
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
        me.cmp_codigoSolucion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_SOL',
            textComponente: 'Cod. Solucion',
            nameComponente: 'COD_SOL',
            nameDetalleComponente: 'DESCRIP_SOL',
            controlador: "Codigos",
            accion: "BuscarCodigoSolucion",
            param: "codSolucion",
            mask: me,
            allowBlank: false,
            grid: me.gridCodigoSolucion,
            cmpCombo: true,
            textoTpl: function () { return "{COD_SOL} - {DESCRIP_SOL}" },
        });
        me.txt_centroCosto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Centro Costo",
            name: "DESCRIPCION_CC",
            maxLength: 30,
            colspan: 2,
        });
        // me.gridUC = Ext.create("App.View.Postes.GridUnidadesConstructivas", { opcion: 'GridUnidadesConstructivas' });
        me.gridUC = Ext.create("App.View.Postes.GridPostes", { opcion: 'PostesPuesto' });
        me.items = [
           me.cmp_codigoMantenimiento,
           me.cmp_codigoSolucion,
           me.txt_centroCosto,
           me.gridUC
        ];
    },
    CargarFormOTInforme: function () {
        var me = this;
        me.txt_id_inf = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_INFINSP",
            hidden: true
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true
        });
        me.date_fechaInspeccion = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Inspeccion",
            name: "FECHA_INSP",
            colspan:2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.txt_horaInicio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Inicio",
            name: "HORA_INI",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_horaFin = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Fin",
            name: "HORA_FIN",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_Informe = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Informe",
            name: "INFORME",
            colspan: 2,
            maxLength: 1000,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
           
        });
        me.txta_Recomendacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Recomendacion/<br>Instruccion",
            name: "RECOMEN",
            colspan: 2,
            maxLength: 1000,
           // disabled:true
        });
        me.items = [
            me.txt_id_inf,
            me.txt_id ,
            me.date_fechaInspeccion,
            me.txt_horaInicio,
            me.txt_horaFin,
            me.txta_Informe,
            me.txta_Recomendacion
        ];

    },
    CargarUCaGrid: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (me.formPosteUC.getForm().isValid()) {
            if (this.gridReparacion.getStore().existeRecord('ID_POSTE', record.get('ID_POSTE')) == false && this.gridReparacion.getStore().data.items.length < 5) {
                var rec = new App.Model.OrdenesTrabajo.DetallesReemplazo({

                    //**************************************************************************************
                    ID_OT: record.get('ID_OT'),
                    ID_POSTE: record.get('ID_POSTE'),
                    ID_COD_MAN: me.formPosteUC.getForm().findField('ID_COD_MAN').getValue(),
                    ID_COD_SOL: me.formPosteUC.getForm().findField('ID_COD_SOL').getValue(),
                    INSTRUC_SOL: me.formPosteUC.getForm().findField('COD_SOL').getValue(),
                    IDCENTRO_COSTO: 1,//me.formPosteUC.getForm().findField('IDCENTRO_COSTO').getValue(),
                    COD_POSTE: record.get('COD_POSTE'),
                    COD_MAN: me.formPosteUC.getForm().findField('COD_MAN').getValue(),
                    COD_SOL: me.formPosteUC.getForm().findField('COD_SOL').getValue(),
                    DESCRIPCION_CC: me.formPosteUC.getForm().findField('DESCRIPCION_CC').getValue(),
                    //**************************************************************************************
                });
                this.gridReparacion.getStore().insert(0, rec);
                this.gridReparacion.getView().refresh();

            }
            else {
                Ext.MessageBox.alert('Error', "Solo puede Adicionar 5 Unidades Constructivas y No puede Adicionar UC Repetidos..." + this.gridReparacion.getStore().data.items.length);
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Codigo de Mantenimiento...");
        }
    },
    //Formulario de Consulta para OT y SM se utiliza en presupuesto
    CargarFormConsultaOTSM: function () {
        var me = this;
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Quien Reporta",
            name: "REPORTA_NOMBRE",
            maxLength: 230,
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion",
            name: "UBICACION",
            width: 730,
            maxLength: 1000,
            colspan: 3
        });

        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA_PROBL",
        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            readOnly: true

        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado OT",
            name: "ESTADO",
        });
        me.txt_codigoMantenimiento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Mantenimiento",
            name: "COD_MAN",
        });
        me.txt_codigoDefecto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Defecto",
            name: "COD_DEF",

        });
        me.txt_codigoSolucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cod. Solucion",
            name: "COD_SOL",

        });
        me.items = [
            me.txt_nroSolicitud,
            me.txt_nombre,
            me.dat_fecha,
            me.txt_direccion,
            me.txt_nroOT,
            me.txt_tipo,
            me.txt_estado,
            me.txt_codigoMantenimiento,
            me.txt_codigoDefecto,
            me.txt_codigoSolucion
        ];
    },
    //formualrio de postes
    CargarDatosPostePuesto: function (id_puesto) {
        var me = this;
        //alert(id_puesto);
       // alert(id_puesto);
        me.gridUC.getStore().setExtraParams({ ID_PUESTO: id_puesto });//COD_PUESTO,ID_POSTE,COD_POSTE
        me.gridUC.getStore().load();
    }
});
