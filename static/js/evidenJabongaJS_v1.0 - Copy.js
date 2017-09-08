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

var map, layer, layer_projectmunicipalities, layer_projectbrgy;

var water_level_station;

var ft;

var eventsLog, selectControl;

var tour;

var url = "http://10.0.0.20:8081";

var geoserver_url = url + "/geoserver/gwc/service/wms";

var geoserver_url_nrt = url + "/geoserver/cite/wms";

var filterStrategy;

var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;

var workingOffline = false;

renderer = renderer ? [ renderer ] : OpenLayers.Layer.Vector.prototype.renderers;

var wfs_url = url + "/geoserver/wfs";

var feature_ns = url + "/cite";

var style;

var guide;

var new_layer, wms_layer;

var ctrlSelectFeatures;

var utc = new Date().toJSON().slice(0, 10);

var disclaimer_text = 'Disclaimer: The information presented in this file is preliminary results of the "Flood EViDEns" application developed through the CSU-Phil LiDAR 1 Project. The CSU-Phil LiDAR 1 project gives no warranty, express or implied, as to the accuracy, reliability, utility or completeness of this information. The CSU Phil-LiDAR 1 nor the Caraga State University shall not be held liable for improper or incorrect use of any or all information contained in this website.';


function showFamMembers(a) {
    $.ajax({
        url: "../../static/media/Poblacion_Jabonga_BuildingAttributes_v12.05.2015.csv",
        dataType: "text",
        type: "GET",
        beforeSend: function () {
        },
        success: function (b) {
            //console.log("waaa show fanm");
            d = b.csvToArray();
            var c = searchData(d, a);
            var d = [];
            var e = 0;
            for (i = 0; i < c.length; i++) {
                var f = c[i][3];
                if (null === f || "" === f) e = "N/A"; else {
                    var g = f.split("/");
                    var h = new Date(g[2], g[0], g[1]);
                    var j = new Date();
                    var k = Math.ceil(j.getTime() - h.getTime()) / (1e3 * 60 * 60 * 24 * 365);
                    e = parseInt(k) + " year/s old";
                }
                $("table#output").append("<tr><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td><td>" + c[i][3] + "</td><td>" + e + "</td><td>" + c[i][4] + "</td><td>" + c[i][5] + "</td><td>" + c[i][6] + "</td>");
            }
        },
        error: function () {
        }
    });
}

function imgError(a) {
    a.onerror = "";
    a.src = "../../static/images/no_img.jpg";
    return true;
}

function searchData(a, b) {
    var c = [];
    for (i = 0; i < a.length; i++) {
        var d = $.inArray(b, a[i]);
        if (d !== -1) c.push(a[i]);
    }
    return c;
}


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
    var water_sel = document.getElementById("water_station");
    water_sel.innerHTML = "";
    for (i = 0; i < wl_json_len; i++) {
        var opt = document.createElement("option");
        opt.text = wl_json.features[i].properties["name"];
        opt.value = wl_json.features[i].properties["device_id"];
        water_sel.appendChild(opt);
    }
    if (!window.jQuery) {
        document.write("<p>External JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>");
    }

    if (typeof google == 'undefined') {
        //document.write("<p>Google JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>");
        map_panel = document.getElementById('map_wrapper');
        map_panel.innerHTML = "<p style='color:red'>Google JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>"
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
    rules: [ new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 3
        }),
        symbolizer: {
            fillColor: "#ff0000",
            strokeColor: "#ff0000"
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 2
        }),
        symbolizer: {
            fillColor: "#FFA500",
            strokeColor: "#FFA500"
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gridcode",
            value: 1
        }),
        symbolizer: {
            fillColor: "#ffff00",
            strokeColor: "#ffff00"
        }
    }) ]
});


