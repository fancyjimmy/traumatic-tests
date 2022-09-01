<script>

    import {getStores} from '$app/stores';

    function logout(){
        fetch("/account/logout", {
            method: "POST",
            body: {

            }
        });
    }
</script>

<button on:click={logout}>Logout</button>