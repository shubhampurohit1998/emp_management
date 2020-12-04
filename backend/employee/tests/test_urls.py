# SimpleTestCase is used to not to look for model every time
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from employee.views import EmployeeViewSet, DepartmentViewSet, UserViewSet
# class TestUrls(SimpleTestCase):

#     def test_list_url_is_resolve(self):
#         url = reverse('employee-list')
#         print(resolve(url))
#         self.assertEquals(resolve(url).func, EmployeeViewSet)