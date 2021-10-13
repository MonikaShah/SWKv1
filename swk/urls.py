from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static

# from visits.models import Visits
urlpatterns = [
    path('',views.HomePage, name = 'homepage'),
    path('aboutus/', views.AboutUs, name = 'aboutus'),
    # path('formlayout/',views.formLayout,name='formlayout'),
    path('trackform/', views.TracksheetPage, name = "trackform"),
    path('trackform_det/',views.TrackformPageDetail, name ="trackform_det"),
    path('dutyentryform/', views.DutyEntryPage, name = "dutyentryform"),
    path('login/', views.user_login, name='login'),
    path("logout", views.logout_request, name="logout"),
    path('show/',views.show, name='show'),  
   
    path('edit/<int:id>', views.edit),  
    path('update/<int:id>', views.update),  
    path('delete/<int:id>', views.destroy),  
    # url(r'^download_data/(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})/$', views.download),
    # url(r'^download_data_zone/(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})&(?P<lane_name>\D+)/$', views.downloadzone),
    url(r'^download_data_zone/(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})to(?P<year1>\d{4})-(?P<month1>\d{2})-(?P<day1>\d{2})&(?P<zone_name>\D+)/$', views.downloadzone),
    path('report/',views.report,name='report'),
    path('faq/',views.FAQ, name = 'faq'),
    path('grievance/',views.Grievance, name = 'grievance'),
    path('rating/',views.RatingView, name = 'rating'),
    path('contact/',views.Contact, name = 'contact'),
    path('uploadimage/',views.uploadimage, name = 'uploadimage'),
    path('getdetails/',views.getdetails,name = 'getdetails'),
    path('audiogrievance/',views.audiogrievance, name = 'audiogrievance')
    # path('graphs/',views.Graphs, name = 'graphs'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
