#python object to json
from django.forms import ValidationError
from rest_framework import serializers
from .models import Scoreboard


class ScoreboardSerializer(serializers.ModelSerializer):
    class Meta:
        #data describing Model
        model = Scoreboard
        fields = ["id", "name", "description"]