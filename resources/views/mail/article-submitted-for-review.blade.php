<x-mail::message>
# New article submitted for review

Hi, a new article has been submitted for review by {{$version->user->name}}.

The article title is: **{{$version->title}}**

The article has not been posted yet, it must first be approved.

<x-mail::button :url="$url">
View Article
</x-mail::button>

\- The SnarkPit
</x-mail::message>
