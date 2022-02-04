export default {
  methods: {
    saveMyFavorite(favorite) {
      const storageMethods = JSON.stringify(favorite);
      console.log(storageMethods);
      localStorage.setItem('Favorite', storageMethods);
    },
    getMyFavorite() {
      return JSON.parse(localStorage.getItem('Favorite'));
    },
    addMyFavorite(id) {
      if (this.myFavorite.includes(id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1);
      } else {
        this.myFavorite.push(id);
        console.log(this.myFavorite);
      }
      this.saveMyFavorite(this.myFavorite);
    },
  },
};
