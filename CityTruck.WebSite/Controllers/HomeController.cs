using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CityTruck.Services.Interfaces;
using CityTruck.Common;

namespace CityTruck.WebSite.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        private IListasServices _serLista;

        public HomeController(IListasServices serLista)
        {
            _serLista = serLista;
        }
        public ActionResult Index()
        {
            //ViewBag.Message = "Welcome to ASP.NET MVC!";
            //var filter = new PagingInfo
            //{
            //    page = 1,
            //    start = 1,
            //    limit = 100,
            //    sort = "ID_LISTA",
            //    dir = "ASC",
            //    _dc = 123213,
            //    callback = "sadadsad",
            //    search = null

            //};
            //_serLista.ObtenerListas(filter, null);
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
        [Authorize]
        public ActionResult AppIndex()
        {
            return View();
        }
        [HttpPost]
        public ActionResult CheckTimeout()
        {
            // If the browser session or authentication session has expired...
            if (User.Identity.Name == null || !User.Identity.IsAuthenticated)
            {
                var data = "_Logon_";
                return Json(data);
            }
            else
            {
                var data = "_LogIn_";
                return Json(data);
            }
        }
    }
}
