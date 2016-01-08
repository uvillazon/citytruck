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
    public class SG_USUARIOSManager : Repository<SG_USUARIOS>
    {


        public SG_USUARIOSManager(IUnitOfWork uow) : base(uow) { }


        
    }
}
