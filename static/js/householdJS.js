/**
 * Created by acer on 10/25/16.
 */
var map,
    ctrlSelectFeatures,
    new_layer;
var url = "http://10.0.0.17:8081";
//var url = "http://121.97.192.11:8086";
var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
renderer = renderer ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
var wfs_url = url + "/geoserver/wfs";
var feature_ns = url + "/cite";
var style = new OpenLayers.Style({
    strokeOpacity: 1,
    strokeWidth: 1,
    fillOpacity: .8,
    cursor: "pointer"
}, {
    rules: [new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "bldg_type",
            value: "Residential"
        }),
        symbolizer: {
            fillColor: "#0000ff ",
            strokeColor: "#0000ff "
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "bldg_type",
            value: "School"
        }),
        symbolizer: {
            fillColor: "#00ff00",
            strokeColor: "#00ff00"
        }
    }), new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "bldg_type",
            value: "GYM"
        }),
        symbolizer: {
            fillColor: "#f4a460",
            strokeColor: "#f4a460"
        }
    })]
});
var hh_names = [];

window.onload = function () {
    if (!window.jQuery) {
        document.write("<p>External JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>");
    } else {
        $.ajax({
            url: '/jabonga/hh_name/',
            type: 'GET',
            dataType: 'JSON',
            async: true,
            success: function (data) {
                hh_names = data;
                $('#person').attr("placeholder", "type name here...")
            }
        });
    }

    if (typeof google == 'undefined') {
        $('#locate_hh').attr("disabled", "disabled")
        map_panel = document.getElementById('map_wrapper');
        map_panel.innerHTML = "<p style='color:red'>Google JavaScript library is required for the application to run properly. Make sure you have an internet connection then please reload the page.</p>"
    } else {
        init();
    }
}

//load base map and water level
function init() {
    var B = new OpenLayers.Projection("EPSG:4326");
    var C = new OpenLayers.Projection("EPSG:3857");
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

    new_layer = new OpenLayers.Layer.Vector("Jabonga Buildings", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        eventListeners: {
            loadend: function (a) {
                if (new_layer.features.length > 0) {
                    map.zoomToExtent(new_layer.getDataExtent());
                    ;
                    $("#locateMe").hide();
                }
            },
            loadstart: function (a) {
                $("#locateMe").show();
            }
        },
        projection: new OpenLayers.Projection("EPSG:4326"),
        displayProjection: new OpenLayers.Projection("EPSG:3857"),
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            url: wfs_url,
            featureType: "smarterjabonga_jabongabldg",
            featureNS: feature_ns,
            outputFormat: "application/json",
            readFormat: new OpenLayers.Format.GeoJSON(),
            geometryName: "geometry"
        }),
        renderers: renderer, //["SVG", "Canvas", "VML"],
        styleMap: new OpenLayers.StyleMap(style),
        displayInLayerSwitcher: !0
    });

    //adding base layers
    map.addLayers([H, E, F, G]);

    map.setCenter(new OpenLayers.LonLat(125.75, 9.19).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 10);

    map.addLayer(new_layer);

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
    J.addControls([I.previous, I.next, new OpenLayers.Control.FullScreen({
        title: "Click to toggle FullScreen"
    })]);

    ctrlSelectFeatures = new OpenLayers.Control.SelectFeature(new_layer, {
        clickout: true,
        toggle: false,
        multiple: false,
        hover: false
    });
    activateControls(new_layer);
    "undefined" != typeof ctrlSelectFeatures.handlers ? ctrlSelectFeatures.handlers.feature.stopDown = !1 : "undefined" != typeof ctrlSelectFeatures.handler && (ctrlSelectFeatures.handler.stopDown = !1,
        ctrlSelectFeatures.handler.stopUp = !1);


    map.addControls([ctrlSelectFeatures, J, I]);
    ctrlSelectFeatures.activate();

    $('.olControlZoomBoxItemInactive').attr('title', 'Magnify on the Map');
    $('.olControlNavigationItemActive').attr('title', 'Pan on the Map');
}

