using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CityTruck.Services.Interfaces;
using CityTruck.WebSite.Models;
using CityTruck.Model;
using CityTruck.Common;

namespace CityTruck.WebSite.Controllers
{
    public class MenuOpcionesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IMenuOpcionesServices _serMen;
        private IUsuariosServices _serUsu;
        private IListasServices _serLista;

        public MenuOpcionesController(IMenuOpcionesServices serMen, IUsuariosServices serUsu, IListasServices serLista)
        {
            _serMen = serMen;
            _serUsu = serUsu;
            _serLista = serLista;
        }

        public ActionResult ObtenerMenuOpciones()
        {
            try
            {
                var id_perfil = User.Identity.Name.Split('-')[2];
                var login = User.Identity.Name.Split('-')[0];

                var usuario = _serUsu.ObtenerUsuariosPorCriterio(x => x.LOGIN.ToUpper() == login.ToUpper()).FirstOrDefault();
                var menus = usuario.SG_PERFILES.SG_PERFILES_OPCIONES.Select(x => x.SG_MENU_OPCIONES);
                menus = menus.OrderBy(x => x.ORDEN);
                //var menus = perfil.MN_PERFILES_OPCIONES.Select(x => x.MN_MENU_OPCIONES);

                //var menu = _mnMenOpcMng.ObtenerMenuOpciones(null);
                //menus = menus.OrderBy(x => x.ID_OPC);
                MenuOpcionesModel menu1 = new MenuOpcionesModel();
                var listas = _serLista.ObtenerTodasListas().Select(l => new {
                    ID_LISTA = l.ID_LISTA,
                    LISTA = l.LISTA
                });
                
                var menuOpciones = menu1.MenuBotton(menus.ToList());
                var Usr = new
                {
                    Login = usuario.LOGIN ,
                    Nombre = usuario.NOMBRE,
                    Perfil = usuario.SG_PERFILES.NOMBRE
                };
                //var result = menu1.MenuDinamico(menus.ToList());
                return Json(new { Usuario = Usr , Menu = menuOpciones ,Listas = listas});
            }
            catch (Exception)
            {
                return Json(new { success = false, msg = "Se produjo un error al intentar recuperar el menu de opciones" });
            }

        }

        [HttpPost]
        public JsonResult GuardarPerfilOpcion(SG_PERFILES_OPCIONES per)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serMen.SP_GuardarPerfilOpcion(per, id_usr.ToString());
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarPerfilOpcion(SG_PERFILES_OPCIONES per)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaRSP = new RespuestaSP();
            respuestaRSP = _serMen.SP_EliminarPerfilOpcion(per, id_usr.ToString());
            return Json(respuestaRSP);
        }
    }
}
