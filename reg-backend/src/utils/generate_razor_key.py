import hmac
import hashlib
import base64
dig = hmac.new(b'1234567890', msg=your_bytes_string,
               digestmod=hashlib.sha256).digest()
base64.b64encode(dig).decode()


def geneterate_razorpay_hmac_key():
    key = hmac.new(b'1234567890', msg=your_bytes_string,
                   digestmod=hashlib.sha256).digest()
    return key
