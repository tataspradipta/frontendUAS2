<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'organizer.create' }" class="btn btn-md btn-success">TAMBAH
                            ORGANIZER</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA ORGANIZER</th>
                                    <th scope="col">DESKRIPSI ORGANIZER</th>
                                    <th scope="col">ALAMAT ORGANIZER</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(organizer, id) in organizer" :key="id">
                                    <td>{{ organizer.nama }}</td>
                                    <td>{{ organizer.deskripsi }}</td>
                                    <td>{{ organizer.alamat }}</td>
                                    <td>
                                        <router-link :to="{
                                            name: 'organizer.edit',
                                            params: { id: organizer.id },
                                        }" class="btn btn-sm btn-primary mr-1">
                                            EDIT</router-link>
                                        <button 
                                            class="btn btn-sm btn-danger ml-1" 
                                            @click="
                                                deleteOrganizer(
                                                    organizer.id
                                                )
                                            "
                                        >
                                            DELETE
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 
    'departemen.edit', params: { id: departemen.id } }" class="btn 
    btn-sm btn-primary mr-1">
    EDIT</router-link>
    <button class="btn btn-sm btn-danger ml-1">DELETE</button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { inject } from "vue";

export default {
    setup() {
        const toast = inject("toast");
        //reactive state
        let organizer = ref([]);
        //vue router
        const router = useRouter();
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/organizer", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    //assign state posts with response data
                    organizer.value = response.data.data;
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "organizer.index",
                    });
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function deleteOrganizer(id) {
            axios
                .delete("http://localhost:8000/api/organizer/" + id)
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                    toast.show("Berhasil hapus", {
                        type: "success",
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    console.log(error.response.data);
                });
        }
        //return
        return {
            organizer,
            router,
            deleteOrganizer,
        };
    },
};
</script>
<style>

</style>
