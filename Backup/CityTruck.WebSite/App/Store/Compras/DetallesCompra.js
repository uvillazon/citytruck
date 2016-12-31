Ext.define('App.Store.Compras.DetallesCompra', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Compras.DetallesCompra',
    url: 'Compras/ObtenerDetallesPaginado',
    sortProperty: 'DETALLE'
});