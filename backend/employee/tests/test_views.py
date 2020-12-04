from django.test import Client, TestCase
from django.urls import reverse, resolve
from employee.models import Employee, Department, Company
import json
from django.contrib.auth.models import User
class TestViews(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.employee_list_url = reverse('employee-list')
        self.employee_detail_url = reverse('employee-detail', kwargs={'pk': 1})
        self.user1 = User.objects.create(username="abc", password="Hello@123", email="abc@mailinator.com")
        self.company = Company.objects.create(name="StarLink")
        self.department = Department.objects.create(company=self.company, name="java", description="Developed by james gosling")
        self.employee = Employee.objects.create(user=self.user1, department=self.department) 
    
    def test_employee_list_GET(self):
        response = self.client.get(self.employee_list_url)
        self.assertEquals(response.status_code, 200)
    
    def test_employee_detail_GET(self):
        response = self.client.get(self.employee_detail_url)
        self.assertEquals(response.status_code, 200)
    
    # def test_employee_list_POST(self):
    #     print(self.employee_list_url)
    #     user2 = User.objects.create(username="xyz", password="Hello@123")
    #     response = self.client.post(self.employee_list_url, {
    #         'user': user2,
    #         'department':self.department,
    #     })
    #     self.assertEquals(response.status_code, 302)

    def test_employee_list_serch_GET(self):
        self.search_url = reverse('employee-search', kwargs={'data': 'abc'})
        print(self.search_url)
        response = self.client(self.search_url)
        self.assertEquals(response.status_code, 200)