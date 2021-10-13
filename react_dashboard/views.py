from django.shortcuts import render
# from swk.HelloAnalytics import *
# Create your views here.

def index(request,*args,**kwargs):
    # analytics = initialize_analyticsreporting()
    # response = get_report(analytics)
    # recd_response = print_response(response)
    # context = {
    #   'Visitor_count': recd_response
    # }
    # return render(request,'react_dashboard/index.html',context)
    return render(request,'react_dashboard/index.html')