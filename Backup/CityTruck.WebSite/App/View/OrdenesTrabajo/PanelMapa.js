Ext.define("App.View.OrdenesTrabajo.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormSolicitud") {
            me.title = "Datos del Solicitud de Mantenimiento";
            me.columns = 3;
            me.CargarFormSolicitud();

        }
        else if (me.opcion == "FormCuerpoOT") {
            me.title = "Datos Generales de la OT";
            me.columns = 2;
            me.CargarFormCuerpoOT();
        }
        else if (me.opcion == "FormOTTipo1") {
            me.title = "OT tipo Reemplazo o Reparacion";
            me.columns = 1;
            me.CargarFormOTTipo1();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormSolicitud: function () {
        var me = this;
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "NOMBRE_AFECTADO",

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE_AFECTADO",
        });
        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion",
            name: "NOMBRE_AFECTADO",
        });
        me.txt_responsable = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Responsable",
            name: "NOMBRE_AFECTADO",
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "NOMBRE_AFECTADO",
        });
        me.items = [
             me.txt_nroSolicitud,
             me.txt_nombre,
             me.txt_direccion,
             me.txt_responsable,
             me.dat_fecha
        ];
    },
    CargarFormCuerpoOT: function () {
        var me = this;
        me.CargarGridsCodigos();
        me.txt_nroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "NOMBRE_AFECTADO",

        });
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_EQUIPO",
            // store: me.store_moviles
        });

        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Designado",
            name: "NOMBRE_AFECTADO",
        });
        me.txt_lugartrabajo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Lugar de Trabajo",
            name: "NOMBRE_AFECTADO",
            colspan: 2,
            width: 480,
        });
        me.txt_designado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Designado",
            name: "NOMBRE_AFECTADO",
            
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha de Asignacion",
            name: "FECHA_PROBL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            renderer: Ext.util.Format.dateRenderer('Y/m/d'),
        });
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "SolicitudesMantenimiento",
            accion: "BuscarCodigoMantenimiento",
            //param: {codMan : 0},
            param: "codMan",
            mask: me,
            grid: me.gridCodigoMantenimiento,
            colspan: 3,
            //scope: this,
        });
        me.cmp_codigoDefecto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_DEF',
            textComponente: 'Cod. Defecto',
            btnId: 'btn_CodigoMantenimiento1',
            nameComponente: 'COD_DEF',
            nameDetalleComponente: 'DESCRIP_DEF',
            controlador: "SolicitudesMantenimiento",
            accion: "BuscarCodigoDefecto",
            param: "codDef",
            mask: me,
            grid: me.gridCodigoDefecto,
            colspan: 3,
            //scope: this,
            //handler: me.CargarStore

        });
        me.cmp_codigoSolucion = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_SOL',
            textComponente: 'Cod. Solucion',
            nameComponente: 'COD_SOL',
            nameDetalleComponente: 'DESCRIP_SOL',
            controlador: "SolicitudesMantenimiento",
            accion: "BuscarCodigoSolucion",
            param: "codSolucion",
            mask: me,
            grid: me.gridCodigoSolucion,
            colspan: 3,
            //scope: this,
            //handler: me.CargarStore

        });
        me.items = [
            me.txt_nroOT,
            me.cbx_tipo,
            me.txt_designado,
            
            me.date_fecha,
            me.txt_lugartrabajo,
            me.cmp_codigoMantenimiento,
            me.cmp_codigoDefecto,
            me.cmp_codigoSolucion

        ];
    },
    CargarGridsCodigos: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.gridCodigoDefecto = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoDefecto' });
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });

    },
    CargarFormOTTipo1: function () {
        var me = this;
       

        me.store_codPoste = Ext.create("App.Store.Postes.Postes");
        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            displayField: 'COD_POSTE',
            valueField: 'COD_POSTE',
            name: 'COD_POSTE',
            store: me.store_codPoste,
            textoTpl: function () {
                return '<h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.CargarGridsCodigos();
        me.cmp_codigoMantenimiento = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_MAN',
            textComponente: 'Cod. Mantenimiento',
            nameComponente: 'COD_MAN',
            nameDetalleComponente: 'DESCRIP_MAN',
            btnId: 'btn_CodigoMantenimiento',
            controlador: "SolicitudesMantenimiento",
            accion: "BuscarCodigoMantenimiento",
            //param: {codMan : 0},
            param: "codMan",
            mask: me,
            grid: me.gridCodigoMantenimiento,
            
        });
        me.cmp_codigoCosto = Ext.create("App.Config.Componente.FieldContainerComplexBase", {
            nameIdComponente: 'ID_COD_DEF',
            textComponente: 'Cod. Costo (UC)',
            nameComponente: 'COD_DEF',
            nameDetalleComponente: 'DESCRIP_DEF',
            controlador: "SolicitudesMantenimiento",
            accion: "BuscarCodigoDefecto",
            param: "codDef",
            mask: me,
            grid: me.gridCodigoDefecto,
            
        });
        me.btn_grupo = Funciones.CrearGrupoBoton("2", "");
        Funciones.CrearMenu('btn_CrearOT', 'Agregar', Constantes.ICONO_CREAR, me.EventosBoton, me.btn_grupo, this);
        Funciones.CrearMenu('btn_CrearOT1', 'Quitar', Constantes.ICONO_CREAR, me.EventosBoton, me.btn_grupo, this);
        me.gridReparacion = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'GridOTTipo1' , width : 480,height : 250});
        me.items = [
            me.cbx_poste,
            me.cmp_codigoMantenimiento,
            me.cmp_codigoCosto,
            me.btn_grupo,
            me.gridReparacion
        ];
    },
    EventosBoton: function (btn) {
        alert("hola a todos");
    }
});
