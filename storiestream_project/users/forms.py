from django import forms


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('user_name', 'email', 'password')

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('url', 'user_avatar')

