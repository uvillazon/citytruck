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
using System.Linq.Expressions;

namespace CityTruck.Services
{
    public class FacturasMNServices : BaseService, IFacturasMNServices
    {
        //private ISG_LISTASManager _manListas;

        public FacturasMNServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_FACTURAS_MN> ObtenerFacturasMN(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros)
        {
            IQueryable<SG_FACTURAS_MN> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_FACTURAS_MNManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GuardarFacturasMN(SG_FACTURAS_MN facturas, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_FACTURA_MN(facturas.ID_FACTURA,facturas.ID_COMBUSTIBLE,facturas.FECHA,facturas.IMPORTE,facturas.PRECIO,facturas.LITROS, ID_USR, p_res);
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


        public SG_FACTURAS_MN ObtenerFacturaPorCriterio(Expression<Func<SG_FACTURAS_MN, bool>> criterio = null)
        {
            SG_FACTURAS_MN result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_FACTURAS_MNManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }
    }
}
