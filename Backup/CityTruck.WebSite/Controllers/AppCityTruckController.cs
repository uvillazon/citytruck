using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CityTruck.WebSite.Controllers
{
    [Authorize]
    public class AppCityTruckController : Controller
    {
        //
        // GET: /AppCityTruck/

        public ActionResult Index()
        {
            return View();
        }

    }
}
