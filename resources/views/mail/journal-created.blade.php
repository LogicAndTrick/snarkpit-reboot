<x-mail::message>
# New journal created

Hi, a new journal has been added by {{$journal->user->name}}.

The journal title is: **{{$journal->title}}**

<x-mail::button :url="$url">
View Journal
</x-mail::button>

\- The SnarkPit
</x-mail::message>
