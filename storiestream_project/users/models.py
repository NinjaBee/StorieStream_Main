from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


class User(models.Model):
    # the variable to take the inputs
    user_name = models.CharField(_('Name of User'), max_length=100)
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)

    def __str__(self):
        return self.user_name

    # on submit click on the user entry page, it redirects to the url below.
    def get_absolute_url(self):
        return reverse('uploadfileapp:home')



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(_('First name of User'), max_length=100, null=True, blank=True)
    last_name = models.CharField(_('Last name of User'), max_length=100, null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    user_avatar = models.FileField(upload_to='avatars/', null=True, blank=True)
    location = models.CharField(max_length=30, blank=True)



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
