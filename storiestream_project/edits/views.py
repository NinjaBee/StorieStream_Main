from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import StorieBed, SavedFile
from django.contrib.auth.decorators import login_required
from django.db import transaction



@login_required
@transaction.atomic
def index(request):
    if request.method == 'POST':
        storiebed = StorieBed()
        storiebed.user = request.user
        storiebed.name = request.POST['name']
        text_file = request.FILES['text_file']
        storiebed.text = text_file.read()
        storiebed.save()

    return render(request, 'edits/index.html', {'text': 'fff' })









# def detail(request, file_id):
#     text_file = get_object_or_404(SavedFile, pk=file_id)
#     return render(request, 'edits/detail.html', {'text_file': text_file})
#
# def upload_file(request):
#     text_file = request.FILES['new_project_file']
#     print(text_file.read())
#     # model = StorieBed(..., text_file=text_file)
#     # model.save()


