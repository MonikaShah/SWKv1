from django.contrib import admin

# Register your models here.
# from .models import Drywaste, Tracksheet,Lanedetails,LaneCordinator
from .models import Tracksheet,DutyEntry,Rating,UploadPictureModel

admin.site.register(Tracksheet)
admin.site.register(DutyEntry)
admin.site.register(Rating)
admin.site.register(UploadPictureModel)