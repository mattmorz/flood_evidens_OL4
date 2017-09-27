import os
from django.contrib.gis.utils import LayerMapping
from evidensapp.models import CabadbaranBldgRe

#evidensapp/data/CBR_Cabadbaran_FloodRisks_v08112016/cbr_seniang_floodrisks_10m.shp SeniangCBR --srid=326101 --mapping --multi

cabadbaranbldgre_mapping = {
    #'id' : 'Id',
    'bldg_name' : 'Bldg_Name',
    #'height' : 'Height',
    'code' : 'Code',
    'bldg_type' : 'Bldg_Type',
    'brgy_locat' : 'Brgy_Locat',
    'municipali' : 'Municipali',
    'province' : 'Province',
    #'source_pbo' : 'Source_PBo',
    'geom' : 'MULTIPOLYGON',
}

#cbr_mapping = {
#    'grid_code': 'grid_code',
#    'geom': 'MULTIPOLYGON',
#}

bound_shape = os.path.abspath(
    os.path.join(os.path.dirname(__file__), 'data/Buildings/CSU_bldgs_cabadbaran_v03.31.2016.shp'))


def run(verbose=True):
    lm = LayerMapping(CabadbaranBldgRe, bound_shape, cabadbaranbldgre_mapping,
                      transform=False, encoding='iso-8859-1')

    lm.save(strict=True, verbose=verbose)