function showFamMembers(a) {
    $.ajax({
        url: "/members_pop/",
        dataType: "json",
        type: "GET",
        data: {
            'hhid': a
        },
        beforeSend: function () {
        },
        success: function (c) {
            for (i = 0; i < c.length; i++) {
                $("table#output").append("<tr><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td><td>" + c[i][3] + "</td><td>" + c[i][4] + "</td><td>" + c[i][5] + "</td><td>" + c[i][6] + "</td><td>" + c[i][7] + "</td>");
            }
        },
        error: function () {
        }
    });
}

function showHH(a) {
    $.ajax({
        url: "/jabonga/get_hh/",
        dataType: "json",
        type: "GET",
        data: {
            'hhid': a
        },
        beforeSend: function () {
        },
        success: function (c) {
            if (c.length > 0) {
                $('#h_wrapper').show();
                $('#nohead').hide();
                var data = c[0][0];
                var fullname = data.f1;
                var bdate = data.f2;
                var gender = data.f3;
                var occupation = data.f4;
                var income = data.f5;
                var memebrs = data.f6;
                var contact = data.f7;
                var bldg_mater = data.f8;
                var bldg_type = data.f9;
                var means_trans = data.f10;
                var purok = data.f11;
                var brgy = data.f12;
                var hhid = data.f13;
                var age = data.f14;
                $('#h_fullname').val(fullname);
                $('#h_bdate').val(bdate);
                $('#h_gender').val(gender);
                $('#h_occupation').val(occupation);
                $('#h_income').val(income);
                $('#h_members1').val(memebrs);
                $('#h_contact').val(contact);
                $('#h_bldgmater').val(bldg_mater);
                $('#h_bldgtype').val(bldg_type);
                $('#h_transpo').val(means_trans);
                $('#h_purok').val(purok);
                $('#h_barangay').val(brgy);
                $('#h_id').val(hhid)
                $('#h_age').text('(Age: ' + age + ')');
            } else {
                $('#h_wrapper').hide();
                $('#nohead').show();
            }


        },
        error: function () {
        }
    });
}

function showFamMembersModal(a) {
    $.ajax({
        url: "/members_pop/",
        dataType: "json",
        type: "GET",
        data: {
            'hhid': a
        },
        beforeSend: function () {

        },
        success: function (c) {
            for (i = 0; i < c.length; i++) {
                $("table#h_members").append("<tr><td>" + c[i][1] + "</td><td>" + c[i][2] + "</td><td>" + c[i][3] + "</td><td>" + c[i][4] + "</td><td>" + c[i][5] + "</td><td>" + c[i][6] + "</td><td>" + c[i][7] + "</td><td>" + c[i][8] + "</td><td><a class='btn btn-default' href='#' role='button'  data-toggle='modal' data-target='#edit_members' id='show_mem_d'>Edit</a></td>");
            }
        },
        error: function () {
        }
    });
}

function imgError(a) {
    a.onerror = "";
    a.src = "../../../static/images/no_img.jpg";
    return true;
}

