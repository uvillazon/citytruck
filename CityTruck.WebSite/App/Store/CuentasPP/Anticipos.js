Ext.define('App.Store.CuentasPP.Anticipos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CuentasPP.Anticipos',
    url: 'ClientesPorPagar/ObtenerAmortizacionesPaginado',
    sortProperty: 'FECHA',
    sortDirection: 'DESC',
});