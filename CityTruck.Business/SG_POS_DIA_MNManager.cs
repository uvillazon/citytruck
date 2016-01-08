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
    public class SG_POS_DIA_MNManager : Repository<SG_POS_DIA_MN>
    {


        public SG_POS_DIA_MNManager(IUnitOfWork uow) : base(uow) { }

        public IQueryable<SG_POS_DIA_MN> ObtenerVentasPorMesyAnio(string ANIO, string MES)
        {
            var context = (CityTruckContext)Context;
            int anio = Convert.ToInt32(ANIO);
            int mes = Convert.ToInt32(MES);

            var query = context.SG_POS_DIA_MN.Where(x => x.FECHA.Month == mes && x.FECHA.Year == anio);
         
            return query;
        }
        
    }
}
