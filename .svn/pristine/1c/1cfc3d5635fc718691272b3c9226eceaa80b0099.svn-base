Ext.define("App.View.SolicitudesMantenimiento.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormConfirmacion") {
            me.title = "Confirmacion de Solicitud";
            me.columns = 2;
            me.CargarFormConfirmacion();
            me.addListeners();

        }
        else if (me.opcion == "FormAprobacion") {
            me.title = "Formulario de Aprobacion";
            me.columns = 1;

            me.CargarFormAprobacion();
        }
        else if (me.opcion == "FormRechazo") {
            me.title = "Motivo por el cual se Rechaza la Solicitud";
            me.columns = 1;

            me.CargarForRechazo();
        }
        else if (me.opcion == "FormReiteracionContinuacion") {
            //me.title = "Motivo por el cual se Rechaza la Solicitud";
            me.columns = 1;

            me.CargarForReiteracion();
        }
            //
        else {
            alert("Seleccione alguna Opciones");
        }
        //if (me.cargarStores) {
        //    me.CargarStore();
        //    me.CargarComponentes();
        //}
        //else {
        //    me.CargarComponentes();
        //}
        this.callParent(arguments);
    },
    CargarFormConfirmacion: function () {
        var me = this;
        me.num_nus = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "NUS",
            name: "NUS",
            maxLength: 10,
            maxValue: 9999999999,
            colspan: 2,
            allowNegative: false,
            allowDecimals: false
        });
        me.txt_ubicacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "UBICACION",
            fieldLabel: 'Direccion Aproximado',
            maxLength: 100,
            width: 480,
            colspan: 2,
        });
       
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            maxLength: 20
        });
        me.store_subestaciones = Ext.create("App.Store.Puestos.Subestaciones");
        me.cbx_subestacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Subestacion",
            name: "NOM_SUBEST",
            displayField: 'NOM_SUBEST',
            maxLength: 50,
            store: me.store_subestaciones,
        });
        me.CargarPoste();
        me.items = [
                    //me.txt_id_derivacion,
                    //me.txt_id_puesto,
                    me.num_nus,
                    me.cmp_codigoPoste,
                    me.cmp_codigoPuesto,
                    me.cmp_codigoDerivacion,
                    me.cmp_codigoDerivacionFinal,
                    me.txt_ubicacion,
                    //me.txt_derivacion,
                    me.txt_alimentador,
         //    me.cbx_subestacion

        ];
    },
    CargarEventosFormConfirmacion: function () {
        var me = this;
        me.cbx_poste.on('select', function (cmb, record) {
            me.txt_poste.setValue(record[0].get('COD_POSTE'));
        });
        me.cbx_puesto.on('select', function (cmb, record) {
            me.recordPuesto = record;
            if (record[0].get('ELEMENTO') == 'ELEMENTO') {
                me.txt_id_derivacion.setValue(record[0].get('ID'));
                me.txt_id_puesto.setValue('');
                me.txt_derivacion.setValue(record[0].get('CODIGO'));
                me.txt_puesto.setValue('');
            }
            else {
                me.txt_id_derivacion.setValue('');
                me.txt_id_puesto.setValue(record[0].get('ID'));
                me.txt_derivacion.setValue('');
                me.txt_puesto.setValue(record[0].get('CODIGO'));
            }
            me.txt_alimentador.setValue(record[0].get('ALIMENTADOR'));
            me.txt_ubicacion.setValue(record[0].get('UBICACION'));
        });
    },

    CargarFormAprobacion: function () {
        var me = this;

        me.CargarGrids();
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "Codigos",
            accion: "BuscarCodigoMantenimiento",
            param: "codMan",
            allowBlank: false,
            cmpCombo: true,
            textoTpl: function () { return "{COD_MAN} - {DESCRIP_MAN}" },
            mask: me,
            grid: me.gridCodigoMantenimiento,

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
            mask: me,
            cmpCombo: true,
            textoTpl: function () { return "{COD_DEF} - {DESCRIP_DEF}" },
            grid: me.gridCodigoDefecto,
            allowBlank: false,

        });
      
        me.items = [me.cmp_codigoMantenimiento, me.cmp_codigoDefecto]
    },
    CargarGrids: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
    },
    CargarForRechazo: function () {
        var me = this;
        me.txt_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            maxLength: 500,
            height: 120
        });
        me.items = [
            me.txt_Observacion
        ];
    },
    CargarForReiteracion: function () {
        var me = this;

        me.txt_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            maxLength: 500,
            height: 120
        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 2,
            width: 480,
            vertical: false,
            allowBlank: false,
            items: [
                { boxLabel: 'Reiterar', name: 'duplicado', inputValue: "S" },
                { boxLabel: 'Continuar', name: 'duplicado', inputValue: "N" },

            ]
        });
        me.items = [
            {
                xtype: 'label',
                text: me.msg,
                cls: 'resaltarRojo',
            },
            me.grpb_grupoBoton,
            me.txt_Observacion
        ];
    },
    /*para obtener los postes nus puestos derivacion**/
    CargarPoste: function () {
        var me = this;
        me.gridPostes = Ext.create('App.View.Postes.GridPostes');
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
            cmpArray: [me.txt_alimentador, me.txt_ubicacion]

        });

        //me.gridDerivacion = Ext.create('App.View.Puestos.GridPuestos', { opcion: 'Derivaciones' });
        //me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
        //    nameIdComponente: 'ID_ELEMENTO',
        //    textComponente: 'Derivacion',
        //    nameComponente: 'COD_ELEMENTO1',
        //    nameDetalleComponente: 'COD_ELEMENTO',
        //    btnId: 'btn_CodigoDerivacion',
        //    controlador: "ElementosRed",
        //    accion: "BuscarDerivacion",
        //    hiddenCmp: true,
        //    param: "CODIGO",
        //    mask: me,
        //    grid: me.gridDerivacion,
        //    cmpArray: [me.txt_alimentador, me.txt_ubicacion]

        //});
        me.gridDerivacion1 = Ext.create('App.View.Puestos.GridPuestos', { opcion: 'Derivaciones' });
        me.gridDerivacion2 = Ext.create('App.View.Puestos.GridPuestos', { opcion: 'Derivaciones' });
        me.cmp_codigoDerivacion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_1',
            textComponente: 'Derivacion Inicial',
            nameComponente: 'COD_ELEMENTO_11',
            nameDetalleComponente: 'COD_ELEMENTO_1',
            btnId: 'btn_CodigoDerivacion',
            controlador: "ElementosRed",
            accion: "BuscarDerivacion",
            hiddenCmp: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,
            grid: me.gridDerivacion1,
            cmpArray: [me.txt_alimentador, me.txt_ubicacion]

        });
        me.cmp_codigoDerivacionFinal = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_ELEMENTO_2',
            textComponente: 'Derivacion final',
            nameComponente: 'COD_ELEMENTO_21',
            nameDetalleComponente: 'COD_ELEMENTO_2',
            btnId: 'btn_CodigoDerivacionFinal',
            controlador: "ElementosRed",
            accion: "BuscarDerivacion",
            hiddenCmp: true,
            param: "CODIGO",
            mask: me,
            colspan: 1,
            widthdetalle: 130,
            grid: me.gridDerivacion2,
            //cmpArray: [me.txt_alimentador, me.txt_ubicacion, me.cbx_areaUbicacion]

        });
        me.gridPuestos = Ext.create('App.View.Puestos.GridPuestos');
        me.cmp_codigoPuesto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_PUESTO',
            textComponente: 'Cod. Puesto',
            nameComponente: 'COD_PUESTO1',
            nameDetalleComponente: 'COD_PUESTO',
            btnId: 'btn_CodigoPuesto',
            controlador: "ElementosRed",
            accion: "BuscarPuesto",
            param: "COD_PUESTO",
            hiddenCmp: true,
            mask: me,
            grid: me.gridPuestos,
            cmpArray: [me.txt_alimentador, me.txt_ubicacion, me.cmp_codigoDerivacion.txt_detalleComponente]

        });
    },
    addListeners: function () {
        var me = this;
        //me.grpb_grupoBoton.on('change', me.CargarRadioButton, this);
        me.num_nus.on('specialkey', function (f, e) {
            if (e.getKey() == e.ENTER) {
                //var cmpArray = me.cmp_codigoPoste.getArray([me.txt_ubicacion, me.cbx_areaUbicacion]);
                Funciones.AjaxRequestComponente("Postes", "BuscarPostePorNus", me, me, { NUS: f.value }, null);
            }
        });
        me.cmp_codigoPoste.txt_detalleComponente.on('change', function (cmp, newValue, oldValue, eOpts) {
            //if (me.grpb_grupoBoton.getValue().rb == "POSTE" && newValue != '') {
            //alert(newValue);
            if (oldValue != null) {
                Funciones.AjaxRequestComponente("Postes", "BuscarPuestoPorPoste", me, me, { COD_POSTE: newValue }, null);
            }
        });

    },

});
