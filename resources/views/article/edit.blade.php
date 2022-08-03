<?php
    $creating = !$version->id;
?>
@section('title', ($creating ? 'Create article' : 'Edit article: '. $version->title))
@extends('layouts.default')

@section('content')
    <h1>
        @if ($creating)
            Create article
        @else
            Edit article: {{$version->title}}
        @endif
    </h1>

    <section>
        <form method="POST" action="{{ url('article/create') }}" enctype="multipart/form-data">
            @csrf
            <x-hidden name="id" :value="$article->id" required />

            <div class="row">
                <div class="col-md-6">
                    <x-text name="title" label="Title:" :value="$version->title" required />

                    <x-select name="article_category_id" label="Category:" :items="$categories" :value="$article->article_category_id" required />
                    <x-select name="game_id" label="Game:" :items="$games" :value="$article->game_id" required />

                    <x-textarea name="description" label="Description (no bbcode):" :value="$version->description" class="small-textarea" required />

                    @if ($creating)
                        <x-text type="file" name="thumbnail_file" label="Thumbnail (required):" accept=".jpg,.jpeg,.png" required />
                        <x-text type="file" name="attachment_file" label="Attachment file (optional):" accept=".jpg,.jpeg,.png,.zip,.rar,.7z" />
                    @else
                        <x-text type="file" name="thumbnail_file" label="Thumbnail (leave blank to keep current thumbnail):" accept=".jpg,.jpeg,.png" />
                        <x-text type="file" name="attachment_file" label="Attachment file (leave blank to keep current file):" accept=".jpg,.jpeg,.png,.zip,.rar,.7z" />
                    @endif
                </div>
                <div class="col-md-6">
                    <div>
                        @if ($creating)
                            <x-checkbox name="change_additional_images" label="Add article images" checked class="d-none" />
                        @else
                            <x-checkbox name="change_additional_images" label="Change article images" />
                        @endif
                        <div id="additional-images" class="d-none">
                            Article images (up to 10 allowed):
                            @if (!$creating)
                                <div class="text-warning mb-1">
                                    <span class="fas fa-warning"></span>
                                    All your article images will be replaced with this new selection,
                                    leave the list empty to remove all article images.
                                </div>
                            @endif
                            <div class="images-form-container" data-max-images="10">
                                <div class="text-center">
                                    <button type="button" class="btn btn-outline-primary">
                                        <span class="fas fa-plus"></span>
                                        Add image
                                    </button>
                                </div>
                            </div>
                        </div>
                        <script>
                            {
                                const change = document.querySelector('input[name="change_additional_images"]');
                                const add = document.getElementById('additional-images');
                                const updateAdditional = () => add.classList.toggle('d-none', !change.checked);
                                change.addEventListener('input', updateAdditional);
                                updateAdditional();
                            }
                        </script>
                    </div>
                </div>
            </div>

            <x-textarea name="text" label="Article content:" :bbcode="true" :value="$version->content_text" required />
            <script>
            {
                function getImageBase64String(img) {
                    return new Promise(resolve => {
                        if (!img || !img.files.length) {
                            resolve(null);
                        } else {
                            const fr = new FileReader();
                            fr.onload = (e) => resolve(fr.result);
                            fr.readAsDataURL(img.files[0]);
                        }
                    });
                }

                async function processHtml(html) {
                    const change = document.querySelector('input[name="change_additional_images"]');
                    const image_base = '{{asset($version->image_files_base)}}';
                    const no_image = '{{ asset('images/no_image.png') }}';

                    const images = [];
                    if (change.checked) {
                        const inputs = Array.from(document.querySelectorAll('[name="images[]"]'));
                        for (const input of inputs) {
                            images.push(await getImageBase64String(input));
                        }
                    }

                    return html.replace(/\[image(\d+)\]/simg, (str, imgNum) => {
                        let url = image_base + '_' + imgNum + '.jpg';
                        if (change.checked) url = images[parseInt(imgNum, 10) - 1] || no_image;
                        return ' <div class="embedded image"><span class="caption-panel">'
                            + '<img class="caption-body" src="' + url + '" alt="Article image" />'
                            + '</span></div> ';
                    });
                }

                const ta = document.querySelector('textarea[name="text"]');
                ta.addEventListener('bbcode-preview-updating', event => {
                    event.detail.html = processHtml(event.detail.html);
                });
            }
            </script>

            <div class="border text-info my-2 p-2 text-center">
                @if ($creating)
                    Your article will be saved as a draft for you to review,
                    you can submit the article to be reviewed by a moderator
                    on the next page.
                @else
                    Your changes will be reviewed by a moderator before being approved.
                @endif
            </div>

            <button type="submit">{{$creating ? 'Submit article' : 'Submit update'}}</button>
        </form>
    </section>
@endsection
