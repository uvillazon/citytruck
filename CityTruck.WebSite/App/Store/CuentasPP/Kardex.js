Ext.define('App.Store.CuentasPP.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CuentasPP.Kardex',
    url: 'ClientesPorPagar/ObtenerKardexPorClientePaginado',
    sortProperty: 'FECHA',
    sortDirection: 'DESC',
});