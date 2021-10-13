from rest_framework import serializers

from swk.models import Tracksheet,Zones,SwkBubblePopulation

class newTracksheet(serializers.HyperlinkedModelSerializer):
    zone_id = serializers.CharField(source='zone_id_id')
    class Meta:
        model = Tracksheet
        fields = ( "date",
        "num_houses_reached",
        "num_houses_doing_segg",
        "num_houses_giving_mixwaste",
        "drywaste_bf",
        "drywaste_af",
        "wetwaste_bf",
        "wetwaste_af",
        "lane_name",
        "num_attendants",
        "first_attendants_name",
        "second_attendants_name",
        "supervisor_name",
        "time_of_visit","rejected","zone_id")

class populationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SwkBubblePopulation
        fields = ("zone_id","bubble_id","bubble_population")