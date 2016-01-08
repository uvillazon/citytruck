Ext.define("App.View.OrdenesOperacion.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    initComponent: function () {
        var me = this;
        //opcion: 'secuencia',
        if (me.opcion == "secuencia") {
            me.title = "Secuencia o guía de maniobra";
            me.pieTitulo = "Secuencia o guía de maniobra";
            me.CargarComponenteSecuencia();
        }
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarComponenteSecuencia: function () {
        var me = this;
           me.store = Ext.create("App.Store.OrdenesOperacion.Secuencia");
       // me.store = Ext.create('App.Store.OrdenesOperacion.EquiposElemento');
        
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Hora", width: 70, sortable: true, dataIndex: "HORA" },
            { header: "Descripcion", width: 80, sortable: true, dataIndex: "DESCRIP_MANIOBRA" },
            { header: "Codigo", width: 100, sortable: true, dataIndex: "CODIGO" },
            { header: "Operador", width: 80, sortable: true, dataIndex: "OPERADOR" },
        ];
    }

});

