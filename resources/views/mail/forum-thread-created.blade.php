<x-mail::message>
# New forum thread created

Hi, a forum thread has been added by {{$thread->user->name}}.

The thread title is: **{{$thread->title}}**

<x-mail::button :url="$url">
View Thread
</x-mail::button>

\- The SnarkPit
</x-mail::message>
