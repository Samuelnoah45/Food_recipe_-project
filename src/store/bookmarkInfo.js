import { defineStore } from "pinia";
import { ref ,computed} from "vue";

export const useBookmarkStore = defineStore('bookmark', () =>
{
    const bookmarks=ref([])

    function push_bookmark(value)
    {
    
    bookmarks.value.push(value)
    // console.log(bookmarks.value)

    }
    function check_bookmark(value)
    {
    if (bookmarks.value.includes(value)) {
        return true;
        }
    else {
        return false;
    }
    }
    return {
        check_bookmark ,
        push_bookmark,
        bookmarks

    }
})