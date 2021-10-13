# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class SwkTracksheetReport(models.Model):
    num_houses_reached = models.IntegerField()
    num_houses_doing_segg = models.IntegerField()
    num_houses_giving_mixwaste = models.IntegerField()
    drywaste_bf = models.IntegerField()
    drywaste_af = models.IntegerField()
    wetwaste_bf = models.IntegerField()
    wetwaste_af = models.IntegerField()
    lane_name = models.CharField(max_length=200)
    num_attendants = models.IntegerField()
    first_attendants_name = models.CharField(max_length=100)
    second_attendants_name = models.CharField(max_length=100)
    time_of_visit = models.CharField(max_length=100)
    track_id = models.AutoField(primary_key=True)
    date = models.DateField()
    supervisor_name = models.CharField(max_length=100)
    num_houses = models.IntegerField(blank=True, null=True)
    rejected_total = models.IntegerField(blank=True, null=True)
    rejected_dry = models.IntegerField(blank=True, null=True)
    rejected_wet = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'swk_tracksheet_report'
