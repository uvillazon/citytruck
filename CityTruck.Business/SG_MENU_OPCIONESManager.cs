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
    public class SG_MENU_OPCIONESManager : Repository<SG_MENU_OPCIONES>
    {


        public SG_MENU_OPCIONESManager(IUnitOfWork uow) : base(uow) { }
        
        
    }
}
