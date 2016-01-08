Ext.define("App.View.OrdenesTrabajo.FormAdministrarOT", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",

    controlador: 'OrdenesTrabajo',
    accionGrabar: 'GuardarOrdenesTrabajo',
    accionQuitar: 'EliminarOrdenTrabajo',
    accionCerrar: 'GuardarCerrarOT',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    cargarStores: true,
    columns: 2,
    opcion: '',
    btn_TrabajoDiario : false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "Crear") {
            me.CargarComponentesCrear();
        }
        else if (me.opcion == "Asignar") {
            me.CargarComponentesAsignar();
        }
        else if (me.opcion == "Reasignar") {
            me.CargarComponentesReasignar();
        }
        else if (me.opcion == "Ejecutar") {
            me.CargarComponentesEjecutar();
        }
        else if (me.opcion == "Cerrar") {
            me.CargarComponentesCerrar();
        }
        else if (me.opcion == "EjecutaOT") {
            me.CargarComponentesEjecutaOT();
        }
        else if (me.opcion == "ImprimirOT") {
            me.CargarComponentesImprimirOT();
        }
        else if (me.opcion == "CerrarOT") {
            me.CargarComponentesCerrarOT();
        }
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
    },
    CargarComponentesCrear: function () {
        var me = this;
        me.formCrear = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCrearOT', icono: false });
        me.gridSolicitudes = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: 500,
            criterios: true,
            height: 500,
            opcion: 'Bandeja',
            paramsStore: { Estados: ['APROBADA', 'CON_OT'] }
        });
        me.btn_grupo = Funciones.CrearGrupoBoton(2, "Opciones de SM");
        Funciones.CrearMenu('btn_FinOT', 'Fin OT', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this);
        Funciones.CrearMenu('btn_OTExtraordinario', 'OT<br>Extraordinario', Constantes.ICONO_CREAR, me.EventosBotonOT, me.btn_grupo, this);
        //me.form.add(me.btn_grupo);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.btn_grupo
        });
        me.formularioSolicitud = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormSolicitud' });
        me.formularioSolicitud.BloquearFormulario();
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            criterios: true,
            busqueda: true,
            cargarStore: false,
            width: 755,
            height: 300,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarOT', "Crear OT", Constantes.ICONO_CREAR, me.EventosBotonOT, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarOT', "Editar OT", Constantes.ICONO_EDITAR, me.EventosBotonOT, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarOT', "Eliminar OT", "delete", me.EventosBotonOT, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);



        me.form.add(me.formularioSolicitud);
        me.form.add(me.gridOT);
        me.items = [
           me.gridSolicitudes,
           me.form
        ];
        me.gridSolicitudes.on('cellclick', me.CargarDatos, this);
    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formularioSolicitud.CargarDatos(record);
        me.gridOT.getStore().setExtraParam("ID_SOL_MAN", record.get('ID_SOL_MAN'));
        me.gridOT.getStore().load();
    },
    CargarComponentesAsignar: function () {
        var me = this;
        me.formAsignacion = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTAsignar', colspan: 2, icono: false });

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "OTSeleccionadas",
            busqueda: true,
            width: 860,
            height: 260,
        });
        me.gridOTAprobados = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            paramsStore: { Estados: ["APROBADA"] },
            opcion: 'GridOTSeleccionadas',
            width: 860,
            height: 255,
            colspan: 2,
            criterios: true,
            busqueda: true,
        });
        me.toolbar = Funciones.CrearMenuBar();
        me.gridOT.on('edit', me.CargarCodDefecto, this);
      //  Funciones.CrearMenu('btn_AsignacionOT', "Asignacion OT's", "add", me.EventosBotonAsignar, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarOT', "Quitar OT's", "delete", me.EventosBotonAsignar, me.toolbar, this);
        Funciones.CrearMenu('btn_AgregarOT', "Seleccionar OT's", Constantes.ICONO_CREAR, me.EventosBotonAsignar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.CargarcomponentesCodigoDefecto();
        me.items = [
           me.formAsignacion,
           me.gridOTAprobados,
           me.gridOT
        ];
    },
    CargarComponentesReasignar: function () {
        var me = this;
        me.formReasignacion = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTReasignar', colspan: 2, icono: false });

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "OTSeleccionadasReasignar",
            busqueda: true,
            width: 755,
            height: 200,
        });
        me.toolbar = Funciones.CrearMenuBar();
        me.gridOT.on('edit', me.CargarCodDefecto, this);
        Funciones.CrearMenu('btn_ReasignacionOT', "Resignacion OT's", "add", me.EventosBotonAsignar, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarOT', "Quitar OT's", "delete", me.EventosBotonAsignar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.CargarcomponentesCodigoDefecto();
        me.items = [
           me.formReasignacion,
           me.gridOT
        ];
    },
    CargarcomponentesCodigoDefecto: function () {
        var me = this;
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
        me.winCodigoDefecto = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoDefecto.add(me.gridCodigoDefecto);
        me.gridCodigoDefecto.on('celldblclick', me.CargarRecordDefecto, this);
    },
    CargarComponentesEjecutar: function () {
        var me = this;
        me.txt_numeroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "NRO_SOL",
            hidden: true
        });
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            hidden: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            hidden: true,
        });
        me.cbx_poste = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Poste",
            name: "ID_OT_PT_INT",
            maxLength: 20,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: ['1', '10', '11', '2'],
            colspan: 2
            // store: me.store_moviles
        });
        me.store_codSol = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'ID_COD_SOL',
            name: 'COD_SOL',
            colspan: 2,
            store: me.store_codSol,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            },
        });
        me.cbx_codigoSolucion.on('select', me.CargarRecord, this);
        me.gridCodSoluciones = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridCodigoSoluciones",
            busqueda: true,
            width: 755,
            height: 350,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_QuitarSOL', "Quitar Soluncion", "delete", me.BorrarCodSol, me.toolbar, this);
        me.gridCodSoluciones.addDocked(me.toolbar, 1);

        me.items = [
            me.txt_numeroSolicitud,
            me.txt_nroOT,
            me.txt_estado,
            me.cbx_poste,
            me.cbx_codigoSolucion,
            me.gridCodSoluciones
        ];
    },
    CargarRecord: function (cmb, record) {
        var me = this;
        if (me.gridCodSoluciones.store.existeRecord('ID_COD_SOL', record[0].get('ID_COD_SOL')) == false) {
            var rec = new App.Model.SolicitudesMantenimiento.CodigosSolucion({
                ID_COD_SOL: record[0].get('ID_COD_SOL'),
                COD_SOL: record[0].get('COD_SOL'),
                DESCRIP_SOL: record[0].get('DESCRIP_SOL'),

            });
            me.gridCodSoluciones.store.insert(0, rec);
            me.gridCodSoluciones.getView().refresh();
        }
        else {
            Ext.MessageBox.alert('Error', "Ya fue seleccionado el Cod. Solicitud.");
        }
    },
    BorrarCodSol: function () {
        var me = this;
        var data = me.gridCodSoluciones.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.gridCodSoluciones.getStore().remove(data);
            me.gridCodSoluciones.getView().refresh();
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },
    CargarComponentesCerrar: function () {
        var me = this;
        me.formCabecera = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormSolicitud', colspan: 2 });
        me.formCabecera.BloquearFormulario();
        me.formCuerpo = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormOTCierre', colspan: 2 });
        me.formCuerpo.BloquearFormulario();

        me.gridMaterialesOT = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "MaterialesOT",
            busqueda: true,
            width: 755,
            height: 200,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarMaterial', "Agregar Material", "add", me.EventosBotonMaterial, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarMaterial', "Quitar Material", "delete", me.EventosBotonMaterial, me.toolbar, this);
        me.gridMaterialesOT.addDocked(me.toolbar, 1);
        me.items = [
            me.formCabecera,
            me.formCuerpo,
            me.gridMaterialesOT
        ];
    },
    CargarDatosSolicitud: function (record) {
        var me = this;
        me.getForm().reset();
        me.formCabecera.loadRecord(record);
        me.formCuerpo.txt_lugartrabajo.setValue(record.get('UBICACION'));
    },
    EventosBotonAsignar: function (btn) {
        var me = this;
       if (btn.getItemId() == 'btn_ReasignacionOT') {
            me.winSeleccionarOT = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: "Seleccionar OT's" });
            me.gridOTAprobados = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
                paramsStore: { Estados: ["ASIGNADA", "EN_EJEC"] },
                opcion: 'GridOTSeleccionadas',
                criterios: true,
                busqueda: true,
                width: 755,
                height: 250,

            });
            me.winSeleccionarOT.add(me.gridOTAprobados);
            me.winSeleccionarOT.btn_guardar.on('click', function () {
                var seleccionadosOT = me.gridOTAprobados.obtenerSeleccionados();
                if (seleccionadosOT == false) {
                    alert("No se Selecciono ninguna OT.");
                }
                else {
                    Ext.each(seleccionadosOT, function (record) {
                        var seleccionados = record;
                        if (me.gridOT.store.existeRecord('ID_OT', record.data.ID_OT) == false) {
                            var rec = new App.Model.OrdenesTrabajo.OrdenesTrabajo({
                                ID_OT: record.data.ID_OT,
                                ID_SOL_MAN: record.data.ID_SOL_MAN,
                                ASIGNADO_A: record.data.ASIGNADO_A,
                                NOMBRE_ASIGNADO: record.data.NOMBRE_ASIGNADO,
                                TIPO_OT: record.data.TIPO_OT,
                                LUGAR_TRABAJO: record.data.LUGAR_TRABAJO,
                                COD_MAN: record.data.COD_MAN,
                                COD_DEF: record.data.COD_DEF,
                                COD_SOL: record.data.COD_SOL,
                                ID_COD_DEF: record.data.ID_COD_DEF,
                                DESC_PROBL: record.data.DESC_PROBL,
                                ESTADO: record.data.ESTADO
                            });
                            me.gridOT.store.insert(0, rec);
                            me.gridOT.getView().refresh();
                            me.gridOTAprobados.selModel.deselectAll();
                            me.winSeleccionarOT.hide();
                        }
                        else {
                            Ext.MessageBox.alert('Error', "Ya fue seleccionada(as) la(s) OT.");
                        }

                    });
                }
            });
            me.winSeleccionarOT.show();
        }
        else if (btn.getItemId() == 'btn_QuitarOT') {
            var me = this;
            var data = me.gridOT.getSelectionModel().getSelection()[0];

            if (data != null) {
                me.gridOT.getStore().remove(data);
                me.gridOT.getView().refresh();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
            }
        }
        else if (btn.getItemId() == 'btn_AgregarOT') {
            var seleccionadosOT = me.gridOTAprobados.obtenerSeleccionados();
            if (seleccionadosOT == false) {
                Ext.MessageBox.alert('Error', 'Seleccione OT(s) para asignar.');
            }
            else {
                Ext.each(seleccionadosOT, function (record) {
                  //  alert(record.data.NOMBRE_ASIGNADO);
                    var seleccionados = record;
                    if (me.gridOT.store.existeRecord('ID_OT', record.data.ID_OT) == false) {
                        var rec = new App.Model.OrdenesTrabajo.OrdenesTrabajo({
                            ID_OT: record.data.ID_OT,
                            ID_SOL_MAN: record.data.ID_SOL_MAN,
                            ASIGNADO_A: record.data.ASIGNADO_A,
                            NOMBRE_ASIGNADO: record.data.NOMBRE_ASIGNADO,
                            TIPO_OT: record.data.TIPO_OT,
                            LUGAR_TRABAJO: record.data.LUGAR_TRABAJO,
                            COD_MAN: record.data.COD_MAN,
                            COD_DEF: record.data.COD_DEF,
                            COD_SOL: record.data.COD_SOL,
                            ID_COD_DEF: record.data.ID_COD_DEF,
                            DESC_PROBL: record.data.DESC_PROBL,
                            ESTADO: record.data.ESTADO
                        });
                        me.gridOT.store.insert(0, rec);
                        me.gridOT.getView().refresh();
                        me.gridOTAprobados.store.remove(record);
                        
                    }
                    else {
                        Ext.MessageBox.alert('Error', "Ya fue seleccionada(as) la(s) OT.");
                    }

                });
            }
        }
        else {
            Ext.MessageBox.alert('Error', "No existe ninguna Opcion para ese Botton");
        }

    },
    EventosBotonMaterial: function (btn) {
        alert('Falta implementar');
    },
    EventosBotonOT: function (btn) {
        var me = this;

        if (btn.getItemId() == 'btn_AgregarOT') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'APROBADA') {
                if (me.winOT == null) {
                    me.winOT = Ext.create("App.Config.Abstract.Window", {
                        botones: true,
                        textGuardar: 'Guardar Orden Trabajo'
                    });
                    me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                        botones: false
                    });
                    //me.formOT.loadRecord(me.formularioSolicitud.record);
                    me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                    me.winOT.add(me.formOT);
                    me.formOT.formCuerpo.txt_ot_ext.setValue("F");
                    me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
                    me.winOT.show();
                }
                else {
                    me.winOT.btn_guardar.setText('Guardar Orden Trabajo');
                    me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                    me.formOT.formCuerpo.txt_ot_ext.setValue("F");
                    me.winOT.show();
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud de Mantenimiento en Estado APROBADA caso Contrario Seleccione una OT Extraordinaria.");
            }
        }
        else if (btn.getItemId() == 'btn_EditarOT') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'NUEVA') {
                me.EditarOT(datosOT, me.formularioSolicitud.record);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado NUEVA.");
            }
        }
        else if (btn.getItemId() == 'btn_QuitarOT') {

            var data = me.gridOT.getSelectionModel().getSelection()[0];

            if (data != null && data.get('ESTADO') == 'NUEVA') {
                Funciones.AjaxRequestForm(me.controlador, me.accionQuitar, me, me.formularioSolicitud, me.gridOT, "Esta seguro(a) de eliminar la OT?", { ID_OT: data.get('ID_OT') }, null);
                //me.gridOT.getStore().remove(data);
                //me.gridOT.getView().refresh();
            }
            else {
                Ext.MessageBox.alert('Error', 'Seleccione una Orden de Trabajo en estado NUEVA.');
            }
        }
        else if (btn.getItemId() == 'btn_FinOT') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'APROBADA') {
                Funciones.AjaxRequestGridArray(me.controlador, "FinOrdenesTrabajo", me, "Esta Seguro de Finalizar las OT's", { ESTADO_DESTINO: 'APROBADA', ID_SOL_MAN: me.formularioSolicitud.record.get('ID_SOL_MAN') }, [me.gridOT, me.gridSolicitudes]);
                //me.gridSolicitudes.getStore().load();
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una SM en Estado APROBADA");
            }
        }
        else if (btn.getItemId() == 'btn_OTExtraordinario') {
            if (me.formularioSolicitud.record != null && me.formularioSolicitud.record.get('ESTADO') == 'CON_OT') {
                if (me.gridOT.getStore().countRegistros('OT_EXTRA', 'T') >= 2) {
                    Ext.MessageBox.alert('Error', "la SM ya cuenta con 2  OT Extraordinaria");
                }
                else {

                    if (me.winOT == null) {
                        me.winOT = Ext.create("App.Config.Abstract.Window", {
                            botones: true,
                            textGuardar: 'Guardar Orden Trabajo ExtraOrdinaria'
                        });
                        me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                            botones: false
                        });
                        //me.formOT.loadRecord(me.formularioSolicitud.record);
                        me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                        me.winOT.add(me.formOT);
                        me.formOT.formCuerpo.txt_ot_ext.setValue("T");
                        me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
                        me.winOT.show();
                    }
                    else {

                        me.winOT.btn_guardar.setText('Guardar Orden Trabajo ExtraOrdinaria');
                        me.formOT.CargarDatosSolicitud(me.formularioSolicitud.record);
                        me.formOT.formCuerpo.txt_ot_ext.setValue("T");
                        me.winOT.show();
                    }

                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud de Mantenimiento en Estado CON_OT para añadir ");
            }
        }
        else {
            Ext.MessageBox.alert('Error', "No existe ninguna Opcion para ese Botton");
        }

    },
    EditarOT: function (OT, SM) {
        var me = this;
        if (me.winOT == null) {
            me.winOT = Ext.create("App.Config.Abstract.Window", {
                botones: true,
                textGuardar: 'Guardar Orden Trabajo'
            });
            me.formOT = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
                botones: false
            });
            me.formOT.CargarDatosEditar(OT, SM);

            me.formOT.formCuerpo.txt_ot_ext.setValue("F");
            me.winOT.add(me.formOT);
            me.winOT.btn_guardar.on('click', me.GuardarOrdenTrabajo, this);
            me.winOT.show();
        }
        else {
            me.winOT.btn_guardar.setText('Guardar Orden Trabajo');
            me.formOT.CargarDatosEditar(OT, SM);
            me.formOT.formCuerpo.txt_ot_ext.setValue("F");
            me.winOT.show();
        }
    },
    GuardarOrdenTrabajo: function () {
        var me = this;
        var objeto = null; var id_objeto = 0; var cod_objecto = null; cod_objecto2 = null; var id_objecto2 = 0;

        if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'POSTE') {
            if (me.formOT.formCuerpo.cmp_codigoPoste.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoPoste.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoPoste.txt_detalleComponente.getValue();
                id_objecto2 = 0;
                cod_objecto2 = null;
            }

        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'PUESTO') {
            if (me.formOT.formCuerpo.cmp_codigoPuesto.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un PUESTO");
            } else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoPuesto.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoPuesto.txt_detalleComponente.getValue();
                id_objecto2 = 0;
                cod_objecto2 = null;
            }

        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'DERIVACION') {
            if (me.formOT.formCuerpo.cmp_codigoDerivacion.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un DERIVACION");
            } else {
                id_objeto = me.formOT.formCuerpo.cmp_codigoDerivacion.txt_id.getValue();
                cod_objecto = me.formOT.formCuerpo.cmp_codigoDerivacion.txt_detalleComponente.getValue();
                id_objecto2 = me.formOT.formCuerpo.cmp_codigoDerivacionFinal.txt_id.getValue();
                cod_objecto2 = me.formOT.formCuerpo.cmp_codigoDerivacionFinal.txt_detalleComponente.getValue();

            }
        } else if (me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] == 'TRAMO') {
                objeto =1;
                id_objeto = 1;
                id_objecto2 = 0;
                cod_objecto2 = null;
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un PUESTO, POSTE o DERIVACION");
        }
        if (me.formOT.formCuerpo.cbx_tipo.getValue() == "REPARACION_REEMPLAZO" && me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'] != 'POSTE') {
            if (Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) == false) {
                Ext.Msg.alert("Error", "Agregar por lo menos un poste intervenido.");
                return false;
            }
        }
        objeto = me.formOT.formCuerpo.grpb_grupoBoton.getValue()['rb'];//POSTE/PUESTO/DERIVACION
        // alert(objeto);
        // alert(id_objeto);
        if (objeto != null && id_objeto != 0) {
            Funciones.AjaxRequestWin(me.controlador, me.accionGrabar, me.winOT, me.formOT.formCuerpo, me.gridOT, "Esta Seguro de Guardar la Orden de trabajo?", { ESTADO: 'NUEVA', ID_SOL_MAN: me.formOT.formCabecera.record.get('ID_SOL_MAN'), TIPO_OT: me.formOT.formCuerpo.cbx_tipo.getValue(), OBJETO: objeto, ID_OBJETO: id_objeto, COD_OBJETO: cod_objecto,ID_OBJ_INTERV_2 : id_objecto2,COD_OBJ_INTERV_2 : cod_objecto2 , UCReemplazos: Funciones.convertirJson(me.formOT.formOTtipo1.gridReparacion) }, me.winOT);
        } else {
            Ext.MessageBox.alert('Error', "El objeto sujeto a inspeccion (DERIVACION/PUESTO/POSTE) debe tener CODIGO.");//cuando no encuentra el id del valor cargado
        }
    },
    CargarComponentesEjecutaOT: function () {
        var me = this;
        //alert(me.getId());
        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            width: 755,
            height: 400,
            imagenPlanilla : false,
            paramsStore: { ESTADO: 'EN_EJEC' },
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_TrabajoEjecutado', "Trabajos Ejecutados", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this, 'App.controller.OrdenesTrabajo.TrabajoDiario');
        if (!me.btn_TrabajoDiario) {
            Funciones.CrearMenu('btn_PlanillaInspeccion', "Planilla Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
            Funciones.CrearMenu('btn_InformeInspeccion', "Informe Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
            Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar", "add", me.EventoEjecutar, me.toolbar, this);
        }
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    CargarComponentesImprimirOT: function () {
        var me = this;

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            ckeck: true,
            width: 755,
            height: 400,
            paramsStore: { Estados: ["ASIGNADA", "EN_EJEC"] },
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        //  Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar", "add", me.EventoEjecutar, me.toolbar, this);
        Funciones.CrearMenu('btn_ReporteOT', "Imprimir OT's", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    CargarComponentesCerrarOT: function () {
        var me = this;

        me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            opcion: "GridOTElegidas",
            busqueda: true,
            width: 755,
            height: 400,
            paramsStore: { ESTADO: 'EJECUTADA' },
            title: 'Ordenes de Trabajo Asignados'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CerrarOT', "Cerrar", "add", me.EventoEjecutar, me.toolbar, this);
        //Funciones.CrearMenu('btn_ReporteOT', "Reporte OT's", Constantes.ICONO_VER, me.EventoEjecutar, me.toolbar, this);
        me.gridOT.addDocked(me.toolbar, 1);
        me.items = [
           me.gridOT
        ];
    },
    EventoEjecutar: function (btn) {
        var me = this;
        var data = me.gridOT.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == 'btn_EjecutarOT') {

            if (data == null || data.get('TIPO_OT') != 'INSPECCION') {
                Ext.MessageBox.alert('Error', "Seleccione OT para Ejecutar que sea Tipo 'INSPECCION'.");
            }
            else {
                var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
                Funciones.AjaxRequestForm("OrdenesTrabajo", "GuardarEjecucionOrdenesTrabajo", me, me, me.gridOT, "Esta Seguro dar por Ejecutada esta OT?", params, null);
            }
        } else if (btn.getItemId() == 'btn_ReporteOT') {
            if (data != null) {
           

            if (data.get('ESTADO') == 'ASIGNADA' || data.get('ESTADO') == 'EN_EJEC') {
                var modified = me.gridOT.getSelectionModel().getSelection();
                var count = 0;
                if (!Ext.isEmpty(modified)) {
                    var recordsToSend = [];
                    Ext.each(modified, function (record) {
                        recordsToSend.push(Ext.apply({ ID: record.data.ID_OT }));
                    });
                    recordsToSend = Ext.JSON.encode(recordsToSend);
                    window.open(Constantes.HOST + 'Reportes/ReporteOT?OTS=' + recordsToSend);
                } else {
                    Ext.MessageBox.alert('Error', "Seleccione una OT ASIGNADA o EN_EJEC.");
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione OT's para generar Imprimir OT's.");
            }

            } else {
                Ext.MessageBox.alert('Error', "Seleccione OT's para generar Imprimir OT's.");
            }



        }
        else if (btn.getItemId() == 'btn_CerrarOT') {

            if (data == null || data.get('TIPO_OT') != 'INSPECCION') {
                Ext.MessageBox.alert('Error', "Seleccione OT para Ejecutar que sea Tipo 'INSPECCION'.");
            }
            else {
               // alert(data.get('ID_OT'));
                var params = { ID_OT: data.get('ID_OT'), OBSERVACION: 'Cerrar OT' };//TIPO_OT: data.get('TIPO_OT'),
                Funciones.AjaxRequestForm(me.controlador, me.accionCerrar, me, me, me.gridOT, "Esta Seguro dar Cerrar esta OT?", params, null);
            }
        }
        else if (btn.getItemId() == 'btn_PlanillaInspeccion') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT != null) {
                me.VentanaPlanilla(datosOT, datosOT.get('CON_PLANILLA'));

            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado EN_EJEC.");
                //me.GenerarPlanilla(datosOT, me.formularioSolicitud.record);
            }
        } else if (btn.getItemId() == 'btn_InformeInspeccion') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT != null) {
                me.VentanaInforme(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado') {
            var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
            if (datosOT == null) {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
            /*Su evento esta controlado por el controller TrabajoDiario de la carpeta controller*/
        }
        else {
            alert('No existe Evento para ese boton');
        }
    },
    CargarCodDefecto: function (editor, e) {
        var me = this;
        //alert(e.record);
        me.gridCodigoDefecto.recordEdit = e.record;
        me.gridCodigoDefecto.recordName = "COD_DEF";
        me.gridCodigoDefecto.recordId = "ID_COD_DEF";
        Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoDefecto", e.grid, e.record, "COD_DEF", "ID_COD_DEF", { codDef: e.value }, me.winCodigoDefecto);
    },
    CargarRecordDefecto: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoDefecto.recordEdit.set(me.gridCodigoDefecto.recordName, record.get('COD_DEF'));
        me.gridCodigoDefecto.recordEdit.set(me.gridCodigoDefecto.recordId, record.get('ID_COD_DEF'));
        me.winCodigoDefecto.hide();
    },
    VentanaPlanilla: function (OT, editar) {
        //alert("gen")
        var me = this;
        if (OT.get('ESTADO_PLA') != "APROBADA") {
            if (me.winPlanilla == null) {
                me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Planilla OT' });
                me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanilla', botones: false, });
                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.add(me.formPlanilla);
                me.winPlanilla.btn_guardar.on('click', me.GuardarPlanilla, this);
                me.winPlanilla.show();
            }
            else {
                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla En Estado NUEVA o RECHAZADA");
        }
    },
    VentanaInforme: function (OT) {

        var me = this;
        me.winInforme = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Informe OT' });
        me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false });
        me.formInforme.loadRecord(OT);
        me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') });
        me.winInforme.add(me.formInforme);
        me.winInforme.btn_guardar.on('click', me.GrabarInformeInspeccion, this);
        me.winInforme.show();
    },
    GrabarInformeInspeccion: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabarInforme, me.winInforme, me.formInforme, null, 'Esta seguro de Guardar informe de OT?', null, me.winInforme);
    },
    GuardarPlanilla: function () {
        var me = this;
        //alert("Se Guardo Correctamente");
        Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarPlanillaInspeccion", me.winPlanilla, me.formPlanilla.formCabeceraPlanilla, me.gridOT, "Esta Seguro de Guardar La Planilla", { Detalles: Funciones.convertirJson(me.formPlanilla.gridDetallePlanilla), OBSERV: me.formPlanilla.txta_Observacion.getValue() }, me.winPlanilla);
    },
});
