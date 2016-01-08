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
    public class KardexClienteServices : BaseService, IKardexClienteServices
    {
        //private ISG_LISTASManager _manListas;

        public KardexClienteServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SG_KARDEX_CLIENTE> ObtenerKardexCliente(PagingInfo paginacion, FiltrosModel<KardexClienteModel> filtros, ConsumoAmortizacionModel consumos = null)
        {
            IQueryable<SG_KARDEX_CLIENTE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_KARDEX_CLIENTEManager(uow);
                //obtener todos los registros
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.FECHA_INICIAL != null) {
                    result = result.Where(x => x.FECHA >= filtros.FECHA_INICIAL);
                }
                if (filtros.FECHA_FINAL != null) {
                    DateTime fecha = (DateTime)filtros.FECHA_FINAL;
                    fecha = fecha.AddDays(1);
                    result = result.Where(x => x.FECHA < fecha);
                }
                paginacion.total = result.Count();
                consumos.consumo = result.Sum(x => x.CONSUMO);
                consumos.amortizacion = result.Sum(x => x.AMORTIZACION);

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public IEnumerable<SG_KARDEX_CLIENTE> ObtenerKardexClientePorCriterio(System.Linq.Expressions.Expression<Func<SG_KARDEX_CLIENTE, bool>> criterio = null)
        {
            IQueryable<SG_KARDEX_CLIENTE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_KARDEX_CLIENTEManager(uow);
                
                result = manager.BuscarTodos(criterio);
                //return result;

            });
            return result;
        }
    }
}
