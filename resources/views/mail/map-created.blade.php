<x-mail::message>
# New map created

Hi, a map has been added by {{$map->user->name}}.

The map name is: **{{$map->name}}**

<x-mail::button :url="$url">
View Map
</x-mail::button>

\- The SnarkPit
</x-mail::message>
