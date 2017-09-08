/*
 @licstart  The following is the entire license notice for the
 JavaScript code in this page.

 Copyright (C) 2015  CSU Phil-LiDAR 1
 http://csulidar1.info/
 http://www.edselmatt.com/

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version.  The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.


 @licend  The above is the entire license notice
 for the JavaScript code in this page.
 */

OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;

OpenLayers.DOTS_PER_INCH = 25.4 / .28;

OpenLayers.Util.onImageLoadErrorColor = "transparent";

var map, layer;

var water_level_station;

var ft;

var eventsLog, selectControl;

var tour;

var mm, rain_fall;

var url = "http://10.0.0.20:8081";

var geoserver_url = url + "/geoserver/gwc/service/wms";

var geoserver_url_nrt = url + "/geoserver/cite/wms";

var filterStrategy;

var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;

var workingOffline = false;

renderer = renderer ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

var wfs_url = url + "/geoserver/wfs";

var feature_ns = url + "/cite";

var style;

var guide;

var new_layer, wms_layer;

var ctrlSelectFeatures;

var exportMapControl;

var utc = new Date().toJSON().slice(0, 10);

var disclaimer_text = "Disclaimer: The information contained in this document is for general information purposes only. The information is provided by CSU Phil-LiDAR 1 and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability  for any purpose. Any reliance you place on such information is therefore strictly at your own risk.<br/><br/>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this document.";


var disclaimer_text_pdf_1 = "Disclaimer: The information contained in this document is for general information purposes only. The information is provided by CSU Phil-LiDAR 1 and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability  for any purpose. Any reliance you place on such information is therefore strictly at your own risk.";
var disclaimer_text_pdf_2 = "In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this document.";
//geojson for water level stations
var wl_json = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    125.555333,
                    9.319444
                ]
            },
            "properties": {
                "name": "Bangonay Bridge, Bangonay River, Jabonga, Agusan del Norte",
                "device_id": "BANGONAY_",
                "left_bank": 43.35,
                "right_bank": 42.81,
                "min_wl": 40.0,
                "max_wl": 45.0,
                "min_rain": 0,
                "max_rain": 20,
                "tick_rain": 2,
                "tick_wl": .5
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    125.539806,
                    9.126083
                ]
            },
            "properties": {
                "name": "Cabadbaran Bridge, Cabadbaran River, Cabadbaran City, Agusan del Norte",
                "device_id": "",
                "left_bank": 5.20,
                "right_bank": 1.88,
                "min_wl": -1,
                "max_wl": 6,
                "min_rain": 0,
                "max_rain": 28,
                "tick_rain": 3,
                "tick_wl": 1

            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    126.030635,
                    8.939813
                ]
            },
            "properties": {
                "name": "Cabtic Bridge, Tago River, San Miguel, Surigao del Sur",
                "device_id": "CABTIC_",
                "left_bank": 15.57,
                "right_bank": 14.83,
                "min_wl": 0,
                "max_wl": 20,
                "min_rain": 0,
                "max_rain": 20,
                "tick_rain": 4,
                "tick_wl": 4
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    125.528333,
                    9.317917
                ]
            },
            "properties": {
                "name": "Kalinawan Bridge, Kalinawan River, Jabonga, Agusan del Norte",
                "device_id": "KALINAWAN_",
                "left_bank": 35.4,
                "right_bank": 35.4,
                "min_wl": 32.0,
                "max_wl": 37.0,
                "min_rain": 0,
                "max_rain": 20,
                "tick_rain": 2,
                "tick_wl": .5
            }
        }
    ]
};
var wl_json_len = wl_json.features.length;

window.onload = function () {
    if (!window.jQuery) {
        document.write("<p>External JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>");
    }

    if (typeof google == 'undefined') {
        map_panel = document.getElementById('map_wrapper');
        map_panel.innerHTML = "<p>Google JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>"
        //document.write("<p>Google JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>");
    } else {
        init();
    }
}

style = new OpenLayers.Style({
    strokeOpacity: 1,
    strokeWidth: 1,
    fillOpacity: .8,
    cursor: "pointer"
}, {
    rules: [new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 3
        }),
        symbolizer: {
            fillColor: "#ff0000",
            strokeColor: "#343434",
            strokeWidth: .5
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 2
        }),
        symbolizer: {
            fillColor: "#FFA500",
            strokeColor: "#343434",
            strokeWidth: .5
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 1
        }),
        symbolizer: {
            fillColor: "#ffff00",
            strokeColor: "#343434",
            strokeWidth: .5
        }
    })]
});


//Zoom-in to the flood map if "Show Flood Map" is checked and "Show Affected Building and Structures" is unchecked
function setMapCenter(riverbasin_name) {
    var river_basins = [
        {
            "river_basin": "Cabadbaran River Basin",
            "lat": 125.56,
            "lon": 9.12
        },
        {
            "river_basin": "Hinatuan River Basin",
            "lat": 126.19,
            "lon": 8.45
        },
        {
            "river_basin": "Hubo-Otieza River Basin",
            "lat": 126.22,
            "lon": 8.76
        },
        {
            "river_basin": "Mainit-Tubay River Basin",
            "lat": 125.52,
            "lon": 9.35
        },
        {
            "river_basin": "Tago River Basin",
            "lat": 126.12,
            "lon": 8.95
        },
        {
            "river_basin": "Tandag River Basin",
            "lat": 126.18,
            "lon": 9.05
        },
        {
            "river_basin": "Bislig River Basin",
            "lat": 126.25,
            "lon": 8.16
        }
    ];
    if (($("#show_affected").is(":not(:checked)")) && $("#show_floodMap").is(":checked")) {
        for (i = 0; i < river_basins.length; i++) {
            if (river_basins[i].river_basin === riverbasin_name) {
                map.setCenter(new OpenLayers.LonLat(river_basins[i].lat, river_basins[i].lon).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 12);
            }
        }

    }
}

//add affected layer
function addVectorLayer(name, geoserver_name) {
    var layerName;
    var mLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
    for (var a = 0; a < mLayers.length; a++) {
        if (mLayers[a].getVisibility()) {
            layerName = mLayers[a].name;
        }
    }
    ;

    new_layer = new OpenLayers.Layer.Vector(name, {
        strategies: [new OpenLayers.Strategy.Fixed()],
        eventListeners: {
            loadend: function (a) {
                if (new_layer.features.length > 0) {
                    map.zoomToExtent(new_layer.getDataExtent());
                }
                $("#load_table").removeAttr("disabled", "disabled").val("Go");
                $("#resetQ").removeAttr("disabled", "disabled").val("Remove Filter");
                $("#locateMe").hide();
            },
            loadstart: function (a) {
                $("#load_table").attr("disabled", "disabled").val("Loading...");
                $("#resetQ").attr("disabled", "disabled").val("Loading...");
                $("#locateMe").show();
            }
        },
        projection: new OpenLayers.Projection("EPSG:4326"),
        displayProjection: new OpenLayers.Projection("EPSG:3857"),
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            url: wfs_url,
            featureType: geoserver_name,
            featureNS: feature_ns,
            geometryName: "geometry"
        }),
        renderers: renderer, //["SVG", "Canvas", "VML"],
        styleMap: new OpenLayers.StyleMap(style),
        displayInLayerSwitcher: !1
    });
    var b = $("#affectedLayer").val();
    var c = map.getLayersByName(b);
    var d = c.length;
    if (d < 1) {
        map.addLayer(new_layer);
        activateControls(new_layer);
    } else {
        if (layerName != b) {
            resetBuildingwithParam(b);
        }
        c[0].setVisibility(true);
    }
    toggleVectorLayer(name);
}


