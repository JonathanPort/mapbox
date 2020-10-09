<template>

    <div class="file-upload">

        <div class="file-upload__header">

            <h3 class="file-upload__heading">Drop file to upload</h3>

        </div>

        <div class="file-upload__body">

            <div class="file-upload__drop-area"
                 @drop.prevent="addFile"
                 @dragover.prevent="dragoverAnimate"
                 @dragleave.prevent="dragleaveAnimate"
                 :class="[dragover ? 'file-upload__drop-area--dragover' : '']"
            >

                <div class="file-upload__loader" v-if="processing"><div></div><div></div></div>

                <div class="file-upload__result" v-if="! processing && processed">

                    <img src="./../../images/icons/correct.png" alt="">
                    <img :src="'./../../images/file-types/' + getFileIcon() + '.png'" alt="">

                    <span>{{ file.name }}</span>

                    <p @click="reset">Choose a different file</p>

                </div>

            </div>

            <button type="button"
                    class="file-upload__manual-button btn btn-rounded btn-purple"
                    v-if="! processed && ! processing"
                    @click="manualUploadClick"
            >
                Select File
            </button>

            <input type="file" class="file-upload__manual-input" :accepted="acceptedTypesString" @input="manualAddFile">

            <div class="file-upload__invalid" v-if="! valid">

                <div v-if="this.accepted.length">File must be type: {{ this.acceptedTypesString }}</div>
                <div>File must less than: {{ this.formatBytesToMb(this.maxSize) }}mb</div>

            </div>

        </div>

    </div>

</template>


<script>

    const fileTypes = {
        doc: {
            name: 'Microsoft Word',
            extension: 'doc',
            mime: 'application/msword',
            icon: 'doc',
        },
        docx: {
            name: 'Microsoft Word (OpenXML)',
            extension: 'docx',
            mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            icon: 'doc',
        },
        jpg: {
            name: 'JPEG image',
            extension: 'jpg',
            mime: 'image/jpeg',
            icon: 'jpg',
        },
        jpeg: {
            name: 'JPEG image',
            extension: 'jpeg',
            mime: 'image/jpeg',
            icon: 'jpg',
        },
        png: {
            name: 'PNG image',
            extension: 'png',
            mime: 'image/png',
            icon: 'png',
        },
        pdf: {
            name: 'Adobe Portable Document Format (PDF)',
            extension: 'pdf',
            mime: 'application/pdf',
            icon: 'pdf',
        },
    };

    export default {
        data() {
            return {
                file: false,
                dragover: false,
                valid: true,
                processing: false,
                processed: false,
                fileTypes: fileTypes,
            }
        },
        props: {
            accepted: {
                default: () => [],
                type: Array,
            },
            maxSize: {
                default: 2e+6, // 2mb
                type: Number,
            },
        },
        methods: {
            dragoverAnimate() {
                this.valid = true;
                this.dragover = true;
            },
            dragleaveAnimate() {
                this.dragover = false;
            },
            manualUploadClick() {

                return document.querySelector('.file-upload__manual-input').click();

            },
            addFile(e) {

                this.dragleaveAnimate();

                let files = e.dataTransfer.files;

                if (! files) return;

                const file = files[0];
                const valid = this.validateFile(file);

                if (! valid) return this.valid = false;

                this.processFile(file);

            },
            manualAddFile(e) {

                let files = e.target.files;

                if (! files) return;

                const file = files[0];
                const valid = this.validateFile(file);

                if (! valid) return this.valid = false;

                this.processFile(file);

            },
            validateFile(file) {

                let valid = true;
                let accepted = false;

                if (this.accepted.length) {

                    for (let i = 0; i < this.accepted.length; i++) {

                        if (file.type === this.fileTypes[this.accepted[i]].mime) accepted = true;

                    }

                }

                if (! accepted) valid = false;
                if (file.size > this.maxSize) valid = false;

                return valid;

            },
            processFile(file) {

                this.processing = true;

                this.file = file;

                setTimeout(() => this.processing = false, 300);
                setTimeout(() => this.processed = true, 300);

                this.$eventHub.$emit('crm::file-upload::uploaded', {
                    file: file,
                });

            },
            reset() {
                this.file = false;
                this.dragover = false;
                this.valid = true;
                this.processing = false;
                this.processed = false;
                this.$eventHub.$emit('crm::file-upload::cancelled', {});
            },
            formatBytesToMb(number) {
                return (number / (1024*1024)).toFixed(2);
            },
            validateAcceptedProps() {

                const types = this.fileTypes;

                for (let i = 0; i < this.accepted.length; i++) {

                    if (! types[this.accepted[i]]) console.error('Invalid file types passed through "accepted" prop array.');

                }

            },
            getFileIcon() {

                const type = this.file.type;
                let icon = false;

                for (let i in this.fileTypes) {

                    if (typeof this.fileTypes[i] !== 'object') continue;

                    if (this.fileTypes[i].mime === type) icon = this.fileTypes[i].icon;

                }

                return icon;

            },
        },
        computed: {
            acceptedTypesString() {

                return this.accepted ? this.accepted.join(', ') : false;

            },
        },
        filters: {
            //
        },
        created() {
            //
        },
        mounted() {

            this.validateAcceptedProps();

        }

    }
</script>
