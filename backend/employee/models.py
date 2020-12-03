from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField
from address.models import AddressField
from djmoney.models.fields import MoneyField
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User

EMPLOYEE_WORK_FIELD = [
    ('senior developer', 'Senior Developer'),
    ('trainee', 'Trainee'),
    ('junior developer', 'Junior Developer'),
    ('team lead', 'Team Lead'),
]

class Company(models.Model):
    name = models.CharField(help_text=_('Company name'), max_length=255, blank=False)
    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(help_text=_("Department name"),max_length=255, blank=False)
    description = models.TextField(help_text=_("Give a brief description about department"), null=True, blank=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="Department")
    def __str__(self):
        return self.name


class CommonInfo(models.Model):
    stipend = MoneyField(help_text=_("Employee stipend"), default_currency="INR", decimal_places=2,max_digits=10, default=0, null=True, blank=False)
    contact_number = PhoneNumberField(_('Contact number'), blank=False, null=True, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, help_text=_('User'))

    class Meta:
        abstract = True

class Employee(CommonInfo):
    joining_date = models.DateField(auto_now=True, help_text=_('Joining date'))
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, related_name="Employee", null=True)
    designation = models.CharField(choices=EMPLOYEE_WORK_FIELD, max_length=20, blank=False, help_text=_('Designation'))
    
    class Meta:
        ordering = ('id',)

    @property
    def name(self):
        return self.user.get_full_name()
    
    @property
    def email(self):
        return self.user.email
    
    @property
    def department_name(self):
        return self.department.name

    @property
    def designation_name(self):
        return self.get_designation_display()
    
    @property
    def salary(self):
        return "{}".format(self.stipend)
    
    def __str__(self):
        return self.user.get_full_name()

class EmployeeAddress(models.Model):
    address = AddressField(help_text=_('Address'), blank=False, null=True)
    is_permanent_address = models.BooleanField(help_text=_('Mark as permanent address'), default=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="EmployeeAddress")

    def __str__(self):
        return self.employee.get_full_name()


class EmployeeHistory(models.Model):
    experiance = models.SmallIntegerField(default=0, help_text='Number of years of experiance', blank=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="EmployeeHistory")

    def __str__(self):
        return self.employee.get_full_name()