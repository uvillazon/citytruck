using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Data.Objects;

namespace CityTruck.WebSite.Reportes
{
    public partial class ReporteCmpVenta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void ReportViewer1_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            SourceReport report = new SourceReport();
            DateTime fecha = DateTime.Parse(e.Parameters[0].Values[0]);
            String turno = e.Parameters[1].Values[0].ToString();
            var query = report.ReporteVentaCredito(fecha, turno);
            var queryConsumo = report.ReporteVentaConsumo(fecha, turno);
            var querytotal = report.ReporteVentaCreditoConsumo(fecha, turno);
            ReportDataSource dataSource = new ReportDataSource("DataSetVentaCredito", query);
            //ReportDataSource dataSource = new ReportDataSource("DataSetVentaConsumo", query);
            e.DataSources.Add(new ReportDataSource("DataSetVentaConsumo", queryConsumo));
            e.DataSources.Add(new ReportDataSource("DataSetTotal", querytotal));
            //e.DataSources.Add(new ReportDataSource("DataSetSalida", query2));
            e.DataSources.Add(dataSource);
        }
    }
}