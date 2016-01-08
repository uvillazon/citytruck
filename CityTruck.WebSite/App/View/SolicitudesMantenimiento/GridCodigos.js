Ext.define("App.View.SolicitudesMantenimiento.GridCodigos", {
    extend: "App.Config.Abstract.Grid",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    width: 550,
    height: 350,
    criterios: true,
    textBusqueda: 'Buscar Cod Mant.',
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridCodigoMantenimiento") {
            me.title = "Codigos de Mantenimiento";
            me.equipo = "Codigos de Mantenimiento";
            me.CargarCodigosMantenimiento();
        }
        else if (me.opcion == "GridCodigoDefecto") {
            me.title = "Codigos de Defecto";
            me.equipo = "Codigos de Defecto";
            me.CargarCodigosDefecto();
        }
        else if (me.opcion == "GridCodigoSolucion") { 
            me.title = "Codigos de Solucion";
            me.equipo = "Codigos de Solucion";
            me.CargarCodigosSolucion();
        }
        else {
            alert("Defina el tipo primero");
        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });
        this.callParent(arguments);
    },
    CargarCodigosMantenimiento: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento", { autoLoad: false });
        me.CargarComponentes();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "COD_MAN" },
            { header: "Descripcion", width: 300, sortable: true, dataIndex: "DESCRIP_MAN" },
        ];
    },
    CargarCodigosDefecto: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosDefecto", { autoLoad: false });
        me.CargarComponentes();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "COD_DEF" },
            { header: "Descripcion", width: 300, sortable: true, dataIndex: "DESCRIP_DEF" },
        ];
    },
    CargarCodigosSolucion: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion", { autoLoad: false });
        me.CargarComponentes();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Descripcion", width: 300, sortable: true, dataIndex: "DESCRIP_SOL" },
        ];
    },
    

});

