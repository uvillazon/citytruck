Ext.define('App.Store.Combustibles.Pos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Combustibles.Pos',
    url: 'Combustibles/ObtenerPosCombustiblesPaginado',
    sortProperty: 'ID_POS'
});