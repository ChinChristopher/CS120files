# app/templatetags/shuffle.py
import random
from django import templatetags
from django.template.defaultfilters import stringfilter
register = template.Library()

@register.filter
def shuffle(arg):
    aux = list(arg)[:]
    random.shuffle(aux)
    return aux

