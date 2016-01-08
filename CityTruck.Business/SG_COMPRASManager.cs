using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Common.Data;
using CityTruck.Model;
using CityTruck.Common.Data.Interfaces;
using System.Data.Objects;

namespace CityTruck.Business
{
    public class SG_COMPRASManager : Repository<SG_COMPRAS>
    {
        public SG_COMPRASManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_COMPRAS> ObtenerComprasPorMesyAnio(string ANIO, string MES)
        {
            var context = (CityTruckContext)Context;
            int anio = Convert.ToInt32(ANIO);
            int mes = Convert.ToInt32(MES);

            var query = context.SG_COMPRAS.Where(x => x.FECHA.Month == mes && x.FECHA.Year == anio);
            return query;
        }

    }
}
