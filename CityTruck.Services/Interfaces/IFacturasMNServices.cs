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
    public interface IFacturasMNServices
    {
        IEnumerable<SG_FACTURAS_MN> ObtenerFacturasMN(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros);
        RespuestaSP SP_GuardarFacturasMN(SG_FACTURAS_MN facturas,int ID_USR);
        SG_FACTURAS_MN ObtenerFacturaPorCriterio(Expression<Func<SG_FACTURAS_MN, bool>> criterio = null);

    }
}
