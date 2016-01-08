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
    public interface IAjustePosServices
    {
        IEnumerable<SG_AJUSTE_POS> ObtenerAjustePos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros);
        IEnumerable<SG_AJUSTE_POS> ObtenerAjustePosPorFecha(string ANIO, string MES);
        IEnumerable<SG_AJUSTE_POS> ObtenerAjustePosPorCriterio(Expression<Func<SG_AJUSTE_POS, bool>> criterio = null);
        RespuestaSP SP_GenerarAjustePos(DateTime? FECHA,int ID_USR);
        RespuestaSP SP_GuardarAjustePos(SG_AJUSTE_POS ajuste, int ID_USR);
        RespuestaSP GuardarAjustePosPorConsumo(SG_CONSUMOS ajuste, int ID_USR);
     
    }
}
