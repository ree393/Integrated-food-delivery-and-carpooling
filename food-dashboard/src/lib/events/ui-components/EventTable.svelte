<script lang="ts">
    import { onMount } from "svelte";
    import type { IOrder } from "../models/IOrder";
    import { FirebaseOrderRepo } from "../repo/FirebaseEventRepo";
    import { showSuccessToast } from "../utils/events-utils";
    let orders: IOrder[] = [];
    let eventRepo = new FirebaseOrderRepo();
    onMount(async () => {
        orders = await eventRepo.ListOrder();
      
    });

    const deleteObj = async (obj: IOrder) => {
        orders = orders.filter((e) => e.id !== obj.id);
        await eventRepo.deleteOrder(obj);
        showSuccessToast("Order deleted Successfully!");
    };
</script>

<div class="my-5 pl-5">
    <h3 class="text-2xl text-gray-800 font-bold">Orders List</h3>
</div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th scope="col" class="px-6 py-3"> Sr </th>
                <th scope="col" class="px-6 py-3"> User </th>
                <th scope="col" class="px-6 py-3"> Date </th>
                <th scope="col" class="px-6 py-3"> Type </th>
                <th scope="col" class="px-6 py-3"> Total </th>
                <th scope="col" class="px-6 py-3"> Actions </th>
            </tr>
        </thead>
        <tbody>
            {#if orders.length === 0}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="text-center py-5" colspan="20"> No Order Found </td>
                </tr>
            {:else}
                {#each orders as event,i}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {i+1}
                        </th>
                        <td class="px-6 py-4"> {event.user.userName} </td>
                        <td class="px-6 py-4"> {event.date.toLocaleString()} </td>
                        <td class="px-6 py-4"> {event.type} </td>
                        <td class="px-6 py-4"> ₹{event.total} </td>

                        <td class="px-6 py-4 space-x-2">
                            <a
                                href="list/details/{event.id}"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >View</a
                            >
                            <button
                                on:click={() => deleteObj(event)}
                                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >Remove</button
                            >
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
