Ext.define("App.View.OrdenesOperacion.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'OrdenesOperacion',
    // accionGrabar: 'Seleccionar',
    accionGrabarAsignar: 'GuardarAsignarOrdenesTrabajo',
    accionGrabarEjecucion: 'GuardarEjecucionOrdenesTrabajo',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        var contador = 0;

        me.grid = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            region: 'west',
            width: '45%',
            imagenPlanilla: false,
            borrarParametros: true,
            storeResponsable: true,
            paramsStore: { ESTADO: 'ASIGNADA', TIPO_OT: 'REPARACION_REEMPLAZO' },
        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_ReporteOO', "Generar Reporte OO", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteOOAst', "Generar Asistencia", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteOOFaena', "Generar Faenas", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteOOActFaena', "Generar Faena/Actividad", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteCharla', "Generar Charla", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel");
        me.gridOO = Ext.create("App.View.OrdenesOperacion.GridOrdenOperacion", {
            criterios: true,
            busqueda: true,
            cargarStore: false,
            width: 855,
            height: 300,
        });

        me.gridSecuencias = Ext.create('App.View.OrdenesOperacion.Grids', {
            width: 855,
            height: 200,
            opcion: 'secuencia',
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarSec', "Crear Secuencia", Constantes.ICONO_CREAR, me.EventosBotonSec, me.toolbar, this);
      //  Funciones.CrearMenu('btn_QuitarSec', "Eliminar Secuencia", "delete", me.EventosBotonSec, me.toolbar, this);
        me.gridSecuencias.addDocked(me.toolbar, 1);

        me.formulario = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'CargarFormOT',
            cargarStores: false
        });
        me.formulario.BloquearFormulario();

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearOO', "Crear OO", Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_ReutilizaOO', "Reutilizar OO", Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
      //  Funciones.CrearMenu('btn_EditarOO', "Editar OO", Constantes.ICONO_EDITAR, me.EventosBoton, me.toolbar, this);
     //   Funciones.CrearMenu('btn_QuitarOO', "Eliminar OO", "delete", me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_Asistencia', "Asistencias", Constantes.ICONO_VER, me.EventosBoton, me.toolbar, this);
        me.gridOO.addDocked(me.toolbar, 1);

        me.form.add(me.formulario);
        me.form.add(me.gridOO);
        me.form.add(me.gridSecuencias);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);
        me.gridOO.on('cellclick', me.CargarDatosSec, this);

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.gridSecuencias.getStore().removeAll();
        me.formulario.CargarDatos(record);
        me.gridOO.getStore().setExtraParam("ID_OT", record.get('ID_OT'));
        me.gridOO.getStore().load();
        me.gridOO.data = record;
    },
    CargarDatosSec: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.gridSecuencias.getStore().setExtraParam("ID_OO", record.get('ID_OO'));
        me.gridSecuencias.getStore().load();
        me.gridSecuencias.data = record;
    },
    EventosBoton: function (btn, e) {
        var me = this;

        if (btn.getItemId() == "btn_CrearOO") {
            // alert(me.grid.count);
            var datosOO = me.grid.getSelectionModel().getSelection()[0];
            if (me.winCrearOO == null) {
               
                if (datosOO != null && datosOO.get('ESTADO') == 'ASIGNADA') {
                    me.winCrearOO = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Crear OO'
                    });
                    me.formCrearOO = Ext.create("App.View.OrdenesOperacion.FormOrdenOperacion", {
                        title: "Creación Orden de Operación",
                        botones: false,
                    });
                    me.formCrearOO.CargarDatosOT(datosOO);
                    me.winCrearOO.add(me.formCrearOO);

                    me.winCrearOO.btn_guardar.on('click', me.GuardarOO, this);
                    me.winCrearOO.show();
                }//si seleccionado OT 
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una OT en estado ASIGNADA.");
                }
            }
            else {
                me.formCrearOO.LimpiarFormulario();
                me.formCrearOO.CargarDatosOT(datosOO);
                me.winCrearOO.show();
            }
        } else if (btn.getItemId() == 'btn_ReutilizaOO') {
            var datosOO = me.gridOO.getSelectionModel().getSelection()[0];
            if (me.winCrearOO == null) {
                 //alert(datosOO.get('ESTADO'));
                if (datosOO != null && datosOO.get('ESTADO') == 'NUEVA') {
                    me.winCrearOO = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Crear OO'
                    });
                    me.formCrearOO = Ext.create("App.View.OrdenesOperacion.FormOrdenOperacion", {
                        title: "Creación Orden de Operación",
                        botones: false,
                    });
                    me.formCrearOO.CargarDatos(datosOO);//datosOT, 
                    me.formCrearOO.txt_id_oo.setValue('');
                    me.formCrearOO.txt_nro_oo.setValue('');
                    me.winCrearOO.add(me.formCrearOO);

                    me.winCrearOO.btn_guardar.on('click', me.GuardarOO, this);
                    me.winCrearOO.show();
                }//si seleccionado OT 
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una OO en estado NUEVA.");
                }
            }
            else {
                me.formCrearOO.CargarDatos(datosOO);//datosOT, 
                me.formCrearOO.txt_id_oo.setValue('');
                me.formCrearOO.txt_nro_oo.setValue('');
                me.winCrearOO.show();
            }
        }
        else if (btn.getItemId() == 'btn_EditarOO') {
            var datosOO = me.gridOO.getSelectionModel().getSelection()[0];
            if (me.winCrearOO == null) {
                //alert(datosOO.get('ESTADO'));
                if (datosOO != null && datosOO.get('ESTADO') == 'NUEVA') {
                    me.winCrearOO = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Crear OO'
                    });
                    me.formCrearOO = Ext.create("App.View.OrdenesOperacion.FormOrdenOperacion", {
                        title: "Creación Orden de Operación",
                        botones: false,
                    });
                    me.formCrearOO.CargarDatos(datosOO);
                    me.winCrearOO.add(me.formCrearOO);
                    me.winCrearOO.btn_guardar.on('click', me.GuardarOO, this);
                    me.winCrearOO.show();
                }//si seleccionado OT 
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una OO en estado NUEVA.");
                }
            }
            else {
                me.formCrearOO.CargarDatos(datosOO);
                me.winCrearOO.show();
            }

        } else if (btn.getItemId() == 'btn_QuitarOO') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
                if (me.gridSecuencias.getStore().getCount() == 0) {//preguntamos si no tiene secuencias registradas o relacionadas
                    me.gridOO.getStore().remove(data);
                    me.gridOO.getView().refresh();
                } else {
                    Ext.MessageBox.alert('Error', 'No puede borrar una OO que tenga Secuencias registradas.');
                }
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
            }
        } else if (btn.getItemId() == 'btn_ReporteOO') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
               // alert(data.get('ID_OO'));
                window.open(Constantes.HOST + 'Reportes/ReporteOrdenOperacion?ID_OO=' + data.get('ID_OO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro para Generar Reporte OO.');
            }
        } else if (btn.getItemId() == 'btn_Asistencia') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
             

                    if (me.winResponsables == null) {
                        me.winResponsables = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Generar' });
                        me.gridResponsables = Ext.create("App.View.Responsables.GridResponsables", {
                            width: 855,
                            height: 600,
                            check: true
                        });
                        me.winResponsables.datos = data;
                        me.winResponsables.add(me.gridResponsables);
                        me.winResponsables.btn_guardar.on('click', me.GrabarAsistencia, this);
                        me.winResponsables.show();
                    }
                    else {
                    
                        me.winResponsables.datos = data;
                        me.gridResponsables.getStore().load();
                        me.winResponsables.show();
                    }
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione una OO para registrar Asistencia.');
            }
        }
        else if (btn.getItemId() == 'btn_ReporteOOAst') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
                //alert(data.get('ID_OO'));
                window.open(Constantes.HOST + 'Reportes/ReporteOOAsistencia?ID_OO=' + data.get('ID_OO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione un registro OO para Generar Formulario de Asistencia.');
            }
        }
        else if (btn.getItemId() == 'btn_ReporteOOFaena') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteOOFaena?ID_OO=' + data.get('ID_OO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione un registro OO para Generar Formulario de Faena.');
            }
        }
        else if (btn.getItemId() == 'btn_ReporteOOActFaena') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteOOControl?ID_OO=' + data.get('ID_OO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione un registro OO para Generar Formulario de Faena.');
            }
        }
        else if (btn.getItemId() == 'btn_ReporteCharla') {
            var me = this;
            var data = me.gridOO.getSelectionModel().getSelection()[0];

            if (data != null) {
                window.open(Constantes.HOST + 'Reportes/ReporteOOCharla?ID_OO=' + data.get('ID_OO'));
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione un registro OO para Generar Formulario de Charla.');
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    EventosBotonSec: function (btn) {
        var me = this;

        if (btn.getItemId() == 'btn_AgregarSec') {
            var datosOO = me.gridOO.getSelectionModel().getSelection()[0];
            if (datosOO!=null) {

            
            if (me.winSecuencia == null) {
                me.winSecuencia = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                    textGuardar: 'Guardar Secuencia'
                });
                me.formSecuencia = Ext.create("App.View.OrdenesOperacion.Forms", {
                    botones: false,
                    opcion: 'secuencia'
                });
                me.formSecuencia.CargarDatos(datosOO);
                me.winSecuencia.add(me.formSecuencia);
                me.winSecuencia.btn_guardar.on('click', me.GuardarOOSecuencia, this);
                me.winSecuencia.show();
            }
            else {
                me.formSecuencia.CargarDatos(datosOO);
                me.winSecuencia.btn_guardar.setText('Guardar Secuencia');
                me.winSecuencia.show();
            }
             }
              else {
                  Ext.MessageBox.alert('Error', "Seleccione una Orden de Operacion.");
              }
        }
        else if (btn.getItemId() == 'btn_QuitarSec') {

            var data = me.gridSecuencias.getSelectionModel().getSelection()[0];

            if (data != null) {
                Funciones.AjaxRequestGrid("OrdenesOperacion", "EliminarItem", me, "Esta Seguro de Eliminar la secuencia?", { ID_SEC: data.get('ID_SEC') }, me.gridSecuencias);
             
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione una Secuencia.');
            }
        }

        else {
            Ext.MessageBox.alert('Error', "No existe ninguna Opcion para ese Botton");
        }

    },
    GuardarOO: function (btn) {
        var me = this;
        Funciones.AjaxRequestWin("OrdenesOperacion", "GuardarOrdenesOperacion", me.winCrearOO, me.formCrearOO, null, "Esta Seguro de Guardar la OO?", null, me.winCrearOO);
    },
    GuardarOOSecuencia: function (btn) {
        var me = this;
        Funciones.AjaxRequestWin("OrdenesOperacion", "GuardarOOSecuencia", me.winSecuencia, me.formSecuencia, null, "Esta Seguro de Guardar la Secuencia?", null, me.winSecuencia);
    },
    GrabarAsistencia: function () {
        var me = this;
     //   alert(data.get('ID_OO'));
        if (me.gridResponsables.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione Responsable(s) para Formulario de Asistencia.");
        }
        else {
            var modified = me.gridResponsables.getSelectionModel().getSelection();
           
            if (!Ext.isEmpty(modified)) {
                var recordsToSend = [];
                Ext.each(modified, function (record) {
                    recordsToSend.push(Ext.apply({ ID_PARTICIPANTE: record.get("ID_RESP") }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                //guardando seleccion de responsables para asistencia
                Funciones.AjaxRequestGrid("OrdenesOperacion", "GuardarOOAsistencia", me.winResponsables, "Estar seguro de grabar la seleccion de responsables?", { RESPS: recordsToSend, ID_OO: me.winResponsables.datos.get('ID_OO') }, null, me.winResponsables)
            }
        }
    },

});
