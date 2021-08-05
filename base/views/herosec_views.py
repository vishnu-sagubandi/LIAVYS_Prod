from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import HeroSectionImage
from base.serializers import HeroSerializer



@api_view(['GET'])
def get_all_heroSec(request):
    products = HeroSectionImage.objects.all()
    serializer = HeroSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_heroSec(request, pk):
    products = HeroSectionImage.objects.filter(hero_id=pk)
    serializer = HeroSerializer(products, many=True)
    return Response(serializer.data)
