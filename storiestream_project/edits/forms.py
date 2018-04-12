from django import forms
from .models import StorieBed

class StorieForm(forms.ModelForm):
    class Meta:
        model = StorieBed
        fields = ('name', 'text')

