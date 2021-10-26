<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">

        <div class="col">
          <q-input
            class="new-qweet"
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's happening?"
            counter
            maxlength="280"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </template>

            <template v-slot:append>
              <q-icon v-if="newQweetContent !== ''" name="close" @click="newQweetContent = ''" class="cursor-pointer" />
            </template>

          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            :disable="!newQweetContent"
            class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
          />
        </div>

      </div>

      <q-separator
        class="divider"
        size="10px"
        color="grey-2"
      />

      <q-list separator>
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <q-item
            v-for="qweet in qweets"
            :key="qweet.date"
            class="q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Carlos Wagner</strong>
                <span class="text-grey-7">
                  @carloswagner
                  <br class="lt-md">&bull {{ qweet.date | relativeDate }}
                </span>
                </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>

                <div class="qweet-icons row justify-between q-mt-sm">
                  <q-btn
                    flat
                    round
                    color="grey"
                    icon="far fa-comment"
                    size="sm"
                  />
                  <q-btn
                    flat
                    round
                    color="grey"
                    icon="fas fa-retweet"
                    size="sm"
                  />
                  <q-btn
                    flat
                    round
                    color="grey"
                    icon="far fa-heart"
                    size="sm"
                  />
                  <q-btn
                    @click="deleteQweet(qweet)"
                    flat
                    round
                    color="grey"
                    icon="fas fa-trash"
                    size="sm"
                  />
                </div>

            </q-item-section>

          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>

  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { defineComponent } from 'vue'
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newQweetContent: '',
      qweets : []
    }
  },
  methods: {
    addNewQweet() {
      let NewQweet = {
        content: this.newQweetContent,
        date: Date.now()
      }
      this.qweets.unshift(NewQweet)
      this.newQweetContent = ''
    },
    deleteQweet(qweet) {
      let dateToDelete = qweet.date
      let index = this.qweets.findIndex(qweet => qweet.date === dateToDelete)
      this.qweets.splice(index, 1)
    }
  },
  filters: {
    relativeDate(value) {
      console.log(value)
      return formatDistance(value, new Date())
    }
  },
  mounted() {
    let q = query(collection(db, "qweets"), orderBy('date'))
    let unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let qweetChange = change.doc.data()
        if (change.type === "added") {
            console.log("New qweet: ", qweetChange)
            this.qweets.unshift(qweetChange)
        }
        if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange)
        }
        if (change.type === "removed") {
            console.log("Removed qweet: ", qweetChange)
        }
      })
    })
  }
})
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left:-5px
</style>
