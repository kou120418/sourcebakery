<template>
  <div class="container content">
    <div class="modal-content border-0">
      <div class="modal-header bg-primary text-white">
        <h2 id="articleModalLabel" class="modal-title">
          <span>編輯文章</span>
        </h2>
      </div>
      <div class="modal-body">
        <div class="row mt-3">
          <div class="form-group col-md-4">
            <label for="author">作者名稱</label>
            <input
              id="author"
              type="text"
              class="form-control mt-1"
              placeholder="請輸入作者名稱"
              v-model="this.tempArticle.author"
            />
          </div>

          <div class="form-group col-md-4">
            <label for="tag">分類標籤</label>
            <input
              id="tag"
              type="text"
              class="form-control mt-1"
              placeholder="請輸入分類標籤"
              v-model="this.tempArticle.tag"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="create_at">建立時間</label>
            <input
              id="create_at"
              type="date"
              class="form-control mt-1"
              placeholder="請輸入建立時間"
              v-model="create_at"
            />
          </div>
        </div>

        <hr />

        <div class="row mt-3">
          <div class="col-md-4">
            <div class="form-group">
              <label
                class="text-dark px-2"
                for="mainImageUrl"
                >請輸入文章圖片網址</label
              >
              <input
                id="mainImageUrl"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入圖片連結"
                v-model.trim="this.tempArticle.image"
              />
              <img
                class="img-fluid my-3 form-img"
                :src="this.tempArticle.image"
                :alt="this.tempArticle.title"
              />
            </div>

            <label class="btn btn-outline-success btn-sm d-block w-100 mt-3">
              <input
                id="upload_img"
                style="display: none"
                type="file"
                @change="uploadMainImgage"
              />
              上傳圖片
            </label>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="form-group col-md-6">
              <label for="title">文章標題</label>
              <input
                id="title"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章標題"
                v-model="this.tempArticle.title"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="description">文章簡述</label>
              <input
                id="description"
                type="text"
                class="form-control mt-1"
                placeholder="請輸入文章簡述"
                v-model.trim="this.tempArticle.description"
              />
            </div>
            </div>
            <div class="form-group">
              <label for="content">文章內容</label>
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                v-model="tempArticle.content"
              ></ckeditor>
            </div>
            <div class="form-group mt-3">
              <div class="form-check">
                <input
                  id="isPublic"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="true"
                  :false-value="false"
                  v-model="this.tempArticle.isPublic"
                />
                <label class="form-check-label" for="isPublic">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <router-link class="btn btn-secondary" to="/admin/articles"
          >取消</router-link
        >
        <button
          type="button"
          class="btn btn-primary"
          @click="updateArticle(tempArticle)"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      tempArticle: {},
      create_at: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'heading', // 標題、次標題、次次標題
            '|',
            // 粗體、斜體
            'bold',
            'italic',
            '|',
            // 刪除線、下底線、上標、下標
            // 'strikethrough',
            // 'underline',
            // 'subscript',
            // 'superscript',
            // '|',
            // 編號排版、符號排版種
            'bulletedList',
            'numberedList',
            '|',
            // 文字顏色、文字底色、文字字形、文字大小、文字對齊
            // 'fontColor',
            // 'fontBackgroundColor',
            // 'fontfamily',
            // 'fontsize',
            // 'alignment',
            // '|',
            'blockQuote', // 引用
            // 代碼工具欄、程式碼區塊
            // 'code',
            // 'codeBlock',
            // 表格(合併、分隔、表格底色、刪除欄/列、插入欄列)、水平線、超連結
            'insertTable',
            // 'horizontalLine',
            'link',
            '|',
            // 縮排
            // 'outdent',
            // 'indent',
            // '|',
            'mediaEmbed', // 插入媒體
          ],
        },
      },
    };
  },
  emits: ['update-article'],
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    showErrorAlert(error) {
      this.$swal({
        title: error,
        icon: 'error',
      });
    },
    getArticle() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.$http.get(url).then((res) => {
        this.tempArticle = res.data.article;
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    updateArticle(tempArticle) {
      // 進入編輯狀態
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${tempArticle.id}`;
      this.$http.put(url, { data: tempArticle }).then((res) => {
        if (res.data.success) {
          this.showAlert(res);
          this.$router.push('/admin/articles/');
        }
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
    uploadMainImgage(e) {
      console.dir(e);
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      this.$http.post(url, formData).then((res) => {
        this.tempArticle.image = res.data.imageUrl;
      })
        .catch((error) => {
          this.showErrorAlert(error);
        });
    },
  },
  mounted() {
    // console.clear();
    this.getArticle();
  },
  watch: {
    tempArticle() {
      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split('T');
      [this.create_at] = dateAndTime;
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
};
</script>
