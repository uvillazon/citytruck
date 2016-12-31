Ext.define('App.Store.Ventas.DetallesVentaMN', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.DetallesVenta',
    url: 'Ventas/ObtenerPosDia',
    sortProperty: 'ID_POS',
    sortDirection : 'ASC'
});