//add flood maps layer
function addWMSLayer(name, geoserver_name) {
    wms_layer = new OpenLayers.Layer.WMS(name, geoserver_url, {
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        format: "image/png",
        transparent: true,
        layers: "cite:" + geoserver_name,
        tiled: true,
        width: "256",
        height: "256",
        srs: "EPSG:32651",
        //styles: "cite:Hazard Map",
        tilesorigin: map.maxExtent.left + "," + map.maxExtent.bottom
    }, {
        displayInLayerSwitcher: !1
    }, {
        //useCanvas: OpenLayers.Layer.Grid.ONECANVASPERLAYER,
        isBaseLayer: false,
        yx: {'EPSG:32651': true},
        //opacity: 0.3,
        projection: "EPSG:32651",
        displayProjection: "EPSG:4326"
    });
    registerEvents(wms_layer);
    toggleWMSLayer(name);
}

//get municipality based on selected river basin
function getMunifromRiverBasin() {
    $.ajax({
        url: "get_muni/",
        type: "GET",
        data: {
            river_basin: $("#locality").val()
        },
        dataType: "json",
        async: !0,
        success: function (items) {
            $("#myErrorWrapper").hide();
            $.each(items, function (i, item) {
                $('#mymuni').append($('<option>', {
                    value: item[0],
                    text: item[0] + ', ' + item[1]
                }));
            });
        },
        error: function () {
            getMunifromRiverBasin(), $("#myErrorWrapper").show();
        }
    });

}

function toggleWMSLayer(a) {
    var b = map.layers;
    for (var c = 0; c < b.length; c++)
        if ("OpenLayers.Layer.WMS" == b[c].CLASS_NAME) {
            var d = b[c].name;
            if (d == a) {
                if (1 === a.length) {
                    a[0].setVisibility(true);
                }
            } else hideLayer(d);
        }
}

function toggleVectorLayer(a) {
    var b = map.layers;
    for (var c = 0; c < b.length; c++)
        if ("OpenLayers.Layer.Vector" == b[c].CLASS_NAME) {
            var d = b[c].name;
            if (d == a) {
                if ($("#show_water_level").is(":checked")) {
                    var wl_layer = map.getLayersByName("Water-level Stations");
                    wl_layer[0].setVisibility(true);
                }
            } else hideLayer(d);
        }
}

function hideLayer(a) {
    var b = map.getLayersByName(a);
    if (1 === b.length) {
        b[0].setVisibility(false);
    } else {
        console.log("Error");
    }
}

