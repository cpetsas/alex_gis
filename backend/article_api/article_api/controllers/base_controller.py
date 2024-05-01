import json
from django.core import serializers


class BaseController:

    @staticmethod
    def clean_object(object, primary_key):
        new_object = json.loads(serializers.serialize('json',[object,]))[0]
        fields = new_object['fields']
        tidy_object = {primary_key: new_object['pk']}
        for key in fields:
            tidy_object[key] = fields[key]
        return tidy_object
    
