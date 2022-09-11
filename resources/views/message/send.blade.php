@section('title', 'Send message')
@extends('layouts.default')

@section('content')
    <h1>
        <span class="fa fa-message"></span>
        Send message
    </h1>
    <section>
        <div class="text-center mb-3">
            <a class="mx-3" href="{{ url('message/index', [ $user->id ]) }}">
                <span class="fas fa-inbox"></span>
                Inbox
            </a>
            &bull;
            <a class="mx-3" href="{{ url('message/sent', [ $user->id ]) }}">
                <span class="fas fa-share"></span>
                Outbox
            </a>
            &bull;
            <strong class="mx-3">
                <span class="fas fa-paper-plane"></span>
                New message
            </strong>
        </div>
        <form action="{{ url('message/send') }}" method="post">
            @csrf
            <x-text name="to" label="To:" :value="$to" />
            <div id="user-search-list"></div>
            <x-text name="title" label="Title:" />
            <x-textarea name="text" label="Message:" :bbcode="true" />
            <button type="submit">Send</button>
        </form>

        <script>
            const userListContainer = document.getElementById('user-search-list');
            const form = userListContainer.parentElement;

            const toInput = form.querySelector('input[name="to"]');
            toInput.addEventListener('input', scheduleUpdate);

            let timeout = null;
            function scheduleUpdate() {
                clearTimeout(timeout);
                timeout = setTimeout(updateUserList, 500);

                const name = toInput.value;
                userListContainer.replaceChildren(name ? '...' : 'Type a name to find a user.');
            }

            async function updateUserList() {
                const name = toInput.value;
                if (!name) {
                    userListContainer.replaceChildren('Type a name to find a user.');
                } else {
                    const resp = await fetch('{{ url('user/find-user' ) }}' + '?name=' + name);
                    const json = await resp.json();
                    const match = json.find(x => x.name === name);
                    if (match) {
                        const link = document.createElement('a');
                        link.innerText = match.name;
                        link.href = '{{ url('user/view') }}/' + match.id;
                        link.target = '_blank';
                        userListContainer.replaceChildren('User profile: ', link);
                    } else if (!json.length) {
                        userListContainer.innerText = 'No user matching this name was found. Check you have the correct spelling.';
                    } else {
                        const list = document.createElement('ul');
                        for (const user of json) {
                            const li = document.createElement('li');
                            const a = document.createElement('a');
                            a.href = '#';
                            a.innerText = user.name;
                            a.addEventListener('click', event => {
                                event.preventDefault();
                                toInput.value = user.name;
                                userListContainer.replaceChildren();
                                scheduleUpdate();
                            });
                            li.append(a);
                            list.append(li);
                        }
                        userListContainer.replaceChildren('Keep typing to find users or click a name below:', list);
                    }
                }
            }

            scheduleUpdate();
        </script>

    </section>
@endsection
