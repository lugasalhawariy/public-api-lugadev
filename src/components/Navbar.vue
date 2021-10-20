<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark container-md">
        <div class="container-fluid-lg container-md">
            <a class="navbar-brand" href="https://www.instagram.com/lugasdev/">@lugasdev</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <router-link :active="active" class="nav-link" to="/" exact-active-class="Home">Home</router-link>
                </li>
                <li class="nav-item">
                <router-link :active="active" class="nav-link" to="/sic" exact-active-class="SIC">SIC</router-link>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">COVID</a>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'Navbar',
  props: {}
}
</script>
