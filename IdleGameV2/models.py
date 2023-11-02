from django.db import models

class Scoreboard(models.Model):
    name = models.CharField(max_length = 20)
    cookie = models.CharField(max_length = 30)  

