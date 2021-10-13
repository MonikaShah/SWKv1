"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.conf import settings
from django.views.generic import TemplateView
from django.urls import path, re_path, include
from django.conf.urls.static import static

# from geonode.urls import urlpatterns

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls



urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
    path('admin/', admin.site.urls),
    path('',include('swk.urls')),
    # path('',include('swkapi.urls')),
    path('map/',include('map.urls')),
    path('dashboard/',include('react_dashboard.urls')),
    # url(r'^swk/',include('swk.urls')),
    re_path(r'^cms/', include(wagtailadmin_urls)),
    re_path(r'^documents/', include(wagtaildocs_urls)),
    re_path(r'^pages/', include(wagtail_urls)),
    url(r'^report_builder/', include('report_builder.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
