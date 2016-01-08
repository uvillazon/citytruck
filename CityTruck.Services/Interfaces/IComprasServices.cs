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
    public interface IComprasServices
    {
        IEnumerable<SG_COMPRAS> ObtenerComprasPaginado(PagingInfo paginacion ,string ANIO,string MES);
        IEnumerable<SG_COMPRAS> ObtenerComprasPorCriterio(Expression<Func<SG_COMPRAS, bool>> criterio);
        //IEnumerable<SG_COMPRAS> ObtenerComprasPorCriterio(Expression<Func<SG_COMPRAS, bool>> criterio);
        IEnumerable<SG_DETALLES_COMPRAS> ObtenerDetallesPorCriterio(Expression<Func<SG_DETALLES_COMPRAS, bool>> criterio);
        IEnumerable<SG_DETALLES_COMPRAS> ObtenerDetallesAgrupados(PagingInfo paginacion);
        RespuestaSP SP_GrabarCompra(SG_COMPRAS comp, int ID_USR);
        RespuestaSP SP_GrabarDetalleCompra(SG_DETALLES_COMPRAS det,int ID_USR);
        RespuestaSP SP_EliminarCompra(int ID_COMPRA, int ID_USR);
        RespuestaSP SP_EliminarDetalleCompra(int ID_DETALLE, int ID_USR);
        //SG_USUARIOS
    }
}
