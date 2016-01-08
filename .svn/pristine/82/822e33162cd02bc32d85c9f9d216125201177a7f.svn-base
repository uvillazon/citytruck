using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Common.Data;
using CityTruck.Common.Data.Interfaces;
using CityTruck.Model;
using System.Data.Objects;

namespace CityTruck.Business
{
    public class SG_INGRESOSManager : Repository<SG_INGRESOS>
    {


        public SG_INGRESOSManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_INGRESOS> ObtenerIngresosPorMesyAnio(string ANIO, string MES)
        {
            var context = (CityTruckContext)Context;
            int anio = Convert.ToInt32(ANIO);
            int mes = Convert.ToInt32(MES);

            var query = context.SG_INGRESOS.Where(x => x.FECHA.Month == mes && x.FECHA.Year == anio);
            return query;
        }

        public IQueryable<SG_INGRESOS> ObtenerIngresoPorId(int ID)
        {
            var context = (CityTruckContext)Context;
            var query = context.SG_INGRESOS.Where(x => x.ID_INGRESO == ID);
            return query;
        }
    }
}
