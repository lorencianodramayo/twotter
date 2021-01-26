<template>
    <div class="user-profile__create-twoot-wrapper">
        <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
            <label for="newTwoot"><strong>New Twoot ({{ newTwootCharacterCount }}/180)</strong></label>
            <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"></textarea>

            <div class="user-profile__twoot-options">
                <div class="user-profile__create-twoot-type">
                    <label for="newTwootType"><strong>Type: </strong></label>
                    <select id="newTwootType" v-model="state.selectedTwootType">
                        <option :value="option.value" v-for="(option, index) in state.twootTypes" :key="index">
                            {{ option.name }}
                        </option>
                    </select>
                </div>

                <button>
                    Twoot!
                </button>
            </div>
        </form>
    </div>
</template>

<script>
//composition API
import { reactive, computed } from 'vue';

export default {
    name: 'CreateTwootPanel',
    setup(props, ctx){
        const state = reactive({
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes: [
                { value: 'draft', name: 'Draft' },
                { value: 'instant', name: 'Instant Twoot' }
            ],
        })

        const newTwootCharacterCount = computed(()=> state.newTwootContent.length)

        function createNewTwoot(){
            if(state.newTwootContent && state.selectedTwootType != "draft"){
                ctx.emit('add-twoot', state.newTwootContent);
                state.newTwootContent = ''
            }
        }

        return {
            state,
            newTwootCharacterCount,
            createNewTwoot
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-profile__create-twoot-wrapper{
        padding-top: 30px;

        .user-profile__create-twoot {
            display: flex;
            flex-direction: column;

            &.--exceeded {
                color:red;

                textarea, select {
                    border-color: red;
                }

                button {
                    background-color: red !important;
                    color: #000;
                    cursor: auto;
                }
            }

            .user-profile__twoot-options {
                margin-top: 5px;
                display: flex;
                justify-content: space-between;

                button {
                    background-color: #191919;
                    color: #fff;
                    border: 0;
                    padding: 0 15px;
                    cursor: pointer;
                    font-weight: bold;
                }
            }
        }
    }
</style>