from django.shortcuts import render

# Create your views here.
# from swk.HelloAnalytics import *

def Map(request):
   # analytics = initialize_analyticsreporting()
   # response = get_report(analytics)
   # recd_response = print_response(response)
   # context = {
   #    'Visitor_count': recd_response
   # }

   # return render(request, "map/map.html", context)
   return render(request, "map/map.html")

   #return render(request,"map/map.html")