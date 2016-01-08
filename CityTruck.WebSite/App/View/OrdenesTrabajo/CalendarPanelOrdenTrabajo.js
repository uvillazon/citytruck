Ext.define('App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo', {
    extend: 'Extensible.calendar.CalendarPanel',
    showHeader: true,
    alto : 120,
    monitorStoreEvents: true,
    todayText: 'Hoy',
    enableEditDetails: false,
    readOnly : true,
    initComponent: function () {
        var me = this;
        me.height = Constantes.ALTO - me.alto;
        me.callParent();
        me.on('eventclick', function (evn,rec,el) {
            //alert(rec.get('Title'));
            Ext.Msg.alert("Exito", "Ventana de Consultas <br> "+rec.get('Title'));
            return false;
        });
        //me.on('dayclick', function () {
        //    return false;
        //});
    }
});