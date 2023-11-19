<script>
    let isShopee = true
    let isTokped = false
    let isLaz = false

    function handleShopee() {
        isShopee = true
        isTokped = false
        isLaz = false
    }

    function handleTokped() {
        isShopee = false
        isTokped = true
        isLaz = false
    }
</script>

<main class="w-full flex justify-end gap-2 px-4 h-10">
    <div class="h-9 cursor-pointer hover:scale-105 duration-200 bg-orange-500 flex items-center gap-1 px-1 rounded-full">
        <div class="w-7 h-7 bg-white rounded-full" on:click={handleShopee}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
                <path fill="#f4511e" d="M36.683,43H11.317c-2.136,0-3.896-1.679-3.996-3.813l-1.272-27.14C6.022,11.477,6.477,11,7.048,11 h33.904c0.571,0,1.026,0.477,0.999,1.047l-1.272,27.14C40.579,41.321,38.819,43,36.683,43z"></path><path fill="#f4511e" d="M32.5,11.5h-2C30.5,7.364,27.584,4,24,4s-6.5,3.364-6.5,7.5h-2C15.5,6.262,19.313,2,24,2 S32.5,6.262,32.5,11.5z"></path><path fill="#fafafa" d="M24.248,25.688c-2.741-1.002-4.405-1.743-4.405-3.577c0-1.851,1.776-3.195,4.224-3.195 c1.685,0,3.159,0.66,3.888,1.052c0.124,0.067,0.474,0.277,0.672,0.41l0.13,0.087l0.958-1.558l-0.157-0.103 c-0.772-0.521-2.854-1.733-5.49-1.733c-3.459,0-6.067,2.166-6.067,5.039c0,3.257,2.983,4.347,5.615,5.309 c3.07,1.122,4.934,1.975,4.934,4.349c0,1.828-2.067,3.314-4.609,3.314c-2.864,0-5.326-2.105-5.349-2.125l-0.128-0.118l-1.046,1.542 l0.106,0.087c0.712,0.577,3.276,2.458,6.416,2.458c3.619,0,6.454-2.266,6.454-5.158C30.393,27.933,27.128,26.741,24.248,25.688z"></path>
            </svg>
        </div>
        <p class="cursor-pointer text-white font-medium {isShopee ? '' : 'hidden'}">Rp. 20.000.000</p>
    </div>
    <div class="h-9 cursor-pointer hover:scale-105 duration-200 bg-[#3FAF48] flex items-center gap-1 px-1 rounded-full">
        <div class="w-7 h-7 bg-white rounded-full" on:click={handleTokped}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0,0,256,256">
                <defs><linearGradient x1="32.135" y1="1.445" x2="32.135" y2="51.043" gradientUnits="userSpaceOnUse" id="color-1_QxTCUohbBw9U_gr1"><stop offset="0" stop-color="#3faf48"></stop><stop offset="0.492" stop-color="#3faf48"></stop><stop offset="1" stop-color="#3faf48"></stop></linearGradient><linearGradient x1="23.522" y1="-3.418" x2="23.522" y2="63.822" gradientUnits="userSpaceOnUse" id="color-2_QxTCUohbBw9U_gr2"><stop offset="0" stop-color="#000000"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><linearGradient x1="32.135" y1="-3.418" x2="32.135" y2="63.822" gradientUnits="userSpaceOnUse" id="color-3_QxTCUohbBw9U_gr3"><stop offset="0" stop-color="#000000"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><linearGradient x1="40.749" y1="-3.418" x2="40.749" y2="63.822" gradientUnits="userSpaceOnUse" id="color-4_QxTCUohbBw9U_gr4"><stop offset="0" stop-color="#000000"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><linearGradient x1="31.85" y1="37.11" x2="31.85" y2="43.98" gradientUnits="userSpaceOnUse" id="color-5_QxTCUohbBw9U_gr5"><stop offset="0" stop-color="#3faf48"></stop><stop offset="0.492" stop-color="#3faf48"></stop><stop offset="1" stop-color="#3faf48"></stop></linearGradient><linearGradient x1="31.846" y1="-4.535" x2="31.846" y2="62.706" gradientUnits="userSpaceOnUse" id="color-6_QxTCUohbBw9U_gr6"><stop offset="0" stop-color="#000000"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><linearGradient x1="32.135" y1="-3.418" x2="32.135" y2="63.822" gradientUnits="userSpaceOnUse" id="color-7_QxTCUohbBw9U_gr7"><stop offset="0" stop-color="#000000"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient></defs><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M54,13.6v24.51c0,8.79 -7.12,15.91 -15.9,15.91h-27.83v-40.42h12.59c2.93,0 6.62,1.99 9.28,4.64c2.65,-2.65 6.34,-4.64 9.27,-4.64z" fill="url(#color-1_QxTCUohbBw9U_gr1)"></path><circle cx="22.859" cy="30.163" r="9.276" fill="#ffffff"></circle><circle cx="41.411" cy="30.163" r="9.276" fill="#ffffff"></circle><path d="M44,48.473c0,0.799 -0.109,2.78 -0.298,3.527h-23.134c-0.189,-0.746 -0.298,-2.728 -0.298,-3.527c0,-5.785 5.313,-10.473 11.87,-10.473c6.547,0 11.86,4.688 11.86,10.473z" fill="#ffffff"></path><circle cx="23.522" cy="30.825" r="4.638" fill="url(#color-2_QxTCUohbBw9U_gr2)"></circle><circle cx="21.203" cy="27.181" r="2.982" fill="#ffffff"></circle><path d="M41.41,14.6c-2.53,0 -5.97,1.74 -8.57,4.34c-0.19,0.2 -0.45,0.3 -0.7,0.3c-0.26,0 -0.52,-0.1 -0.71,-0.3c-2.6,-2.6 -6.04,-4.34 -8.57,-4.34h-11.59v38.42h26.83c8.21,0 14.9,-6.69 14.9,-14.91v-23.51zM51,38.11c0,7.12 -5.79,12.91 -12.9,12.91h-24.83v-34.42h9.59c1.69,0 4.69,1.29 7.15,3.76c0.57,0.56 1.32,0.88 2.13,0.88c0.8,0 1.55,-0.32 2.12,-0.88c2.46,-2.47 5.46,-3.76 7.15,-3.76h9.59z" fill="#ffffff"></path><path d="M41.067,20.23c-3.929,0 -7.322,2.299 -8.932,5.617c-1.61,-3.318 -5.003,-5.617 -8.933,-5.617c-5.477,0 -9.932,4.455 -9.932,9.932c0,5.477 4.456,9.933 9.932,9.933c3.929,0 7.323,-2.299 8.933,-5.618c1.61,3.318 5.003,5.618 8.932,5.618c5.477,0 9.933,-4.456 9.933,-9.933c0,-5.477 -4.456,-9.932 -9.933,-9.932zM23.203,38.095c-4.374,0 -7.932,-3.559 -7.932,-7.933c0,-4.373 3.558,-7.932 7.932,-7.932c4.374,0 7.933,3.559 7.933,7.932c-0.001,4.374 -3.559,7.933 -7.933,7.933zM41.067,38.095c-4.374,0 -7.932,-3.559 -7.932,-7.933c0,-4.373 3.558,-7.932 7.932,-7.932c4.374,0 7.933,3.559 7.933,7.932c0,4.374 -3.559,7.933 -7.933,7.933z" fill="url(#color-3_QxTCUohbBw9U_gr3)"></path><circle cx="40.749" cy="30.825" r="4.638" fill="url(#color-4_QxTCUohbBw9U_gr4)"></circle><circle cx="38.43" cy="27.181" r="2.982" fill="#ffffff"></circle><path d="M36.57,39.3l-4.43,4.44l-0.24,0.24l-4.77,-4.77c1.14,-1.29 2.82,-2.1 4.67,-2.1c0.12,0 0.22,0.02 0.34,0.02c1.77,0.09 3.34,0.91 4.43,2.17z" fill="url(#color-5_QxTCUohbBw9U_gr5)"></path><path d="M31.9,45.278l-6.142,-6.143l0.623,-0.704c1.369,-1.549 3.344,-2.438 5.419,-2.438c0.091,0 0.175,0.006 0.258,0.014l0.133,0.007c1.997,0.102 3.82,0.994 5.135,2.515l0.608,0.703zM28.562,39.112l3.337,3.337l3.25,-3.258c-0.865,-0.709 -1.924,-1.121 -3.061,-1.179c-0.035,0.004 -0.123,-0.005 -0.208,-0.013c-0.007,0 -0.015,0 -0.021,0c-1.24,0.001 -2.385,0.399 -3.297,1.113z" fill="url(#color-6_QxTCUohbBw9U_gr6)"></path><path d="M54,12.6h-11.736c-0.798,-4.877 -5.03,-8.616 -10.129,-8.616c-5.099,0 -9.331,3.739 -10.129,8.616h-11.736c-0.55,0 -1,0.45 -1,1v40.42c0,0.55 0.45,1 1,1h27.83c9.32,0 16.9,-7.59 16.9,-16.91v-24.51c0,-0.55 -0.45,-1 -1,-1zM32.135,5.984c4.025,0 7.384,2.89 8.122,6.703c-2.603,0.367 -5.616,1.906 -8.117,4.172c-2.51,-2.266 -5.523,-3.805 -8.126,-4.172c0.737,-3.812 4.096,-6.703 8.121,-6.703zM53,38.11c0,8.22 -6.69,14.91 -14.9,14.91h-26.83v-38.42h11.59c2.53,0 5.97,1.74 8.57,4.34c0.19,0.2 0.45,0.3 0.71,0.3c0.25,0 0.51,-0.1 0.7,-0.3c2.6,-2.6 6.04,-4.34 8.57,-4.34h11.59z" fill="url(#color-7_QxTCUohbBw9U_gr7)"></path></g></g>
                </svg>
        </div>
        <p class="cursor-pointer text-white font-medium {isTokped ? '' : 'hidden'}">Rp. 20.000.000</p>
    </div>
    <div class="h-9 cursor-pointer hover:scale-105 duration-200 bg-black flex items-center gap-1 px-1 rounded-full">
        <div class="w-7 h-7 rounded-full text-center">
            <i class='bx bx-dots-horizontal-rounded text-xl text-white'></i>
        <p class="cursor-pointer text-white font-medium {isLaz ? '' : 'hidden'}">Rp. 20.000.000</p>
    </div>
</main>