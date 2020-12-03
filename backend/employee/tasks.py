from celery import Celery
import csv
import datetime
from rest_framework.response import Response
from django.http import HttpResponse
app = Celery('tasks', broker='amqp://localhost')

@app.task
def create_csv_file(list):
    try:
        # response = Response(content_type="text/csv")
        # writer = csv.writer(response)
        # writer.writerow(['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Desgination', 'Contact Number', 'Stipend', 'Stipend Currency', 'Joining Date'])
        # result = list.values_list('id','user__first_name', 'user__last_name', 'user__email', 'department__name', 'designation', 'contact_number', 'stipend', 'stipend_currency', 'joining_date')
        # for employee in result:
        #     writer.writerow(employee)
        # response['Content-Disposition'] = 'attachment; filename="Employees.csv" '
        # return response
        path = '/root/Downloads/'
        name = datetime.datetime.now()
        file_name = str(name) + '.csv'
        path = path + file_name
        with open(file_name, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Desgination', 'Contact Number', 'Stipend', 'Stipend Currency', 'Joining Date'])
            result = list.values_list('id','user__first_name', 'user__last_name', 'user__email', 'department__name', 'designation', 'contact_number', 'stipend', 'stipend_currency', 'joining_date')
            for employee in result:
                writer.writerow(employee)
        return True
    except Exception as e:
        return False

