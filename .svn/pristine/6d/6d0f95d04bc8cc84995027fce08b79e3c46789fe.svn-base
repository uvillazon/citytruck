using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common.Data;
using CityTruck.Common.Data.Interfaces;
using CityTruck.Model;
namespace CityTruck.Services
{
    public class BaseService
    {
        public string conexion;
        public void ExecuteManager(Action<IUnitOfWork> coreMethod, Action postCommit = null)
        {
            var uow = new UnitOfWork<CityTruckContext>();
            try
            {
                uow.Start();
                coreMethod(uow);
                uow.End();
                if (postCommit != null) postCommit();
            }
            catch (Exception)
            {
                uow.Rollback();
                throw;
            }

        }
    }
}