import json
from django.core import serializers


class BaseController:
    """
    Class housing common methods for all controllers derived from this
    """

    @staticmethod
    def clean_object(object, primary_key):
        """
        Method for serializing provided object.
        params:
            object: Serializable django model object
            primary_key: String. Primary key of object
        returns:
            tidy_object: Dictionary
        """
        new_object = json.loads(serializers.serialize('json',[object,]))[0]
        fields = new_object['fields']
        tidy_object = {primary_key: new_object['pk']}
        for key in fields:
            tidy_object[key] = fields[key]
        return tidy_object
    
