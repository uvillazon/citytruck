using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Reporting.WebForms;
using CityTruck.WebSite.Reportes;

namespace CityTruck.WebSite.Controllers
{
    public class ReportesPDFController : Controller
    {
        //
        // GET: /ReportesPDF/
        private SourceReport repo = new SourceReport();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ReporteTransferencia(int ID)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTransferencia.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteTransferencia(ID));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteTransferenciav1(int ID)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTransferenciav1.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteTransferencia(ID));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteAmortizacion(int ID ,string FECHA_INICIO ,string FECHA_FINAL)
        {
            DateTime fechaIni = DateTime.ParseExact(FECHA_INICIO, "dd/MM/yyyy", null);
            DateTime fechaFin = DateTime.ParseExact(FECHA_FINAL, "dd/MM/yyyy", null);

            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteAmortizacion.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteKardexCliente(ID, fechaIni, fechaFin));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public void DemoSubreportProcessingEventHandler(object sender, SubreportProcessingEventArgs e)
        {
            DateTime fecha = DateTime.Parse(e.Parameters[0].Values[0]);
            String turno = e.Parameters[1].Values[0].ToString();
            var query = repo.ReporteVentaCredito(fecha, turno);
            var queryConsumo = repo.ReporteVentaConsumo(fecha, turno);
            var querytotal = repo.ReporteVentaCreditoConsumo(fecha, turno);
            ReportDataSource dataSource = new ReportDataSource("DataSetVentaCredito", query);
            //ReportDataSource dataSource = new ReportDataSource("DataSetVentaConsumo", query);
            e.DataSources.Add(new ReportDataSource("DataSetVentaConsumo", queryConsumo));
            e.DataSources.Add(new ReportDataSource("DataSetTotal", querytotal));
            //e.DataSources.Add(new ReportDataSource("DataSetSalida", query2));
            e.DataSources.Add(dataSource);
        }
        public ActionResult ReporteCmpVenta(string FECHA1, string TURNO)
        {
            LocalReport localReport = new LocalReport();
            DateTime FECHA = DateTime.ParseExact(FECHA1, "dd/MM/yyyy", null);
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteCmpVenta.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteVenta(FECHA1,TURNO));
            localReport.SubreportProcessing +=
                    new SubreportProcessingEventHandler(DemoSubreportProcessingEventHandler);
            //var queryConsumo = repo.ReporteVentaConsumo(FECHA, TURNO);
            //var querytotal = repo.ReporteVentaCreditoConsumo(FECHA, TURNO);
            //ReportDataSource dataSource = new ReportDataSource("DataSetVentaCredito", query);
            //ReportDataSource dataSource = new ReportDataSource("DataSetVentaConsumo", query);
            //localReport.DataSources.Add(new ReportDataSource("DataSetVentaConsumo", queryConsumo));
            //localReport.DataSources.Add(new ReportDataSource("DataSetTotal", querytotal));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteIngreso(int ID)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngreso.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteIngreso(ID));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteEgreso(int ID)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEgreso.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteEgreso(ID));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteCmpCompra(int ID_COMPRA)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteCompra.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteCompra(ID_COMPRA));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteAjuste(int ID)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteAjuste.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteAjusteTanque(ID));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteTanques(string ANIO = null, string MES = null) {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTanque.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteTanques(ANIO,MES));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteEstadoResultado(string ANIO = null, string MES = null)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEstadoResultadoCompleto.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteEstadoResultadoCompleto(ANIO, MES));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteEstadoResultadov1(string ANIO = null, string MES = null)
        {
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEstadoResultadoCompletov1.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteEstadoResultadoCompleto(ANIO, MES));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        public ActionResult ReporteANH(string ANIO = null, string MES = null)
        {
            LocalReport localReport = new LocalReport();
            //localReport.ReportPath = Server.MapPath("~/Reportes/ReporteANH.rdlc");
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePrueba.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", repo.ReporteANH(ANIO, MES));
            localReport.DataSources.Add(reportDataSource);
            string reportType = "PDF";
            string mimeType = "application/pdf";
            string encoding = "utf-8";
            string fileNameExtension = "pdf";
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
        
    }
}