//display water-level in graph function
function pop_up(filename, station_name, left_bank, right_bank, min_wl, max_wl, min_rain, max_rain, tick_rain, tick_wl) {
    var a = [];
    var wl_forecast = "https://dl.dropboxusercontent.com/u/32420108/" + filename + "WL_FORECAST.CSV";
    var wl_actual = "https://dl.dropboxusercontent.com/u/32420108/" + filename + "WL_ACTUAL.CSV";
    var r_actual = "https://dl.dropboxusercontent.com/u/32420108/" + filename + "RAINFALL_ACTUAL.CSV"
    $.get(wl_forecast,function (b) {
        $.get(wl_actual,function (c) {
            $.get(r_actual,function (d) {
                var e = b.split("\n");
                var f = c.split("\n");
                var g = d.split("\n");
                var h = [],
                    i = [],
                    j = [];
                var k = e.length - 1;
                var l = f.length - 1;
                var m = g.length - 1;
                $.each(g, function (a, b) {
                    var c = b.split(",");
                    if (a > 0 && a < m) {
                        var d = c[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        j.push([Date.UTC(+d[3], d[1] - 1, +d[2], +d[4], +d[5]), parseFloat(c[1])]);
                    }
                });
                $.each(f, function (a, b) {
                    var c = b.split(",");
                    if (a > 0 && a < l) {
                        var d = c[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        i.push([Date.UTC(+d[3], d[1] - 1, +d[2], +d[4], +d[5]), parseFloat(c[1])]);
                    }
                });
                $.each(e, function (b, c) {
                    var d = c.split(",");
                    if (b > 0 && b < k) {
                        var e = d[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        h.push([Date.UTC(+e[3], e[1] - 1, +e[2], +e[4], +e[5]), parseFloat(d[1])]);
                        a.push(d[0]);
                    }
                });
                var n = moment(a[0]).format("lll");
                $("#forecast").highcharts({
                    chart: {
                        type: "line",
                        height: 400,
                        alignTicks: false
                    },
                    title: {
                        text: "Forecasted as of " + n + " in " + station_name
                    },
                    subtitle: {
                        text: 'Source:<a href="https://carsulidar1.wordpress.com/" target="_blank">CSU Phil-LiDAR 1</a>',
                        x: -20
                    },
                    xAxis: {
                        type: "datetime",
                        labels: {
                            formatter: function () {
                                return Highcharts.dateFormat("%b %e, %Y %I:%M %p", this.value);
                            },
                            dateTimeLabelFormats: {
                                hour: "%I:%M",
                                minute: "%I:%M %p",
                                day: "%e. %b",
                                week: "%e. %b",
                                month: "%b '%y",
                                year: "%Y"
                            },
                            padding: 5,
                            align: "center",
                            style: {
                                fontSize: "10px"
                            }
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            if ("Actual Rainfall in Last 24 hrs." != this.series.name) return Highcharts.dateFormat("%b %e, %Y %I:%M %p", new Date(this.x)) + "<br/>" + this.series.name + ": <b>" + this.y + " m</b>";
                            else return Highcharts.dateFormat("%b %e, %Y %I:%M %p", new Date(this.x)) + "<br/>" + this.series.name + ": <b>" + this.y + " mm</b>";
                        },
                        style: {
                            fontSize: "11px"
                        }
                    },
                    yAxis: [
                        {
                            min: min_wl,
                            max: max_wl,
                            tickInterval: tick_wl,
                            title: {
                                text: "Water Level,m"
                            },
                            plotLines: [
                                {
                                    value: right_bank,
                                    color: '#800000',
                                    dashStyle: 'shortdash',
                                    width: 2,
                                    label: {
                                        text: 'RIGHT BANK SPILLING LEVEL ' + right_bank + ' M. from MSL',
                                        align: 'right',
                                        styel: {
                                            color: '#800000'
                                        }
                                    }
                                },
                                {
                                    value: left_bank,
                                    color: '#cccc00',
                                    dashStyle: 'shortdash',
                                    width: 2,
                                    label: {
                                        text: 'LEFT BANK SPILLING LEVEL: ' + left_bank + ' M. from MSL',
                                        align: 'left',
                                        style: {
                                            color: '#cccc00'
                                        }

                                    }
                                }
                            ]
                        },
                        {
                            min: min_rain,
                            max: max_rain,
                            tickInterval: tick_rain,
                            plotLines: [
                                {
                                    value: 0,
                                    width: 1,
                                    color: "#808080"
                                }
                            ],
                            title: {
                                text: "Rainfall, mm/10-min"
                            },
                            opposite: !0,
                            reversed: !0,
                            min: 0,
                            max: 20
                        }
                    ],
                    series: [
                        {
                            name: "Forecasted Water Level",
                            data: h,
                            tooltip: {
                                valueSuffix: " m"
                            },
                            color: "#FF0000"
                        },
                        {
                            name: "Actual/Recorded Water Level",
                            data: i,
                            tooltip: {
                                valueSuffix: " m"
                            },
                            color: "#0000FF"
                        },
                        {
                            name: "Actual Rainfall in Last 24 hrs.",
                            data: j,
                            tooltip: {
                                valueSuffix: " mm"
                            },
                            yAxis: 1,
                            color: "#00FFFF"
                        }
                    ]
                });
            }).fail(function () {
                    $('#forecast').html("<p class='text-center' style='margin-top:10px;color:red'>Error! Getting data failed. Please try again later or refresh the page!</p>");
                });
        }).fail(function () {
                $('#forecast').html("<p class='text-center' style='margin-top:10px;color:red'>Error! Getting data failed. Please try again later or refresh the page!</p>");
            });
    }).fail(function () {
            $('#forecast').html("<p class='text-center' style='margin-top:10px;color:red'>Error! Getting data failed. Please try again later or refresh the page!</p>");
        });
}

$(window).load(function () {
    //bootstrap tour set-up
    guide = new Tour({
        steps: [
            {
                element: "#show_affected",
                title: "Affected Structures",
                content: "Check this to load the structures on the map for you to filter it, then click Go button."
            }
        ]
    });
    tour = new Tour({
        steps: [
            {
                element: "#locality",
                title: "Select Locality First",
                content: "Select River Basin, this will be the basis for the queries"
            },
            {
                element: "#flood_event",
                title: "Select Flood Event",
                content: "This option contains hypothetical and historical flood event."
            },
            {
                element: "#show_stats",
                title: "Show Estimated Affected Structures",
                content: "Check to show Estimated Number of Affected Structures (According to Flood Hazard Levels) based on your selected flood event and click Go button."
            },
            {
                element: "#show_floodMap",
                title: "Flood Hazard Map Visualization",
                content: "By checking this, Flood Map will be shown on the MAP PANEL below."
            },
            {
                element: "#show_affected",
                title: "Affected Structures Visualization",
                content: "By checking this, Affected Structures will be shown on the MAP PANEL below"
            },
            {
                element: "#load_table",
                title: "Go Button",
                content: "After setting up your query click this button. This will not trigger unless one of the checkbox is checked."
            },
            {
                element: "#water_station",
                title: "Water Level Station",
                content: "Select a water level station then click Go button to display graph."
            },
            {
                element: "#show_water_level",
                title: "Display Water Level Station",
                content: "Check this to display stations on the map. When checked, map will zoom-in to the selected station after clicking Go button."
            },
            {
                element: "#load_station",
                title: "Go Button",
                content: "Click to locate the station on the MAP panel and display the water level information in graph."
            }
        ],
        onEnd: function () {
            alert("Thank you for taking time with the tutorial. Contact us by clicking the link on the navigation bar.");
        }
    });
});

//add pop up to affected structures
function activateControls(a) {
    while (map.popups.length) map.removePopup(map.popups[0]);
    ctrlSelectFeatures.addLayer(a);
    a.events.on({
        featureselected: function (a) {
            var b = a.feature;
            var c = b.attributes.bldg_name;
            var d = b.attributes.bldg_type;
            var e = b.attributes.brgy_locat + ", " + b.attributes.municipali;
            b.popup = new OpenLayers.Popup.FramedCloud("pop", b.geometry.getBounds().getCenterLonLat(), null, "<h4>" + c + "</h4>" + d + "<br/>" + e, null, true);
            map.addPopup(b.popup);
        },
        featureunselected: function (a) {
            var b = a.feature;
            map.removePopup(b.popup);
            b.popup.destroy();
            b.popup = null;
        }
    });
}

//adding WMS layer
function registerEvents(a) {
    var b = $("#flood_event").find("option:selected").text();
    a.logEvent = function (a) {
        eventsLog.innerHTML = b + ": " + a;
    };
    a.events.register("loadstart", a, function () {
        this.logEvent("Loading Start.");
        $("#eventsLogID").show();
        $("#load_table").attr("disabled", "disabled");
        $("#load_table").val("Loading...");
    });
    a.events.register("tileloaded", a, function () {
        this.logEvent("Tile loaded. " + this.numLoadingTiles + " left.");
        $("#eventsLogID").show();
        $("#load_table").attr("disabled", "disabled");
        $("#load_table").val("Loading...");
    });
    a.events.register("loadend", a, function () {
        this.logEvent("Load End.");
        $("#eventsLogID").show();
        $("#load_table").removeAttr("disabled", "disabled");
        $("#load_table").val("Go");
    });
    a.events.register("loaderror", a, function () {
        $("#eventsLogID").hide();
        alert("Flood Hazard Map not available this time.");
    });
    var c = $("#floodLayer").val();
    var d = map.getLayersByName(c);
    var e = d.length;
    if (e < 1) map.addLayer(a);
    else d[0].setVisibility(true);
}

function getFormattedTime(a) {
    var b = parseInt(a.substring(0, 2), 10);
    var c = (b + 11) % 12 + 1;
    var d = b > 11 ? "PM" : "AM";
    var e = a.substring(2);
    return c + ":" + e + d;
}

function tableHeaderText() {
    return $.ajax({
        url: "get_date/",
        data: {
            river_basin: $("#locality").val()
        },
        dataType: "json"
    });
}


function waterLevel() {
    var water_level_style = new OpenLayers.StyleMap({
        default: new OpenLayers.Style({
            externalGraphic: "../static/images/rainfall.png",
            graphicHeight: 36,
            graphicWidth: 30,
            graphicXOffset: -15,
            graphicYOffset: -36,
            cursor: "pointer"
        }),
        select: new OpenLayers.Style({
            externalGraphic: "../static/images/rainfall.png",
            graphicHeight: 36,
            graphicWidth: 30,
            graphicXOffset: -15,
            graphicYOffset: -36,
            graphicOpacity: .8
        })
    });

    var geojson_format = new OpenLayers.Format.GeoJSON({
        internalProjection: new OpenLayers.Projection("EPSG:3857"),
        externalProjection: new OpenLayers.Projection("EPSG:4326")
    });
    water_level_station = new OpenLayers.Layer.Vector("Water-level Stations", {
        styleMap: water_level_style,
        displayInLayerSwitcher: !1
    });
    water_level_station.addFeatures(geojson_format.read(wl_json));

    map.addLayer(water_level_station);
    water_level_station.setVisibility(!1);

    water_level_station.events.on({
        /*"loadstart":function(e) {
         $('#show_affected span').addClass('getme').text('Loading...')
         },
         "loadend":function(e) {
         $('#show_affected span').removeClass('getme').text('Show Affected Building and Structures')
         },*/
        "featureselected": function (e) {
            var b = e.feature;
            map.zoomToExtent(b.geometry.getBounds());
            deviceID = e.feature.attributes.device_id;
            station_name = e.feature.attributes.name;
            left_bank = e.feature.attributes.left_bank;
            right_bank = e.feature.attributes.right_bank;
            min_wl = e.feature.attributes.min_wl;
            max_wl = e.feature.attributes.max_wl;
            min_rain = e.feature.attributes.min_rain;
            max_rain = e.feature.attributes.max_rain;
            tick_rain = e.feature.attributes.tick_rain;
            tick_wl = e.feature.attributes.tick_wl;
            pop_up(deviceID, station_name, left_bank, right_bank, min_wl, max_wl, min_rain, max_rain, tick_rain, tick_wl);
            $("#modal-content").modal({
                show: !0
            }).appendTo("#map");
        },
        "featureunselected": function () {
            $("#modal-content").modal({
                show: !1
            });
            $('#forecast').html('<p class="text-center" style="margin-top:10px">Graph will render here...Please wait.</p>');
        }
    });
};

//load base map and water level
function init() {
    eventsLog = OpenLayers.Util.getElement("eventsLogID");
    var B = new OpenLayers.Projection("EPSG:4326");
    var C = new OpenLayers.Projection("EPSG:32651");
    var googleMercator = new OpenLayers.Projection("EPSG:900913");
    var wgs84 = new OpenLayers.Projection("EPSG:4326");
    var D = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34)

    map = new OpenLayers.Map("map", {
        controls: [new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.ZoomPanel({
                title: "Zoom Panel"
            }),
            new OpenLayers.Control.MousePosition({
                prefix: '<small style="color:#fff">',
                suffix: "</small>",
                numDigits: 2,
                emptyString: '<small style="color:red">Mouse is not over the map.</small>'
            }),
            new OpenLayers.Control.NavToolbar()
        ],
        projection: googleMercator,
        displayProjection: wgs84,
        units: "m",
        maxResolution: 156543.0339,
        maxExtent: D
    });

    map.events.on({
        "moveend": function () {
            console.log(map.getCenter().toString());
        }
    });


    var E = new OpenLayers.Layer.Google("Google Satellite", {
            type: google.maps.MapTypeId.SATELLITE,
            sphericalMercator: true,
            numZoomLevels: 20,
            visibility: !1
        }),
        F = new OpenLayers.Layer.Google("Google Physical", {
            type: google.maps.MapTypeId.TERRAIN,
            sphericalMercator: true,
            visibility: !1
        }),
        G = new OpenLayers.Layer.Google("Google Streets", {
            numZoomLevels: 20,
            sphericalMercator: true,
            visibility: !1
        }),
        H = new OpenLayers.Layer.Google("Google Hybrid", {
            type: google.maps.MapTypeId.HYBRID,
            sphericalMercator: true,
            numZoomLevels: 20,
            visibility: !0
        });


    //adding base layers
    map.addLayers([H, E, F, G]);
    //call water level function to on window load
    waterLevel();

    map.setCenter(new OpenLayers.LonLat(125.75, 9.19).transform('EPSG:4326', 'EPSG:3857'), 10);

    var I = new OpenLayers.Control.NavigationHistory({
        previousOptions: {
            title: "Previous Map Extent"
        },
        nextOptions: {
            title: "Next Map Extent"
        }
    });
    map.addControl(I);
    //exportMapControl = new OpenLayers.Control.ExportMap();
    //map.addControl(exportMapControl);

    var J = new OpenLayers.Control.Panel();
    J.addControls([I.previous, I.next, new OpenLayers.Control.FullScreen({
        title: "Click to toggle FullScreen"
    })]);

    ctrlSelectFeatures = new OpenLayers.Control.SelectFeature(water_level_station, {
        clickout: true,
        toggle: false,
        multiple: false,
        hover: false
    });

    "undefined" != typeof ctrlSelectFeatures.handlers ? ctrlSelectFeatures.handlers.feature.stopDown = !1 : "undefined" != typeof ctrlSelectFeatures.handler && (ctrlSelectFeatures.handler.stopDown = !1,
        ctrlSelectFeatures.handler.stopUp = !1);

    map.addControls([ctrlSelectFeatures, J, I]);
    ctrlSelectFeatures.activate();

    $('.olControlZoomBoxItemInactive').attr('title', 'Magnify on the Map');
    $('.olControlNavigationItemActive').attr('title', 'Pan on the Map');
}

function toggleControl(e) {
    "Water-level Stations" == e.value && water_level_station.setVisibility(e.checked);
}

function resetBuilding() {
    //check visible vector layer then remove filter and refresh
    while (map.popups.length) map.removePopup(map.popups[0]);
    var mLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
    for (var a = 0; a < mLayers.length; a++) {
        if (mLayers[a].getVisibility()) {
            var layerName = mLayers[a].name;
            //console.log(layerName);
            var vlayer = map.getLayersByName(layerName);
            vlayer[0].filter = null;
            vlayer[0].refresh({
                force: true
            });
            /*vlayer[0].events.register("loadstart", vlayer[0], function() {
             $("#resetQ").attr("disabled", "disabled").val("Loading...");
             });
             vlayer[0].events.register("loadend", vlayer[0], function() {
             if (vlayer[0].features.length > 0) {
             map.zoomToExtent(vlayer[0].getDataExtent());
             console.log('vlayer load end withtout param');
             }
             $("#resetQ").removeAttr("disabled", "disabled").val("Remove Filter");
             });*/
        }
    }
    ;
}

function resetBuildingwithParam(layerName) {
    //console.log("resetBuildingwithParam");
    while (map.popups.length) map.removePopup(map.popups[0]);
    var vlayer = map.getLayersByName(layerName);
    vlayer[0].filter = null;
    vlayer[0].refresh({
        force: true
    });
    if (vlayer[0].features.length > 0) {
        //console.log(vlayer);
        map.zoomToExtent(vlayer[0].getDataExtent());
    }
}


$(document).on('change', '#locality', function () {
    console.log('wew');
    $('#flood_event option[value="Nothing Dude"]').each(function (index) {
        $(this).attr('disabled', true);

    });
});


$(document).ready(function () {

    $('#btnprint').click(function () {
        var layers = "";
        for (var i = 0; i < map.layers.length; i++) {
            if (map.layers[i].visibility == true) {
                //get a string of visible layers
                layers = layers + map.layers[i].name + ','
            }
        }
        //remove the trailing ','
        layers = layers.slice(0, -1);
        console.log(layers);
        console.log(map.getExtent());
    });
    //$("#btnprint").attr("href", printUrl);


    for (i = 0; i < wl_json_len; i++) {
        $('#water_station').append($('<option>', {
            value: wl_json.features[i].properties["device_id"],
            text: wl_json.features[i].properties["name"]
        }));
    }

    $("#bldg_type").multiselect({
        buttonWidth: "200px",
        maxHeight: 300
    });

    $("#modal-content").on("hidden.bs.modal", function () {
        ctrlSelectFeatures.unselectAll();
    });

    var filename = $("#water_station").val();
    var station_name = $("#water_station").find("option:selected").text();

    $('#water_station').on('change', function () {
        filename = $("#water_station").val();
        station_name = $("#water_station").find("option:selected").text();
    });


    //water level button
    $('#load_station').click(function () {
        if ($("#show_water_level").is(":checked")) {
            for (var f = 0; f < water_level_station.features.length; f++) {
                if (water_level_station.features[f].attributes.name === station_name) {
                    featsel = water_level_station.features[f];
                    ctrlSelectFeatures.clickFeature(featsel);
                    break;
                }
            }
        } else {
            var len = wl_json.features.length;
            for (var k = 0; k < len; k++) {
                jsonObj_device_name = wl_json.features[k].properties.name;
                if (jsonObj_device_name === station_name) {
                    left_bank = wl_json.features[k].properties.left_bank;
                    right_bank = wl_json.features[k].properties.right_bank;
                    min_wl = wl_json.features[k].properties.min_wl;
                    max_wl = wl_json.features[k].properties.max_wl;
                    min_rain = wl_json.features[k].properties.min_rain;
                    max_rain = wl_json.features[k].properties.max_rain;
                    tick_rain = wl_json.features[k].properties.tick_rain;
                    tick_wl = wl_json.features[k].properties.tick_wl;
                    pop_up(filename, station_name, left_bank, right_bank, min_wl, max_wl, min_rain, max_rain, tick_rain, tick_wl);
                }
            }
            $("#modal-content").modal({
                show: !0
            }).appendTo("#map");
        }
    });

    $("#modal-content").on("hidden.bs.modal", function () {
        ctrlSelectFeatures.unselectAll();
        $('#forecast').html('<p class="text-center" style="margin-top:10px">Rendering graph...Please wait.</p>');
    });

    //bootstrap tour initialization
    $("#how_to").click(function () {
        tour.init();
        tour.restart();
    });

    $("#flood_event").on("change", function () {
        $("#detailed_table_header,#detailed_table_wrapper").hide();
        $("#loading_detailed_table").hide()
    });


    $("#resetQ").click(function () {
        $("#table_brgy").find("tr").removeClass("clicked");
        resetBuilding();
    });

    //toggle flood maps
    $("#show_floodMap").click(function () {
        var mLayers = map.getLayersByClass("OpenLayers.Layer.WMS");
        var floodLayer = $("#floodLayer").val();
        for (var a = 0; a < mLayers.length; a++) {
            var layerName = mLayers[a].name;
            var vlayer = map.getLayersByName(layerName);
            if (layerName == floodLayer && $(this).is(":checked")) {
                vlayer[0].setVisibility(true);
                $("#eventsLogID").show();
                $("#floodDate").show();

            } else {
                vlayer[0].setVisibility(false);
                $("#eventsLogID").hide();
                $("#floodDate").hide();
            }
        }
        ;
    });

    //toggle affected layer
    $("#show_affected").click(function () {
        var mLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
        var floodLayer = $("#affectedLayer").val();

        for (var a = 0; a < mLayers.length; a++) {
            var layerName = mLayers[a].name;
            var vlayer = map.getLayersByName(layerName);
            if (layerName == floodLayer && $(this).is(":checked")) {
                $("#floodDate").show();
                vlayer[0].setVisibility(true)
            } else if ((layerName === "Water-level Stations") && $("#show_water_level").is(":checked")) {
                vlayer[0].setVisibility(true);
            } else {
                vlayer[0].setVisibility(false);
                $("#floodDate").hide();
            }
        }
        ;
    });


    //function for detailed table statistics
    function f_detailed_table(brgy, munisipyo, flood_event, river_basin_name) {
        $('#table_brgy').dataTable().fnDestroy();
        var f = $("#bldg_type option:selected"),
            g = [];
        return f.each(function () {
            g.push($(this).val());
        }), $.ajax({
            url: "cnt_bldg/",
            type: "GET",
            dataType: "JSON",
            data: {
                brgy_id: brgy,
                bldg_type: g,
                munisipyo: munisipyo,
                floodEvent: flood_event
            },
            beforeSend: function () {
                $("#find").val("Searching...");
                $("#find").attr("disabled", "disabled");
                $("#detailed_table_wrapper").hide();
                $("#loading_detailed_table").show().html("<img src='../static/images/loading_spinner.gif' class='text-center'/>");
                $("#detailed_table_header").show();
            },
            success: function (e) {
                $("#find").val("Search");
                $("#find").removeAttr("disabled", "disabled");
                $("#myErrorWrapper").hide();

                var header_print = $('#detailed_table_header').text();
                if (0 == e.length) {
                    $("#detailed_table_wrapper").hide();
                    $("#loading_detailed_table").show().html("<strong><p>NO STRUCTURES were affected.</p></strong>");
                } else {
                    $("#detailed_table_wrapper").css({
                        visibility: "visible",
                        height: "100%"
                    });
                    $("#detailed_table_header,#detailed_table_wrapper").show();
                    $("#loading_detailed_table").hide();
                    $("#table_brgy").dataTable({
                        data: e,
                        columns: [
                            {
                                title: "Flood Hazard Level"
                            },
                            {
                                title: "Building Name"
                            },
                            {
                                title: "Building Type"
                            },
                            {
                                title: "Count"
                            }
                        ],
                        colReorder: {
                            order: [1, 2, 3, 0]
                        },
                        columnDefs: [
                            {
                                "render": function (data, type, row) {
                                    return data == 1 ? 'Low' : data == 2 ? 'Medium' : 'High';
                                },
                                "targets": 0
                            },
                            {
                                "width": "35%",
                                "targets": 1
                            },
                            {
                                "width": "35%",
                                "targets": 2
                            },
                            {
                                "width": "10%",
                                "targets": 3
                            }
                        ],
                        dom: 'Bfrtip',
                        order: [1, 'asc'],
                        buttons: [
                            {
                                extend: 'print',
                                title: ' ',
                                message: '<h4>' + header_print + ' in ' + river_basin_name + '</h4>',
                                customize: function (win) {
                                    $(win.document.body).append('<p style="text-align:justify">' + disclaimer_text + '</p>');
                                    $(win.document.body).prepend('<img src="https://dl.dropboxusercontent.com/u/75734877/header_pdf.png" style="width:700px;height:auto;text-align:center" />');
                                }
                            },
                            {
                                extend: 'collection',
                                text: 'Export',
                                buttons: [
                                    {
                                        extend: 'excelHtml5',
                                        text: 'CSV',
                                        filename: 'csulidar1_flood_evidens_' + utc,
                                        sheetName: "Flood EViDEns",
                                        footer: true,
                                        exportOptions: {
                                            format: {
                                                footer: function (data, columnIdx) {
                                                    if (columnIdx == 0) {
                                                        return disclaimer_text;
                                                    } else {
                                                        return " ";
                                                    }

                                                },
                                                header: function (data, columnIdx) {
                                                    if (columnIdx == 0) {
                                                        return header_print + ' in ' + river_basin_name;
                                                    } else {
                                                        return data;
                                                    }
                                                }
                                            }
                                        },
                                    },
                                    {
                                        extend: 'pdfHtml5',
                                        text: 'PDF',
                                        //message: header_print + ' in ' + river_basin_name,
                                        title: ' ',
                                        filename: 'csulidar1_flood_evidens_' + utc,
                                        customize: function (doc) {
                                            var cols = [];
                                            var objFooter = {};
                                            objFooter['columns'] = cols;
                                            doc['footer'] = objFooter;


                                            doc.content.splice(1, 0, {
                                                margin: [ 0, 0, 0, 12 ],
                                                alignment: 'center',
                                                image: 'data:image/png;base64,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',
                                                width: 500
                                            });
                                            doc.content.splice(2, 0, {
                                                margin: [0, 12, 0, 12],
                                                alignment: 'center',
                                                text: header_print + ' in ' + river_basin_name,
                                                bold: true,
                                                fontSize: 14,
                                            });
                                            doc.content.splice(5, 0, {
                                                margin: [0, 12, 0, 5],
                                                alignment: 'justify',
                                                text: disclaimer_text_pdf_1,
                                                //bold: true,
                                            });
                                            doc.content.splice(6, 0, {
                                                margin: [0, 5, 0, 12],
                                                alignment: 'justify',
                                                text: disclaimer_text_pdf_2,
                                                //bold: true,
                                            });
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                }
            },
            error: function () {
                $("#as_of").hide(), $("#myErrorWrapper").show(), $("#detailed_table_header").html(""), $("#find").removeAttr("disabled", "disabled");
            }
        }), !1;
    }

    //button for detailed hazard information
    $("#find").click(function () {
        var brgy = $("#myplaces :selected").text();
        var muni = $("#mymuni").val();
        var get_full_muni = $("#mymuni :selected").text();
        var river_basin_name = $("#locality").find("option:selected").text();
        var flood_event = $("#flood_event").find("option:selected").text();
        var flood_event_val = $("#flood_event").val();

        var f = $("#bldg_type option:selected"),
            g = [];
        f.each(function () {
            return g.push($(this).val());
        });

        var bldg_type_lsit = "";
        var bldg_type_len = g.length;
        if (bldg_type_len > 0) {
            bldg_type_lsit = "(" + g + ")";
        }

        $('#flood_event').on('change', function () {
            flood_event = $(this).find("option:selected").text();
            flood_event_val = $("#flood_event").val();
        });


        "Select Barangay" == brgy && (brgy = "All Barangays");
        "Select Municipality" == get_full_muni && (get_full_muni = "All Municipalities");

        //table general stats header
        tableHeaderText().success(function (a) {
            var custom_msg;
            var date_length = a.length;
            if ((null == a) || (date_length == 0)) {
                if ((flood_event == "Agaton 2014") || (flood_event == "Seniang 2014") || (typeof(flood_event) == 'undefined')) {
                    $("#detailed_table_header").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures " + bldg_type_lsit + " in " + brgy + " , " + get_full_muni + " for " + flood_event + " Flood Event</strong></h4>");
                } else {
                    split_c = flood_event.split("(");
                    mm = split_c[0];
                    rain_fall = split_c[1].replace(')', '');
                    split_rainfall = rain_fall.split("-");
                    prob = 100 / parseInt(split_rainfall[0]);
                    console.log(prob);
                    $("#detailed_table_header").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures " + bldg_type_lsit + " in " + brgy + " , " + get_full_muni + " for " + rain_fall + " (Amount: " + mm + ") Flood Event</strong></h4>");
                }
            } else {
                var dd = a[0];
                var d = dd.split(" ");
                var e = d[3];
                var ft = d[1] + " " + d[2] + ", " + d[0] + " " + getFormattedTime(e);
                if ("Near-real Time" == flood_event) {
                    $("#detailed_table_header").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures " + bldg_type_lsit + " in " + brgy + " , " + get_full_muni + " as of " + ft + "</strong></h4>");
                } else {
                    if ((flood_event == "Agaton 2014") || (flood_event == "Seniang 2014") || (typeof(flood_event) == 'undefined')) {
                        $("#detailed_table_header").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures " + bldg_type_lsit + " in " + brgy + " , " + get_full_muni + " for " + flood_event + " Flood Event</strong></h4>");
                    } else {
                        split_c = flood_event.split("(");
                        mm = split_c[0];
                        rain_fall = split_c[1].replace(')', '');
                        split_rainfall = rain_fall.split("-");
                        prob = 100 / parseInt(split_rainfall[0]);
                        console.log(prob);
                        $("#detailed_table_header").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures " + bldg_type_lsit + " in " + brgy + " , " + get_full_muni + " for " + rain_fall + " (Amount: " + mm + ") Flood Event</strong></h4>");
                    }
                }
            }
        });

        f_detailed_table(brgy, muni, flood_event_val, river_basin_name);
    });

    //locating affected structures on the map
    $("#table_brgy").on("click", "tbody tr", function (a) {
        a.preventDefault();
        $("#table_brgy tr").removeClass("clicked");
        var bldg_name = $(this).find("td").first().text();
        var bldg_type = $(this).closest("tr").find("td:eq(1)").text();
        var hazard_level = $(this).find("td").last().text();
        var gridnumber;
        var get_barangay = $("#myplaces option:selected").text();
        var get_munisipyo = $("#mymuni").val();

        //convert hazard level to gridcode;3 for High, 2 for Medium and 1 for Low
        if ("High" === hazard_level) {
            gridnumber = 3;
        } else if ("Medium" === hazard_level) {
            gridnumber = 2;
        } else if ("Low" === hazard_level) {
            gridnumber = 1;
        }

        //filter here and refresh
        while (map.popups.length) map.removePopup(map.popups[0]);
        if ($("input#show_affected").is(":checked")) {
            var mLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
            for (var a = 0; a < mLayers.length; a++) {
                if (mLayers[a].getVisibility()) {
                    var layerName = mLayers[a].name;
                    var vlayer = map.getLayersByName(layerName);
                    vlayer[0].filter = new OpenLayers.Filter.Logical({
                        type: OpenLayers.Filter.Logical.AND,
                        filters: [new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.LIKE,
                            property: "bldg_name",
                            value: bldg_name
                        }), new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.LIKE,
                            property: "bldg_type",
                            value: bldg_type
                        }), new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "gridcode",
                            value: gridnumber
                        })]
                    });
                    if ((get_munisipyo != "All Municipalities") && ((get_barangay === "Select Barangay") || (get_barangay === "All Barangays"))) {
                        vlayer[0].filter.filters.push(
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.LIKE,
                                property: "municipali",
                                value: get_munisipyo
                            })
                        )
                    } else if ((get_munisipyo != "All Municipalities") && ((get_barangay != "Select Barangay") || (get_barangay != "All Barangays"))) {
                        vlayer[0].filter.filters.push(
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.LIKE,
                                property: "municipali",
                                value: get_munisipyo
                            }), new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.LIKE,
                                property: "brgy_locat",
                                value: get_barangay
                            })
                        )
                    }
                    vlayer[0].refresh({
                        force: true
                    });
                    vlayer[0].events.register("loadend", vlayer[0], function () {
                        map.zoomToExtent(vlayer[0].getDataExtent());
                    });
                }
            }
            ; //end for loop
            $(this).addClass("clicked");
        } else {
            guide.init();
            guide.restart();
        }
    });
});

