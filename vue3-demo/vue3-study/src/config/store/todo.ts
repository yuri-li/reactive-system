import { defineStore } from "pinia"
import { ref } from "vue"
import { remove } from "lodash"

export const useTodoStore = defineStore("todoStore", () => {
    const doing = ref<string[]>(["a", "b", "c", "d"])
    const done = ref<string[]>([])

    function deleteDoingItem(item: string) {
        remove(doing.value, x => x === item)
    }

    function deleteDoneItem(item: string) {
        remove(done.value, x => x === item)
    }

    function addDoingItem(item: string) {
        doing.value.push(item)
    }

    return {doing, done, addItem: addDoingItem, deleteItem: deleteDoingItem, deleteDoneItem,}
})