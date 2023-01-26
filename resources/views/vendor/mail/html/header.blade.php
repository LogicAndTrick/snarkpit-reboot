@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img src="http://www.snarkpit.net/images/smiles/snark_topic_icon.gif" class="logo" alt="SnarkPit Logo" style="vertical-align: middle;">
{{ $slot }}
</a>
</td>
</tr>
