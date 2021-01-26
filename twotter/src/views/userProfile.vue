<template>
    <div class="user-profile">
        <div class="user-profile__user-panel">
            <div class="user-profile__user-panel-wrapper">
                <h1 class="user-profile__username">@{{ state.user.username }}</h1>
                <div class="user-profile__admin-badge" v-if="state.user.isAdmin">Admin</div>
                <div class="user-profile__follower-count">
                    <strong>Followers: </strong> {{ state.followers }}
                </div>
            </div>

            <CreateTwootPanel @add-twoot="addTwoot"/>
        </div>
        <div class="user-profile__twoots-wrapper">
            <TwootItem 
                v-for="twoot in state.user.twoots" 
                :key="twoot.id" 
                :username="state.user.username" 
                :twoot="twoot"
            />
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from '../assets/users';
import TwootItem from "../components/TwootItem";
import CreateTwootPanel from "../components/CreateTwootPanel";

export default {
    name: 'UserProfile',
    components: { TwootItem, CreateTwootPanel },
    setup(props, ctx){
        const route = useRoute();
        const userId = computed(() => route.params.userId)

        const state = reactive({
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes: [
                { value: 'draft', name: 'Draft' },
                { value: 'instant', name: 'Instant Twoot' }
            ],
            followers: 0,
            user: users[userId.value -1] || users[0]
        })

        onMounted(() => {
            ctx.emit('username', state.user.username)
        })

        const addTwoot = (content) => {
            state.user.twoots.unshift({
                id: state.user.twoots.length + 1,
                content
            })
        }

        return {
            state,
            addTwoot,
            userId
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-profile{
        display:grid;
        grid-template-columns: 1fr 3fr;
        padding: 50px 5%;
        
        .user-profile__user-panel{
            display:flex;
            flex-direction:column;
            margin-right: 50px;
            background-color: transparent;
            border-radius: 5px;

            .user-profile__user-panel-wrapper{
                padding: 20px;
                background-color: #fff;
                border: 1px solid #DFE3E8;

                h1{
                    margin: 0;
                }

                .user-profile__admin-badge{
                    background-color: rebeccapurple;
                    color: #fff;
                    border-radius: 5px;
                    margin-right: auto;
                    padding: 0 10px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    display: inline-flex;
                }
            }
        }

        .user-profile__twoots-wrapper{
            width:100%;
        }
    }
</style>
