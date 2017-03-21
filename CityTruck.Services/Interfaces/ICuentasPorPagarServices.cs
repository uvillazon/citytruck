using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Expressions;

namespace CityTruck.Services.Interfaces
{
    public interface ICuentasPorPagarServices
    {
        //IEnumerable<SG_COMPRAS> ObtenerComprasPaginado(PagingInfo paginacion, string ANIO, string MES);
        IEnumerable<SG_CLIENTES_CPP> ObtenerClientesCuentasPorPagaPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros);
        IEnumerable<SG_KARDEX_CLIENTE_POR_PAGAR> ObtenerKardexClientes(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros);
        IEnumerable<SG_CONTRATOS> ObtenerContratosPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros);
        IEnumerable<SG_ANTICIPOS> ObtenerAnticiposPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros);

        DataForm<object> ObtenerContratoPorCriterio(Expression<Func<SG_CONTRATOS, bool>> criterio = null);
        DataForm<object> ObtenerAnticipoPorCriterio(Expression<Func<SG_ANTICIPOS, bool>> criterio = null);


        RespuestaSP SP_GrabarClienteCuentasPorPagar(SG_CLIENTES_CPP cliente, int ID_USR);
        RespuestaSP SP_GrabarContrato(SG_CONTRATOS contrato, int ID_USR);
        RespuestaSP SP_EliminarContrato(int ID_CONTRATO, int ID_USR);
        RespuestaSP SP_GrabarAnticipo(SG_ANTICIPOS anticipo, int ID_USR);
        RespuestaSP SP_EliminarAnticipo(int ID_ANTICIPO, int ID_USR);
        //RespuestaSP SP_EliminarCaja(int ID_CAJA, int ID_USR);

    }
}
