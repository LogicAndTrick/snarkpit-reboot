<OpenSearchDescription
    xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/">

    <ShortName>The SnarkPit</ShortName>
    <Description>The SnarkPit - Search forum threads, articles, maps, downloads, and more</Description>
    <Tags>GoldSource GoldSrc Half-Life Hammer Mapping Maps Modding Mods Source Tutorials SnarkPit Valve</Tags>

    <Image width="16" height="16" type="image/x-icon">{{asset('favicon.ico')}}</Image>
    <Image width="64" height="64" type="image/png">{{ asset('images/snark_logo_64.png') }}</Image>

    <Url type="text/html" template="{{ url('search/index') }}?search={searchTerms}" />
    <Url type="application/opensearchdescription+xml" rel="self" template="{{ url('/opensearch.xml') }}" />
    <Query role="example" searchTerms="test" />
    <moz:SearchForm>{{ url('search/index') }}</moz:SearchForm>
</OpenSearchDescription>
