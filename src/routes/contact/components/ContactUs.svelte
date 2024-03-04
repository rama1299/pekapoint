<script>
    import ContactForm from './template/ContactForm.svelte';
  import ContactList from './template/ContactList.svelte';
</script>

<div class="w-full space-y-5">
    <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
        <p class="font-semibold lg:text-xl bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">Get In Touch</p>
    </div>
    <div class="w-full flex flex-col lg:flex-row justify-center items-start gap-5">
        <div class=" w-full lg:w-1/2">
            <ContactList/>
        </div>
        <div class="w-full lg:w-1/2">
            <ContactForm/>
        </div>
    </div>
</div>