<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH ORGANIZER</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="organizer.namaOrganizer"
                                    placeholder="Masukkan nama" />
                                <!-- validation -->
                                <div v-if="validation.namaOrganizer" class="mt-2 alert alert-danger">
                                    {{ validation.namaOrganizer[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">deskripsi</label>
                                <input class="form-control" v-model="organizer.deskripsiOrganizer" 
                                    placeholder="Masukkan deskripsi" />
                                <!-- validation -->
                                <div v-if="validation.deskripsiOrganizer" class="mt-2 alert alert-danger">
                                    {{ validation.deskripsiOrganizer[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Alamat</label>
                                <input type="text" class="form-control" v-model="organizer.alamatOrganizer" 
                                    placeholder="Masukkan alamat" />
                                <!-- validation -->
                                <div v-if="validation.alamatOrganizer" class="mt-2 alert alert-danger">
                                    {{ validation.alamatOrganizer[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                SIMPAN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { inject } from "vue";
export default {
    setup() {
        const toast = inject("toast");
        //state departemen
        const organizer = reactive({
            namaOrganizer: "",
            deskripsiOrganizer: "",
            alamatOrganizer: "",
        });
        //state validation
        const validation = ref([]);
        //vue router
        const router = useRouter();
        //method store
        function store() {
            let namaOrganizer = organizer.namaOrganizer;
            let deskripsiOrganizer = organizer.deskripsiOrganizer;
            let alamatOrganizer = organizer.alamatOrganizer;
            axios
                .post("http://localhost:8000/api/organizer", {
                    namaOrganizer: namaOrganizer,
                    deskripsiOrganizer: deskripsiOrganizer,
                    alamatOrganizer: alamatOrganizer,
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "organizer.index",
                    });
                    toast.show("Berhasil tambah", {
                        type: "success",
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            organizer,
            validation,
            router,
            store,
        };
    },
};
</script>
<style>

</style>
