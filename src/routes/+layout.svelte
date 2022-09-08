<nav>
    <div><a href="/">Home</a></div>
    <div><a href="/login">Login</a></div>
    <div><a href="/register">Registrieren</a></div>
    <div><a href="/logout">Logout</a></div>
    <div><a href="/subject">Fächer</a></div>
    <div><a href="/teacher">Lehrer</a></div>

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