Ext.define("App.View.Responsables.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalResponsables",
    controlador: 'Responsables',
    accionGrabar: 'GrabarResponsableSP',
    //   accionBaja: 'BajaLista',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Responsables.GridResponsables', {
            region: 'west',
            width: '45%'

        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearResponsable', 'Crear', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarResponsable', 'Editar', Constantes.ICONO_EDITAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_BajaResponsable', 'Baja', Constantes.ICONO_BAJA, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        //Funciones.CrearMenu('id13', 'Nombre2', Constantes.ICONO_EDITAR, me.CargarEventos, me.toolbar, this);
        me.form = Ext.create("App.Config.Abstract.FormPanel");

        me.formulario = Ext.create("App.View.Responsables.FormResponsable");
        me.formulario.BloquearFormulario();
        //var cadenas = ["NOMBRE","APELLIDO","jhkhh"];
        //me.formulario.BloquearFormularioParams(cadenas);
        me.form.add(me.formulario);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    EventosBoton: function (btn, e) {
        var me = this;
        if (btn.getItemId() == "btn_CrearResponsable") {
            me.formulario.DesbloquearFormulario();
            me.formulario.LimpiarFormulario();
            me.formulario.btn_guardar.on('click', me.GuardarResponsables, this);
            
        }
        else if (btn.getItemId() == "btn_EditarResponsable") {
            if (me.formulario.record != null) {
                me.formulario.DesbloquearFormulario();
                me.formulario.btn_guardar.on('click', me.GuardarResponsables, this);
            } else {
                Ext.MessageBox.alert('Aviso', 'Seleccione un responsable..');
            }

        }
        else if (btn.getItemId() == "btn_BajaResponsable") {
            if (me.formulario.record != null) {
            me.formulario.DesbloquearFormulario(["NOMBRE", "APELLIDO", "UNIDAD", "AREA"],true);
            me.formulario.btn_guardar.on('click', me.GuardarResponsables, this);
            } else {
                Ext.MessageBox.alert('Aviso', 'Seleccione un responsable..');
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    GuardarResponsables: function () {
        var me = this;
        //controlador, accion, mask, form, grid, msg, param, Formulario
        Funciones.AjaxRequestForm(me.controlador, me.accionGrabar, me.form, me.formulario, me.grid, null, null, me.formulario);
    }
});
