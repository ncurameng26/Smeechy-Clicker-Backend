#end pointsm URl to access data
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response

class ScoreView(APIView):
    def get(self, request):
        output = [{"name": output.name, 
                   "cookie" : output.cookie}
                    for output in Scoreboard.objects.all()]
        return Response(output)
         
    def post(self, request):
        serializer = ScoreboardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

# #decorator design pattern
# @api_view(['GET', 'POST'])
# def score_list(request, format = None): #function that takes get request
#     #get all the scores
#     if request.method == "GET":
#         scores = Scoreboard.objects.all()
#         #serialize them
#         serializer = ScoreboardSerializer(scores, many = True)
#         #return Json
#         return Response(serializer.data)
    
#     if request.method == "POST":
#         serializer = ScoreboardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status= status.HTTP_201_CREATED)



# @api_view(["GET", 'PUT', "DELETE"])    
# def scoreboard_detail(request, id, format = None):
#     try:
#         score = Scoreboard.objects.get(pk = id)
#     except Scoreboard.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == "GET":
#         serializer = ScoreboardSerializer(score)
#         return Response(serializer.data)
    
#     elif request.method == "PUT":
#         serializer = ScoreboardSerializer(score, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == "DELETE":
#         score.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

