from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import SavedFile, StorieBed


admin.site.register(SavedFile)
admin.site.register(StorieBed)
