from rest_framework import serializers
from . import models

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ['id','joining_date', 'name', 'email', 'contact_number', 'user',  'designation', 'department', 'department_name', 'stipend', 'salary', 'designation_name']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = '__all__'
