Ext.define('App.Store.Combustibles.AjustesPrecios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Combustibles.AjustesPrecios',
    url: 'Combustibles/ObtenerAjustesPreciosPaginado',
    sortProperty: 'ID_AJUSTE',
    sortDirection : 'DESC'
});