<template>
  <div v-if="modal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-wrapper" role="document">
            <div class="modal-content modal-container">
              <div class="modal-header">
                <h5 class="modal-title" v-if="modal==='newfeed'">Add new feed</h5>
                <h5 class="modal-title" v-if="modal==='newcategory'">Add new category</h5>
                <h5 class="modal-title" v-if="modal==='deletecategory'">Delete category</h5>
                <h5 class="modal-title" v-if="modal==='renamecategory'">Rename category</h5>
                <h5 class="modal-title" v-if="modal==='deletefeed'">Delete feed</h5>
                <h5 class="modal-title" v-if="modal==='renamefeed'">Rename feed</h5>
                <h5 class="modal-title" v-if="modal==='showcategories'">Categories</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="closeModal"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body" v-if="modal==='newfeed'">
                <div v-if="this.store.categories.length > 0">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Enter feed or website url..."
                    v-model="url"
                  >
                  <br>
                  <div class="form-group row">
                    <label for="inputFeedDescription" class="col-sm-3 col-form-label">Category</label>
                    <div class="col-sm-9">
                      <select class="form-control" id="category" v-model="store.currentSelection.category">
                        <option
                          v-for="category in this.store.categories"
                          :value="category.id"
                          :key="category.id"
                          v-bind:id="category.id"
                        >{{ category.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p>No categories exist at this moment.</p>
                  <p>First create a new category before adding a new feed.</p>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary mb-2"
                  @click="checkWebsite"
                >Validate feed</button>
                <br>
                <span v-if="ajaxRequest">Please Wait ...</span>
                <br>
                <span class="error" v-if="error_msg">{{ error_msg }}</span>
                <div v-if="feed.id">
                  <div class="form-group row">
                    <label for="inputFeedName" class="col-sm-3 col-form-label">Feed name</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="feed.feedName"
                        placeholder="Feed name"
                      >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputFeedDescription"
                      class="col-sm-3 col-form-label"
                    >Feed description</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control"
                        v-model="feed.feedDesc"
                        placeholder="Feed description"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-body" v-if="modal==='newcategory'">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Enter new category name.."
                  v-model="category.name"
                >
                <br>
              </div>

              <div class="modal-body" v-if="modal==='deletecategory'">
                <p>Are you sure to delete this category?</p>
                <br>
              </div>

              <div class="modal-body" v-if="modal==='renamecategory'">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Enter new category name.."
                  v-model="category.name"
                >
                <br>
              </div>

              <div class="modal-body" v-if="modal==='deletefeed'">
                <p>Are you sure to delete this feed?</p>
                <br>
              </div>

              <div class="modal-body" v-if="modal==='renamefeed'">
                <div class="form-group row">
                  <label for="inputFeedName" class="col-sm-3 col-form-label">Feed name</label>
                  <div class="col-sm-9">
                    <input
                      class="form-control"
                      type="text"
                      id="feed_name"
                      placeholder="Feed name"
                      v-model="feed.feedName"
                    >
                  </div>
                </div>
                <div v-if="this.store.categories.length > 0">
                  <div class="form-group row">
                    <label
                      for="inputFeedDescription"
                      class="col-sm-3 col-form-label"
                    >Feed description</label>
                    <div class="col-sm-9">
                      <input
                        class="form-control"
                        type="text"
                        id="feed_desc"
                        placeholder="Feed description"
                        v-model="feed.feedDesc"
                      >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputFeedDescription" class="col-sm-3 col-form-label">Category</label>
                    <div class="col-sm-9">
                      <select class="form-control" id="category" v-model="store.currentSelection.category">
                        <option
                          v-for="category in this.store.categories"
                          :value="category.id"
                          :key="category.id"
                          v-bind:id="category.id"
                        >{{ category.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-body" id="mobile" v-if="modal==='showcategories'">
                <p>Select which category you want to display</p>
                <ul class="categories">
                  <li class="category" v-on:click="store.currentSelection.category = null">
                    <span class="glyphicon">
                      <i class="far fa-folder" data-fa-transform="down-5 shrink-2"></i>
                    </span>
                    <span>Show all categories</span>
                  </li>
                  <li
                    class="category"
                    v-on:click="store.currentSelection.category = category.id"
                    v-for="category in store.categories"
                    :key="category.id"
                    v-bind:id="category.id"
                  >
                    <span class="glyphicon">
                      <i class="far fa-folder" data-fa-transform="down-5 shrink-2"></i>
                    </span>
                    <span>{{ category.name }}</span>
                  </li>
                </ul>
                <p>Select how the articles should be displayed</p>
                <button
                  @click="store.filter = 'full'"
                  type="button"
                  class="btn btn-primary content"
                >Full content</button>
                <button
                  @click="store.filter = 'minimal'"
                  type="button"
                  class="btn btn-primary content"
                >Minimal content</button>

                <p>Click the button below to add a new feed</p>
                <button
                  @click="modal = 'newfeed'"
                  type="button"
                  class="btn btn-success"
                >Add new feed</button>
              </div>
              <div class="modal-footer">
                <button
                  v-if="feed.id && modal==='newfeed'"
                  type="button"
                  class="btn btn-primary"
                  @click="saveFeed"
                >Save changes</button>
                <button
                  v-if="modal==='newcategory'"
                  type="button"
                  class="btn btn-primary"
                  @click="saveCategory"
                >Add new category</button>
                <button
                  v-if="modal==='deletecategory'"
                  type="button"
                  class="btn btn-primary"
                  @click="deleteCategory"
                >Delete category</button>
                <button
                  v-if="modal==='renamecategory'"
                  type="button"
                  class="btn btn-primary"
                  @click="renameCategory"
                >Update category</button>
                <button
                  v-if="modal==='deletefeed'"
                  type="button"
                  class="btn btn-primary"
                  @click="deleteFeed"
                >Delete feed</button>
                <button
                  v-if="modal==='renamefeed'"
                  type="button"
                  class="btn btn-primary"
                  @click="renameFeed"
                >Update feed</button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="emitClickEvent('modal',null)"
                >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Landscape phones and portrait tablets */
@media (max-width: 766px) {
  div#myModal {
    padding-top: 200px;
  }

  div.modal-body p {
    margin-bottom: 3px;
  }
}

/* Desktop */
@media (min-width: 766px) {
  .modal-container {
    padding: 20px 30px;
  }
}

#myModal.modal {
  display: inline;
  opacity: 1;
}

div.modal-dialog {
  max-width: 800px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  color: #111;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<script>
import store from '../store';

export default {
  props: ["modal", "inputCategory", "inputFeed"],
  data() {
    return {
      store: store,
      ajaxRequest: false,
      error_msg: "",
      url: null,
      category: {},
      feed: {}
    };
  },
  //watchers are used to avoid two way binding.
  //we working on a copy and only update the store once we know for sure the api has returned a 200 status.
  watch: {
    inputCategory() {
      this.category = JSON.parse(JSON.stringify(this.inputCategory));
    },
    inputFeed() {
      this.feed = JSON.parse(JSON.stringify(this.inputFeed));
    }
  },
  methods: {
    checkWebsite: function() {
      //set ajaxRequest to true so the please wait shows up the screen
      this.ajaxRequest = true;

      this.$http
        .post("feeds", { url: this.url, categoryId: this.category.id })
        .then(
          result => {
            /* eslint-disable no-console */
            console.log(result.status);
            /* eslint-enable no-console */
            this.error_msg = "";
            this.feed = result.body;

            //add missing count properties, since these are populated dynamically
            this.feed.unreadCount = 0;
            this.feed.readCount = 0;
            this.feed.starCount = 0;

            //find the index of the category
            var index = this.store.categories.indexOf(this.inputCategory);
            //push the new feed to the store
            this.store.categories[index].feeds.push(this.feed);
          },
          response => {
            this.error_msg = response.body.error_msg;
          }
        )
        .catch(err => {
          /* eslint-disable no-console */
          console.log(err);
          /* eslint-enable no-console */
        });

      this.ajaxRequest = false;
    },
    closeModal: function() {
      //set error_msg and url back to normal
      this.error_msg = "";
      this.url = "";
      this.emitClickEvent("modal", null);
    },
    emitClickEvent(eventType, value) {
      this.$emit(eventType, value);
    },
    saveFeed: function() {
      this.$http
        .put("feeds/" + this.feed.id, {
          feedName: this.feed.feedName,
          feedDesc: this.feed.feedDesc,
          categoryId: this.category.id
        })
        .then(
          result => {
            /* eslint-disable no-console */
            console.log(result.status);
            /* eslint-enable no-console */
          },
          response => {
            /* eslint-disable no-console */
            console.log("oops something went wrong", response);
            /* eslint-enable no-console */
          }
        );

      //send event to refresh the categories
      this.store.refreshCategories++;

      //close modal
      this.closeModal();
    },
    saveCategory: function() {
      //save category when category name is set
      if (this.category) {
        this.$http.post("categories", { name: this.category.name }).then(
          result => {
            //create new local category in data object
            this.category = result.body;

            //add missing count properties, since these are populated dynamically
            this.category.unreadCount = 0;
            this.category.readCount = 0;
            this.category.starCount = 0;

            //push the new category to categories in store
            this.store.categories.push(result.data);

            //close the modal
            this.closeModal();
          },
          response => {
            /* eslint-disable no-console */
            console.log("oops something went wrong", response);
            /* eslint-enable no-console */
            this.closeModal();
          }
        );
      }
    },
    deleteCategory: function() {
      //delete category
      this.$http.delete("categories/" + this.category.id).then(
        () => {
          //remove the category from the store
          this.store.categories = this.arrayRemove(
            this.store.categories,
            this.inputCategory
          );
          //close the modal
          this.closeModal();
        },
        response => {
          /* eslint-disable no-console */
          console.log("oops something went wrong", response);
          /* eslint-enable no-console */
          this.closeModal();
        }
      );
    },
    arrayRemove(arr, value) {
      //filter function to remove item from an array
      return arr.filter(function(ele) {
        return ele != value;
      });
    },
    renameCategory: function() {
      //rename category
      this.$http
        .put("categories/" + this.store.currentSelection.category, {
          name: this.category.name
        })
        .then(
          result => {
            //find the index of the category
            var index = this.store.categories.indexOf(this.inputCategory);

            //update the store with the returned name of the category
            this.store.categories[index].name = result.data.name;

            //close the modal
            this.closeModal();
          },
          response => {
            /* eslint-disable no-console */
            console.log("oops something went wrong", response);
            /* eslint-enable no-console */
            this.closeModal();
          }
        );
    },
    deleteFeed: function() {
      //delete category
      this.$http.delete("feeds/" + this.feed.id).then(
        () => {
          //find the index of both the category and feed
          var indexCategory = this.store.categories.indexOf(
            this.inputCategory
          );

          //remove the category from the store
          this.store.categories[indexCategory].feeds = this.arrayRemove(
            this.store.categories[indexCategory].feeds,
            this.inputFeed
          );

          //close the modal
          this.closeModal();
        },
        response => {
          /* eslint-disable no-console */
          console.log("oops something went wrong", response);
          /* eslint-enable no-console */
          this.closeModal();
        }
      );
    },
    renameFeed: function() {
      //rename feed
      this.$http
        .put("feeds/" + this.feed.id, {
          feedName: this.feed.feedName,
          feedDesc: this.feed.feedDesc,
          categoryId: this.category.id
        })
        .then(
          result => {
            //find the index of both the category and feed
            var indexCategory = this.store.categories.indexOf(
              this.inputCategory
            );
            var indexFeed = this.store.categories[indexCategory].feeds.indexOf(
              this.inputFeed
            );

            //update the feed in the store with the results from the api
            this.store.categories[indexCategory].feeds[indexFeed].feedName =
              result.data.feedName;
            this.store.categories[indexCategory].feeds[indexFeed].feedDesc =
              result.data.feedDesc;
            this.store.categories[indexCategory].feeds[indexFeed].categoryId =
              result.data.categoryId;

            //close the modal
            this.closeModal();
          },
          response => {
            /* eslint-disable no-console */
            console.log("oops something went wrong", response);
            /* eslint-enable no-console */
            this.closeModal();
          }
        );
    }
  }
};
</script>