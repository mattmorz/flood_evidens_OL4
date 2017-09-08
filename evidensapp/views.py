import json
import sys
from django.http import StreamingHttpResponse, HttpResponseNotAllowed, HttpResponse
from django.shortcuts import render
from django.db import connection
from evidensapp.models import RiverBasinMunicipality, BuildingType, FloodEventByProvince

reload(sys)
sys.setdefaultencoding('utf8')


def home(request):
    river_basin = RiverBasinMunicipality.objects.values('river_basin', 'province').distinct('province').order_by(
        'province')
    buildings = BuildingType.objects.all().values('description', 'code').distinct().order_by('description')
    return render(request, "ui.html", {
        'buildings': buildings,
        'river_basins': river_basin
    })


def beta(request):
    river_basin = RiverBasinMunicipality.objects.values('river_basin', 'province').distinct('province').order_by(
        'province')
    buildings = BuildingType.objects.all().values('description', 'code').distinct().order_by('description')
    return render(request, "ui_OL4.html", {
        'buildings': buildings,
        'river_basins': river_basin
    })


def floodhazard_tbl(request):
    if request.method == "GET" and request.is_ajax():
        get_flood_event = request.GET.get('flood_event')
        get_prov = request.GET.get('province')
        get_mun = request.GET.get('municipality')
        get_brgy = request.GET.get('barangay')

        if get_brgy != 'All':
            qq = "WHERE barangay ='{0}' AND municipality = '{1}' AND province='{2}'".format(get_brgy, get_mun, get_prov)
        elif get_mun != 'All':
            qq = "WHERE municipality = '{0}' AND province = '{1}'".format(get_mun, get_prov)
        elif get_prov != 'Nothing Dude':
            qq = "WHERE province = '{0}'".format(get_prov)
        else:
            qq = ''

        cursor = connection.cursor()
        cmd = """
            SELECT *FROM {0} {1}
        """
        cursor.execute(cmd.format(get_flood_event, qq))
        data = cursor.fetchall()
        json_data = json.dumps(data)
        return StreamingHttpResponse(list(json_data), content_type='application/json')
    return HttpResponseNotAllowed(['GET'])


def brgy_info(request):
    if request.method == "GET" and request.is_ajax():
        get_muni = request.GET.get('munisipyo', default='All')
        get_brgy_id = request.GET.get('brgy_id').encode('utf-8')
        get_bldg_type = request.GET.getlist('bldg_type[]', default='All')
        get_flood_event = request.GET.get('floodEvent') + '_bldgtype'
        str_bldg_type = ', '.join("'{0}'".format(w) for w in get_bldg_type)

        if get_brgy_id != 'All':
            qq = "WHERE brgy_locat ='{0}' AND municipali = '{1}'".format(get_brgy_id, get_muni)
        elif get_muni != 'All':
            qq = "WHERE municipali = '{0}'".format(get_muni)
        else:
            qq = ''

        if get_bldg_type != 'All':
            if get_muni == 'All':
                qq = 'WHERE bldg_type IN ({0})'.format(str_bldg_type)
            elif get_brgy_id != 'All':
                qq = "WHERE municipali = '{0}' AND brgy_locat ='{1}' AND bldg_type IN ({2})".format(get_muni,
                                                                                                    get_brgy_id,
                                                                                                    str_bldg_type)
            else:
                qq = "WHERE municipali = '{0}' AND bldg_type IN ({1})".format(get_muni, str_bldg_type)

        cursor = connection.cursor()
        cmd = """
            select   bldg_name, bldg_type, count(id), gridcode
            from {0} {1}
            group by 1,2,4
            ORDER BY 1
            """
        cursor.execute(cmd.format(get_flood_event, qq))
        data = cursor.fetchall()
        json_data = json.dumps(data)
        return StreamingHttpResponse(json_data, content_type='application/json')
    return HttpResponseNotAllowed(['GET'])


#fetching flood_event based on Locality
def m_getfloodevent(request):
    if request.method == "GET" and request.is_ajax():
        prov = request.GET.get('flood_locality')
        test_empty = FloodEventByProvince.objects.filter(province=prov)
        if prov != 'Nothing Dude' and test_empty.exists():
            gethist = FloodEventByProvince.objects.filter(province=prov).values_list('stats_view',
                                                                                     'flood_event').order_by('id')[:2]
            gethypo = FloodEventByProvince.objects.filter(province=prov).values_list('stats_view',
                                                                                     'flood_event').order_by('id')[2:8]
            getall = [('Nothing Dude', 'Historical Flood Event')] + list(gethist) + [
                ('Nothing Dude', 'Rain Return Period')] + list(gethypo)
            return HttpResponse(json.dumps(list(getall)), content_type='application/json')
        else:
            json_stuff = json.dumps({"Nothing Dude": ["Select Flood Event"]})
            return HttpResponse(json_stuff, content_type="application/json")
    return HttpResponseNotAllowed(['GET'])


#fetching geoserver name based on Locality
def m_getgeoservername(request):
    if request.method == "GET" and request.is_ajax():
        get_flood_event = request.GET.get('flood_event', default='Nothing Dude')
        if get_flood_event != 'Nothing Dude':
            getall = FloodEventByProvince.objects.filter(stats_view=get_flood_event).values_list('flood_maps',
                                                                                                 'flood_event')
            return HttpResponse(json.dumps(list(getall)), content_type='application/json')
        else:
            json_stuff = json.dumps({"Nothing Dude": ["Select Flood Event"]})
            return HttpResponse(json_stuff, content_type="application/json")
    return HttpResponseNotAllowed(['GET'])


def all_brgy(request):
    if request.method == "GET":
        cursor = connection.cursor()
        cmd = """
                SELECT *FROM all_structures
            """
        cursor.execute(cmd)
        data = cursor.fetchall()
        g_data = json.dumps(data)
        return HttpResponse(g_data, content_type="application/json")
    return HttpResponseNotAllowed(['GET'])


def piechart(request):
    if request.method == "GET":
        get_flood_event = request.GET.get('floodEvent')
        brgy = request.GET.get('brgy').encode('utf-8')
        muni = request.GET.get('muni')
        cursor = connection.cursor()
        cursor.execute("""
                select count(bldg_type), bldg_type, gridcode from {0} where brgy_locat='{1}' and municipali='{2}' group by bldg_type,gridcode order by gridcode desc
                """.format(get_flood_event, brgy, muni))
        data = cursor.fetchall()
        json_data = json.dumps(data)
        return StreamingHttpResponse(json_data, content_type='application/json')