<script>
    import Cookies from 'js-cookie';
	import { Authentication } from './../../modules/authentication.js';
	import { goto } from '$app/navigation';
    import { onMount, afterUpdate } from "svelte";
    
    onMount(async () => {
        // try {
        //     const response = await Authentication.authAdmin()
        //     const status = response.data.message
            
        //     if (status != 'success') {
        //         return goto('/error')
        //     }

        // } catch (error) {
        //     return goto('/error')
        // }
    })

    let username = ''
    let password = ''

    async function handleSignIn() {
        try {
            let data = {username, password}
            const login = await Authentication.loginAdmin(data)
            const token = login.data.token

            if (!token) {
                alert('Username atau Pasword salah!')
                return
            }

            Cookies.set('token', token, { expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000) });

            goto('/admin/adsense')

        } catch (error) {
            alert('Internal Error!')
            return
        } 
    }

    function handleKey(e) {
        if (e.key == 'Enter') {
            handleSignIn()
        }
    }
    
</script>

<div class="w-full h-screen flex justify-center bg-gradient-to-r from-sky-950 to-cyan-500">
    <div class="w-96 h-96 bg-white rounded-lg shadow-md flex-col flex items-center p-12 space-y-5 mt-20 mx-2">
        <div>
            <p class="text-4xl text-black font-bold">Pekapoint</p>
        </div>
        <div class="w-full space-y-3">
            <div class="w-full h-10 border rounded-md">
                <input type="text" class="w-full h-full rounded md font-medium" placeholder="Username" bind:value={username} on:keydown={(e) => {handleKey(e)}}>
            </div>
            <div class="w-full h-10 border rounded-md">
                <input type="password" class="w-full h-full rounded md font-medium" placeholder="Password" bind:value={password} on:keydown={(e) => {handleKey(e)}}>
            </div>
        </div>
        <button class="w-full h-10 border-2 rounded-md bg-sky-500 text-white font-semibold border-sky-500 hover:bg-white hover:text-sky-500" on:click={handleSignIn}>
            Sign In
        </button>
    </div>
</div>