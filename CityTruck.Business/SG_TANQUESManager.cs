﻿using System;
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
    public class SG_TANQUESManager : Repository<SG_TANQUES>
    {


        public SG_TANQUESManager(IUnitOfWork uow) : base(uow) { }

        //public IQueryable<SG_CAJAS> ObtenerCajasPorMesyAnio(string ANIO, string MES)
        //{
        //    var context = (CityTruckContext)Context;
        //    int anio = Convert.ToInt32(ANIO);
        //    int mes = Convert.ToInt32(MES);

        //    //var query = context.SG_CAJAS.Where(x => x.FECHA_REG.Month == mes && x.FECHA_REG.Year == anio);
        //    var query = context.SG_CAJAS.Where(x => x.FECHA_REG.Valu);
        //    return query;
        //}


        
    }
}
