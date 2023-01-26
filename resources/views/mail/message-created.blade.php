<x-mail::message>
# New private message

Hi, you have been sent a private message by {{$message->from_user->name}}.

# {{$message->title}}
---

{!! $message->content_html !!}

---

<x-mail::button :url="$url">
Reply to Message
</x-mail::button>

\- The SnarkPit
</x-mail::message>
