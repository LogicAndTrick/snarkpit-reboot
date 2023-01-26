<x-mail::message>
# New forum thread reply

Hi, a forum thread has been replied to by {{$post->user->name}}.

The thread title is: **{{$post->thread->title}}**

<x-mail::button :url="$url">
View Reply
</x-mail::button>

\- The SnarkPit
</x-mail::message>