//add affected layer
function addVectorLayer(name, geoserver_name) {
    var f_river_basin_name = $("#locality").find("option:selected").text();
    var f_get_name = f_river_basin_name.split("River Basin");
    var this_name = f_get_name[0];

    var f_get_event = $("#flood_event").find("option:selected").text();
    var full_layer_name = this_name + "" + f_get_event + " Affected Buildings";
    var layerName;

    var mLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
    for (var a = 0; a < mLayers.length; a++) {
        if (mLayers[a].getVisibility()) {
            layerName = mLayers[a].name;
        }
    }
    ;

    new_layer = new OpenLayers.Layer.Vector(name, {
        strategies: [ new OpenLayers.Strategy.Fixed() ],
        eventListeners: {
            loadend: function (a) {
                map.zoomToExtent(new_layer.getDataExtent());
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
        renderers: renderer,
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
        if (layerName != full_layer_name) {
            resetBuilding();
        }
        c[0].setVisibility(true);
    }
    toggleVectorLayer(name);
}

//add flood maps layer
function addWMSLayer(name, geoserver_name) {
    wms_layer = new OpenLayers.Layer.WMS(name, geoserver_url, {
        layers: "cite:" + geoserver_name,
        format: "image/png8",
        tiled: true,
        //singleTile: false,
        transparent: true,
        //styles: "cite:Hazard Map",
        //tilesorigin: map.maxExtent.left + "," + map.maxExtent.bottom,
    }, {
        displayInLayerSwitcher: !1
    }, {
        isBaseLayer: false
    });
    registerEvents(wms_layer);
    toggleWMSLayer(name);
}

//get municipality based on selected river basin
function getMunifromRiverBasin() {
    $.ajax({
        url: "/get_jabonga_muni/",
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
    for (var c = 0; c < b.length; c++) if ("OpenLayers.Layer.WMS" == b[c].CLASS_NAME) {
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
    for (var c = 0; c < b.length; c++) if ("OpenLayers.Layer.Vector" == b[c].CLASS_NAME) {
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
                var h = [], i = [], j = [];
                var k = e.length - 1;
                var l = f.length - 1;
                var m = g.length - 1;
                $.each(g, function (a, b) {
                    var c = b.split(",");
                    if (a > 0 && a < m) {
                        var d = c[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        j.push([ Date.UTC(+d[3], d[1] - 1, +d[2], +d[4], +d[5]), parseFloat(c[1]) ]);
                    }
                });
                $.each(f, function (a, b) {
                    var c = b.split(",");
                    if (a > 0 && a < l) {
                        var d = c[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        i.push([ Date.UTC(+d[3], d[1] - 1, +d[2], +d[4], +d[5]), parseFloat(c[1]) ]);
                    }
                });
                $.each(e, function (b, c) {
                    var d = c.split(",");
                    if (b > 0 && b < k) {
                        var e = d[0].match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
                        h.push([ Date.UTC(+e[3], e[1] - 1, +e[2], +e[4], +e[5]), parseFloat(d[1]) ]);
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
                            if ("Actual Rainfall in Last 24 hrs." != this.series.name) return Highcharts.dateFormat("%b %e, %Y %I:%M %p", new Date(this.x)) + "<br/>" + this.series.name + ": <b>" + this.y + " m</b>"; else return Highcharts.dateFormat("%b %e, %Y %I:%M %p", new Date(this.x)) + "<br/>" + this.series.name + ": <b>" + this.y + " mm</b>";
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
                                    color: "#808180"
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
    //forProjBrgy();
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
            var c = b.attributes.hh_id;
            var d = "<img style='width:270px;height:205px' src='../static/images/Poblacion_Pictures/" + c + ".jpg' onerror='imgError(this);' class='loading_me'/>";
            var e = b.attributes.hh_headnam;
            var f = b.attributes.birthdate;
            var g;
            if ("undefined" !== typeof f) {
                var h = f.slice(0, -1);
                var i = h.split("-");
                var j = new Date(i[0], i[1], i[2]);
                var k = new Date();
                var l = Math.ceil(k.getTime() - j.getTime()) / (1e3 * 60 * 60 * 24 * 365);
                g = parseInt(l) + " year/s old";
            } else g = "N/A";
            var m = b.attributes.gender;
            var n = b.attributes.occupation;
            var o = b.attributes.monthly_in;
            var p = b.attributes.contact_nu;
            var q = b.attributes.family_mem;
            var r = b.attributes.bldg_type;
            var s = b.attributes.purok_numb + ", " + b.attributes.brgy_locat + ", " + b.attributes.municipali;
            if ("Residential" == r) {
                showFamMembers(c);
                b.popup = new OpenLayers.Popup.FramedCloud("popup", b.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(520, 300), "<div class='container' style='width:460px;margin:0'><div class='row'><div class='col-md-12'>" + "<table class='table table-bordered' style='width:460px'>" + "<tr>" + "<th class='info' colspan='2'>Household Head Info</th>" + "<th class='info'>Building Picture</th>" + "</tr>" + "<tr>" + "<td>Name</td>" + "<td>" + e + "</td>" + "<td rowspan='9'>" + d + "</td>" + "</tr>" + "<tr>" + "<td>Birthdate</td>" + "<td>" + h + "</td>" + "</tr>" + "<tr>" + "<td>Age</td>" + "<td>" + g + "</td>" + "</tr>" + "<tr>" + "<td>Gender</td>" + "<td>" + m + "</td>" + "</tr>" + "<tr>" + "<td>Occupation</td>" + "<td>" + n + "</td>" + "</tr>" + "<tr>" + "<td>Monthly Income</td>" + "<td>" + Number(o).toLocaleString("en") + "</td>" + "</tr>" + "<tr>" + "<td>Number of Family Members</td>" + "<td>" + q + "</td>" + "</tr>" + "<tr>" + "<td>Contact Number</td>" + "<td>" + p + "</td>" + "</tr>" + "<tr>" + "<td>Address</td>" + "<td>Purok " + s + "</td>" + "</tr>" + "</table></div></div>" + "<div class='row'><div class='col-md-12'><table class='table table-bordered' id='output' style='width:460px'>" + "      <th class='info'>Family Member Name</th>" + "      <th class='info'>Relation to Family Head</th>" + "      <th class='info'>Birthdate</th>" + "      <th class='info'>Age</th>" + "      <th class='info'>Gender</th>" + "      <th class='info'>Education</th>" + "      <th class='info'>Occupation</th>" + "    </table></div></div></div>", null, true);
            } else b.popup = new OpenLayers.Popup.FramedCloud("popup", b.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(250, 90), "<h4>" + e + "</h4><strong>Building Type: </strong>" + r + "<br/><strong>Location: </strong>Purok " + s + "<br/>", null, true);
            b.popup.autoSize = false;
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
        $("#floodDate").hide();
        alert("Flood Hazard Map not available this time.");
    });
    var c = $("#floodLayer").val();
    var d = map.getLayersByName(c);
    var e = d.length;
    if (e < 1) map.addLayer(a); else d[0].setVisibility(true);
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
        url: "/jabonga_get_date/",
        data: {
            river_basin: $("#locality").val()
        },
        dataType: "json"
    });
}


function waterLevel() {
    var water_level_style = new OpenLayers.StyleMap({
        default: new OpenLayers.Style({
            externalGraphic: "../../static/images/rainfall.png",
            graphicHeight: 36,
            graphicWidth: 30,
            graphicXOffset: -15,
            graphicYOffset: -36,
            cursor: "pointer"
        }),
        select: new OpenLayers.Style({
            externalGraphic: "../../static/images/rainfall.png",
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
    var C = new OpenLayers.Projection("EPSG:3857");
    var D = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34)

    map = new OpenLayers.Map("map", {
        controls: [ new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.ZoomPanel({
                title: "Zoom Panel"
            }),
            new OpenLayers.Control.MousePosition({
                prefix: '<small style="color:#fff">',
                suffix: "</small>",
                numDigits: 2,
                emptyString: '<small style="color:red" >Mouse is not over the map.</small>'
            }),
            new OpenLayers.Control.NavToolbar()
        ],
        projection: C,
        displayProjection: B,
        units: "m",
        maxResolution: 156543.0339,
        maxExtent: D
    });

    var E = new OpenLayers.Layer.Google("Google Satellite", {
        type: google.maps.MapTypeId.SATELLITE,
        sphericalMercator: true,
        numZoomLevels: 20,
        visibility: !1
    }), F = new OpenLayers.Layer.Google("Google Physical", {
        type: google.maps.MapTypeId.TERRAIN,
        sphericalMercator: true,
        visibility: !1
    }), G = new OpenLayers.Layer.Google("Google Streets", {
        numZoomLevels: 20,
        sphericalMercator: true,
        visibility: !1
    }), H = new OpenLayers.Layer.Google("Google Hybrid", {
        type: google.maps.MapTypeId.HYBRID,
        sphericalMercator: true,
        numZoomLevels: 20,
        visibility: !0
    });


    //adding base layers
    map.addLayers([ H, E, F, G]);
    //call water level function to on window load
    waterLevel();

    map.setCenter(new OpenLayers.LonLat(125.75, 9.19).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 10);

    var I = new OpenLayers.Control.NavigationHistory({
        previousOptions: {
            title: "Previous Map Extent"
        },
        nextOptions: {
            title: "Next Map Extent"
        }
    });
    map.addControl(I);

    var J = new OpenLayers.Control.Panel();
    J.addControls([ I.previous, I.next, new OpenLayers.Control.FullScreen({
        title: "Click to toggle FullScreen"
    }) ]);

    ctrlSelectFeatures = new OpenLayers.Control.SelectFeature(water_level_station, {
            clickout: true,
            toggle: false,
            multiple: false,
            hover: false
        }
    );

    "undefined" != typeof ctrlSelectFeatures.handlers ? ctrlSelectFeatures.handlers.feature.stopDown = !1 : "undefined" != typeof ctrlSelectFeatures.handler && (ctrlSelectFeatures.handler.stopDown = !1,
        ctrlSelectFeatures.handler.stopUp = !1);


    map.addControls([ ctrlSelectFeatures, J, I ]);
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
            var vlayer = map.getLayersByName(layerName);
            vlayer[0].filter = null;
            vlayer[0].refresh({force: true});
            vlayer[0].events.register("loadstart", vlayer[0], function () {
                $("#resetQ").attr("disabled", "disabled").val("Loading...");
            });
            vlayer[0].events.register("loadend", vlayer[0], function () {
                map.zoomToExtent(vlayer[0].getDataExtent());
                $("#resetQ").removeAttr("disabled", "disabled").val("Remove Filter");
            });
        }
    }
    ;
}

$(document).ready(function () {
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
        $("#msg,#myalert").hide();
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
                vlayer[0].setVisibility(true)
            } else if ((layerName === "Water-level Stations") && $("#show_water_level").is(":checked")) {
                vlayer[0].setVisibility(true);
            }
            else {
                vlayer[0].setVisibility(false)
            }
        }
        ;
    });


    //function for detailed table statistics
    function f_detailed_table(b, c, dd, river_basin_name, flood_event) {
        $('#table_brgy').dataTable().fnDestroy();
        var d = $("[name=optionsRadios]:checked").val();
        var e = $("#flood_event").val();
        var f = $("#bldg_type option:selected"), g = [];
        return f.each(function () {
            g.push($(this).val());
        }), $.ajax({
            url: "/jabonga_cnt_bldg/",
            type: "GET",
            dataType: "JSON",
            data: {
                brgy_id: b,
                bldg_type: g,
                munisipyo: $("#mymuni").val(),
                floodEvent: e
            },
            beforeSend: function () {
                $("#find").val("Searching...");
                $("#find").attr("disabled", "disabled");
            },
            complete: function () {
                $("#find").val("Search");
                $("#find").removeAttr("disabled", "disabled");
            },
            success: function (e) {
                $("#myErrorWrapper").hide(), $("#myalert").css({
                    visibility: "visible",
                    height: "100%"
                });
                $("#msg,#myalert").show();
                var f;

                if ("Near-real Time" == d) {
                    $("#msg").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures(" + g + ") in " + b + " , " + dd + "<br/></strong></h4>");
                }
                else if (("Select Barangay" == b || "All Barangays" == b) && dd != "Select Municipality") {
                    $("#msg").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures(" + g + ") in All Barangays in " + dd + "</strong></h4>");
                }
                else if (dd == "Select Municipality" && ("Select Barangay" == b || "All Barangays" == b )) {
                    $("#msg").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures(" + g + ") in All Barangays and in All Municipalities</strong></h4>");
                } else {
                    $("#msg").html("<h4 class='text-center'><strong>Estimated Number of Affected Structures(" + g + ") in " + b + " , " + dd + "<br/></strong></h4>");
                }

                var info = $("#msg").text();


                $("#table_brgy").dataTable({
                    data: e,
                    columns: [
                        {title: "Flood Hazard Level"},
                        {title: "Building Name"},
                        {title: "Building Type"}    ,
                        {title: "Count"}
                    ],
                    colReorder: {
                        order: [ 1, 2, 3, 0]
                    },
                    columnDefs: [
                        {
                            "render": function (data, type, row) {
                                return data == 1 ? 'Low' : data == 2 ? 'Medium' : 'High';
                            },
                            "targets": 0
                        },
                        { "width": "35%", "targets": 1 },
                        { "width": "35%", "targets": 2 },
                        { "width": "10%", "targets": 3 }
                    ],
                    dom: 'Bfrtip',
                    order: [ 1, 'asc' ],
                    buttons: [
                        {
                            extend: 'print',
                            message: '<h4>' + info + " for " + flood_event + '</h4>',
                            customize: function (win) {
                                $(win.document.body).append('<p style="text-align:justify">' + disclaimer_text + '</p>')
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
                                            }
                                        }
                                    }
                                },
                                {
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    //message: info+" in "+ river_basin_name +" for " +flood_event,
                                    title: 'CSU-Phil LiDAR 1: Flood EViDEns',
                                    filename: 'csulidar1_flood_evidens_' + utc,
                                    customize: function (doc) {
                                        var cols = [];
                                        var objFooter = {};
                                        objFooter['columns'] = cols;
                                        doc['footer'] = objFooter;
                                        doc.content.splice(1, 0, {
                                            margin: [0, 12, 0, 12],
                                            alignment: 'center',
                                            text: info + " for " + flood_event,
                                            bold: true,
                                            fontSize: 14,
                                        });
                                        doc.content.splice(3, 0, {
                                            margin: [0, 12, 0, 12],
                                            alignment: 'justify',
                                            text: disclaimer_text,
                                            //bold: true,
                                        });
                                    }
                                }
                            ]
                        }
                    ]
                });

            },
            error: function () {
                $("#as_of").hide(), $("#myErrorWrapper").show(), $("#msg").html(""), $("#find").removeAttr("disabled", "disabled");
            }
        }), !1;
    }

    //button for detailed hazard information
    $("#find").click(function () {
        var a = $("#myplaces :selected").text();
        var c = $("#mymuni").val();
        var get_full_muni = $("#mymuni :selected").text();
        var river_basin_name = $("#locality").find("option:selected").text();
        var flood_event = $("#flood_event").find("option:selected").text();

        $('#flood_event').on('change', function () {
            c = $(this).find("option:selected").text();
        });

        f_detailed_table(a, c, get_full_muni, river_basin_name, flood_event);
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
                        filters: [ new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.LIKE,
                            property: "hh_headnam",
                            value: bldg_name
                        }), new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.LIKE,
                            property: "bldg_type",
                            value: bldg_type
                        }), new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.EQUAL_TO,
                            property: "gridcode",
                            value: gridnumber
                        }) ]
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
                    vlayer[0].refresh({force: true});
                    vlayer[0].events.register("loadend", vlayer[0], function () {
                        map.zoomToExtent(vlayer[0].getDataExtent());
                    });
                }
            }
            ;//end for loop
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
            url: "/jabonga_tbl/",
            dataType: "json",
            data: {
                flood_event: $("#flood_event").val()
            },
            beforeSend: function () {
                $("#load_table").attr("disabled", "disabled").val("Loading...");
                $("#stats_wrapper").hide();
                $("#loading_table").show().html("<strong><p>Getting information...Please wait.</p></strong>");
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
                }
                else {
                    $("#loading_table").hide();
                    $("#info_tbl").text("").fadeOut(1e3).removeClass("getme"), $("#myErrorWrapper").hide(),
                        $("#table_wrapper").show();
                    $('#jsontable_brgy').dataTable({
                        order: [ 1, 'asc' ],
                        data: stats_data,
                        columns: [
                            {title: "Barangay"},
                            {title: "Municipality"},
                            {title: "High"},
                            {title: "Medium"},
                            {title: "Low"}
                        ],
                        colReorder: {
                            order: [ 1, 0, 4, 3, 2 ]
                        },
                        columnDefs: [
                            { "width": "10%", "targets": 4 },
                            { "width": "10%", "targets": 3 },
                            { "width": "10%", "targets": 2 }
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'print',
                                message: '<h4>' + info + '</h4>',
                                customize: function (win) {
                                    $(win.document.body).append('<p style="text-align:justify">' + disclaimer_text + '</p>')
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
                                        footer: true,
                                        exportOptions: {
                                            format: {
                                                footer: function (data, columnIdx) {
                                                    if (columnIdx == 0) {
                                                        return disclaimer_text;
                                                    } else {
                                                        return " ";
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        extend: 'pdfHtml5',
                                        text: 'PDF',
                                        //message: info,
                                        title: 'CSU-Phil LiDAR 1: Flood EViDEns',
                                        filename: 'csulidar1_flood_evidens_' + utc,
                                        customize: function (doc) {
                                            doc.content.splice(1, 0, {
                                                margin: [0, 12, 0, 12],
                                                alignment: 'center',
                                                text: info,
                                                bold: true,
                                                fontSize: 14,
                                            });
                                            doc.content.splice(3, 0, {
                                                margin: [0, 12, 0, 12],
                                                alignment: 'justify',
                                                text: disclaimer_text,
                                                //bold: true,
                                            });
                                        }
                                    }
                                ]//buttons
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
        var c = $("#flood_event").find("option:selected").text();
        var cc = $("#flood_event").val();
        var splitc = river_basin_name.split(" ");
        var get_river_basin_name = splitc[0];
        $("#affectedLayer").val(get_river_basin_name + " " + c + " Affected Buildings");
        $("#floodLayer").val(get_river_basin_name + " " + c);
        $('#fVal').val(cc);
        $('#flood_event').on('change', function () {
            c = $(this).find("option:selected").text();
            splitc = river_basin_name.split(" ");
            get_river_basin_name = splitc[0];
            $("#affectedLayer").val(get_river_basin_name + " Affected Buildings");
            $("#floodLayer").val(get_river_basin_name + " " + c);
            info = $("div#h3 h3").text();
        });

        if (river_basin_name != "Select Locality") {
            if ($("#show_stats").is(":checked")) {

                //table general stats header
                tableHeaderText().success(function (a) {
                    var date_length = a.length;
                    if ((null == a) || (date_length == 0)) {
                        $("#myErrorWrapper").hide();
                        $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + c + "</h3>");
                    } else {
                        var dd = a[0];
                        var d = dd.split(" ");
                        var e = d[3];
                        var ft = d[1] + " " + d[2] + ", " + d[0] + " " + getFormattedTime(e);
                        if ("Near-real Time" == c) {
                            $("#myErrorWrapper").hide();
                            $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) as of " + ft + "</h3>");
                            $("#floodDate").show().text(ft);
                        } else {
                            $("#myErrorWrapper").hide();
                            $("#h3").html("<h3>Estimated Number of Affected Structures (According to Flood Hazard Levels) for " + c + "</h3>");
                            $("#floodDate").hide();
                        }
                    }
                });

                $('#mymuni').find('option').remove().end().append('<option value="All Municipalities">Select Municipality</option>');
                $('#myplaces').find('option').remove().end().append('<option value="All Municipalities">Select Barangay</option>');
                getMunifromRiverBasin();
                f_general_stats(river_basin_name, c);
                $("#stats, #hide_table,#table_wrapper").show();
            } else $("#stats, #hide_table").fadeOut(1e3);

            if ($("#show_affected").is(":checked")) {
                var geo_name = $("#flood_event").val();
                var layer_name = $("#affectedLayer").val();
                addVectorLayer(layer_name, geo_name);
            }
            if ($("#show_floodMap").is(":checked")) {
                var wms_layer_name = $("#floodLayer").val();
                var geoserver_wms_name = $("#geoserver_name").val();
                addWMSLayer(wms_layer_name, geoserver_wms_name);
            }
        } else alert("Please Select Locality.")
    });

    //start of remoteChained initialization
    $("#myplaces").remoteChained({
        parents: "#mymuni",
        depends: "#locality",
        url: "/jabonga_get_brgy/",
        loading: "Loading..."
    });
    $("#flood_event").remoteChained({
        parents: "#locality",
        url: "/get_jabonga_flood_event/",
        loading: "Loading..."
    });
    $("#geoserver_name").remoteChained({
        parents: "#flood_event",
        url: "/get_jabonga_geoservername/",
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