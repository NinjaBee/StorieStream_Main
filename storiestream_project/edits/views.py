from django.shortcuts import render, redirect, get_object_or_404
from .models import StorieBed, SavedFile
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .forms import StorieForm



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
        return render(request, 'edits/index.html', {'text': storiebed.text, 'name': storiebed.name })
    return render(request, 'edits/index.html')



def edit_storie(request):
    if request.method == 'POST':
        form = StorieForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('edits/details.html', pk=post.id)
        else:
            form = StorieForm()
        return render(request, 'edits/storieForm.html')


def detail(request, pk):
    storie_text  = get_object_or_404(StorieBed, pk)
    context = {'name': storie_text.name, 'text': storie_text.text}
    return render(request, 'edits/index.html', context)


