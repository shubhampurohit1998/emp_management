from django.contrib import admin
from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from employee import views
router = DefaultRouter()
router.register('api/employee', views.EmployeeViewSet)
router.register('api/department', views.DepartmentViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('employee.urls'))
] + router.urls
