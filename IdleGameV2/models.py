from django.db import models

class Scoreboard(models.Model):
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 30)  

