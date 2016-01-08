using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class CombustiblesModel
    {
        public int? ID_COMBUSTIBLE { get; set; }
        public string COMBUSTIBLE { get; set; }
        public decimal? PRECIO_VENTA { get; set; }
        public decimal? PRECIO_COMPRA { get; set; }
    }
    
}
