from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Employee, Department
from .serializers import EmployeeSerializer, DepartmentSerializer
from rest_framework.response import Response
from rest_framework import status
from .tasks import create_csv_file
from .filters import EmployeeFilter
from django_filters import rest_framework as filters

def index(request):
    return render(request, '../templates/employee_list.html', {})

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_class = EmployeeFilter
    # filterset_fields = ('user__first_name', 'id' )  # here

    @action(detail=False, methods=['POST', 'GET'],url_path="create-csv", url_name="create_csv")
    def create_csv(self, request):
        list = request.data.get('list')
        employee_list = self.queryset.filter(id__in=list)
        response = create_csv_file(employee_list)
        if response:
            return Response({'message': 'CSV file been created...', 'status': 'success'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Something went wrong with CSV creation!', 'status': 'failed'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'], url_path='save-changes', url_name='save_changes')
    def save_changes(self, request):
        try:
            list = request.data.get('list')
            emp_list = []
            department_list = Department.objects.all()
            for i in list:
                employee = self.queryset.get(id=i.get('id'))
                if i.get('department'):
                    employee.department = department_list.get(id=i.get('department')) 
                emp_list.append(employee)
            Employee.objects.bulk_update(emp_list, ['department'], batch_size=100)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_304_NOT_MODIFIED)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    @action(detail=True, methods=['GET'])
    def employee(self, request, pk=None):
        try:
            emp_list = Employee.objects.filter(department_id=pk)
            if emp_list:
                serializer = EmployeeSerializer(emp_list, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