function activateControls(a) {
    while (map.popups.length) map.removePopup(map.popups[0]);
    a.events.on({
        featureselected: function (a) {
            map.zoomToExtent(a.feature.geometry.getBounds(), closest = true);
            var b = a.feature;
            var c = b.attributes.hh_id;
            var d = "<img style='width:270px;height:205px' src='../../../static/images/Jabonga_Pics/" + c + ".jpg' onerror='imgError(this);' class='loading_me'/>";
            var e = b.attributes.hh_headnam;
            var f = b.attributes.birthdate;
            var g;
            showFamMembers(c);
            var m = b.attributes.gender;
            var n = b.attributes.occupation;
            var o = b.attributes.monthly_in;
            var p = b.attributes.contact_nu;
            var q = b.attributes.family_mem;
            var r = b.attributes.bldg_type;
            var s = b.attributes.purok_numb + ", " + b.attributes.brgy_locat + ", " + b.attributes.municipali;
            if ("Residential" == r) {
                if ("undefined" !== typeof f) {
                    var h = f.slice(0, -1);
                    var i = h.split("-");
                    var j = new Date(i[0], i[1], i[2]);
                    var k = new Date();
                    var l = Math.ceil(k.getTime() - j.getTime()) / (1e3 * 60 * 60 * 24 * 365);
                    g = parseInt(l) + " year/s old";
                } else g = "N/A";
                b.popup = new OpenLayers.Popup.FramedCloud("popup", b.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(500, 350), "<div class='container' style='width:460px;margin:0'><div class='row'><div class='col-md-12'>" + "<table class='table table-bordered' style='width:460px'>" + "<tr>" + "<th class='info' colspan='2'>Household Head Info</th>" + "<th class='info'>Building Picture</th>" + "</tr>" + "<tr>" + "<td>Name</td>" + "<td>" + e + "</td>" + "<td rowspan='9'>" + d + "</td>" + "</tr>" + "<tr>" + "<td>Birthdate</td>" + "<td>" + h + "</td>" + "</tr>" + "<tr>" + "<td>Age</td>" + "<td>" + g + "</td>" + "</tr>" + "<tr>" + "<td>Gender</td>" + "<td>" + m + "</td>" + "</tr>" + "<tr>" + "<td>Occupation</td>" + "<td>" + n + "</td>" + "</tr>" + "<tr>" + "<td>Monthly Income</td>" + "<td>" + Number(o).toLocaleString("en") + "</td>" + "</tr>" + "<tr>" + "<td>Number of Family Members</td>" + "<td>" + q + "</td>" + "</tr>" + "<tr>" + "<td>Contact Number</td>" + "<td>" + p + "</td>" + "</tr>" + "<tr>" + "<td>Address</td>" + "<td>Purok " + s + "</td>" + "</tr>" + "</table></div></div>" + "<div class='row'><div class='col-md-12'><table class='table table-bordered' id='output' style='width:460px'>" + "      <th class='info'>Family Member Name</th>" + "      <th class='info'>Relation to Family Head</th>" + "      <th class='info'>Birthdate</th>" + "      <th class='info'>Age</th>" + "      <th class='info'>Gender</th>" + "      <th class='info'>Education</th>" + "      <th class='info'>Occupation</th>" + "    </table></div></div><div class='row'><div class='col-md-12 text-center'><div class='btn-group' role='group'><a class='btn btn-default showmem' href='#' role='button'>Edit</a><button type='button' class='btn btn-danger' id='delete'>Delete</button></div></div></div></div>", null, true);
            } else b.popup = new OpenLayers.Popup.FramedCloud("popup", b.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(350, 100), "<h4>" + e + "</h4><strong>Building Type: </strong>" + r + "<br/><strong>Location: </strong>Purok " + s + "<br/></div><div class='row'><div class='col-md-12 text-center'><div class='btn-group' role='group'><button type='button' class='btn btn-primary' id='edit'>Edit</button><button type='button' class='btn btn-danger' id='delete'>Delete</button></div></div></div>", null, true);
            b.popup.autoSize = false;
            map.addPopup(b.popup);
            $('#popup_contentDiv').on('click', 'a.btn.btn-default.showmem', function (a) {
                a.preventDefault();
                while (map.popups.length) map.removePopup(map.popups[0]);
                $("#hh_table").modal({
                    show: !0
                });
                $("table#h_members").find("tr:gt(0)").remove();
                $("table#check_result").find("tr:gt(0)").remove();
                showHH(c);
                showFamMembersModal(c);
                check_affected(c);

            });
        },
        featureunselected: function (a) {
            var b = a.feature;
            map.removePopup(b.popup);
            b.popup.destroy();
            b.popup = null;
        }
    });
}

function check_affected(a) {
    $.ajax({
        url: "/check_affected/",
        dataType: "json",
        type: "GET",
        data: {
            'hhid': a
        },
        beforeSend: function () {

        },
        success: function (c) {
            $("table#check_result").append("<tr style='text-transform:capitalize'><td>" + c[0][1] + "</td><td>" + c[1][1] + "</td><td>" + c[2][1] + "</td><td>" + c[3][1] + "</td><td>" + c[4][1] + "</td><td>" + c[5][1] + "</td><td>" + c[6][1] + "</td><td>" + c[7][1] + "</td>");
            $('table#check_result td:contains("High")').css('background-color', 'red');
            $('table#check_result td:contains("Medium")').css('background-color', 'orange');
            $('table#check_result td:contains("Low")').css('background-color', 'yellow');
        },
        error: function () {
        }
    });

}

