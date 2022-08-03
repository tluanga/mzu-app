from razorpay import Client as RazorPayClient


def init():
    RazorPayClient.set_app_details(
        {"title": 'Mizoram University', "version": '101'})
