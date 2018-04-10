from django.db import models
from django.utils import timezone
from users.models import User
# from storiestream.users.models import User # Research this bit.



# Create your models here.
class SavedFile(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='files/')

    def __str__(self):
        return self.name


class StorieBed(models.Model):
    '''
    List of projects started from uploaded files.
    '''
    new_project_name = models.CharField(max_length=200) # Name of the project/file
    new_project_file = models.FileField(upload_to='files/') # Where to get the project/file
    user_id = models.ForeignKey(User, on_delete=models.CASCADE) # Unsure if I want to do this (deletes all projects if user is deleted). Perhaps better to save projects?

    created_date = models.DateTimeField(auto_now_add=True) # Allows us to sort by creation date, etc.
    completed_date = models.DateTimeField(null=True, blank=True) # Completed words added to StorieBed accessible by readers. Each storie will need a Oauth for reader.
    project_completed = models.BooleanField(default=False) # Lets us know if the project can be moved to StorieBed or if it should stay in the current projects page.


    def addStorie(self): # add stories to the StorieBed
        for project in self.projects.all():
            if project.project_completed:
                return True


    def completeProject(self):
        self.project_completed = True
        self.completed_date = timezone.now()


    def currentProject(self):
        self.project_completed = False



    def __str__(self):
        return self.new_project_name
