<nav>
    <div><a href="/"></a></div>
    <div><a href="/login">Login</a></div>
    <div><a href="/register">Registrieren</a></div>
    <div><a href="/subject">Fächer</a></div>
</nav>
<slot></slot>

<style>
    nav {
      display: flex;
      flex-direction: row;
        width: 100vw;
        justify-content: space-evenly;
    }
</style>