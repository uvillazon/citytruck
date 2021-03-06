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
    public interface IVentasDiariasServices
    {
        IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPaginado(PagingInfo paginacion ,string ANIO,string MES , string ANIO_MES = null);
        IEnumerable<SG_VENTAS_DIARIAS> ObtenerVentasDiariasPorCriterio(Expression<Func<SG_VENTAS_DIARIAS, bool>> criterio);
        IEnumerable<SG_AJUSTE_PRECIO> ObtenerAjustesPrecios(Expression<Func<SG_AJUSTE_PRECIO, bool>> criterio);

        SG_VENTAS_DIARIAS ObtenerVentaDiaria(Expression<Func<SG_VENTAS_DIARIAS, bool>> criterio);

        RespuestaSP SP_GrabarVentasDiarias(SG_POS_TURNOS p, int ID_USR);
        

        RespuestaSP SP_GrabarVentasDiarias(string Ventas, int ID_USR);
        RespuestaSP SP_GenerarVentasDiarias(SG_VENTAS_DIARIAS ventas, int ID_USR);
        RespuestaSP SP_VerificarEdicion(SG_POS_TURNOS p, int ID_USR);
        RespuestaSP SP_GrabarVentasCredito(SG_VENTAS_CREDITO p, int ID_USR);
        RespuestaSP SP_EliminarVentaCredito(int ID_VENTA, int ID_USR);

        VentasRegistroModel SP_UltimoReg();
        VentasRegistroModel SP_UltimoRegMN();

        IEnumerable<SG_VENTAS_CREDITO> ObtenerVentasCreditoPaginado(PagingInfo paginacion, FiltrosModel<VentasCreditoModel> filtros);
        IEnumerable<SG_VENTAS_CREDITO> ObtenerVentasCreditoPorCriterio(Expression<Func<SG_VENTAS_CREDITO, bool>> criterio= null);

        IEnumerable<SG_CONSUMOS> ObtenerConsumosPaginado(PagingInfo paginacion, FiltrosModel<ConsumosModel> filtros);
        IEnumerable<SG_CONSUMOS> ObtenerConsumosPorCriterio(Expression<Func<SG_CONSUMOS, bool>> criterio = null);
        RespuestaSP SP_GrabarConsumo(SG_CONSUMOS p, int ID_USR);
        RespuestaSP SP_EliminarConsumo(int ID_CONSUMO, int ID_USR);
        //RespuestaSP SP_GrabarVentasDiariasMN(string Ventas, int ID_USR);
        RespuestaSP SP_GrabarVentasDiariasMN(SG_POS_DIA_MN p, int ID_USR);
        RespuestaSP SP_GrabarVentasDiariasMNVacio(DateTime FECHA, int ID_USR);

        //SG_USUARIOS
    }
}
