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
    public interface IClientesConsumoServices
    {
        IEnumerable<SG_CLIENTES_CONSUMO> ObtenerClientesPaginado(PagingInfo paginacion);
        IEnumerable<SG_CONSUMOS> ObtenerConsumosPaginado(PagingInfo paginacion, FiltrosModel<ConsumoDetalleModel> filtros);
        IEnumerable<SG_CONSUMOS> ObtenerConsumosPorCriterio(Expression<Func<SG_CONSUMOS, bool>> criterio = null);
        SG_CLIENTES_CONSUMO ObtenerCliente(Expression<Func<SG_CLIENTES_CONSUMO, bool>> criterio = null);
        RespuestaSP SP_GrabarCliente(SG_CLIENTES_CONSUMO cli, int ID_USR);
        RespuestaSP SP_EliminarCliente(int ID_CLIENTE, int ID_USR);

        RespuestaSP SP_ActualizarConsumos();

        IEnumerable<SG_CLIENTE_CONSUMO_COMBUSTIBLE> ObtenerClientesConsumoPaginado(PagingInfo paginacion);

    }
}
