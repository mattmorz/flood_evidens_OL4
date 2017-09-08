from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'evidensapp.views.home', name='home'),
                       url(r'^beta/$', 'evidensapp.views.beta', name='home'),
                       url(r'^tbl/$', 'evidensapp.views.floodhazard_tbl', name='table'),
                       url(r'^cnt_bldg/$', 'evidensapp.views.brgy_info', name='cnt_bldg'),
                       url(r'^get_flood_event/$', 'evidensapp.views.m_getfloodevent', name='get_flood_event'),
                       url(r'^get_geoservername/$', 'evidensapp.views.m_getgeoservername', name='get_geoservername'),
                       url(r'^kakarot/', include(admin.site.urls)),
                       url(r'^piechart/$', 'evidensapp.views.piechart'),
                       url(r'^all_brgy/$', 'evidensapp.views.all_brgy'), )
