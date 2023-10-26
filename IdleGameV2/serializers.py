#python object to json
from rest_framework import serializers
from .models import Scoreboard

class ScoreboardSerializer(serializers.ModelSerializer):
    class Meta:
        #data describing Model
        model = Scoreboard
        fields = ["id", "name", "description"]