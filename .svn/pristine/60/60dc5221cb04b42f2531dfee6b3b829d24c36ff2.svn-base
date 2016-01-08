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
    public class SG_EGRESOSManager : Repository<SG_EGRESOS>
    {


        public SG_EGRESOSManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_EGRESOS> ObtenerEgresosPorMesyAnio(string ANIO, string MES)
        {
            var context = (CityTruckContext)Context;
            int anio = Convert.ToInt32(ANIO);
            int mes = Convert.ToInt32(MES);

            var query = context.SG_EGRESOS.Where(x => x.FECHA.Month == mes && x.FECHA.Year == anio);
            return query;
        }

        public IQueryable<SG_EGRESOS> ObtenerEgresoPorId(int ID)
        {
            var context = (CityTruckContext)Context;
            var query = context.SG_EGRESOS.Where(x => x.ID_EGRESO == ID);
            return query;
        }

    }
}
