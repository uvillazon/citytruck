Ext.define("App.View.OrdenesOperacion.FormOrdenOperacion", {
    extend: "App.Config.Abstract.Form",
    title: "Datos Orden de Operación",
    cargarStores: true,
    columns: 4,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            me.CargarStore();
            me.CargarComponentes();
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentesConsulta: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesOperacion.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesOperacion.Forms', { opcion: 'FormCuerpoOTConsulta' });
        me.gridTipo1 = Ext.create('App.View.OrdenesOperacion.Grids', { opcion: 'GridOTTipo1', height: 300 });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.formCuerpo, me.gridTipo1]
        });
        me.items = [
        me.formCabecera,
        me.tabPanel
        ];

    },
    CargarStore: function () {
        var me = this;

        //store para obtener los responsables
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        me.store_responsables.setExtraParam('REPORTA', 'T');
        //store de operacion
        me.store_operacion = Ext.create('App.Store.Listas.StoreLista');
        me.store_operacion.setExtraParam('ID_LISTA', Lista.Buscar("OPERACION_OO"));
        //store tipo faena
        me.store_tipoFaena = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipoFaena.setExtraParam('ID_LISTA', Lista.Buscar("TIPO_FAENA"));
        //store instalacion a intervenir
        me.store_instalIntv = Ext.create('App.Store.Listas.StoreLista');
        me.store_instalIntv.setExtraParam('ID_LISTA', Lista.Buscar("INSTAL_INTERV"));
        //store de los medios de comunicacion
        me.store_medioCom = Ext.create('App.Store.Listas.StoreLista');
        me.store_medioCom.setExtraParam('ID_LISTA', Lista.Buscar("MEDIOS_COMUNICACION"));
        //store de subestaciones
        me.store_subestaciones = Ext.create('App.Store.Puestos.Subestaciones', { pageSize: 3000 }).load();


    },
    CargarComponentes: function () {
        var me = this;

        me.txt_id_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            //   disabled:true,
            hidden: true,
        });

        me.txt_id_derivacion = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_DERIVACION",
            hidden: true

        });

        me.txt_id_puesto = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PUESTO",
            hidden: true

        });
        me.txt_id_oo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_OO',
            hidden: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            value: 'NUEVA',
            //   disabled:true,
            hidden: true,
        });
        me.txt_nro_oo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'NRO_OO',
            hidden: true
        });
        /* me.txt_id_equipo = Ext.create("App.Config.Componente.TextFieldBase", {
             name: 'N_ID_EQUIPO',
             hidden: true
         });*/
        me.txt_id_linea = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_LINEA",
            hidden: true

        });
        me.txt_nom_sub = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "NOM_SUBEST",
            //   disabled:true,
            hidden: true,
        });
        me.cbx_operacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Operación",
            name: "OPERACION",
            maxLength: 12,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_operacion
        });

        me.cbx_tipoFaena = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo de Faena",
            name: "TIPO_FAENA",
            maxLength: 250,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_tipoFaena,
        });

        me.cbx_tipoFaena.on('select', function (cmb, record, index) {
            if (cmb.getValue() == 'OTRO') {
                me.txt_otro.setDisabled(false);
            }
            else {
                me.txt_otro.setDisabled(true);
            }
        });
        me.txt_otro = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "TIPO_FAENA",
            maxLength: 250,
            disabled: true
        });
        me.cbx_solicitadoPor = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Solicitado Por",
            name: "SOLICITADO_POR",
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.txta_trabajoArealizar = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Trabajos a Realizar",
            name: "TRABAJO_REALIZAR",
            colspan: 4,
            width: 980,
            maxLength: 1000,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_instalacionInterv = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Instalacion Intervenir",
            name: "INSTAL_INTERV",
            maxLength: 8,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_instalIntv
        });

        me.cbx_subestacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Subestación",
            displayField: 'NOM_SUBEST',
            valueField: 'ID_SUBEST',
            name: "ID_SUBEST",
            //width: 240,
            maxLength: 50,
            store: me.store_subestaciones,
            selectOnFocus: true,

        });
        me.cbx_subestacion.on('select', function (cmb, record, index) {
            //alert(record[0].get('NOM_SUBEST'));
            // me.txt_nom_sub.reset();
            me.txt_nom_sub.setValue(record[0].get('NOM_SUBEST'));
        });
        me.cbx_subestacion.on('focus', function () {
            me.store_subestaciones.load();
        });
        me.txt_arranque = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Derivacion",
            name: "COD_DERIVACION",
            maxLength: 50,
        });
        me.txt_lsubtransmision = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Linea Subtransmision",
            name: "COD_LINEA",
            maxLength: 50,
        });
        me.txt_SEdistribucion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Puesto",
            name: "COD_PUESTO",
            maxLength: 50,
        });
        me.txt_id_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_ALIMENTADOR',
            hidden: true
        });
        me.txt_alimentador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Alimentador",
            name: "COD_ALIMENTADOR",
            maxLength: 50,
             colspan: 2
        });
        //*********************************
        me.txt_tipoEquipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo(s) Equipo(s)",
            name: "TIPO_EQUIPO",
            maxLength: 50,
           
        });

        //los CODIGOS de equipos
        me.txt_equipo1 = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Equipo1",
            name: "EQUIPO_1",
            maxLength: 50,

        });
        me.txt_equipo2 = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Equipo2",
            name: "EQUIPO_2",
            maxLength: 50,

        });
        me.txt_equipo3 = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Equipo3",
            name: "EQUIPO_3",
            maxLength: 50,
          //  colspan: 2
        });
        //**********************************

        me.txta_otrasInstalCompro = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Otras Instalaciones Comprometidas",
            name: "OTRAS_INSTAL",
            colspan: 4,
            maxLength: 250,
            width: 980,
            /* afterLabelTextTpl: Constantes.REQUERIDO,
             allowBlank: false,*/
        });
        me.date_fechaDesde = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: 'nada',
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_horaDesde = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Desde",
            name: "HORA_INI",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.date_fechaHasta = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: 'nada',
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_horaHasta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora Hasta",
            name: "HORA_FIN",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_condOperacionalReq = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Condiciones Operacionales Requeridas",
            name: "COND_OPER_REQ",
            colspan: 4,
            width: 980,
            maxLength: 1000,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_jefeFaena = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Jefe de Faena",
            name: "ID_JEFE_FAENA",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'ID_RESP',
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.cbx_inspectorFaena = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Inspector Faena",
            name: "ID_INSP_FAENA",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'ID_RESP',
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.cbx_reemplazoJFaena = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Reemplazo Jefe de Faena",
            name: "ID_BKUP_JEFE_FAENA",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'ID_RESP',
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.cbx_respManiobraAutorizado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Responsable de Maniobra Autorizado",
            name: "ID_RESP_MANIOBRA",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'ID_RESP',
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
        });
        me.cbx_medioComunicacion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Medio(s) Comunicacion(es)",
            name: "MEDIO_COMUNIC",
            maxLength: 8,
            store: me.store_medioCom
        });

        me.items = [
                    me.txt_id_ot,
                    me.txt_id_oo,
                    me.txt_nro_oo,
                    me.txt_id_derivacion,
                    me.txt_id_puesto,
                    me.cbx_operacion,
                    me.cbx_tipoFaena,
                    me.txt_otro,
                    me.cbx_solicitadoPor,
                    me.txta_trabajoArealizar,
                    me.cbx_instalacionInterv,
                    me.cbx_medioComunicacion,
                    me.cbx_subestacion,
                    me.txt_nom_sub,
                    me.txt_arranque,
                    me.txt_id_linea,
                    me.txt_lsubtransmision,
                    me.txt_SEdistribucion,
                    me.txt_id_alimentador,
                    me.txt_alimentador,
                    me.txt_equipo1,
                    me.txt_equipo2,
                    me.txt_equipo3,
                    me.txt_tipoEquipo,
                    me.txta_otrasInstalCompro,
                    me.date_fechaDesde,
                    me.txt_horaDesde,
                    me.date_fechaHasta,
                    me.txt_horaHasta,
                    me.txta_condOperacionalReq,
                    me.cbx_jefeFaena,
                    me.cbx_inspectorFaena,
                    me.cbx_reemplazoJFaena,
                    me.cbx_respManiobraAutorizado,
                    me.txt_estado
        ];
    },
    CargarDatos: function (record) {
        var me = this;
        me.getForm().reset();
        me.getForm().loadRecord(record);
    },
   
    CargarDatosOT: function (record) {
        var me = this;
      //  me.CargarDatos(formulario);
        me.txt_id_ot.setValue(record.get('ID_OT'));
        me.cbx_subestacion.setValue(record.get('ID_SUBEST'));
        me.txt_nom_sub.setValue(record.get('NOM_SUBEST'));
        me.txt_id_alimentador.setValue(record.get('ID_ALIMENTADOR'));
        me.txt_alimentador.setValue(record.get('COD_ALIMENTADOR'));

        if (record.get('TIPO_OBJ_INTERV') == 'DERIVACION') {
            me.txt_id_derivacion.setValue(record.get('ID_OBJ_INTERV'));
            me.txt_arranque.setValue(record.get('COD_OBJ_INTERV'));
            //Recuperando equipos de la derivacion = elemento de red
            Ext.Ajax.request({
                url: Constantes.HOST + '' + "OrdenesOperacion" + '/' + "ObtenerEquiposElemento" + '',
                params: { COD_ELEMENTO: record.get('COD_OBJ_INTERV') },
                success: function (response) {//se debe limpiar lo del equipo
                    var cont = 0;
                    var str = Ext.JSON.decode(response.responseText);
                    if (str.success == true) {
                        Ext.each(str.data, function (rec) {
                            cont = cont + 1;
                            me.txt_tipoEquipo.setValue(rec.TIPO_EQUIPO);
                            //  alert(rec.ID_EQUIPO);
                           //  alert(rec.COD_EQUIPO);
                            if (cont == 1) {
                                me.txt_equipo1.setValue(rec.COD_EQUIPO);
                            } else if (cont == 2) {
                                me.txt_equipo2.setValue(rec.COD_EQUIPO);
                            } else if (cont == 3) {
                                me.txt_equipo3.setValue(rec.COD_EQUIPO);
                            }
                            //alert(cont);
                        });

                    }
                    /*  else {
                          Ext.Msg.alert("Error", "asd");
                      }*/


                },
            });

        } else if (record.get('TIPO_OBJ_INTERV') == 'PUESTO') {
            me.txt_id_puesto.setValue(record.get('ID_OBJ_INTERV'));
            me.txt_SEdistribucion.setValue(record.get('COD_OBJ_INTERV'));
        }

    }
});
