<x-mail::message>
# Your article was not approved

Hi, unfortunately your article submission, **{{$version->title}}**, was not approved.

Administrator {{$version->user->name}} has added extra information below.

---

<div>{!! $version->review_html !!}</div>

---

Please make changes to the article as needed, and then submit the article again for approval.

<x-mail::button :url="$url">
Revise Article
</x-mail::button>

\- The SnarkPit
</x-mail::message>
