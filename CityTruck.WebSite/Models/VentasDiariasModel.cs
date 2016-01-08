using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CityTruck.Model;

namespace CityTruck.WebSite.Models
{
    public class VentasDiariasModel
    {
        public decimal VENTA_TOTAL { get; set; }
        public decimal VENTA_DIA { get; set; }
        public decimal VENTA_TARDE { get; set; }
        public decimal VENTA_NOCHE { get; set; }
        public DateTime? FECHA { get; set; }
      
       
    }
}
