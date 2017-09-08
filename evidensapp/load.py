import sys
import os
import datetime
import sched
from time import time, sleep

from django.db import connection
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.gdal import DataSource

from evidensapp.models import JabongaFloodHazard


s = sched.scheduler(time, sleep)

floodhazard_mapping = {
    'gridcode': 'GRIDCODE',
    'datetime': 'DATETIME',
    'geom': 'MULTIPOLYGON',
}

bound_shape = 'Z:/FloodEviDEns/Nearrealtime_Jabonga/hazard_nrt_jabonga.shp'
exist = os.path.isfile(bound_shape)

if exist:
    def do_something(sc):
        check_jabonga = JabongaFloodHazard.objects.all()
        if not check_jabonga.exists():
            lm = LayerMapping(JabongaFloodHazard, bound_shape, floodhazard_mapping,
                              transform=False, encoding='iso-8859-1')
            print("\n")
            print("\n")
            print("########## START LOG ########")
            print("#############################")
            print("\n")
            print("Flood Hazard Table is empty.")
            lm.save(strict=True, verbose=True)
            print "{0} {1}".format("Performing Query: ", datetime.datetime.now())
            cursor_f = connection.cursor()
            cursor_f.execute("""
                SELECT *FROM mainit_tubay_stats_nrt()
            """)
            print "{0} {1}".format("Query Done: ", datetime.datetime.now())
            print("\n")
            print("########## END LOG ##########")
            print("#############################")
            sc.enter(600, 1, do_something, (sc,))
        else:
            try:
                ds = DataSource(bound_shape)
                lyr = ds[0]
                feat = lyr[0]
                get_date_shpfile = feat.get('DATETIME')
                get_date_table = JabongaFloodHazard.objects.values_list('datetime', flat=True).latest('datetime')
                if get_date_shpfile != get_date_table:
                    cursor = connection.cursor()
                    cursor.execute("TRUNCATE TABLE evidensapp_jabongafloodhazard RESTART IDENTITY")
                    lm = LayerMapping(JabongaFloodHazard, bound_shape, floodhazard_mapping,
                                      transform=False, encoding='iso-8859-1')
                    print("\n")
                    print("\n")
                    print("########## START LOG ########")
                    print("#############################")
                    print("\n")
                    lm.save(strict=True, verbose=True)
                    print "{0} {1}".format("Performing Query: ", datetime.datetime.now())
                    cursor_f = connection.cursor()
                    cursor_f.execute("""
                        SELECT *FROM mainit_tubay_stats_nrt()
                    """)
                    print "{0} {1}".format("Query Done: ", datetime.datetime.now())
                    print("\n")
                    print("########## END LOG ##########")
                    print("#############################")
                    sc.enter(600, 1, do_something, (sc,))
                else:
                    print("\n")
                    print("\n")
                    print("########## START LOG ########")
                    print("#############################")
                    print("\n")
                    print 'No Changes on Shapefile.'
                    print(datetime.datetime.now())
                    print("\n")
                    print("########## END LOG ##########")
                    print("#############################")
                    sc.enter(600, 1, do_something, (sc,))

            except Exception:
                sys.exc_clear()
                print("\n")
                print("\n")
                print("########## START LOG ########")
                print("#############################")
                print("\n")
                print 'Something went wrong.'
                print(datetime.datetime.now())
                print("\n")
                print("########## END LOG ##########")
                print("#############################")
                sc.enter(600, 1, do_something, (sc,))

    s.enter(1, 1, do_something, (s,))
    s.run()

else:
    print 'Shapefile not available.'