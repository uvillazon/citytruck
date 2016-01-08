using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Services.Interfaces;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using CityTruck.Business.Interfaces;
using System.Linq.Dynamic;
using LinqKit;
using CityTruck.Business;
using System.Data.Objects;

namespace CityTruck.Services
{
    public class TanquesServices : BaseService, ITanquesServices
    {
        //private ISG_LISTASManager _manListas;

        public TanquesServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_TANQUES> ObtenerTanquesPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_TANQUES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_TANQUESManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public decimal? SaldoTanque(int ID_COMBUSTIBLE, DateTime FECHA, int ID_USR)
        {
            decimal? result = 0;
            ExecuteManager(uow =>
            {
                var manager = new SG_TANQUESManager(uow);
                var query = manager.BuscarTodos(x => x.ID_COMBUSTIBLE == ID_COMBUSTIBLE).FirstOrDefault();
                result = query.SALDO_INICIAL;

            });
            return result;
        }


        public RespuestaSP SP_GuardarAjuste(SG_AJUSTES_TANQUE ajus, int ID_COMBUSTIBLE, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_AJUSTE_TANQUE(ajus.ID_AJUSTE,ID_COMBUSTIBLE,ajus.FECHA,ajus.OBSERVACION,ajus.CANTIDAD, ID_USR, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }
    }
}
