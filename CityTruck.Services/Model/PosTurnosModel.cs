using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class PosTurnosModel
    {
        public int? ID_POS_TURNO { get; set; }
        public int? ID_POS { get; set; }
        public string TURNO { get; set; }
        public DateTime? FECHA { get; set; }
        public decimal? ENT_LITTER { get; set; }
        public decimal? SAL_LITTER { get; set; }
        public decimal? TOTAL { get; set; }
    }
}