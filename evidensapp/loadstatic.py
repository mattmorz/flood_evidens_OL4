import os
from django.contrib.gis.utils import LayerMapping
from evidensapp.models import GaasSeniang


#evidensapp/data/CBR_Cabadbaran_FloodRisks_v08112016/cbr_seniang_floodrisks_5m.shp SeniangCBR --srid=32651 --mapping --multi
# Auto-generated `LayerMapping` dictionary for Tago2Year model

#jabongabldgs_mapping = {
#    'hh_id' : 'HH_ID',
#    'hh_headnam' : 'HH_HeadNam',
#    'birthdate' : 'Birthdate',
#    'gender' : 'Gender',
#    'occupation' : 'Occupation',
#    'monthly_in' : 'Monthly_In',
#    'family_mem' : 'Family_Mem',
#    'contact_nu' : 'Contact_Nu',
#    'bldg_mater' : 'Bldg_Mater',
#    'bldg_type' : 'Bldg_Type',
#    'means_tran' : 'Means_Tran',
#    'purok_numb' : 'Purok_Numb',
#    'brgy_locat' : 'Barangay',
#    'municipali' : 'Municipali',
#    'province' : 'Province',
#    'geom' : 'MULTIPOLYGON',
#}

#bldg_mapping = {
#    'id' : 'Id',
#    'bldg_name' : 'Bldg_Name',
#    'code' : 'Code',
#    #'bldg_heigh' : 'Bldg_Heigh',
#    'bldg_type' : 'Bldg_Type',
#    'brgy_locat' : 'Bldg_Locat',
#    'municipali' : 'Municipali',
#    'province' : 'Province',
#    #'source_pbo' : 'Source_Pbo',
#    'geom' : 'MULTIPOLYGON',
#}

#
# Auto-generated `LayerMapping` dictionary for Malinao2Year model
malinao_mapping = {
    #'id' : 'Id',
    'gridcode': 'grid_code',
    #'shape_leng' : 'Shape_Leng',
    #'shape_area' : 'Shape_Area',
    #'hazard' : 'HAZARD',
    'geom': 'MULTIPOLYGON',
}

bound_shape = os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'data/Shapefiles/GaasLulet_FloodHazard_Seniang.shp'))
#bound_shape = 'Z:/FloodEviDEns/Nearrealtime_Jabonga/hazard_nrt_jabonga.shp'


def run(verbose=True):
    lm = LayerMapping(GaasSeniang, bound_shape, malinao_mapping,
                      transform=False, encoding='iso-8859-1')

    lm.save(strict=True, verbose=verbose)
