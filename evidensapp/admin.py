from django.contrib.gis import admin
from evidensapp.models import *
# Register your models here.

admin.site.register([RiverBasin, RiverBasinMunicipality, FloodEvent, JabongaFloodHazard])

