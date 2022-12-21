<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT ORGANIZER</h4>
                        <hr />

                        <form @submit.prevent="update(this.$route.params.id)">
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
                                <label for="content" class="form-label">Deskripsi</label>
                                <input class="form-control" v-model="organizer.deskripsiOrganizer"
                                    placeholder="Masukkan deskripsi" />
                                <!-- validation -->
                                <div v-if="validation.deskripsiOrganizer" class="mt-2 alert alert-danger">
                                    {{ validation.deskripsiOrganizer[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" v-model="organizer.alamatOrganizer" 
                                    placeholder="Masukkan alamat" />
                                <!-- validation -->
                                <div v-if="validation.alamatOrganizer" class="mt-2 alert alert-danger">
                                    {{ validation.alamatOrganizer[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                SIMPAN
                            </button>
                            <!-- <button type="submit" class="btn btn-primary">
                                <router-link
                                    :to="{
                                        name: 'departemen.index',
                                    }"
                                    class="btn btn-sm btn-primary mr-1"
                                    >SIMPAN</router-link
                                >
                            </button> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted } from "vue";
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
        const router = useRoute();
        const id = router.params.id;
        console.log(id);
        //method get
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get(`http://localhost:8000/api/organizer/`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }  + id)
                .then((response) => {
                    organizer.namaOrganizer = response.data.data.namaOrganizer;
                    organizer.deskripsiOrganizer = response.data.data.deskripsiOrganizer;
                    organizer.alamatOrganizer = response.data.data.alamatOrganizer;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method store
        function update(id) {
            let namaOrganizer = organizer.namaOrganizer;
            let deskripsiOrganizer = organizer.deskripsiOrganizer;
            let alamatOrganizer = organizer.alamatOrganizer;
            axios
                .put(`http://localhost:8000/api/organizer/` + id, {
                    namaOrganizer: namaOrganizer,
                    deskripsiOrganizer: deskripsiOrganizer,
                    alamatOrganizer: alamatOrganizer,
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then(() => {
                    //redirect ke post index
                    router.push({ name: "organizer.index" });
                    toast.show("Berhasil update", {
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
            id,
            validation,
            router,
            update,
        };
    },
    data() { },
};
</script>
<style>

</style>
