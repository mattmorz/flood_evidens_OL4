/**
 * Created by acer on 8/22/17.
 */

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
    for (var i = 0; i < wl_json_len; i++) {
        var opt = document.createElement("option");
        opt.text = wl_json.features[i].properties["name"];
        opt.value = wl_json.features[i].properties["device_id"];
        water_sel.appendChild(opt);
    }
};