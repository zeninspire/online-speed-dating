import temp from '../Templates/navbarTemplate.vue';
import { mapState } from 'vuex';


const navbar = {
  name: 'navbar',
  template: temp.template,
  data () {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    username () {
      return this.$store.state.user.username;
    }
  },

  methods: {
    goToMyProfile: function() {
      this.$router.push('/myprofile/' + this.username);
    },
    goToEditProfile: function() {
      this.$router.push('/myprofile/' + this.username + '/edit');
    },
    goToEvents: function() {
      this.$router.push('/events');
    },
    logout: function() {
      this.$router.push('/');
      this.$store.commit('clearState');
      this.$http.get('/auth/logout')
      .then(()=>{

        console.log('logged out');
      });
    },
    login: function() {
      this.$http.post('/auth/login', {
        username: this.username,
        password: this.password
      })
      .then((res) => {
        var body = res.body;
        this.$http.get('/api/events')
          .then((res) => {
            this.$store.commit('setAllEvents', res.body);
          });
        this.$store.commit('setUser', body);
        this.$store.commit('setSavedEvents', body.events);
        this.$router.push('/myprofile/' + this.username);
      })
      .catch((err) => console.error(err));
    }
  }
};

export default navbar;