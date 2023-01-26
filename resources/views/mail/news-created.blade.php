<x-mail::message>
# New news post created

Hi, a news post has been added by {{$news->user->name}}.

The news subject is: **{{$news->subject}}**

<x-mail::button :url="$url">
View News Post
</x-mail::button>

\- The SnarkPit
</x-mail::message>
