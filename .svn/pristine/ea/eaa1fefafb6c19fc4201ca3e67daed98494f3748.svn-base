Ext.define("App.View.OrdenesTrabajo.PrincipalMapa", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalSeleccionarOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.OrdenesTrabajo.GridOrdenesTrabajo', {
            region: 'west',
            width: '45%'

        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_SeleccionarOT', 'SeleccionarOT`s', "layout_content", me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel");
        //me.panelMapa = Ext.create("App.Config.ux.GMapPanelv02", {
        //    center: {
        //        geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
        //        marker: { title: 'Fenway Park' }
        //    },
        //});
        me.panelMapa = Ext.create('App.Config.ux.GMapPanelv02', {
            xtype: 'gmappanel',
            region: 'center',
            width: '60%',
            zoomLevel: 3,
            gmapType: 'map',
            //mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            //mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl'],
            setCenter: {
                'lat': 37.4419,
                'lng': -122.1419,
                marker: { title: 'Palo Alto' }
            }
        });
        me.form.add(me.panelMapa);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarDatos: function () {

    },
    EventosBoton: function (btn, e) {
        var me = this;

        if (btn.getItemId() == "btn_SeleccionarOT") {
            ////me.panelMapa.
            if (me.grid.obtenerSeleccionados()==false) {
                alert("No se Selecciono ningun botton");
            }
            else {
                var lat = 104.644;
                Ext.each(me.grid.obtenerSeleccionados(), function (record) {
                    var latlng = new google.maps.LatLng(-24.397, lat);
                   
                    var marker = new google.maps.Marker({
                        position: latlng,
                        zoom: 10,
                        map: me.panelMapa.gmap
                    });
                    me.panelMapa.addMarkers(marker);
                    lat = lat + 50;
                    me.panelMapa.gmap.setCenter(latlng);

                });
                
                
            }
            //me.panelMapa.
        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
});
