<script>

    import {getStores} from '$app/stores';

    function logout(){
        fetch("/account/logout", {
            method: "POST"
        });
    }
</script>

<button on:click={logout}>Logout</button>