$(document).ready(function () {
    var objects = [];
    var map = {};
    $('#person').typeahead({
        source: function (query, process) {
            objects = []; //resets the objects
            map = {}; //to avoid duplication
            $.each(hh_names, function (i, object) {
                map[object[1]] = object;
                objects.push(object[1]);
            });
            process(objects);

        }, //end source
        items: 6,
        updater: function (item) {
            $('#person_val').val(map[item][0]);
            return item;
        }
    });

    $('#locate_hh').click(function () {
        var hh_id = $('#person_val').val();
        for (var f = 0; f < new_layer.features.length; f++) {
            if (new_layer.features[f].attributes.hh_id === hh_id) {
                var featsel = new_layer.features[f];
                ctrlSelectFeatures.clickFeature(featsel);
                break;
            }
        }
    });
    $('#view_hh').click(function () {
        $("#hh_table").modal({
            show: !0
        })
        $("table#h_members").find("tr:gt(0)").remove();
        $("table#check_result").find("tr:gt(0)").remove();
        var hh_id = $('#person_val').val();
        showHH(hh_id);
        showFamMembersModal(hh_id);
        check_affected(hh_id);
    });

    $("#h_members").on("click", "tr a", function (a) {
        var data = $(this).closest("tr").find("td:eq(0)").text();
        var full_name = data.split(',');
        var fname = full_name[1];
        var lname = full_name[0];
        var relhead = $(this).closest("tr").find("td:eq(1)").text();
        var bdate = $(this).closest("tr").find("td:eq(2)").text();
        var gender = $(this).closest("tr").find("td:eq(4)").text();
        var educ = $(this).closest("tr").find("td:eq(5)").text();
        var occupation = $(this).closest("tr").find("td:eq(6)").text();
        var id = $(this).closest("tr").find("td:eq(7)").text();

        $('#fname').val(fname);
        $('#lname').val(lname);
        $('#relhead').val(relhead);
        $('#bdate').val(bdate);
        $('#gender').val(gender);
        $('#educ').val(educ);
        $('#occupation').val(occupation);
        $('#mem_id').val(id);
    });

    var frm = $('#frmEdit');
    frm.submit(function () {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (resp) {
                $("#resp").html('<strong><p class="text-info">' + resp + '</p></strong>').show().fadeOut(3000);
            },
            error: function () {
                $("#resp").html('<strong><p class="text-danger">Error!</p></strong>').show().fadeOut(3000);
            }
        });
        return false;
    });
    var frmPW = $('#frmChangePW');
    frmPW.submit(function () {
        $.ajax({
            type: frmPW.attr('method'),
            url: frmPW.attr('action'),
            data: frmPW.serialize(),
            success: function (resp) {
                $("#respp").html('<strong><p class="text-info">' + resp + '</p></strong>').show().fadeOut(3000);
            },
            error: function () {
                $("#respp").html('<strong><p class="text-danger">Error!</p></strong>').show().fadeOut(3000);
            }
        });
        return false;
    });
    var frmEditHead = $('#frm_edit_head');
    frmEditHead.submit(function () {
        $.ajax({
            type: frmEditHead.attr('method'),
            url: frmEditHead.attr('action'),
            data: frmEditHead.serialize(),
            success: function (resp) {
                $("#resppH").html(resp).show().fadeOut(3000);
            },
            error: function () {
                $("#resppH").html('<strong><p class="text-danger">Error!</p></strong>').show().fadeOut(3000);
            }
        });
        return false;
    });
    var frm_edit_member = $('#frm_edit_member');
    frm_edit_member.submit(function () {
        $.ajax({
            type: frm_edit_member.attr('method'),
            url: frm_edit_member.attr('action'),
            data: frm_edit_member.serialize(),
            success: function (resp) {
                $("#response_mem").html(resp).show().fadeOut(3000);
                var h_id = $('#h_id').val();
                //var table = document.getElementById("h_members");
                //var tbl_height= table.offsetHeight;
                // $('table#h_members').css('height',tbl_height);
                $("table#h_members").find("tr:gt(0)").remove();
                showFamMembersModal(h_id)
            },
            error: function () {
                $("#response_mem").html('<strong><p class="text-danger">Error!</p></strong>').show().fadeOut(3000);
            }
        });
        return false;
    });
});

