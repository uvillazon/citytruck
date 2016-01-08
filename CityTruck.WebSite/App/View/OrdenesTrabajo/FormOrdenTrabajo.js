Ext.define("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            //me.CargarStore();
            me.CargarComponentes();
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentesConsulta: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCuerpoOTConsulta' });
        me.gridTipo1 = Ext.create('App.View.OrdenesTrabajo.Grids', { opcion: 'GridOTTipo1', height : 300 });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.formCuerpo, me.gridTipo1]
        });
        me.items = [
        me.formCabecera,
        me.tabPanel
        ];
      
    },
    CargarComponentes: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCuerpoOT' });
       
        me.formOTtipo1 = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTTipo1', formCuerpo: me.formCuerpo });
        me.formOTtipo1.setDisabled(true);
        me.formCuerpo.cbx_tipo.on('select', function (cmb) {
            if (cmb.getValue() == 'PROYECTO') {
                me.crearOtProyecto();
            }
            else if (cmb.getValue() == 'REPARACION_REEMPLAZO') {
                me.formCuerpo.grpb_grupoBoton.getValue().rb == 'POSTE' ? me.formOTtipo1.setDisabled(true) : me.formOTtipo1.setDisabled(false);
            }
            else if (cmb.getValue() == 'INSPECCION') {
                me.formCuerpo.grpb_grupoBoton.getValue().rb == 'TRAMO' ? me.formOTtipo1.setDisabled(true) : me.formOTtipo1.setDisabled(false);
            }
            else {
                me.formOTtipo1.setDisabled(true);
            }
        });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.formCuerpo , me.formOTtipo1]
        });
        me.formCuerpo.grpb_grupoBoton.on('change', me.ActivarTabPuesto, this);
        me.items = [
        me.formCabecera,
        me.tabPanel
        ];


    },
    ActivarTabPuesto: function (grp, newValue, oldValue, eOpts) {
        var me = this;
        me.formOTtipo1.gridReparacion.getStore().removeAll();
        if (me.formCuerpo.cbx_tipo.getValue() == 'REPARACION_REEMPLAZO') {
            newValue.rb == 'POSTE' ? me.formOTtipo1.setDisabled(true) : me.formOTtipo1.setDisabled(false);
        } 

        if (newValue.rb == 'POSTE') {
            me.formOTtipo1.setDisabled(true);
        }
        if (newValue.rb == 'TRAMO') {
            me.formOTtipo1.setDisabled(false);
            var winFileUpload = Ext.create('App.View.OrdenesTrabajo.WindowFileUpload', {
                    buttons: [{
                        text: 'Importar',
                        handler: function () {
                            var w = this.up('window');
                            var form = w.down('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    url: Constantes.HOST + 'OrdenesTrabajo/GenerarOTPorTramos',
                                    waitMsg: 'Importando el archivo seleccionado...',
                                    success: function (fp, o) {
                                        if (o.result.total > 0) {

                                            var cabecera = me.formCabecera.getValues();
                                            var solicitud = me.formCuerpo.getValues();
                                            var grid = Ext.ComponentQuery.query('#gridPostesIntervenidos')[0] /* captura el grid del tab reparacion y remplazo*/;
                                            grid.store.removeAll();
                                            for (var i = 0; i < o.result.total; i++) {
                                                poste = Ext.create('App.Model.OrdenesTrabajo.DetallesReemplazo', {
                                                    ID_OT: o.result.data[i].ID_OT,
                                                    ID_COD_MAN: solicitud.ID_COD_MAN,
                                                    INSTRUC_SOL: solicitud.INSTRUCCIONES,
                                                    ID_COD_SOL: solicitud.ID_COD_SOL,
                                                    ID_POSTE: o.result.data[i].ID_POSTE,
                                                    PIQUETE: o.result.data[i].PIQUETE,
                                                    IDCENTRO_COSTO: '',
                                                    DESC_CORTA: '',
                                                    COD_MAN: solicitud.COD_MAN,
                                                    COD_SOL: solicitud.COD_SOL,
                                                    COD_POSTE: o.result.data[i].COD_POSTE,
                                                    DESCRIPCION_CC: ''
                                                });
                                                grid.store.add(poste);
                                                w.close();
                                            }

                                        } else {
                                            Ext.Msg.show({
                                                title: 'Advertencia',
                                                msg: 'El archivo importado no tiene datos validos. </br> Intente seleccionando otro archivo valido.',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.WARNING
                                            });
                                        }
                                    },
                                    failure: function (fp, o) {
                                        Ext.Msg.show({
                                            title: 'Advertencia',
                                            msg: o.result.msg,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.WARNING
                                        });
                                    }
                                });
                            }
                        }
                    }, {
                        text: 'Limpiar',
                        handler: function () {
                            var w = this.up('window');
                            var form = w.down('form').getForm();
                            form.reset();
                        },
                    }]
                });
                winFileUpload.show();
        }/* else {
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Seleccione primero: TIPO OT',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
            grp.reset();
        }*/
    },
    CargarDatosSolicitud: function (record) {
        var me = this;
        me.getForm().reset();
        //alert(record.get('DESCRIP_DEF'));
        me.formCabecera.CargarDatos(record);
        me.formCuerpo.loadRecord(record);
        me.formCuerpo.txt_lugartrabajo.setValue(record.get('UBICACION'));
        me.formCuerpo.store_ot.setExtraParam('TIPO_OT', 'INSPECCION');
        me.formCuerpo.store_ot.setExtraParam('ID_SOL_MAN', record.get('ID_SOL_MAN'));
        me.formCuerpo.store_ot.load();

    },
    CargarDatosEditar: function (OT,SM) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.CargarDatos(SM);
        me.formCuerpo.loadRecord(OT);
        //me.formCuerpo.grpb_grupoBoton.
        me.formCuerpo.CargarObjetosEdicion(OT);
    },
    CargarDatos: function (record) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.loadFormulario("SolicitudesMantenimiento", "BuscarSolicitudMantenimiento", {ID_SOL_MAN : record.get('ID_SOL_MAN')});
        me.formCuerpo.CargarDatos(record);
        me.record = record;
    },

    crearOtProyecto: function () {
        var me = this;
        Ext.Msg.confirm('Confirmar', 'Esta Solicitud ya tiene OTs de Inspeccion asociadas. ¿Desea crear una OT</br>de tipo PROYECTO, a partir de alguna de estas OTs de Inspeccion?', function (button) {
            if (button == 'yes') {
                var store = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajo');
                store.load({ params: { ID_SOL_MAN: me.formCabecera.record.get('ID_SOL_MAN'), TIPO_OT: 'INSPECCION' } });
                var panel = Ext.create('Ext.panel.Panel', {
                    frame: true,
                    autoScroll: true,
                    items: Ext.create('App.view.OrdenesTrabajo.ViewOrdenesTrabajo', { store: store }),
                });
                var win = Ext.widget('window', {
                    title: 'Ordenes de Trabajo Tipo Inspeccion',
                    closeAction: 'hide',
                    width: 750,
                    height: 320,
                    layout: 'fit',
                    resizable: true,
                    modal: true,
                    items: panel
                });
                win.show();
            }
        });
    }
});
