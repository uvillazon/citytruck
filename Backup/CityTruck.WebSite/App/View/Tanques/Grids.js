Ext.define("App.View.Tanques.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    title : '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridAjustes") {
            me.title = me.title == '' ? "Reporte de Ajustes" : me.title;
            me.pieTitulo = "Ajustes";
            me.CargarGridAjustes();
        }
        else if (me.opcion == "GridAjustesPos") {
            me.title = me.title == '' ? "Reporte de Ajustes" : me.title;
            me.pieTitulo = "Ajustes";
            me.CargarGridAjustePos();
        }
       
        else {
            alert("Defina el tipo primero");
        }
        
        this.callParent(arguments);
    },
    CargarGridAjustes : function(){
        var me = this;
        me.store = Ext.create("App.Store.Combustibles.Ajustes");
        me.columns = [
           { header: "FECHA", width: 150, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "OBSERVACIONES", width: 180, sortable: false, dataIndex: "OBSERVACION" },
           { header: "DIESEL", width: 100, sortable: false, dataIndex: "DIESEL" },
           { header: "GASOLINA", width: 100, sortable: false, dataIndex: "GASOLINA" }
        ];

    },
    CargarGridAjustePos : function(){
        var me = this;
        me.store = Ext.create("App.Store.Combustibles.Ajustes");
        
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
           { header: "Producto", width: 150, sortable: true, dataIndex: "PRODUCTO" },
           { header: "Ajuste Lts.", width: 80, sortable: false, dataIndex: "AJUSTE" ,editor: {
                    xtype: 'numberfield',
                    
                } 
           }
        ];

    },
});