$(document).ready(function () {

    //function for the general statistics according to hazard level
    function f_general_stats(river_basin, flood_event) {
        $('#jsontable_brgy').dataTable().fnDestroy();
        $.ajax({
            url: "tbl/",
            dataType: "json",
            data: {
                flood_event: $("#flood_event").val()
            },
            beforeSend: function () {
                $("#load_table").attr("disabled", "disabled").val("Loading...");
                $("#stats_wrapper").hide();
                $("#loading_table").show().html("<img src='../static/images/loading_spinner.gif' class='text-center'/>");
            },
            success: function (stats_data) {
                $('.panel-collapse:not(".in")').collapse("show");
                $("#stats_wrapper").show();
                $("#load_table").removeAttr("disabled", "disabled").val("Go");
                $("#stats, #hide_table").show();
                var info = $("#h3").text() + " in " + river_basin;
                if (0 == stats_data.length) {
                    $("#info_tbl").text("").fadeOut(1e3).removeClass("getme"), $("#myErrorWrapper").hide(), $("#table_wrapper").show();
                    $("#stats_wrapper").hide();
                    $("#loading_table").show().html("<strong><p>NO STRUCTURES were affected.</p></strong>");
                } else {
                    $("#loading_table").hide();
                    $("#info_tbl").text("").fadeOut(1e3).removeClass("getme"), $("#myErrorWrapper").hide(),
                        $("#table_wrapper").show();
                    var add_info = $("p#tbl_info").text();
                    $('#jsontable_brgy').dataTable({
                        order: [1, 'asc'],
                        data: stats_data,
                        columns: [
                            {
                                title: "Barangay"
                            },
                            {
                                title: "Municipality"
                            },
                            {
                                title: "High"
                            },
                            {
                                title: "Medium"
                            },
                            {
                                title: "Low"
                            }
                        ],
                        colReorder: {
                            order: [1, 0, 4, 3, 2]
                        },
                        columnDefs: [
                            {
                                "width": "15%",
                                "targets": 4
                            },
                            {
                                "width": "15%",
                                "targets": 3
                            },
                            {
                                "width": "15%",
                                "targets": 2
                            }
                        ],
                        dom: 'Bfrtip',
                        /*footerCallback: function ( row, data, start, end, display ) {
                         var api = this.api(), data;

                         // Total over all pages
                         medium_total = api
                         .column( 4 )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Total over this page
                         medium_pageTotal = api
                         .column( 4, { page: 'current'} )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Total over all pages
                         low_total = api
                         .column( 3 )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Total over this page
                         low_pageTotal = api
                         .column( 3, { page: 'current'} )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Total over all pages
                         high_total = api
                         .column( 2 )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Total over this page
                         high_pageTotal = api
                         .column( 2, { page: 'current'} )
                         .data()
                         .reduce( function (a, b) {
                         return (a + b);
                         }, 0 );

                         // Update footer
                         $( api.column( 4 ).footer() ).html(
                         medium_pageTotal +' ('+ medium_total +' total)'
                         );
                         // Update footer
                         $( api.column( 3 ).footer() ).html(
                         low_pageTotal +' ('+ low_total +' total)'
                         );
                         // Update footer
                         $( api.column( 2 ).footer() ).html(
                         high_pageTotal +' ('+ high_total +' total)'
                         );
                         },*/
                        buttons: [
                            {
                                extend: 'print',
                                title: ' ',
                                message: '<h4>' + info + '</h4><br/>' + add_info,
                                customize: function (win) {
                                    $(win.document.body).append('<p style="text-align:justify">' + disclaimer_text + '</p>');
                                    $(win.document.body).prepend('<img src="https://dl.dropboxusercontent.com/u/75734877/header_pdf.png" style="width:700px;height:auto;text-align:center" />');
                                }
                            },
                            {
                                extend: 'collection',
                                text: 'Export',
                                buttons: [
                                    {
                                        extend: 'excelHtml5',
                                        text: 'CSV',
                                        filename: 'csulidar1_flood_evidens_' + utc,
                                        sheetName: "Flood EViDEns",
                                        footer: true,
                                        exportOptions: {
                                            format: {
                                                footer: function (data, columnIdx) {
                                                    if (columnIdx == 0) {
                                                        return disclaimer_text;
                                                    } else {
                                                        return " ";
                                                    }

                                                },
                                                header: function (data, columnIdx) {
                                                    if (columnIdx == 0) {
                                                        return info;
                                                    } else {
                                                        return data;
                                                    }
                                                }
                                            }
                                        },
                                    },
                                    {
                                        extend: 'pdfHtml5',
                                        text: 'PDF',
                                        //message: info,
                                        title: ' ',
                                        filename: 'csulidar1_flood_evidens_' + utc,
                                        customize: function (doc) {

                                            doc.content.splice(1, 0, {
                                                margin: [ 0, 0, 0, 12 ],
                                                alignment: 'center',
                                                image: 'data:image/png;base64,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',
                                                width: 500
                                            });

                                            doc.content.splice(2, 0, {
                                                margin: [0, 0, 0, 12],
                                                alignment: 'center',
                                                text: info,
                                                bold: true,
                                                fontSize: 14,
                                            });
                                            doc.content.splice(3, 0, {
                                                margin: [0, 12, 0, 12],
                                                alignment: 'center',
                                                text: add_info,
                                                //bold: true,
                                                fontSize: 10,
                                            });
                                            doc.content.splice(5, 0, {
                                                margin: [0, 12, 0, 5],
                                                alignment: 'justify',
                                                text: disclaimer_text_pdf_1,
                                                //bold: true,
                                            });
                                            doc.content.splice(6, 0, {
                                                margin: [0, 5, 0, 12],
                                                alignment: 'justify',
                                                text: disclaimer_text_pdf_2,
                                                //bold: true,
                                            });
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                }
            },
            error: function () {
                $("#myErrorWrapper").show();
            }
        });
    }

    if ($(window).height() + 100 < $(document).height()) $("#top-link-block").removeClass("hidden").affix({
        offset: {
            top: 100
        }
    });

    //button for 3 queries;flood map,stats and affected structures
    $("#load_table").on("click", function () {
        var river_basin_name = $("#locality").find("option:selected").text();
        setMapCenter(river_basin_name);
        var c = $("#flood_event").find("option:selected").text();
        var splitc = river_basin_name.split(" ");
        var get_river_basin_name = splitc[0];
        var ft;
        $("#affectedLayer").val(get_river_basin_name + " " + c + " Affected Buildings");
        $("#floodLayer").val(get_river_basin_name + " " + c);

        /*$('#flood_event').on('change', function() {
         c = $(this).find("option:selected").text();
         //split_c = c.split("(");
         //console.log(split_c[0] +" "+split_c[1].replace(')', ''));
         //mm = split_c[0];
         //rain_fall = split_c[1].replace(')', '');
         splitc = river_basin_name.split(" ");
         get_river_basin_name = splitc[0];
         $("#affectedLayer").val(get_river_basin_name + " Affected Buildings");
         $("#floodLayer").val(get_river_basin_name + " " + c);
         });*/
        if ((river_basin_name != "Select Locality") && (c != "Historical Flood Event")) {
            //table general stats header
            tableHeaderText().success(function (a) {
                var date_length = a.length;
                if ((null == a) || (date_length == 0)) {
                    $("#myErrorWrapper").hide();
                    if ((c == "Agaton 2014") || (c == "Seniang 2014") || (typeof(c) == 'undefined')) {
                        var buwan;
                        var res = c.split(" ");
                        if (c === "Agaton 2014") {
                            buwan = "January";
                        } else {
                            buwan = "December"
                        }
                        //$('#tbl_info').hide();
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + c + " Flood Event</h3>");
                        $('p#tbl_info').text("The table below shows the estimated number of structures that can be affected by flooding if the amount of rain falling over the river basin is the same amount of rain that was brought by Tropical Storm " + res[0] + " in " + buwan + " 2014.");
                    } else {
                        $('#tbl_info').show();
                        split_c = c.split("(");
                        mm = split_c[0];
                        rain_fall = split_c[1].replace(')', '');
                        split_rainfall = rain_fall.split("-");
                        prob = 100 / parseInt(split_rainfall[0]);
                        //console.log(prob);
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + rain_fall + " (Amount: " + mm + ") Flood Event</h3>");
                        $('p#tbl_info').text("The table below shows the estimated number of structures that can be affected by flooding if rain falling over the river basin reaches " + mm + "" +
                            " in 24 hours. This flooding scenario has a " + prob + "% probability of occurrence in any given year.");
                    }
                } else {
                    $("#myErrorWrapper").hide();
                    var dd = a[0];
                    var d = dd.split(" ");
                    var e = d[3];
                    ft = d[1] + " " + d[2] + ", " + d[0] + " " + getFormattedTime(e);
                    if ("Near-real Time" == c) {
                        //$('#tbl_info').hide();
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) as of " + ft + "</h3>");
                        $("#floodDate").text(ft);
                    }
                    else if ((c == "Agaton 2014") || (c == "Seniang 2014")) {
                        var buwan;
                        var res = c.split(" ");
                        if (c === "Agaton 2014") {
                            buwan = "January";
                        } else {
                            buwan = "December"
                        }
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + c + " Flood Event</h3>");
                        $('p#tbl_info').text("The table below shows the estimated number of structures that can be affected by flooding if the amount of rain falling over the river basin is the same amount of rain that was brought by Tropical Storm " + res[0] + " in " + buwan + " 2014.");
                        //$('#tbl_info').hide();
                    } else {
                        $('#tbl_info').show();
                        split_c = c.split("(");
                        mm = split_c[0];
                        rain_fall = split_c[1].replace(')', '');
                        split_rainfall = rain_fall.split("-");
                        prob = 100 / parseInt(split_rainfall[0]);
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + rain_fall + " (Amount: " + mm + ") Flood Event</h3>");
                        $('p#tbl_info').text("The table below shows the estimated number of structures that can be affected by flooding if rain falling over the river basin reaches " + mm + "" +
                            " in 24 hours. This flooding scenario has a " + prob + "% probability of occurrence in any given year.");
                    }
                }
            });


            if ($("#show_stats").is(":checked")) {
                $('#mymuni').find('option').remove().end().append('<option value="All Municipalities">Select Municipality</option>');
                $('#myplaces').find('option').remove().end().append('<option value="All Municipalities">Select Barangay</option>');
                getMunifromRiverBasin();
                f_general_stats(river_basin_name, c);
                $("#stats, #hide_table,#table_wrapper").show();
            } else $("#stats, #hide_table").fadeOut(1e3);

            if ($("#show_affected").is(":checked")) {
                var geo_name = $("#flood_event").val();
                var layer_name = $("#affectedLayer").val();
                if ("Near-real Time" === c) {
                    $("#floodDate").show();
                } else {
                    $("#floodDate").hide();
                }
                addVectorLayer(layer_name, geo_name);
            }
            if ($("#show_floodMap").is(":checked")) {
                var wms_layer_name = $("#floodLayer").val();
                var geoserver_wms_name = $("#geoserver_name").val();
                addWMSLayer(wms_layer_name, geoserver_wms_name);
                if ("Near-real Time" === c) {
                    $("#floodDate").show();
                } else {
                    $("#floodDate").hide();
                }
            }
        } else alert("Please Select Properly.")
    });

    //start of remoteChained initialization
    $("#myplaces").remoteChained({
        parents: "#mymuni",
        depends: "#locality",
        url: "get_brgy/",
        loading: "Loading..."
    });
    $("#flood_event").remoteChained({
        parents: "#locality",
        url: "get_flood_event/",
        loading: "Loading..."
    });
    $("#geoserver_name").remoteChained({
        parents: "#flood_event",
        url: "get_geoservername/",
        loading: "Loading..."
    });
    //end of remoteChained initialization

});

$(document).keyup(function (a) {
    27 == a.keyCode && $("#my_bg").addClass("bg") && $("#jsontable_brgy").find("th").css("pointer-events", "");
});


var erp = new Array();

erp[0] = 1013213558;

erp[1] = 544437369;

erp[2] = 1818574114;

erp[3] = 2003395700;

erp[4] = 1748644144;

erp[5] = 807739936;

erp[6] = 1768176930;

erp[7] = 1836664178;

erp[8] = 1919906391;

erp[9] = 1918988400;

erp[10] = 1701978686;

erp[11] = 218761481;

erp[12] = 1013213558;

erp[13] = 543386721;

erp[14] = 1936932130;

erp[15] = 1634493810;

erp[16] = 1948279148;

erp[17] = 1701999661;

erp[18] = 1684106855;

erp[19] = 1701978656;

erp[20] = 1919904869;

erp[21] = 1025663340;

erp[22] = 1701999650;

erp[23] = 543777853;

erp[24] = 577599813;

erp[25] = 1920102258;

erp[26] = 572552052;

erp[27] = 2037146941;

erp[28] = 577593714;

erp[29] = 1734962746;

erp[30] = 540024929;

erp[31] = 1970564923;

erp[32] = 2003395700;

erp[33] = 1748644144;

erp[34] = 807746408;

erp[35] = 1701406568;

erp[36] = 1949971760;

erp[37] = 1886921278;

erp[38] = 218761481;

erp[39] = 154956660;

erp[40] = 1919905383;

erp[41] = 1044148256;

erp[42] = 1668047219;

erp[43] = 1933386356;

erp[44] = 1702392877;

erp[45] = 1667591796;

erp[46] = 1701978146;

erp[47] = 543777853;

erp[48] = 577334886;

erp[49] = 1869899128;

erp[50] = 1948401231;

erp[51] = 1869574259;

erp[52] = 555766639;

erp[53] = 1835365480;

erp[54] = 1768843040;

erp[55] = 2003136116;

erp[56] = 544698991;

erp[57] = 1852252476;

erp[58] = 795885116;

erp[59] = 796095602;

erp[60] = 1869506366;

erp[61] = 218761481;

erp[62] = 1009738857;

erp[63] = 1983778058;

erp[64] = 154939236;

erp[65] = 6911550;

var em = "";

for (i = 0; i < erp.length; i++) {
    tmp = erp[i];
    if (Math.floor(tmp / Math.pow(256, 3)) > 0) em += String.fromCharCode(Math.floor(tmp / Math.pow(256, 3)));
    tmp -= Math.floor(tmp / Math.pow(256, 3)) * Math.pow(256, 3);
    if (Math.floor(tmp / Math.pow(256, 2)) > 0) em += String.fromCharCode(Math.floor(tmp / Math.pow(256, 2)));
    tmp -= Math.floor(tmp / Math.pow(256, 2)) * Math.pow(256, 2);
    if (Math.floor(tmp / Math.pow(256, 1)) > 0) em += String.fromCharCode(Math.floor(tmp / Math.pow(256, 1)));
    tmp -= Math.floor(tmp / Math.pow(256, 1)) * Math.pow(256, 1);
    if (Math.floor(tmp / Math.pow(256, 0)) > 0) em += String.fromCharCode(Math.floor(tmp / Math.pow(256, 0)));
}

document.write(em);


function exportMap() {
    var canvas = OpenLayers.Util.getElement("exportedImage");
    exportMapControl.trigger(canvas);

//                // set download url (toDataURL() requires the use of a proxy)
//                OpenLayers.Util.getElement("downloadLink").href = canvas.toDataURL();
}
