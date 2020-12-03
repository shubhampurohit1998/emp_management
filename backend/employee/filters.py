from django_filters import rest_framework as filters
from .models import Employee
from django.contrib.auth.models import User
from django.db.models import Q
class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = Employee
        fields =['id', 'user__first_name', 'user__last_name', 'user__email']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # do something w/ author
        # data = kwargs.get('data').get('search')
        # queryset = kwargs.get('queryset')
        # if data.isnumeric():
        #     employee_list = queryset.filter(id=int(data))
        # else:
        #     employee_list = queryset.filter(Q(user__first_name__icontains=data) | Q(user__last_name__icontains=data) | Q(user__email__icontains=data))
        # return employee_list
    
    # def get_filterset(self, request, queryset, view):
    #     import pdb;pdb.set_trace()
    #     pass
