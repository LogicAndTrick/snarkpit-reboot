<x-mail::message>
# New download created

Hi, a new download has been added by {{$download->user->name}}.

The download name is: **{{$download->name}}**

<x-mail::button :url="$url">
View Download
</x-mail::button>

\- The SnarkPit
</x-mail::message>
