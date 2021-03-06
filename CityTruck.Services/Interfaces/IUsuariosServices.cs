﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Expressions;

namespace CityTruck.Services.Interfaces
{
    public interface IUsuariosServices
    {
        IEnumerable<SG_USUARIOS> ObtenerUsuariosPorCriterio(Expression<Func<SG_USUARIOS, bool>> criterio);
        IEnumerable<SG_USUARIOS> ObtenerUsuariosPaginados(PagingInfo paginacion);
        IEnumerable<SG_PERFILES> ObtenerPerfilesPaginados(PagingInfo paginacion);
        IEnumerable<SG_MENU_OPCIONES> ObtenerMenuOpcionesPaginados(PagingInfo paginacion);
        IEnumerable<SG_MENU_OPCIONES> ObtenerMenuOpcionesPorCriterio(Expression<Func<SG_MENU_OPCIONES, bool>> criterio);

        RespuestaSP SP_GrabarUsuario(SG_USUARIOS usr, int ID_USR);
        RespuestaSP SP_GrabarPerfil(SG_PERFILES per, int ID_USR);
        //IEnumerable<SG_MENU_OPCIONES> Obtene(Expression<Func<SG_USUARIOS, bool>> criterio);
        //SG_USUARIOS
    }
}
