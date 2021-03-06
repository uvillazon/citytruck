﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IIngresosServices
    {
        IEnumerable<SG_INGRESOS> ObtenerIngresosPaginado(PagingInfo paginacion, string ANIO, string MES);
        RespuestaSP SP_GrabarIngreso(SG_INGRESOS ing,int ID_USR);

        IEnumerable<SG_EGRESOS> ObtenerEgresosPaginado(PagingInfo paginacion, string ANIO, string MES);
        RespuestaSP SP_GrabarEgreso(SG_EGRESOS egr, int ID_USR);
        RespuestaSP SP_EliminarIngreso(int ID_INGRESO, int ID_USR);
        RespuestaSP SP_EliminarEgreso(int ID_EGRESO, int ID_USR);


    }
}
