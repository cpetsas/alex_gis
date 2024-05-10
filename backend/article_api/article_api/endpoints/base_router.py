class BaseRouter:
    """
    Class housing common route moethods. Not actually doing anything in this case,
    but I created one bc we'd probably come across a use case where we need a method for all
    routers. Now I just defined a method and overriding it in the inherited routers.
    """

    @classmethod
    def get_endpoints(cls):
        pass