from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, ItemListCreate

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('items/', ItemListCreate.as_view(), name='item-list-create'),
    # Teste
    path('api/items/<int:pk>/update_quantity/', ItemViewSet.as_view({'post': 'update_quantity'}), name='update_quantity'),
]