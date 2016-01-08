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
    public class SG_VENTAS_CREDITOManager : Repository<SG_VENTAS_CREDITO>
    {


        public SG_VENTAS_CREDITOManager(IUnitOfWork uow) : base(uow) { }
    }
}
