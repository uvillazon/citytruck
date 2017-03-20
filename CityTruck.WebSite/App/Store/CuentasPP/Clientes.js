Ext.define('App.Store.CuentasPP.Clientes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CuentasPP.Clientes',
    url: 'ClientesPorPagar/ObtenerClientesPaginado',
    sortProperty: 'CODIGO'
});