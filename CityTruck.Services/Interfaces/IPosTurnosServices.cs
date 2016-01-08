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
    public interface IPosTurnosServices
    {
        IEnumerable<SG_POS_TURNOS> ObtenerPosTurnos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros);
        IEnumerable<SG_POS> ObtnenerPuntosPaginados(PagingInfo paginacion);
        IEnumerable<SG_POS_TURNOS> ObtenerPosTurnosPorFecha(string ANIO, string MES);
        IEnumerable<SG_POS_TURNOS> ObtenerPosTurnosPorCriterio(Expression<Func<SG_POS_TURNOS, bool>> criterio = null);

        RespuestaSP SP_GenerarPosTurnos(DateTime? FECHA,string TURNO,int ID_USR , int ELIMINAR = 0);
        RespuestaSP SP_GrabarPosTurnos(SG_POS_TURNOS posTurnos,int ID_USR);
        RespuestaSP SP_ActualizarSaldos();

        IEnumerable<SG_POS_DIA_MN> ObtenerPosDias(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros);
        IEnumerable<SG_POS_DIA_MN> ObtenerPosDiaPorFecha(string ANIO, string MES);
        RespuestaSP SP_GenerarPosDias(DateTime? FECHA, int ID_USR);
    }
}
