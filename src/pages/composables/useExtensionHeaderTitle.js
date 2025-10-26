import { ref } from 'vue';

export function useShowExtensionHeader (extensionHeaderTitle) {
    const title = ref(extensionHeaderTitle);
    
    return {
        title
    };
}