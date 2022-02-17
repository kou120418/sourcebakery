<template>
  <div
    id="delArticleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delArticleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h3 id="delArticleModalLabel" class="modal-title">
            <span>刪除文章</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除文章<br />
          <strong class="text-danger">{{ propsArticle.title }}</strong>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click="$emit('delete-article', propsArticle)"
            type="button"
            class="btn btn-danger"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/assets/javascript/modalMixin';

export default {
  emits: ['delete-article'],
  props: {
    propsArticle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
};
</script>
